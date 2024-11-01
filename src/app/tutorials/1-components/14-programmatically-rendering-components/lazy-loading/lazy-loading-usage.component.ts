import { Component, ViewContainerRef } from '@angular/core';

@Component({
  standalone: true,
  selector: `lazy-loading-usage`,
  template: `<button (click)="loadComponent()">Lazy Load</button>`,
})
export class LazyLoadingUsage {
  constructor(private viewContainerRef: ViewContainerRef) {}
  // วิธีสุดท้ายก็คือการทำ lazy-loading โดยใช้ ViewContainerRef ช่วย
  // แบบเดิมเราเขียน load() { this.viewContainerRef.createComponent(ComponentA) } เพื่อสร้าง
  // แต่แบบ lazy-loading เราจะยังไม่ imports ComponentA มาทันที
  // เราจะรอจนกว่าจะกดโหลดปุ่มแล้วค่อย import เข้ามา
  // จะต้องใช้ await import(path: string) ใน import แทนการ import แบบปกติ
  // แต่โค้ด await import() ก็แค่ import เฉย ๆ แล้ว Component ของเราอยู่ไหนล่ะ?
  // คำตอบคือ เราจะต้องทำการ destructuring Component นั้นออกมาจาก import เอาเอง
  // เราจะได้โค้ด lazy import ต่อไปนี้ const { SomeComponent } = await import('path')
  // และเนื่องจากเราใช้ await เราเลยต้องเขียนโค้ด import เอาไว้ใน async ทั้งหมด
  async loadComponent() {
    const { SimpleComponent } = await import(
      './simple-component/simple-component.component'
    );
    this.viewContainerRef.createComponent(SimpleComponent);
  }
}
