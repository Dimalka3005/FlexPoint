import { Component } from '@angular/core';
import {ButtonComponent} from './innerComponents/cardButton/button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
