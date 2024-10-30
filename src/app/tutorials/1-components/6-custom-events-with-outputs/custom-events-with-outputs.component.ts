import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: `custom-events-with-outputs`,
  templateUrl: `./custom-events-with-outputs.component.html`,
  styleUrl: `./custom-events-with-outputs.component.css`,
})
export class CustomEventsWithOutputs {
  // สร้าง Output คล้าย ๆ กับ Input เลย
  // เปลี่ยนจากการใส่ค่าปกติเป็นการสร้าง Instance EventEmitter<T>() ขึ้นมาใหม่
  // ให้เรามอง Output เป็น Event อย่าง click, keydown, etc. จะเข้าใจได้ง่ายกว่า
  // แต่ว่าเป็น Event ที่จะใช้ได้บน Component ตัวนี้เท่านั้น
  // เช่น ComponentA มี selector ชื่อว่า component-a และมี Output ชื่อว่า somethingChange
  // จะเรียกใช้ดังนี้ <component-a (somethingChange)="..." />
  // ส่วนถ้าอยากให้ทำอะไรเมื่อเกิดการ emit ก็จะขึ้นอยู่กับ Child Component ที่นำ ComponentA ไปใช้
  // เราสามารถส่งค่าไปยัง Child Component ได้ด้วย โดยการใส่ type ให้ Output ตรง Generics
  // สมมติเราอยากส่งค่า string ไปให้ Child Component ก็ต้องใส่ type string ให้ด้วย
  // เช่น @Output() statusChange = new EventEmitter<string>();
  // เราสามารถเขียน alias ให้กับ @Output() ได้เหมือนกัน โดยการใส่ string เอาไว้ใน () ของ @Output
  // เช่น @Output('anotherName') ...;
  @Output() nameChange = new EventEmitter<string>();

  // method สำหรับการ emit เราสามารถเขียนเอาไว้ได้ใน Class ได้เลย
  // โดยเราจะนำ Output ที่เราเพิ่งสร้างมา .emit() เพื่อส่งสัญญาณให้กับ Child Component ทำงานต่อ
  // หากเรามีการส่งค่า ให้เราส่งผ่าน .emit(value) ได้เลย โดยจะต้อง type ตรงกับ Generics
  // ถ้าเกิดเราระบุ type เอาไว้ตรง Generics แต่ว่าไม่ได้ส่งอะไรผ่าน emit ไปก็แปลว่าเราส่ง undefined ไป
  // ดังนั้นให้เราเขียนดัก undefined เอาไว้ด้วยใน Parent Component
  clickEmit() {
    this.nameChange.emit();
  }
}
