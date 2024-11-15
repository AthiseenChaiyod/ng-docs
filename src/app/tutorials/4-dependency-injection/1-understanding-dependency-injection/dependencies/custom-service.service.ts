import { Injectable } from '@angular/core';

@Injectable({
  // providedIn ที่จริงแล้วก็คือ scope ใน NestJS เลย
  // อย่างใน NestJS จะมี default (singleton), request, transient ที่จะใช้งานต่างกัน
  // Angular ก็มี scope แบบนี้เหมือนกัน
  // ถ้าเราประกาศ 'root' เอาไว้ แปลว่า service นี้จะเป็นแบบ Singleton ที่จะใช้ instance เดียวทั้ง Application
  // ถ้าเราประกาศ 'any' เอาไว้ แปลว่าแต่ละ Module ที่เรียกใช้ Service นี้จะได้ instance เป็นของตัวเอง
  // ส่วน 'platform' จะเป็นสร้าง 1 instance ต่อ 1 platform เหมาะกับการนำไปใช้กับพวก micro-frontend
  // ปัญหาของเราคือตอนนี้เรายังไม่ได้เขียนพวก multi-platform ดังนั้นยังไม่ต้องสนใจเรื่อง 'platform'
  // และอีกปัญหาก็คือ 'any' ที่จะให้ instance ใหม่สำหรับแต่ละ Module
  // ปัจจุบันนี้เป็นการเขียนโค้ดแบบ Standalone แล้ว ขนาดใน Docs ยังแทบไม่พูดถึง NgModule เลย
  // ดังนั้น 'any' ให้เรารู้ไว้แค่ว่ามันจะได้ instance สำหรับ Module แต่ละตัวแยกกันก็พอ
  // เหลือแค่ตัวสุดท้ายก็คือ 'root' ที่เราจะใช้บ่อย ๆ
  // แต่ว่าบางครั้งเราก็อยากจะใช้ instance แยกกันแต่ละ Component / Directive
  // สมมติว่าเรามี service ที่จะ log ค่าของ property count: number = 0 ออกมาดู
  // โดย Component ทั้งสองตัวเป็น button โดยมี event listener ที่จะ log count ออกมาเวลาถูก click
  // เวลาที่ inject service เข้ามาใน Component 2 ตัว และเราลอง click button อย่างละ 1 ครั้ง
  // จะเห็นว่าค่าของ count ที่เรา log ออกมาต่อเนื่องกัน (0, 1, 2, ...) ไม่ว่าเราจะกด button ใดก็ตาม
  // ทั้ง 2 button แม้ว่าจะ inject service เข้าไปแต่ก็ยังใช้ instance ร่วมกันอยู่
  // ถ้าเกิดเราอยากให้ component นั้น ๆ สร้าง instance ของ service ที่รับมาใหม่ เราจะต้องใช้ providers
  // ให้เราประกาศ providers: [] เอาไว้ที่ metadata ของ Component
  // เช่น @Component({ ..., providers: [SomeService] })
  // สรุปแล้วตอนนี้เรามีวิธีการประกาศ service 2 วิธี คือจะใช้ singleton instance หรือใช้ instance แยก
  // เรื่องที่น่าสนใจก็คือ โดยทั่วไปแล้วเราจะมีการ import component ไปใช้ที่อื่นเป็นประจำ
  // สมมติว่าเรามี ComponentA, ComponentB, ComponentC โดยทุก Component จะ import ต่อกันเป็นทอด ๆ
  // จะได้ ComponentA -> ComponentB -> ComponentC
  // ถ้าเกิดว่าเราไม่ได้ประกาศ providers ทุกตัวจะใช้ singleton instance ร่วมกัน
  // ถ้าเราประกาศ providers ให้ทุกตัว แปลว่าทุกตัวจะใช้ instance แยกกันเป็นของตัวเอง
  // แต่ถ้าเกิดเราประกาศ providers แค่ใน ComponentB ล่ะ?
  // เราก็จะได้ ComponentC ที่ใช้ singleton instance เพราะว่าเราไม่ได้ประกาศ providers เอาไว้
  // และ ComponentB จะใช้ instance ของตัวเอง เพราะว่าเราประกาศ providers เอาไว้ใน @Component
  // แล้ว ComponentA ล่ะ จะใช้ singleton instance หรือเปล่า เพราะเราไม่ได้ประกาศ providers เอาไว้
  // คำตอบคือ ComponentA จะใช้ instance ของ ComponentB ต่างหาก
  // เวลาที่เรามองหา instance ของ dependency เราจะมองหาจากตัว parent ก่อนเสมอ ถ้าไม่มีค่อยไป root
  // ซึ่ง parent ของ A ก็คือ B ดังนั้น A จึงไปขอ instance ของ B แทนที่จะขอ root เหมือน C นั่นเอง
  providedIn: 'root',
})
export class CustomService {
  count: number = 0;

  logSomething() {
    console.log(this.count++);
  }
}
