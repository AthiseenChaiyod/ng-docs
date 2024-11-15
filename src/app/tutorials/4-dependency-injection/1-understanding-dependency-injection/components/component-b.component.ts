import { Component } from '@angular/core';
import { CustomService } from '../dependencies/custom-service.service';
import { ComponentA } from './component-a.component';

// ใน Component นี้เราจะ import ComponentA มาใช้ เพื่อทดสอบการทำงานของ Hierachical Injection
// ComponentA จะต้องใช้ instance เดียวกับ ComponentB เนื่องจาก A จะต้องมาขอ instance จาก parent
@Component({
  standalone: true,
  selector: 'component-b',
  template: `
    <component-a />
    <button (click)="clickLog()">ComponentB</button>
  `,

  imports: [ComponentA],
  providers: [CustomService],
})
export class ComponentB {
  constructor(private customService: CustomService) {}

  clickLog() {
    this.customService.logSomething();
  }
}
