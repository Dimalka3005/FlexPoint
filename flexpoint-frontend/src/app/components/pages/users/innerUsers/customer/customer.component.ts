import { Component } from '@angular/core';
import {TextFieldComponent} from '../../innerComponents/Form/text-field/text-field.component';
import {TextAreaComponent} from '../../innerComponents/Form/text-area/text-area.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [
    TextFieldComponent,
    TextAreaComponent,
    RouterLink
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

}
