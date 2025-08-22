import { Component } from '@angular/core';

@Component({
  selector: 'app-value-comp',
  imports: [],
  templateUrl: './value-comp.component.html',
  styleUrl: './value-comp.component.scss'
})
export class ValueCompComponent {
  value: number = 1;

  increase(): void {
    this.value++;
  }

  decrease(): void {
    if (this.value > 0) {
      this.value--;
    }
  }
}
