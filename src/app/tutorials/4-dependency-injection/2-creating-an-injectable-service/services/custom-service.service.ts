import { Injectable } from '@angular/core';
import { AnotherService } from './another-service.service';

@Injectable({
  providedIn: 'root',
})
// โดยทั่วไปแล้วเราจะใช้ชื่อของ file เป็น PascalCase ตามด้วย suffix `Service` ตามหลัง
// เช่น some-service.service.ts เราก็จะได้ SomeServiceService เป็นชื่อ Class
// เหมือนกันกับ Component ที่จะต้องมี suffix `Component` ตามหลังเสมอ
// แต่ใน tutorial นี้จะไม่เขียน เพราะว่าการตั้งชื่อไฟล์สำหรับ tutorial ลงท้ายมันซ้ำกับ Suffix
// เช่น SomeServiceService ข้างบนนั่นแหละ
// แต่เวลาเอาไปใช้จริง จะต้องมี Suffix เสมอ
export class CustomService {
  count: number = 2;
  // Service ก็คือพวก Business Logic ที่เราจะเขียนนั่นแหละ
  // เราจะไม่เอาไปเขียนไว้บน Component เพราะว่าโค้ดมันจะรก แล้วก็ทำงานหลายอย่างเกินไป
  // Component เราให้เอาไว้ render ก็พอแล้ว ถ้าจะใช้งานอะไรก็ค่อยเรียก Service เอา
  // เช่น เราจะ click button แล้วก็ให้ log text content ของ button นั้นออกมา
  // เราจะเขียนแค่ button นี้เมื่อถูก click จะทำงาน method อะไร
  // แล้วภายใน metho ของ Component เราจะเรียกใช้ service.methodName() แบบนี้แทน
  // แม้เราจะประกาศ property ได้ก็ตาม แต่ว่าจะไม่นิยมใช้ service มาเก็บค่า property สำหรับ Application
  // จะใช้แค่ property ของ service ในตัวของมันเองเท่านั้น
  logValuePlusCount(value: any) {
    console.log(value + this.count);
  }

  // ใด ๆ ก็ตาม เราสามารถ inject dependency เข้ามาข้างใน service ได้เหมือนกัน
  constructor(private anotherService: AnotherService) {}

  logOtherService() {
    this.anotherService.logSomething();
  }
}
