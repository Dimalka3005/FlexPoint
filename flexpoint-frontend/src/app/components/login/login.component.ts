import { Component } from '@angular/core';
import {CardComponent} from "../card/card.component";
import {LoginFormComponent} from "./login-form/login-form.component";

@Component({
  selector: 'app-login',
  imports: [
    CardComponent,
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
