import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-text-field',
  imports: [],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {
  @Input() labelName: any;
  @Input() inputType: any;
  @Input() inputId: any;
  @Input() placeholder: any;
  @Input() helpMsg: any;

}
