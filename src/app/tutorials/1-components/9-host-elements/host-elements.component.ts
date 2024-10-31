import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: `host-elements`,
  templateUrl: `./host-elements.component.html`,
  styleUrl: `./host-elements.component.css`,

  // แทนที่เราจะประกาศ attribute เอาไว้บน tag เราสามารถนำมาประกาศเอาไว้ตรงนี้ที่เดียวได้
  // ช่วยให้โค้ดไม่รกและมาแก้ไขได้จบในที่เดียว
  // ข้อเสียคือจะแสดงผลกับทุก tag ในโค้ด จะทำให้เกิด style conflict ได้
  // ในกรณีที่เราทำ binding ซ้ำกัน เช่น ประกาศไว้ใน host แล้วแต่ก็ยังประกาศ attribute ใน tag อยู่ดี
  // จะมีเหตุการณ์ที่สามารถเกิดขึ้นได้ 3 กรณี
  // กรณีแรก ถ้าการ binding ทั้งคู่เป็น static (การ fix ค่าให้ตรง ๆ) ค่าที่ประกาศใน tag จะมีผล
  // ถ้าค่าใดค่าหนึ่งเป็น dynamic ค่า dynamic จะมีผล
  // ถ้าเกิดทั้งสองเป็น dynamic ค่า dynamic บน host: { ... } จะมีผล
  host: {
    style: 'color: red;',
    // หรือจะ bind event ก็ได้เหมือนกัน
    // '(click)': 'logSomething()',
    // ถ้าจะ bind attribute ก็ใช้ [ ] แทน
  },
})
export class HostElements {
  // หรือว่าจะมาประกาศใน Class ด้วย @HostBinding() ก็ได้เหมือนกัน
  @HostBinding('style')
  color: string = 'color: red';

  // คำสั่ง HostListener จะเป็นการนำ event ที่เรามีมา bind ตรงนี้แทนที่จะประกาศเอาไว้บน tag
  // แสดงผลทั้ง Component เหมือนกัน เหมาะกับการใช้กับ Component ที่ต้องรอรับ Event จริง ๆ
  @HostListener('click')
  logName() {
    console.log(this.color);
  }
}
