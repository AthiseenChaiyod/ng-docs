import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: `dynamic-route`,
  template: `<h1>Route parameter's value: {{ value }}</h1>`,
})
export class DynamicRoute {
  // description
  @Input() value!: string;
}
