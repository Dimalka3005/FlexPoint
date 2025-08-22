import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent {
  now: Date = new Date();
}
