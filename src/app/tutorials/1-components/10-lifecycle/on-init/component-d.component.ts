import { Component, OnInit } from '@angular/core';
import { ComponentE } from './component-e.component';

// imports Component นี้ไปวางที่ Root เพื่อดูลำดับการทำงานได้เลย
@Component({
  standalone: true,
  selector: `component-d`,
  template: `
    <h1>This is ComponentD</h1>
    <component-e />
  `,

  imports: [ComponentE],
})
export class ComponentD implements OnInit {
  ngOnInit(): void {
    console.log(`ComponentD's ngOnInit()!`);
  }
}
