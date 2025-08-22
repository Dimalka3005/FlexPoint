import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [
  ],
  standalone:true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cardImage: any = "";
  @Input() form: any = "";

}
