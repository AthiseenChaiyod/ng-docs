import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  selector: `styling`,
  templateUrl: `./stying.component.html`,

  // โดยทั่วไปแล้วเราก็จะตกแต่ง Component ของเราใน style, styleUrl นี่แหละ
  styleUrl: `./styling.component.css`,

  // และเราก็สามารถทำ Style Scoping ได้ด้วย ก็คือจะให้ style ภายนอกเข้ามามีผลกับ Component นี้ไหม
  // มี Scope อยู่ 3 แบบด้วยกัน คือ Emulated (default), ShadowDom, None
  // Emulated ก็คือตัว default ต่อให้เราไม่ได้ประกาศเอาไว้ใน Component ก็จะมีโค้ดนี้เป็นค่า default อยู่ดี
  // style ของ Component นี้จะมีผลแค่ในตัว Component เอง ไม่ออกไปกระทบด้านนอก
  // แต่ว่า Emulated ก็ไม่ได้ปกป้อง style ให้ conflict กันเสมอไป จะมีบางกรณีที่ป้องกันไม่ได้
  // เช่น มีการใช้ Global Style, Pseudo Selector หรือ Complex Selector ก็อาจทำให้เกิด conflict ได้
  // ShadowDom จะใช้ความสามารถของ browser ในการทำ ShadowDom
  // เป็น style ที่มีความ strict สูงที่สุดแล้ว คือมีผลแค่ในตัวของมันเองจริง ๆ ไม่ส่งผลหรือรับผลกระทบใด ๆ
  // แต่ก็ต้องใช้บน browser ที่รองรับการทำ ShadowDom ด้วย ซึ่งส่วนมากก็มีหมดแล้ว
  // None จะเหมือนกับว่าเราเขียน style ใน Component นี้ก็จริง แต่ว่าจะแสดงผลเหมือนเป็น Global
  // กล่าวคือถ้านำ Component นี้ไปใช้ Style ของ Component นี้ก็จะพยายาม override ตัวอื่นด้วย
  // สรุปคือ Scoping จะทำให้ style: [...] ที่เราประกาศไว้ใน @Component() แสดงผลต่างกันไป
  encapsulation: ViewEncapsulation.Emulated,
})
export class Styling {}
