import { Component } from '@angular/core';
import { InnerComponent } from './inner-component.component';
import { OuterComponent } from './outer-component.component';

@Component({
  standalone: true,
  selector: `view-providers`,

  // อย่างที่กล่าวไปว่าการประกาศ viewProviders จะทำให้เราเขียน logical ตรง <#VIEW> แทน Component tag
  // ทำให้ภายนอกไม่สามารถเข้าถึง dependency นี้ได้ (isolate)
  // ภายนอกที่ว่าก็คือ <#VIEW> ตัวอื่นจะมองไม่เห็น dependency ตัวนี้
  // จากตัวอย่างโค้ดด้านล่าง ให้เราไปดูที่ outer-component กันก่อน
  // เราประกาศ viewProviders: [ViewProvidersService] เอาไว้ใน OuterComponent
  // ทำให้ตอนนี้เรารู้แล้วว่า ViewProvidersService จะไม่ถูกมองเห็นโดย <#VIEW> อื่น
  // เราก็จะทำการทดสอบโดยจะซ้อน Component เข้าไปข้างในอีกตัว เพื่อให้เรามี outer <#VIEW> และ inner <#VIEW>
  // เราก็เลยจะต้องใส่ <ng-content /> เข้าไปใน OuterComponent เพื่อให้เราสามารถซ้อน Component ได้
  // แต่ว่าก่อนจะใส่ <ng-content /> เราก็ต้องลอง log ค่าออกมาดูก่อน
  // โดยถ้าหากเราลองนำไปวางบนหน้าเว็บ เราจะเห็นว่าค่าของ viewProvidersService มีค่า 'Chaiyod' ตามที่เราตั้งค่าเอาไว้
  // ต่อมาเราจะสร้าง Component ที่เราจะซ้อนข้างใน โดยให้มันแค่ log ค่าของ dependency ออกมาดูเฉย ๆ
  // เราจะได้เทียบได้ว่า Outer - Inner มีค่าของ dependency ตรงกันหรือไม่
  // แต่ว่าเราจะแค่ inject ViewProvidersService เข้าไปใน InnerComponent เฉย ๆ เพื่อให้มันไปเอาค่าที่ Parent
  // สุดท้ายแล้วเราเลยได้โค้ดด้านล่าง ที่ซ้อน InnerComponent เอาไว้ด้านใน OuterComponent
  // ถ้าเราเอา Component นี้ไปวางบน AppComponent เราจะเห็นว่า ค่าของ Outer - Inner เป็นคนละตัวกัน
  // Outer จะมีค่า 'Chaiyod' ตามที่ประกาศเอาไว้ใน viewProviders
  // แต่ว่า Inner จะหา dependency จาก Parent ไม่เจอ เพราะว่าทำ isolate ด้วย viewProviders ไปแล้ว
  // ทำให้ Inner จะต้องไปขอจาก EnvironmentInjector ที่เป็น Root แทน เราเลยได้ Athiseen มา
  // ด้านล่างจะเห็นชัดว่า <#VIEW> เป็นคนละ layer กัน ทำให้ไม่สามารถเข้าถึง isolated viewProvidersService ได้
  // เราจะใช้ viewProviders ได้ในการที่เรามี logical template ซ้อนกันหลายชั้นเท่านั้น
  // ทำให้เลี่ยงไม่ได้ที่จะเจอ <ng-content /> อยู่ในนั้นด้วย เนื่องจากโค้ดทั่วไปอย่าง div, h1, etc. จะไม่มี <#VIEW>
  template: `
    <outer-component>
      <!-- <#VIEW> -->
      <inner-component>
        <!-- <#VIEW> -->
        <!-- </#VIEW> -->
      </inner-component>
      <!-- </#VIEW> -->
    </outer-component>
  `,

  imports: [InnerComponent, OuterComponent],
})
export class ViewProvidersComponent {}
