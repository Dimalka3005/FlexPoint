import { Component } from '@angular/core';
import {NewProductsBoxComponent} from './innerComponents/new-products-box/new-products-box.component';
import {ProductListComponent} from './innerComponents/product-list/product-list.component';
import {FunboxComponent} from './innerComponents/funbox/funbox.component';

@Component({
  selector: 'app-sales',
  imports: [
    NewProductsBoxComponent,
    ProductListComponent,
    FunboxComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {

}
