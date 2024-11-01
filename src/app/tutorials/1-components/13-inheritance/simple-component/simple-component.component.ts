import { Component, ElementRef } from '@angular/core';

@Component({
  standalone: true,
  selector: `simple-component`,
  template: `<h1>This is SimpleComponent!</h1>`,
})
export class SimpleComponent {
  constructor() {}

  count: number = 0;

  addValue() {
    this.count += 1;
  }
}
