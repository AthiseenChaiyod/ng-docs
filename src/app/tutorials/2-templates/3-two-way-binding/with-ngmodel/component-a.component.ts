import { Component } from '@angular/core';
import { ComponentB } from './component-b.component';

@Component({
  standalone: true,
  selector: `component-a`,
  template: `
    <h1>This is text: {{ text }}</h1>
    <component-b [(text)]="text" />
  `,

  imports: [ComponentB],
})
export class ComponentA {
  text: string = '';
}
