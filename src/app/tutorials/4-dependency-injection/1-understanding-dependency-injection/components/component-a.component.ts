import { Component } from '@angular/core';
import { CustomService } from '../dependencies/custom-service.service';

// Component นี้จะเป็น child component ตัวสุดท้ายของความสัมพันธ์
// ComponentA จะต้องใช้ instance เดียวกับ ComponentB ที่เป็น parent
@Component({
  standalone: true,
  selector: 'component-a',
  template: `<button (click)="clickLog()">ComponentA</button>`,
})
export class ComponentA {
  constructor(private customService: CustomService) {}

  clickLog() {
    this.customService.logSomething();
  }
}
