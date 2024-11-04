import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: `component-b`,
  template: `
    <input
      type="text"
      [(ngModel)]="text"
      (ngModelChange)="textChange.emit($event)"
    />
  `,

  imports: [FormsModule],
})
export class ComponentB {
  @Input({ required: true }) text!: string;
  @Output() textChange = new EventEmitter<string>();
}
