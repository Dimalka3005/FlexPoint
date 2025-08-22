import { Component } from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-pages',
  imports: [
    NavBarComponent,
    RouterOutlet,
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
