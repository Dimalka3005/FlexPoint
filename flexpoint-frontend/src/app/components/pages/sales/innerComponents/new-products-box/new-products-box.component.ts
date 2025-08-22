import { Component } from '@angular/core';
import {ValueCompComponent} from './value-comp/value-comp.component';

@Component({
  selector: 'app-new-products-box',
  imports: [
    ValueCompComponent
  ],
  templateUrl: './new-products-box.component.html',
  styleUrl: './new-products-box.component.scss'
})
export class NewProductsBoxComponent {

}
