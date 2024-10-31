import { Component, OnInit } from '@angular/core';
import { ComponentF } from './component-f.component';

@Component({
  standalone: true,
  selector: `component-e`,
  template: `
    <h1>This is ComponentE</h1>
    <component-f />
  `,

  imports: [ComponentF],
})
export class ComponentE implements OnInit {
  ngOnInit(): void {
    console.log(`ComponentE's ngOnInit()!`);
  }
}
