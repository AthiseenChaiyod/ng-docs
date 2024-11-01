import { Component, ElementRef, OnInit } from '@angular/core';
import { SimpleComponent } from './simple-component/simple-component.component';

@Component({
  standalone: true,
  selector: `inheritance`,
  templateUrl: `./inheritance.component.html`,
  styleUrl: `./inheritance.component.css`,
})
export class Inheritance extends SimpleComponent implements OnInit {
  // หาก Parent มี constructor Child ก็จะต้องมีด้วยเสมอ และต้องเรียกใช้ super() ในนั้นด้วย
  // หาก Parent มี elementRef: ElementRef Child ก็จะต้องส่ง Instance ตัวเดียวกันนั้นไปให้ Parent ด้วย
  // สมมติว่า Parent มี constructor(private elementRef: ElementRef) {}
  // Child ก็จะต้องมี constructor(elementRef: ElementRef) { super(elementRef) } เหมือนกัน
  // สังเกตว่าจะไม่มี private ตรง elementRef ของ Child ไม่งั้นจะส่งไปไม่ได้
  // ถ้า Parent มี constructor เปล่า Child ก็ต้องมีด้วย โดยต้องใช้สั่ง super() เหมือนเดิม แต่ไม่ได้ส่งอะไรไป
  // เช่น constructor() { super() }
  constructor() {
    super();
  }

  // ในการ extends Component อื่นมาใช้งาน เราสามารถใช้มันได้กับเหมือนเป็น Class ตัวมันเองเลย
  // เราจะไม่เห็น property / method ที่เราสร้างเอาไว้ใน Parent แต่ว่าเราสามารถเรียกใช้เหมือนมันล่องหนอยู่
  // เช่น เรามี value: number = 100; บน Parent
  // เราสามารถ log มันออกมาใน OnInit ได้เลย เช่น ngOnInit(): void { console.log(this.value) }
  // หรือถ้าเราไม่พอใจกับ property ของ Parent เราก็สามารถแก้ไขค่าของมันได้ด้วย
  // แต่ว่าเราจะต้องมี keyword override นำหน้าเสมอ ไม่สามารถสร้างค่าทับแบบปกติได้
  // เช่น ปกติแล้วถ้าเรามี value: number = 100; อยู่ เราอาจจะเขียน value: number = 10; ได้เลย
  // แต่ถ้ามันเป็นค่าที่ inherit มาเราจะต้องใส่ override กลายเป็น override value: number = 10;
  // สามารถ override method ได้ด้วยวิธีเดียวกัน รวมไปถึง lifecycle เราก็ override ได้
  // สมมติว่าเรา override method ไปแล้ว จากเดิม log 'Athiseen' เป็น log 'Chaiyod'
  // ถ้าเราอยากใช้ method ของ Parent อีกครั้งเราก็สามารถทำได้โดยการใช้ super.method()
  // สมมติว่า Parent มี logName() { console.log('Athiseen') }
  // Child มี override logName() { console.log('Chaiyod') }
  // เราอยากให้ log 'Athiseen' แทนใน Child เราก็จะใช้ super.logName() ที่เป็นของ Parent แทน
  // ใช้ super. กับ property ได้เหมือนกัน เช่น super.name เราก็จะได้ค่า name ของ Parent มา
  // เรื่องพวกนี้เป็นส่วนหนึ่งของหัวข้อ OOP ควรอ่านให้หมดทุกหัวข้อ มีประโยชน์มาก ๆ
  override count: number = 10;

  override addValue(): void {
    this.count += 2;
  }

  ngOnInit(): void {
    super.addValue();
    this.addValue();
    console.log(this.count);
  }
}
