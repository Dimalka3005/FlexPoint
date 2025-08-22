import { Component, Input, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  standalone:true,
  styleUrls: ['./nav-item.component.scss'] // Points to the SCSS file
})
export class NavItemComponent implements OnInit {
  @Input() iconClass: string = '';
  @Input() text: string = '';
  @Input() routerLink: string | any[] = '';

  constructor() { } // No need to inject Router here, as [routerLink] handles navigation

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  // The loadPage method is no longer necessary because [routerLink] handles navigation declaratively.
  // If you had complex logic that couldn't be done directly with routerLink,
  // you might reintroduce a click handler, but for simple navigation, [routerLink] is preferred.
}
