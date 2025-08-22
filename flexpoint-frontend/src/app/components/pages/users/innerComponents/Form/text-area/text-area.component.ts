import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-text-area',
  imports: [],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {
  @Input() labelName: any;
  @Input() ta_id: any;

}
