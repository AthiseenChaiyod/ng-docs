import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: `two-way-binding`,
  templateUrl: `./two-way-binding.component.html`,
  styleUrl: `./two-way-binding.component.css`,

  imports: [FormsModule],
})
export class TwoWayBinding {
  // Two-way Binding จะทำให้เราสามารถอัปเดตค่าของข้อมูลและการแสดงผลได้เสมือนมัน real-time
  // จะแบ่งออกเป็นสองประเภทการใช้งาน หนึ่งคือใน Component ตัวเองอย่างเดียว และสองคือนอก Component ด้วย
  // ถ้าใน Component ตัวเองอย่างเดียวใช้แค่ [(ngModel)] ตัวเดียวก็เพียงพอแล้ว
  // เช่น เราอยากอัปเดตค่าของ input เราให้ตรงกับค่าใน tag input
  // เราก็แค่ import FormsModule มาก่อน แล้วจึงไป [(ngModel)]="text" บน <input /> ก็จะผูกข้อมูลแล้ว
  // เมื่อเราพิมพ์บน <input /> ค่าก็จะอัปเดตอัตโนมัติ
  // เราควรใช้ input ในผูกค่ากับ ngModel แทนที่จะใช้ property ผูกกับ ngModel (ถึงแม้จะทำได้ก็ตาม)
  // เพราะว่า ngModel ถูกสร้างมาให้ทำงานร่วมกับ input / output ไม่ใช่ property โดยตรง
  @Input() text: string = '';

  // ปัญหาคือแล้วถ้าเราจะผูกค่าระหว่าง Component 2 ตัวล่ะ
  // สมมติว่าเราแยก Component 2 ตัวออกจากกัน ตัวแรกเอาไว้แสดง text ตัวสองเอาไว้อัปเดตค่า
  // ถ้าเราใช้วิธีนี้แบบไม่ใช้ ngModel เราจะต้องสร้าง input / output อย่างละตัว
  // input ตัวแรกเอาไว้ผูกค่า property ของ component เข้ากับ input ของ component อีกตัว
  // เราจะได้ความสัมพันธ์แบบ ComponentA -> ComponentB มา
  // เพราะค่าของ ComponentA จะขึ้นอยู่กับ Input ของ ComponentB
  // ประเด็นก็คือไอ้ค่า input นี่แหละ ที่เราอยากให้มันอัปเดตตลอดเวลา
  // แต่ว่าเราประกาศให้ input = property ไปแล้ว แปลว่าเป็นการประกาศแบบ static ครั้งเดียวตอนสร้าง tag
  // ถ้าเราอยากจะอัปเดตค่าของ property หรือตัวแปรใด ๆ เราก็จะต้องใช้ output ช่วย
  // ตอนนี้เรามีสองทางเลือก ทางเลือกแรกเราจะนำ input ไปแปะไว้กับ ComponentA ที่มี Property
  // แปลว่าเราจะต้องนำ ComponentA ไปไว้ใน ComponentB ด้วยเพื่อให้สามารถรับ emit ได้
  // แต่ว่าอย่าลืม เราใช้ ComponentB ใน ComponentA อยู่แล้ว (ใช้ input binding)
  // ดังนั้นการกระทำนี้จะทำให้เราเจอกับ Circular Dependency ซึ่งสามารถแก้ไขได้ แต่ก็วุ่นวาย
  // ทำให้เราต้องมาดูทางเลือกที่สอง คือการสร้าง output เอาไว้ที่เดียวกับ input ก็คือ ComponentB
  // แล้วเรา import ComponentB มาใช้ใน ComponentA อยู่แล้ว ทำให้เราไม่ต้องทำอะไรเพิ่มเลย
  // ทำให้เราสามารถไปผูก event กับ ComponentB ที่เราใช้ใน ComponentA ได้เลย
  // เมื่อเราตัดสินใจได้แล้ว เราก็จะสร้าง output บน ComponentB เพื่อให้เราสามารถ binding บน ComponentA ได้
  // โดยเราจะสร้างคำสั่ง emit ให้กับ output เอาไว้ใน ComponentB ด้วย
  // โดยเมื่อเกิด emit ตัว ComponentA ที่เรารับ emit ก็จะทำการอัปเดตค่าของ property ให้ตรงกับค่าที่รับมา
  // ดูได้จาก dir: without-ngmodel

  // ในการทำ Two-way binding นั้นเราสามารถใช้ built-in ที่มีอยู่แล้วอย่าง ngModel ในการช่วยทำได้
  // ตอนเราไม่ใช้ ngModel เราเขียนจาก ComponentA -> ComponentB ก็ดูจะไม่มีปัญหาอะไร
  // ก็แค่สร้าง input มาตัวนึงแล้วส่งไปให้ ComponentA bind ก็เสร็จ
  // แต่ปัญหาอยู่ที่ตอนอัปเดตค่าที่ต้องเขียนโค้ดวุ่นวายหลายบรรทัด
  // ถ้าเกิดเราใช้ ngModel ช่วยในการทำ output ด้วยจะทำให้โค้ดที่เราเขียนสั้นลงไปอีกมาก
  // มีสิ่งที่เรียกว่า (ngModelChange) ให้เราใช้งาน
  // เราสามารถที่จะ assign ด้านหลัง ngModelChange ได้โดยตรงเลยว่าให้ output ของเรา emit
  // เช่น (ngModelChange)="someOutput.emit($event)"
  // โดย ngModelChange เป็น event ที่จะทำงานทันทีที่ ngModel เปลี่ยนค่า
  // ดูตัวอย่างการทำงานได้ที่ dir: with-ngmodel ได้เลย
}
