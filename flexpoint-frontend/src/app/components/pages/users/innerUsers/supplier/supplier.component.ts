import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TextFieldComponent} from '../../innerComponents/Form/text-field/text-field.component';

@Component({
  selector: 'app-supplier',
  imports: [
    RouterLink,
    TextFieldComponent
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent {

}
