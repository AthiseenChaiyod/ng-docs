import { Component, Host, Optional, Self, SkipSelf } from '@angular/core';
import { ServiceA } from './services/service-a.service';
import { ServiceB } from './services/service-b.service';
import { ServiceC } from './services/service-c.service';
import { ServiceD } from './services/service-d.service';

@Component({
  standalone: true,
  selector: `hierarchical-injectors`,
  templateUrl: `./hierarchichal-injectors.component.html`,
  styleUrl: `./hierarchichal-injectors.component.css`,

  imports: [],

  // สามารถประกาศ dependency ใน ElementInjector ได้ตรงนี้
  providers: [],
})
// ในบทนี้เราจะอธิบายเรื่อง Injectors ที่เราเห็นตอนใช้ runInInjectorContext() อย่างละเอียด
// เริ่มต้นกันด้วย Injector จะมีอยู่สองประเภทคือ EnvironmentInjector ที่เราเคยใช้ไปแล้วและ ElementInjector
// ให้นึกภาพว่าเวลาเราสร้าง Component แบบ standalone Component ของเราจะถูกนำไปเก็บเอาไว้ใน Root Module
// โดยที่ Root Module จะเป็นคนจัดการพวก standalone Component ของเราให้อัตโนมัติ
// dependency ก็มี Root Module ที่ว่านี้เหมือนกัน โดยจะเรียกว่า EnvironmentInjector แทน
// ถ้าเราประกาศ providedIn: 'root' ก็เหมือนกับเราประกาศ standalone: true นั่นแหละ
// dependency ของเราจะถูกนำไปเก็บเอาไว้ใน EnvironmentInjector
// เวลาที่เรา inject dependency ที่เป็น providedIn: 'root' เข้ามา ก็แปลว่าเราใช้ dependency นั้นแบบเป็น singleton
// ก่อนที่เราจะไปพูดเรื่อง ElementInjector เราจะต้องรู้ก่อนว่า Component / Directive ของเรานั้นเอา dependency มาได้ยังไง
// ยกตัวอย่างให้ ComponentA -> ComponentB -> ComponentC ตามลำดับ
// ให้ทุก Component ทำการ inject SomeService เข้ามา ที่มี method ในการบวกค่า 1 ให้กับ property ของมัน
// เมื่อเรา inject SomeService เข้ามาใน ComponentA มันจะพยายามหา dependency นี้ในตัวเองก่อนที่มันจะไปหาที่อื่น
// แต่ว่าเราไม่เจอ dependency นี้ใน ComponentA ดังนั้นมันจะลองไปขอจาก Parent ก่อน ซึ่ง ComponentB inject มาพอดี
// ทำให้ ComponentA จะใช้ dependency instance ตัวเดียวกันกับ ComponentB ที่เป็น Parent Component
// ต่อมา ComponentB ก็จะทำเหมือนกับ ComponentA ก็คือลองหาในตัวเองก่อน ไม่เจอค่อยไปขอ Parent
// ผลลัพธ์จะเหมือนกันก็คือไม่เจอในตัวเอง แต่จะไปขอ Parent ที่ inject มาเหมือนกัน นั่นก็คือ ComponentC
// ตอนนี้เราจะมี ComponentA ที่ใช้ instance ตัวเดียวกับ ComponentB และ ComponentB ที่ใช้ instance ตัวเดียวกับ ComponentC
// แต่ว่า ComponentC นั้นจะหาที่ตัวเองไม่เจอ แล้วก็ดันไม่มี Parent Component ให้ขอด้วย
// ทำให้ ComponentC จะต้องไปขอ dependency ที่ EnvironmentInjector
// ซึ่ง EnvironmentInjector จะต้องมี dependency นี้อยู่แล้ว เพราะว่าเป็นที่เก็บ dependency ของทั้ง Application
// ทำให้ ComponentC จะใช้ singleton dependency ที่เอามาจาก EnvironmentInjector
// ดังนั้นทั้ง ComponentA และ ComponentB ก็จะใช้ dependency ตัวเดียวกันกับ ComponentC ที่เอามาจาก Application
// dependency ของทั้ง 3 components จะเป็นตัวเดียวกัน ถ้าลอง log ค่าตัวเลขของ dependency ออกมาดูก็จะเห็นว่าเลขต่อกัน
// แต่ว่าถ้าเกิดเราอยากจะให้ใช้ dependency ตัวเดียวกัน แต่ instance คนละตัวกันล่ะ
// ตรงนี้เป็นจุดที่ ElementInjector จะมีส่วนร่วมด้วย
// การที่เราใช้ ElementInjector ก็คือการประกาศสร้าง dependency ใหม่เฉพาะใน Component / Directive นั้น
// ทำให้เมื่อหาในตัวเองเจอแล้วก็จะไม่ต้องไปขอจาก Parent หรือ EnvironmentInjector อีก
// นอกจากจะไม่ต้องไปไล่หา dependency ที่อื่นแล้วก็ยังจะเป็น instance ตัวใหม่แยกออกมาเลยอีกด้วย
// โดยวิธีการนำ dependency มาประกาศเอาไว้ใน ElementInjector ก็แค่เราประกาศ dependency เอาไว้ใน providers: []
// เช่น่ @Component({ ..., providers: [SomeService] })
// ถ้าสมมติ ComponentA -> ComponentB -> ComponentC และ inject SomeService เข้ามาเหมือนเดิม
// แต่ว่าให้ ComponentB ประกาศ providers: [SomeService] เอาไว้
// ลำดับการทำงานก็คือ A จะหาในตัวเองไม่เจอและไปขอ instance จาก B เหมือนตัวอย่างที่แล้ว
// B จะหา dependency ที่ตัวเองเจอ (อยู่ใน ElementInjector ของตัวเอง) ทำให้ไม่ต้องไปขอที่ C
// C จะหาในตัวเองไม่เจอและจะต้องไปขอจาก EnvironmentInjector เหมือนเดิม เพราะไม่มี Parent ให้ขอแล้ว
// ตอนนี้เราจะได้ A ที่ใช้ instance เดียวกับ B, B ที่มี dependency แยกเป็นของตัวเอง, C ที่ใช้ของ Application
// เมื่อเราลอง log ออกมาดูจะเห็นว่า A, B มี instance ตัวเดียวกัน แต่ว่าจะคนละ instance กับ C
// ดังนั้น ElementInjector จะเป็นตัวเก็บ dependency ส่วนตัวของ Component / Directive
// โดยถ้าเราประกาศ dependency เอาไว้ใน providers: [] ElementInjector ก็จะสร้าง instance ใหม่ให้เลย ไม่ใช่ singleton
// สรุปการขอ dependency ก็คือ หาในตัวเองก่อนว่าเจอไหม ไม่เจอไปขอ Parent ถ้าไม่มี Parent ก็ค่อยไปหาที่ Application
// นอกจาก EnvironmentInjector ที่เป็นแบบ standalone แล้วก็ยังมี ModuleInjector ที่อยู่ใน layer เดียวกันอีกตัว
// โดยจะทำงานเหมือนกับ EnvironmentInjector เลย แค่จะเก็บ dependency ของพวก NgModule แทน
// ตัวสุดท้ายก็คือ PlatformInjector ที่จะจัดการกับ dependency ระหว่าง platform จะอยู่สูงขึ้นไปกว่า Application
// การประกาศ providedIn: 'platform' ก็จะทำให้ dependency ถูกนำไปเก็บเอาไว้ใน PlatformInjector
// แต่ว่า PlatformInjector ก็จะถูกแบ่งออกเป็น 2 Injector อีก ก็คือ EnvironmentInjector / NullInjector
// EnvironmentInjector ของ Platform จะเป็นคนละตัวกับ EnvironmentInjector ของ Application
// พวก providedIn: 'root' จะไม่ถูกนำไปเก็บรวมกับ EnvironmentInjector ของ PlatformInjector
// ส่วน NullInjector ก็คือการ throw error กลับไปถ้าเกิดค้นหา dependency ที่นี่
// NullInjector จะเป็น Injector ตัวสุดท้ายแล้วที่เราจะมาค้นหา dependency
// สรุปจากข้อมูลทั้งหมด ลำดับการขอ dependency จะเป็นไปดังด้านล่างนี้
// หาในตัวเอง ไม่เจอก็ไปขอ Parent ไม่เจอก็ไปขอ Application ไม่เจออีกก็ไป Platform ไม่เจออีกก็ไปหาที่ NullInjector
// การขอ dependency ที่เราเพิ่งพูดกันไปนี้เรียกว่า Resolution Rules
export class HierarchicalInjectors {
  // เราสามารถปรับแต่งการค้นหา dependency ได้ด้วย Resolution Modifiers
  // ซึ่ง Modifier จะมีอยู่ด้วยกัน 4 ตัว คือ @Self(), @SkipSelf(), @Host(), @Optional()
  constructor(
    // @Self() จะทำให้เราค้นหา dependency แค่ใน ElementInjector ของตัวเองเท่านั้น ไม่ต้องไปหาที่อื่น
    // ถ้าเกิดไม่เจอ dependency ใน ElementInjector ก็จะเกิด error
    @Self() private serviceA: ServiceA,

    // @SkipSelf() ทำให้เราไม่หาที่ตัวเอง แต่ว่าไปค้นหาที่ Parent ลำดับถัดไปของตัวเองเลย
    // เป็นการขอ dependency ตาม flow ปกติเลย แต่เราจะไม่หาที่ตัวเอง แค่นั้น
    // @Self() และ @SkipSelf() จะไม่สามารถประกาศร่วมกันได้
    @SkipSelf() private serviceB: ServiceB,

    // @Host() ก็จะทำงานเหมือนกับ @Self() เลย
    // นอกจากนั้นก็ยังหยุดการขอ dependency ตัวนี้ของ Child Component / Directive ด้วย
    // เช่น ComponentA -> ComponentB -> ComponentC ทุกตัว inject SomeService เหมือนเดิม
    // ให้ ComponentC มี @Host() ประกาศเอาไว้กับ SomeService
    // เวลาที่มี Child Component มาหา dependency ที่ตัว dependency ที่มี @Host() ก็จะหาที่ Component นี้เป็นที่สุดท้าย
    // แปลว่า A, B ก็จะมี dependency เดียวกับ C โดยที่ C จะไม่ไปขอที่ EnvironmentInjector เพราะหาที่ตัวเองอย่างเดียว
    // ถ้าเกิดหา dependency ในตัวเองไม่เจอก็จะเกิด error ใน ComponentC
    // @Host() / @Self() ไม่สามารถประกาศร่วมกันได้เหมือนกับ @Self() / @SkipSelf()
    @Host() private serviceC: ServiceC,

    // Modifier ตัวสุดท้ายก็คือ @Optional()
    // จะทำให้ไม่เกิด error เมื่อหา dependency ไม่เจอ แต่ dependency นั้นจะกลายเป็น null แทน
    // จะต้องประกาศ dependency ที่มี @Optional() เป็นลำดับสุดท้ายของ Modifier ทุกตัว
    // ไม่สามารถนำ @Optional() ไปประกาศไว้กับ dependency ตัวแรกสุดของ constructor ได้ (ถ้ามีหลายตัว)
    // แต่ถ้ามี dependency ตัวเดียวใน constructor ก็สามารถประกาศ @Optional() ได้เลย
    // โดยเราสามารถนำ @Optional() ไปแปะรวมไว้กับตัวอื่นได้ เช่น @Self() @Optional() ...
    @Optional() private serviceD: ServiceD
  ) {}
}
