import { Component } from '@angular/core';
import {CardComponent} from '../card/card.component';
import {ForgotPasswordFormComponent} from './forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CardComponent,
    ForgotPasswordFormComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

}
