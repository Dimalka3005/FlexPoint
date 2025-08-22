import { Component } from '@angular/core';
import {CategoryComponent} from './innerComponents/category/category.component';

@Component({
  selector: 'app-products',
  imports: [
    CategoryComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
