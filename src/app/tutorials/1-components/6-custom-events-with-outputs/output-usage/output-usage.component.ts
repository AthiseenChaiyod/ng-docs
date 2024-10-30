import { Component } from '@angular/core';
import { CustomEventsWithOutputs } from '../custom-events-with-outputs.component';

@Component({
  standalone: true,
  selector: `output-usage`,

  // ในการใช้งาน @Output() ที่เราสร้างเอาไว้ ให้เราเรียกใช้เหมือนเป็น Event (เช่น click, keydown)
  // เราสามารถนำ @Output() มา bind บน selector tag ด้วย ( ) ได้
  // เช่น (somethingChange)="..." และถ้าอยากให้ทำอะไรก็สามารถระบุเอาไว้ข้างใน " " ได้
  // แนวคิดเหมือนกับ (click) นั่นแหละ เช่น (click)="logSomething()" ที่จะ log ข้อความออกมา
  // ถ้าเกิดเราอยากให้ log เมื่อ emit ก็เขียนเหมือนกันเลย (somethingChange)="logSomething()"
  // จากตัวอย่างนี้จะเห็นว่าเราจะต้องสั่ง Parent Component ให้ emit ตามต้องการได้
  // และ Child Component จะต้องมีคำสั่งที่จะสั่งให้ทำงานเมื่อเกิด Event ในตัวเองด้วย
  // สุดท้าย หากเราส่งค่ามากับ emit() เราสามารถรับค่าด้วย $event ใน Output Event ที่เราใช้อยู่
  // เช่น (nameChange)="logName($event)" โดย logName() ก็จะต้องเขียนให้รับ parameter ด้วย
  // โดยทั่วไปแล้วควรเขียนเพื่อดัก type undefined เอาไว้ด้วยเวลาที่เราจะส่งค่าด้วย emit
  // เพราะต่อให้เราระบุ type เอาไว้ใน Genereics แล้วก็สามารถส่ง emit เปล่ามาได้อยู่ดี
  template: `<custom-events-with-outputs (nameChange)="logMethod($event)" />`,

  imports: [CustomEventsWithOutputs],
})
export class OutputUsage {
  logMethod(data: string | undefined) {
    typeof data !== 'undefined' ? console.log(data) : console.log('bug');
  }
}
