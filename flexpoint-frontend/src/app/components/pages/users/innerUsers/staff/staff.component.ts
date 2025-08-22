import { Component } from '@angular/core';
import {TextFieldComponent} from '../../innerComponents/Form/text-field/text-field.component';
import {TextAreaComponent} from '../../innerComponents/Form/text-area/text-area.component';
import {PasswordFieldComponent} from '../../innerComponents/Form/password-field/password-field.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-staff',
  imports: [
    TextFieldComponent,
    TextAreaComponent,
    PasswordFieldComponent,
    RouterLink
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {

}
