import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentB } from './component-b.component';

@Component({
  standalone: true,
  selector: `component-a`,
  template: `
    <h1>This is text: {{ text }}</h1>

    <!-- เราผูก input name เข้ากับ property text เพื่อให้ค่าตรงกัน -->
    <!-- เราก็จะได้ความสัมพันธ์แบบ ComponentA -> ComponentB แล้ว -->
    <!-- เพราะว่าค่าของ property จะขึ้นอยู่กับ input -->
    <component-b [name]="text" (nameChange)="updateText($event)"></component-b>

    <br />
    <!-- ที่จริงแล้วเราไม่จำเป็นต้องเขียน output เพื่อส่งค่ากลับไปให้ parent ก็ได้ -->
    <!-- แต่ว่าวิธีนี้มีข้อเสียระยะยาวหลายข้อ ข้อแรกคือเราจะต้องเขียนโค้ดเยอะขึ้นสำหรับการอัปเดตค่า -->
    <!-- เพราะว่าเราจะต้องมานั่ง extract ข้อมูลออกมาจาก tag และเราจะต้องมานั่งเขียน tag เพื่อเอาข้อมูลอีก -->
    <!-- ต่างจากการใช้ output ที่มี tag สำหรับการ extract ข้อมูลมาให้แล้วเรียบร้อย -->
    <!-- เราจะสามารถอัปเดตค่าผ่านการใช้ output ส่ง event มาให้ Component นี้อัปเดตค่าได้เลย -->
    <!-- ข้อที่สอง ทำหลายหน้าที่เกินไป แทนที่จะให้ output ทำหน้าที่อัปเดตให้ เรากลับมาเขียนอัปเดตเอง -->
    <!-- ข้อสุดท้าย โค้ดที่เราเขียนจะไม่ตรงตาม best practice ที่ใช้ output ในการส่งข้อมูลเพื่ออัปเดต -->
    <!-- ทุกข้อที่กล่าวมาทำให้เรา maintain โค้ดนี้ได้ยากขึ้น ขาดความยืดหยุ่นเอาไปใช้ที่อื่นยาก -->
    <input #locator type="text" (keyup)="directUpdate()" />
    <span>Update</span>
  `,

  imports: [ComponentB],
})
export class ComponentA {
  // property สำหรับผูกกับ input
  text: string = '';

  // method สำหรับอัปเดตค่าที่รับมาจาก output
  updateText(data: string) {
    this.text = data;
  }

  // ต้องมานั่งเขียน ViewChild เพื่อ extract ข้อมูลเองแทนที่จะทำตั้งแต่ที่อื่นมาแล้ว
  @ViewChild('locator') inputElement!: ElementRef<HTMLInputElement>;

  // method สำหรับอัปเดตค่าโดยตรงไม่ผ่าน output
  directUpdate() {
    this.text = this.inputElement.nativeElement.value;
  }
}
