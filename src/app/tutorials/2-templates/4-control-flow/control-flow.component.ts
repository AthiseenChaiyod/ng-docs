import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: `control-flow`,
  templateUrl: `./control-flow.component.html`,
  styleUrl: `./control-flow.component.css`,
})
export class ControlFlow {
  // เอาไว้ใช้ทดสอบ @if
  x: number = 20;
  y: number = 20;

  // เอาไว้ใช้ทดสอบ @for
  items: string[] = ['apple', 'banana', 'orange'];
  emptyList = [];

  // เอาไว้ใช้ทดสอบ @switch
  role: string = 'admin';

  // เอาไว้ใช้ทดสอบการทำงานของ track
  trackByFn(index: number, item: any) {
    console.log(index);
    return `${index}-${item}`;
  }
}
