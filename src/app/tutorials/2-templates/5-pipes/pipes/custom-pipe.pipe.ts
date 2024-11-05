import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // name เราจะเป็นช่อของ Pipe แบบ camelCase ที่ตัดคำว่า Pipe ออก
  // เช่น เรามี Pipe ชื่อ AthiseenChaiyodPipe เราจะใช้ name ว่า athiseenChaiyod
  // เป็น best practice ที่ควรทำตาม
  name: `custom`,
  standalone: true,

  // ปกติแล้ว pure จะถูกตั้ง default ไว้ให้เป็น true แม้เราจะไม่เขียน pure มาก็ตาม
  // Pipe จะแบ่งออกเป็นสองประเภท Pure Pipe / Impure Pipe
  // Pure Pipe ก็คือ Pipe ที่จะไม่เช็คความเปลี่ยนแปลงของค่าบ่อย
  // จะเช็คแค่เฉพาะตอน primitive type / reference เปลี่ยนแปลงเท่านั้น
  // ส่วน Impure Pipe คือจะเช็คหมด เปลี่ยนแปลงนิดหน่อย เพิ่มลบ array ก็เอา
  // กรณีที่ต้องการความ real-time ของข้อมูลก็ให้เราใช้ Impure Pipe ดีกว่า
  // แต่จะแลกมากับการที่ไม่ได้ทำ cache ไว้ทำให้ต้องเรียกใช้ค่าตัวเองหลายครั้ง
  // ต่างจาก Pure Pipe ที่จะทำ Cache ตัวเองไว้ ทำให้เราเรียกใช้ได้ไม่เปลืองทรัพยากร
  // ดังนั้น จะใช้ Impure Pipe ก็ให้ระวังเรื่อง application resource ด้วย
  pure: false,
})
// การสร้าง Pipe เองเราจะต้อง implements PipeTransform มาเสมอ
export class CustomPipe implements PipeTransform {
  // และการ implements PipeTransform มาจะทำให้เราต้องมี method transform() ด้วย
  // transform() นี่แหละที่จะเป็นโค้ดว่า Pipe เรารับข้อมูลอะไรบ้าง รับมาแล้วทำอะไร ส่งอะไรกลับไป
  transform(data: string, format: string, count: number): string {
    if (format === 'format') {
      return `This is data: ${data}`;
    } else if (count < 100) {
      return `${data} with ${count}`;
    } else {
      return data;
    }
  }
}
