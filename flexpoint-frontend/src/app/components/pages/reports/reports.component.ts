import { Component } from '@angular/core';
import {SalesChartComponent} from './innerComponents/sales-chart/sales-chart.component';
import {CatprChartComponent} from './innerComponents/catpr-chart/catpr-chart.component';

@Component({
  selector: 'app-reports',
  imports: [
    SalesChartComponent,
    CatprChartComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
