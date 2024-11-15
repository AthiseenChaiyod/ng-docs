import { Component, Inject, InjectionToken } from '@angular/core';
import { ForUseClass } from './services/for-useclass.service';
import { ForUseExisting } from './services/for-useexisting.service';
import { ForUseFactory } from './services/for-usefactory.service';
import { STATIC_VALUE } from '../../../app.config';
import { ForUseValue } from './services/for-usevalue.service';

@Component({
  standalone: true,
  selector: `defining-dependency-providers`,
  templateUrl: `./defining-dependency-providers.component.html`,
  styleUrl: `./defining-dependency-providers.component.css`,

  // ปกติแล้วการที่เราประกาศ Class ได้โดยตรงใน providers: [] ก็คือการเขียนแบบ shorthand
  // การเขียนแบบเต็มก็คือ { provide: SomeService, useClass: SomeService }
  // useClass คือการอ้างอิงไปยัง Class ว่าให้ token ตรง provide ของเรามีค่าเท่ากับ Class ที่ชี้ไปนะ
  // จะเป็นการสร้าง instance ใหม่ ไม่ใช่การใช้ instance เดิมแบบ singleton
  // นอกจาก useClass ก็ยังมี useExisting, useFactory, useValue ให้ใช้
  // useExisting ก็คือการชี้ไปยัง instance ที่มีอยู่แล้ว บอกว่าให้ใช้ instance เดียวกับที่ชี้ไปนะ
  // useFactory จะเป็นการเขียน function ขึ้นมาเพื่อ return ค่า instance ที่อยากได้กลับไปให้ token
  providers: [
    // การใช้ useClass เราจะได้ instance ใหม่ของ ref ที่เราระบุมา
    { provide: ForUseClass, useClass: ForUseClass },

    // การใช้ useExisting เราจะชี้ token ของเราไปยัง instance ที่มีอยู่แล้ว (ใช้ instance ร่วมกัน)
    { provide: ForUseExisting, useExisting: ForUseClass },

    // การใช้ useFactory จะทำให้เราเขียน function เพื่อส่งค่า instance ที่เราอยากได้กลับมาเอง
    // เหมาะกับการทำ dynamic injection เพราะว่าสามารถนำค่าต่าง ๆ มาใช้ในการคำนวณก่อนส่งกลับได้
    {
      provide: ForUseFactory,
      useFactory: () => ForUseValue,
    },

    // การใช้ useValue จะทำให้เราสามารถตั้งค่า static value ให้กับ token ได้โดยตรงเลย
    // สามารถใช้ Class เป็น token ก็ได้ แต่ที่ใช้ string token เพราะเอามาเป็นตัวอย่างการใช้งานเฉย ๆ
    // เช่น { provide: ForUseValue, useValue: 'Hello' }
    { provide: STATIC_VALUE, useValue: 'Athiseen' },
  ],
})
export class DefiningDependencyProviders {
  constructor(
    // ใด ๆ ก็ตาม ตอน inject เราจะไม่สามารถใช้ Interface เป็น type ของสิ่งที่ถูก inject ได้
    // เพราะว่า Interface จะเอาไว้เป็น type safety ตอนเขียน Dev เฉย ๆ
    // พอตอน runtime โค้ดของเราจะถูกแปลงเป็น JS ซึ่ง JS ไม่มี Interface ดังนั้น Interface ก็จะหายไปหมด
    // เป็นเหตุผลว่าเราไม่สามารถใช้ interface เป็น injection type ได้
    private forUseClass: ForUseClass,
    private forUseExisting: ForUseExisting,
    private forUseFactory: ForUseValue,

    // การ inject string token จะไม่เหมือนกับอย่างอื่น
    // เราจะต้องใช้ @Inject() ในการทำ string token injection
    // ถ้าสงสัยก็อ่านได้ที่ file: app.config.ts
    @Inject(STATIC_VALUE) value: string
  ) {
    this.forUseClass.logSomething();
    this.forUseExisting.logSomething();
    this.forUseFactory.logSomething();
    console.log(value);
  }
}
