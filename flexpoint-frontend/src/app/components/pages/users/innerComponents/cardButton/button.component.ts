import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [
    RouterLink
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() icon: any;
  @Input() cardName: any;
  @Input() routerLink: string | any[] = '';

}
