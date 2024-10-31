import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: `on-changes-test`,
  template: `<h1>{{ value }}</h1>`,
})
export class OnChangesTest implements OnChanges {
  @Input({ required: true }) value!: number;

  ngOnChanges(changes: SimpleChanges): void {
    for (const data in changes) {
      const value = changes[data];

      console.log(`Current value: ${value.currentValue}`);
      console.log(`Previous value: ${value.previousValue}`);
      console.log(`First change: ${value.firstChange}`);
    }
  }
}
