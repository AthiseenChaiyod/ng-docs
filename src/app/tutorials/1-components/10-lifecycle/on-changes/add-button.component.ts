import { Component } from '@angular/core';
import { OnChangesTest } from './on-changes-test.component';

// import ไปไว้ที่ root เพื่อลองทดสอบได้เลย
@Component({
  standalone: true,
  selector: `add-button`,
  template: `
    <on-changes-test [value]="value" />
    <button (click)="addOne()">Click to add</button>
  `,

  imports: [OnChangesTest],
})
export class AddButton {
  value: number = 0;

  addOne() {
    this.value += 1;
  }
}
