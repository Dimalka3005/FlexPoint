import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() icon: any;
  @Input() cardName: any;
  @Input() cardValue: any;

}
