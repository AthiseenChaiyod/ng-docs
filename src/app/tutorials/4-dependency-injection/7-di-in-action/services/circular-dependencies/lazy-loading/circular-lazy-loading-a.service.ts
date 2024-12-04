import { forwardRef, Injectable, Injector } from '@angular/core';
import { CircularLazyLoadingB } from './circular-lazy-loading-b.service';

// ตัวอย่างการแก้ Circular Dependency ด้วย lazy-loading + Injector
// เริ่มแรกเราประกาศ ServiceB โดยยังไม่ต้อง initialize ค่าให้มันก่อน (ค่อยดึงค่าทีหลังจะได้ไม่ชนกัน)
// ทีนี้ตอนเราจะเรียกใช้ serviceB เราก็ค่อย retrieve instance ของมันมาด้วย Injector.get()
// แล้ว serviceB ของเราก็จะมีค่าแล้ว เราก็จะสามารถนำมันไปใช้งานได้
@Injectable({
  providedIn: 'root',
})
export class CircularLazyLoadingA {
  // service นี้เราจะไม่สามารถสร้างใน constructor ได้ไม่อย่างนั้น ServiceB จะขอ dependency ชนกันเป็นวงกลม
  // ดังนั้นเราต้องมาสร้างตัวแปรรอเอาไว้ข้างนอก
  private serviceB!: CircularLazyLoadingB;

  // เราจะ inject Injector เข้ามาเพื่อใช้คำสั่งที่จะ retrieve instance ได้
  constructor(private injector: Injector) {}

  // method ตัวนี้จะเรียกใช้ serviceB
  useServiceB() {
    // ในการใช้ครั้งแรกที่ค่ายังเป็น null อยู่ก็จะไปดึง instance ที่มีค่ามาใส่เอาไว้ในตัวเอง ตอนนี้เลยมีค่าแล้ว
    if (!this.serviceB) {
      this.serviceB = this.injector.get(CircularLazyLoadingB);
    }

    // เราก็จะเรียกใช้ serviceB ได้แล้วแบบไม่เกิด Circular Dependency
    this.serviceB.logSomething();
  }
}
