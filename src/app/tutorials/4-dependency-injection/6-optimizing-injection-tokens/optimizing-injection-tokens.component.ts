import { Component, ContentChild } from '@angular/core';
import { CustomComponent } from './components/custom-component.component';

// เวลาที่เรา import Libraries อื่น ๆ มาใช้งาน บางครั้งเราไม่ได้ใช้ทุกอย่างที่อยู่ใน Component นั้นทั้งหมด
// แต่ว่าเราก็ต้อง import โค้ดทั้งหมดของ Library นั้น ๆ มาอยู่ดี
// ปกติแล้ว Angular ก็ทำ Tree-shaking ให้นั่นแหละ แต่ว่าบางกรณีที่ Angular จะทำให้ไม่ได้
// กรณีแรกก็คือการประกาศ Token เป็น Type เอาไว้ใน constructor
// เช่น constructor(private externalService: ExternalService) {}
// อีกกรณีก็คือเมื่อเราใช้ Token ใน content query อย่าง @ContentChild() / @ContentChildren()
// เช่น @ContentChild(ExternalService) externalService: ExternalService
// ส่วนใหญ่เราก็จะประกาศ Token แบบนี้ ซึ่งไม่แปลกอะไร เพราะว่าสิ่งที่เรานำมาใช้มันก็แค่โค้ดชุดเดียวอยู่แล้ว ไม่มีอะไรต้องเอาออก
// เช่น constructor(private someService: SomeService) {}
// โค้ดของ SomeService เราสร้างขึ้นมาเอง มันก็มีโค้ดอยู่แค่ในไฟล์ของมันเอง เราก็ไม่มีส่วนเกินต้องนำออก
// แต่ว่าถ้าเกิดเราใช้ library ภายนอก ยกตัวอย่างเช่น bootstrap
// การอ้างอิงไปยัง Token ใด ๆ ก็จะทำให้เราต้อง import library นั้นมาทั้งหมดนั่นแหละ
// เช่น constructor(private bootstrapService: BootstrapService)
// โค้ดที่มาจากภายนอกเราไม่รู้ว่ามีส่วนเกินเยอะแค่ไหน ถ้าเกิดเราใช้ library เยอะ ส่วนเกินก็ยิ่งเยอะ
// Application เราก็จะใหญ่โดยไม่จำเป็น แม้ว่าการ import ของเรามันจะดูเหมือนเรา destructuring มาแค่ส่วนนั้นก็ตาม
// เช่น import { SomeComponent } from '@somelibrary';
// ดูเหมือนว่าเราจะ import มาแค่ SomeComponent จาก somelibrary
// แต่ว่าเราก็ไม่รู้ว่า library นั้นจะทำ Tree-shaking ให้เราด้วยหรือเปล่า เพราะว่าเป็น library ภายนอก มีหลายปัจจัยเกินไป
// การสั่งให้ทำ Tree-shaking เองเลยแบบ manual ก็จะช่วย ensure ได้ว่า library นั้นถูกทำ Tree-shaking จริง ๆ นะ
// Angular มีการทำ Optimizing Injection Token ที่จะทำให้เราทำ Tree-shaking กับ external library ได้
// ดังนั้น การทำ Optimizing Injection Token ก็อาจจะเลี่ยงไม่ได้ในกรณีที่เราใช้ library เยอะ
// โดยการแก้ไขปัญหาทำ Tree-shaking ให้กับ library ไม่ได้แก้ไขได้โดยการใช้ lightweight token
// ก็คือแทนที่เราจะ refer ไปยัง Component ของ library นั้น ๆ ให้เราสร้าง abstract class หน้าตาเหมือนกันขึ้นมาแทน
// แล้วตอนเรา inject lightweight token นี้ไปใช้ก็ค่อยอ้างอิงค่าที่เราอยากได้ด้วย useExisting
// อันดับแรกให้เราสร้าง abstract class ที่เราจะอ้างอิงขึ้นมาก่อน
// สมมติว่าเราจะอ้างอิงถึง bootstrap button component เราก็อาจจะใช้ชื่อ BootstrapButton ตามด้วย trailing Token
// จะได้ abstract class BootstrapButtonToken {}
// ถ้า Component นั้นทำอะไรได้ เราก็ควรจะใส่เข้าไปใน abstract class ด้วย (สร้าง abstract method, property)
// โดย abstract method / property เราจะใช้ abstract keyword นำหน้า method / property ที่เราต้องการสร้าง
// ต่อมาเราก็จะนำ Token ที่เราสร้างไปประกาศเอาไว้ใน ElementInjector
abstract class ButtonToken {
  abstract logSomething(): void;
}

@Component({
  standalone: true,
  selector: `optimizing-injection-tokens`,
  templateUrl: `./optimizing-injection-tokens.component.html`,
  styleUrl: `./optimizing-injection-tokens.component.css`,

  // ให้เรา provide Token ที่เราสร้างเมื่อกี้ และใช้ useExisting เพื่ออ้างอิงค่าที่เราอยากได้ของ library นั้น ๆ
  providers: [{ provide: ButtonToken, useExisting: CustomComponent }],
})
// ต่อมาให้เรา extends dependency ที่เราเพิ่งประกาศเอาไว้ที่ providers ให้กับ Class ของเรา
// เท่านี้เราก็จะได้ lightweight token ที่อ้างอิงถึง specific โค้ดใน library นั้น ๆ แล้ว
// ข้อดีอีกข้อก็คือ Angular จะสามารถทำ Tree-shaking ได้ ทำให้โค้ดที่เราไม่ได้ใช้ของ library ถูกนำออกจนหมด
export class OptimizingInjectionTokens extends ButtonToken {
  logSomething() {
    console.log(`This is from lightweight token!`);
  }
}

// วิธีการนำไปใช้งาน ใน Component อื่นก็ให้เราทำ Content Query ปกตินั่นแหละ
@Component({
  standalone: true,
  selector: `lightweight-token-usage`,
  template: ``,
})
export class LightweightTokenUsage {
  // แต่ว่าให้เราใช้ Token แทนการอ้างอิงไปยังค่า Component ที่เราอยากได้โดยตรง
  // โดยให้เราทำ type null เอาไว้เพื่อกัน error และ assign ค่า null ในตอนแรกเพื่อป้องกันการหา Token ไม่เจอ
  @ContentChild(ButtonToken) onlyButton: ButtonToken | null = null;
}
