import { Component } from '@angular/core';
import {SummaryCardComponent} from './inner-components/summary-card/summary-card.component';
import {ClockComponent} from './inner-components/clock/clock.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCardComponent,
    ClockComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
