import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-password-field',
  imports: [],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss'
})
export class PasswordFieldComponent {
  @Input() labelName: any;
}
