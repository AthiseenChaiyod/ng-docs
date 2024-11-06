import { Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  standalone: true,
  selector: `component-a`,
  template: `<button (click)="showFragment()">Show</button>`,
})
export class ComponentA {
  constructor(private viewContainerRef: ViewContainerRef) {}

  // สร้าง input ที่มี type TemplateRef
  // ทำให้เราสามารถรับค่า locator จาก ng-template ได้
  @Input() templateFragment!: TemplateRef<unknown> | undefined;

  // และเราก็มีคำสั่ง render input ที่เรารับค่ามา
  showFragment() {
    if (this.templateFragment) {
      this.viewContainerRef.createEmbeddedView(this.templateFragment);
    }
  }
}
