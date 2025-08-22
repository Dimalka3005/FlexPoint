import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { NavItemComponent } from './nav-item/nav-item.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  imports: [
    NavItemComponent,
    RouterLink,
  ],
  standalone: true,
  styleUrls: [
    './nav-bar.component.scss',
    './nav-item/nav-item.component.scss'
  ]
})
export class NavBarComponent implements OnInit {

  public isDarkTheme: boolean = false;
  public businessName01: string = 'Flex'; // First part of the business name (e.g., Flex)
  public businessName02: string = 'Point'; // Second part of the business name (e.g., Point)

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkTheme = localStorage.getItem('theme') === 'dark';
      this.applyTheme(this.isDarkTheme);

      // Load business name parts from local storage
      const savedBusinessName01 = localStorage.getItem('businessName01');
      const savedBusinessName02 = localStorage.getItem('businessName02');

      if (savedBusinessName01) {
        this.businessName01 = savedBusinessName01;
      }
      if (savedBusinessName02) {
        this.businessName02 = savedBusinessName02;
      }

      // Update the DOM elements for business name based on loaded values
      this.updateNavBarBusinessName();

      // Load and apply primary and secondary colors from local storage
      const savedPrimaryColor = localStorage.getItem('primaryColor');
      const savedSecondaryColor = localStorage.getItem('secondaryColor');
      const savedPrimaryColor50 = localStorage.getItem('primaryColor50'); // NEW
      const savedSecondaryColor50 = localStorage.getItem('secondaryColor50'); // NEW

      if (savedPrimaryColor) {
        this.document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
      } else {
        this.document.documentElement.style.setProperty('--primary-color', '#1B3E54');
      }

      if (savedSecondaryColor) {
        this.document.documentElement.style.setProperty('--secondary-color', savedSecondaryColor);
      } else {
        this.document.documentElement.style.setProperty('--secondary-color', '#61B9AD');
      }

      // NEW: Apply 50% opacity colors
      if (savedPrimaryColor50) {
        this.document.documentElement.style.setProperty('--primary-color-50', savedPrimaryColor50);
      } else {
        // Fallback to default if not found (shouldn't happen if settings were saved)
        // This might need the colorToRgba helper or just stick to initial SCSS default
        // For simplicity, we'll assume settings will always provide this or default to SCSS initial
        this.document.documentElement.style.setProperty('--primary-color-50', 'rgba(27, 62, 84, 0.5)'); // Default from styles.scss
      }

      if (savedSecondaryColor50) {
        this.document.documentElement.style.setProperty('--secondary-color-50', savedSecondaryColor50);
      } else {
        this.document.documentElement.style.setProperty('--secondary-color-50', 'rgba(97, 185, 173, 0.5)'); // Default from styles.scss
      }

    } else {
      this.isDarkTheme = false; // Default for SSR
      // Business name parts remain 'Flex' and 'Point' for SSR
      // Colors will be default for SSR
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }

  private updateNavBarBusinessName(): void {
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
  }
}
