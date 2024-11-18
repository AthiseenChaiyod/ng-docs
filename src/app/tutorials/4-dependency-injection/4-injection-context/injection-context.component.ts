import {
  assertInInjectionContext,
  Component,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { CustomService } from './services/custom-service.service';

@Component({
  standalone: true,
  selector: `injection-context`,
  templateUrl: `./injection-context.component.html`,
  styleUrl: `./injection-context.component.css`,
})
export class InjectionContext {
  // injection context ก็คือ Scope ที่เราสามารถทำการ inject dependency ได้
  // เทียบกับเสาสัญญาณ ถ้าเกิดเรานำมือถือ (dependency) ไปใช้ในที่ ๆ ไม่มีสัญญาณมันก็ไม่ได้
  // ดังนั้นการทำ injection จะอยู่ภายในขอบเขตของ dependency injection เสมอ แม้เราจะไม่เห็นก็ตาม
  // ถ้าเกิดเราอยากรู้ว่าจุดไหนเป็น injection context ไหมให้เราลองใช้คำสั่ง inject() ดู
  // ถ้าใช้ได้แปลว่าเราอยู่ใน injection context แล้ว
  // ปกติแล้วเวลาเราประกาศ private name: Class ข้างใน constructor ที่จริงนั่นเป็นแค่การประกาศตัวแปรเท่านั้น
  // แต่ที่เราสามารถเรียกใช้ตัวแปรที่เราสร้างได้เสมือน Class เลยก็เพราะว่า Angular จัดการให้เราอัตโนมัติ
  // หรือถ้าเราอยาก inject เองแบบ manual เราสามารถทำได้โดยใช้ inject()
  // เช่น constructor(private someService: SomeService = inject(SomeService))
  constructor(
    private customService: CustomService = inject(CustomService),
    private environmentInjector: EnvironmentInjector
  ) {
    // assertInInjectionContext(context) ที่จะตรวจสอบว่าสิ่งที่เราส่งไปเป็น argument อยู่ใน context ไหม
    // แต่จะต้องเขียนแค่ภายใน constructor / factory function เท่านั้น
    // ไม่สามารถเอาไปประกาศไว้บน method ทั่วไปได้ ไม่งั้นจะแจ้ง error
    assertInInjectionContext(this.customService.logSomething);
  }

  doSomething() {
    // ถ้าเกิดเราอยากใช้คำสั่งที่จะทำงานใน injection context แต่เราไม่ได้อยู่ Scope นั้นเราก็สามารถทำได้
    // runInInjectionContext(injector, () => {}) ที่จะจำลองว่าเราอยู่ใน injection context ที่ใส่เข้าไป
    // แต่ว่าก่อนจะใช้งานได้ เราจะต้อง inject EnvironmentInjector เข้ามาก่อน
    // และให้เราส่ง EnvironmentInjector ไปเป็น argument ตัวแรกของ runInInjectionContext()
    // เช่น runInInjectionContext(this.environmentInjector, () => { inject(...) })
    // มีเหตุผลที่เราจะต้องส่ง argument 2 ตัวเข้าไปใน runInInjectionContext()
    // เหตุผลแรก argument ตัวแรกจะเป็น scope ที่เราอยากเข้าถึง
    // อย่างเราส่ง EnvironmentInjector เข้าไปเพื่อที่จะเปลี่ยนการทำงานของ scope เดิมเป็น Environment scope
    // ส่วน argument ตัวที่สองจะเป็น factory function ว่าเราจะทำอะไรใน scope นี้
    // ถ้าเราไม่เปลี่ยน Scope ก่อนเวลาที่ใช้ inject ก็จะเกิด error
    runInInjectionContext(this.environmentInjector, () => {
      // อยากให้ทำอะไรใน context นี้ก็เขียนใน body ได้เลย
    });
  }
}
