import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  businessName01: string = ''; // First part of the business name (e.g., Flex)
  businessName02: string = ''; // Second part of the business name (e.g., Point)
  primaryColor: string = "#1B3E54";
  secondaryColor: string = "#61B9AD";
  selectedFaviconFile: File | null = null;

  // No separate properties for primaryColor50, secondaryColor50 here,
  // as they are derived and directly applied to CSS variables.

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load business name parts from localStorage or directly from the DOM
      const navTextIcon = this.document.querySelector('#navTextIcon');
      const navTextIconSpan = navTextIcon?.querySelector('span');

      let currentPart1 = 'Flex'; // Default value if not found
      let currentPart2 = 'Point'; // Default value if not found

      if (navTextIcon) {
        const textNodes = Array.from(navTextIcon.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        currentPart1 = textNodes.map(node => node.textContent?.trim()).join('') || 'Flex';

        if (navTextIconSpan) {
          currentPart2 = navTextIconSpan.textContent?.trim() || 'Point';
        }
      }

      this.businessName01 = localStorage.getItem('businessName01') || currentPart1;
      this.businessName02 = localStorage.getItem('businessName02') || currentPart2;

      this.primaryColor = localStorage.getItem('primaryColor') || getComputedStyle(this.document.documentElement).getPropertyValue('--primary-color').trim();
      this.secondaryColor = localStorage.getItem('secondaryColor') || getComputedStyle(this.document.documentElement).getPropertyValue('--secondary-color').trim();

      // Apply loaded favicon immediately
      const savedFavicon = localStorage.getItem('faviconDataUrl');
      if (savedFavicon) {
        this.updateFavicon(savedFavicon);
      }

      // Apply loaded base colors
      this.document.documentElement.style.setProperty('--primary-color', this.primaryColor);
      this.document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);

      // Apply loaded 50% opacity colors
      const savedPrimaryColor50 = localStorage.getItem('primaryColor50');
      const savedSecondaryColor50 = localStorage.getItem('secondaryColor50');

      if (savedPrimaryColor50) {
        this.document.documentElement.style.setProperty('--primary-color-50', savedPrimaryColor50);
      } else {
        // Recalculate if not found (e.g., first load after update)
        const defaultPrimary50 = this.colorToRgba(this.primaryColor, 0.5);
        this.document.documentElement.style.setProperty('--primary-color-50', defaultPrimary50);
      }

      if (savedSecondaryColor50) {
        this.document.documentElement.style.setProperty('--secondary-color-50', savedSecondaryColor50);
      } else {
        // Recalculate if not found
        const defaultSecondary50 = this.colorToRgba(this.secondaryColor, 0.5);
        this.document.documentElement.style.setProperty('--secondary-color-50', defaultSecondary50);
      }

    } else {
      // Default values for SSR or non-browser environments
      this.businessName01 = 'Flex';
      this.businessName02 = 'Point';
      this.primaryColor = "#1B3E54";
      this.secondaryColor = "#61B9AD";
      // No need to set _50 colors here, as they'll be handled on client-side hydration
    }
  }

  onFaviconFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFaviconFile = input.files[0];
    } else {
      this.selectedFaviconFile = null;
    }
  }

  applySettings(): void {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Update Business Icon (Favicon)
      if (this.selectedFaviconFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const dataUrl = e.target.result;
          this.updateFavicon(dataUrl);
          localStorage.setItem('faviconDataUrl', dataUrl); // Save favicon data URL
        };
        reader.readAsDataURL(this.selectedFaviconFile);
      }

      // 2. Update Business Name (Navbar Header Title - Flex and Point parts)
      const navBarBrandElement = this.document.querySelector('#navTextIcon');
      const navBarBrandSpan = navBarBrandElement?.querySelector('span');

      if (navBarBrandElement && navBarBrandSpan) {
        Array.from(navBarBrandElement.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = '';
          }
        });
        const textNode = this.renderer.createText(this.businessName01);
        this.renderer.insertBefore(navBarBrandElement, textNode, navBarBrandSpan);
        navBarBrandSpan.textContent = this.businessName02;
      }
      localStorage.setItem('businessName01', this.businessName01);
      localStorage.setItem('businessName02', this.businessName02);

      // 3. Update Primary and Secondary Colors (SCSS Variables via CSS Custom Properties)
      this.document.documentElement.style.setProperty('--primary-color', this.primaryColor);
      localStorage.setItem('primaryColor', this.primaryColor);

      this.document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);
      localStorage.setItem('secondaryColor', this.secondaryColor);

      // Calculate and apply 50% opacity colors
      const primaryColor50 = this.colorToRgba(this.primaryColor, 0.3);
      const secondaryColor50 = this.colorToRgba(this.secondaryColor, 0.3);

      this.document.documentElement.style.setProperty('--primary-color-50', primaryColor50);
      localStorage.setItem('primaryColor50', primaryColor50);

      this.document.documentElement.style.setProperty('--secondary-color-50', secondaryColor50);
      localStorage.setItem('secondaryColor50', secondaryColor50);


      console.log('Settings Applied:', {
        businessName01: this.businessName01,
        businessName02: this.businessName02,
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor,
        primaryColor50: primaryColor50,
        secondaryColor50: secondaryColor50,
        favicon: this.selectedFaviconFile ? this.selectedFaviconFile.name : 'No new favicon selected'
      });
      alert('Settings applied successfully!');
    }
  }

  private updateFavicon(dataUrl: string): void {
    let link = this.document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!link) {
      link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'icon');
      this.renderer.appendChild(this.document.head, link);
    }
    this.renderer.setAttribute(link, 'href', dataUrl);
  }

  // Helper function to convert hex/rgb to rgba
  private colorToRgba(color: string, alpha: number): string {
    let r = 0, g = 0, b = 0;

    // Handle Hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      if (hex.length === 3) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
    }
    // Handle rgb(R,G,B) or rgba(R,G,B,A) colors (strip current alpha if present)
    else if (color.startsWith('rgb')) {
      const parts = color.match(/\d+/g); // Extracts all numbers
      if (parts && parts.length >= 3) {
        r = parseInt(parts[0], 10);
        g = parseInt(parts[1], 10);
        b = parseInt(parts[2], 10);
      }
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
