import { Component } from '@angular/core';

@Component({
  standalone: true,

  // selectors ที่เราประกาศกันเมื่อ 2 chapters ที่ผ่านมาเรียกว่า type selector
  // type selector จะบอกให้ Angular ไปดูที่ HTML tag ถ้าเกิดเจอ tag ที่ชื่อตรงกันก็จะนำ template ไปวางแทน
  // จะมี selectors อีกสองประเภทคือ attribute selectors, class selectors
  // attribute จะบอกให้ Angular ดูที่ attribute แทนที่จะเป็น tag
  // เช่น selector="[type="reset"]" ก็จะบอกว่าให้นำ template ไปแสดงตรงทุกที่ที่มี attribute นั้น
  // class จะบอกให้ Angular ดูที่ class แทนที่จะเป็น tag, attribute
  // เหมือนกับ attribute แต่จะเปลี่ยนการแทนที่จากแทนที่ attribute ด้วย template เป็น แทนตรง class แทน
  // เช่น selector=".some-class"
  // สมมติว่าเราอยากระบุ .some-class แต่ว่าให้แสดงผลกับ some-class ทุกอันยกเว้นอันที่ใช้ tag <div></div>
  // เราก็สามารถทำได้โดยการระบุ exclude ที่เรียกว่า :not
  // โดยเราจะเขียน :not เอาไว้ใน selector นั่นแหละ โดยจะมี () ตามหลังเพื่อรับค่าตัวที่จะ exclude
  // โดยค่าใน () เราจะเขียน type selector, attribute selector หรือ class selector ลงไปก็ได้
  // เช่น selector=".some-class:not(div)" ก็จะแสดงผลบน some-class ทุกตัวยกเว้นตัวทีเ่ป็น div
  // และเราสามารถเขียนหลาย selector เอาไว้ใน selector ตัวเดียวก็ได้เหมือนกัน
  // เช่น selector=".another-class.someclass:not(div)"
  // แต่ว่าเราสามารถใส่ type selector ได้แค่ตัวเดียวใน 1 selector
  selector: `selectors`,
  templateUrl: `./selectors.component.html`,
  styleUrl: `./selectors.component.css`,
})
export class Selectors {}
