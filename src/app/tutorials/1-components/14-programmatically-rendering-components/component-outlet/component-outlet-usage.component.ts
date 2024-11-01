import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentA } from './component-a.component';
import { ComponentB } from './component-b.component';

@Component({
  standalone: true,
  selector: `component-outlet-usage`,
  template: `
    <!-- วิธีการผูกก็ให้เราไปผูก ngComponentOutlet="" เอาไว้ใน <ng-container /> -->
    <ng-container *ngComponentOutlet="currentComponent"></ng-container>
    <button (click)="switchComponent()">Switch</button>
  `,

  // อย่าลืมด้วยว่าเวลาที่เราจะใช้ external directive ให้ import มาด้วย
  imports: [NgComponentOutlet],
})
export class ComponentOutletUsage {
  // ngComponentOutlet ก็คือ directive ที่จะทำให้เราสามารถทำ Dynamic Rendering ได้
  // ตอนนี้ยังไม่ต้องสนใจคำว่า directive ให้รู้ไว้แค่ว่า ngComponentOutlet ทำอะไรได้ก็พอ
  // โดยส่วนมากเราจะเห็น ngComponentOutlet คู่กับ ng-container เสมอ
  // มีบ้างที่จะใช้ ng-template แต่ก็น้อย เราจะอธิบายเรื่อง ng-template อีกครั้งในบทถัด ๆ ไป
  // ที่ใช้ ng-container ก็เพราะว่าเราจะต้องมีพื้นที่สำหรับให้ Component render ออกมา
  // ที่จริงเราสามารถใช้ div ก็ได้ แต่ว่า div จะสร้างตัวเองใน DOM เพิ่ม ซึ่งไม่จำเป็น
  // ng-container ทำหน้าที่เหมือน div นั่นแหละ แต่ไม่ได้สร้างตัวเองขึ้นมาใน DOM ทำให้ดีกว่า
  // ส่วนขั้นตอนก็คล้าย ๆ กับตอนที่เราใช้ NgIf นั่นแหละ เราแค่ส่งค่าตัว Component ที่จะ render ไปให้ก็พอ
  currentComponent = ComponentA;

  switchComponent() {
    this.currentComponent === ComponentA
      ? (this.currentComponent = ComponentB)
      : (this.currentComponent = ComponentA);
  }
}
