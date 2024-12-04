import { Component, ElementRef, Inject, InjectionToken } from '@angular/core';
import { CustomService } from './services/custom-service.service';
import { CircularLazyLoadingA } from './services/circular-dependencies/lazy-loading/circular-lazy-loading-a.service';

const SOME_DEPENDENCY = new InjectionToken<CustomService>('SomeDependency', {
  providedIn: 'root',
  factory: () => CustomService,
});

// ตัวอย่างการใช้งาน Dependency Injection หลัก ๆ
@Component({
  standalone: true,
  selector: `di-in-action`,
  templateUrl: `./di-in-action.component.html`,
  styleUrl: `./di-in-action.component.css`,

  // เมื่อพูดถึงเรื่อง Dependency Injection ก็เป็นไปไม่ได้เลยที่จะไม่พูดถึงเรื่อง Circular Dependency
  // Circular Dependency ก็คือการที่มี dependency 2 ตัวต่างใช้ instance ของกันและกันในการสร้างตัวมันเอง
  // ยกตัวอย่างให้เห็นภาพง่าย ๆ ก็คือความสัมพันธ์แบบ ServiceA <-> ServiceB
  // ServiceA ต้องการ ServiceB ในการสร้างตัวมันเอง และ ServiceB ก็ต้องการ ServiceA ในการสร้างตัวมันเองเหมือนกัน
  // หากเราเรียกใช้ ServiceA เราก็จะต้องไปสร้าง ServiceB ก่อน แต่ว่า ServiceB จะสร้างไม่ได้ถ้ายังไม่ได้สร้าง ServiceA
  // ทำให้เกิด infinite loop และเรียก loop ในการขอ dependency นี้ว่า Circular Dependency
  // วิธีแก้ไขก็คือให้เราไป refactor โค้ดของตัวเองไม่ให้เกิด Circular Dependency (เป็นวิธีที่ดีที่สุดแล้ว)
  // ส่วน forwardRef() แม้ว่าใน Docs จะพูดเอาไว้ว่าแก้ไขปัญหา Circular Dependency ได้ แต่จริง ๆ ก็ไม่
  // forwardRef() มีหน้าที่ retrieve type ของสิ่งที่เรายังไม่สร้างกลับมาให้ก่อนเฉย ๆ
  // ถ้าอยากจะใช้ forwardRef() แล้วแก้ Circular Dependency ได้จริง ๆ ก็ต้องใช้วิธีอื่นร่วมด้วย
  // ซึ่งเราจะไม่พูดถึง ให้ไป refactor โค้ดเอา หรือถ้า refactor โค้ดไม่ได้จริง ๆ ก็ต้องทำ lazy-loading เอา
  // ดูตัวอย่างการทำ lazy-loading ด้วย Injector ได้ที่ dir: ./service/circular-dependency
  providers: [CustomService],
})
export class DiInAction {
  constructor(
    // @Inject() มีเอาไว้สำหรับ non-class dependency กับพวก Browser API ซึ่งเราจะเจอบ่อยพอสมควร
    // non-class dependency ก็คือ Token ที่เราสร้างด้วย InjectionToken<T>(string, object)
    // โดย Generics Type ก็คือ type safety ของ token
    // string ก็คือข้อมูลของ Token ตัวนี้ จะเจอตอนเราเจอ dependency error ซึ่งจะ log string นี้ออกมา
    // และสุดท้าย object จะเป็น initial config ที่เราสามารถใส่ให้กับ Token ตัวนี้ของเราได้
    // โดย config object ของเราจะสามารถใส่ key ได้อีก 2 ตัว ก็คือ providedIn, factory
    // providedIn ก็เหมือนตอนเราประกาศเอาไว้กับ @Injectable() ที่จะนำ dependency นี้ไปเก็บเอาไว้ใน Injector ไหน
    // factory จะรับค่า callback function ที่จะเป็นค่า initial ของ dependency ตัวนี้
    // ถ้าเราไม่ได้ใส่ config object มาเราก็จะต้องมาตั้งเอาเองที่ dependency ของเราอีกที
    // เราจะสร้าง Token แบบไม่มี Type Safety กับ Config Object ก็ได้
    // เช่น export const SOME_SERVICE = new InjectionToken('SomeService')
    // หรือจะสร้างแบบ full option เลยก็ได้
    // เช่น ...InjectionToken('SomeService', { providedIn: 'root', factory: () => new SomeService() })
    @Inject(SOME_DEPENDENCY) private customService: CustomService,

    // แม้ว่าเรารู้กันอยู่แล้วว่าไม่ควรเข้าไปแก้ไข HTML Element โดยตรง แต่เราก็สามารถทำได้โดยใช้ ElementRef<T>
    private elementRef: ElementRef,

    // ลอง inject service ที่เราทำ lazy-loading มาใช้ดูว่าเกิด Circular Dependency ไหม
    private serviceA: CircularLazyLoadingA
  ) {}

  logSomething() {
    this.serviceA.useServiceB();
  }
}
