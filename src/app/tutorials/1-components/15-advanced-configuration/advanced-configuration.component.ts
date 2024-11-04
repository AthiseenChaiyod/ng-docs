import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

// มี options บางตัวที่เราสามารถใส่ให้กับ Component ได้
@Component({
  standalone: true,
  selector: `advanced-configuration`,
  templateUrl: `./advanced-configuration.component.html`,
  styleUrl: `./advanced-configuration.component.css`,

  // ตัวแรกคือ changeDetection ที่จะลดการ Check ของ CDC บน Component นี้ลง
  // อย่างที่รู้ว่าเราจะ check บ่อยมาก ไล่บนลงล่าง Component tree
  // changeDetection จะทำให้ Component ตัวนี้ check แค่ตอนเฉพาะมีค่าเปลี่ยนแปลงก็พอ
  // เช่น Input เปลี่ยนแปลง, Event ทำงาน หรือการสั่งให้ทำการ Check โดยตรง
  // ทำได้โดยการใส่ค่า ChangeDetectionStrategy.OnPush เข้าไป
  // ถ้าเราไม่ใส่ค่า changeDetection มา เราก็จะได้ changeDetection: ChangeDetectionStrategy.Default
  // .Default ก็คือค่าเริ่มต้นที่จะ check ทุกครั้งที่ CDC ทำงานนั่นแหละ
  changeDetection: ChangeDetectionStrategy.OnPush,

  // ตัวต่อมา preserveWhitespaces คือการตั้งค่าที่จะทำให้เราสามารถเก็บ whitespace ใน template ได้
  // โดยปกติแล้วเวลาเราเขียน template พวก whitespace อย่าง newline / indentation จะถูก trim ออก
  // เราจะไม่ค่อยได้ใช้อะไร เพราะว่า prettier จะ format ให้เองอยู่แล้ว ทำให้เรามี newline / inden ไม่ได้
  // สามารถตั้งค่าให้เป็น true / false ได้
  preserveWhitespaces: true,

  // ตัวสุดท้ายก็คือ schemas ที่จะทำให้เราสามารถใช้ custom HTML tag ได้โดยไม่เกิด error ใน template
  // แต่ว่าจะใช้แค่ใน Component ที่ระบุ schemas เอาไว้เท่านั้น
  // สมมติเราระบุ schemas เอาไว้ที่ ComponentA เราจะไปใช้ custom tag ที่ ComponentB ไม่ได้
  // แต่ถึงยังไง ถ้าเรานำ custom tag ที่ไม่มีอยู่จริงนี้ไปใช้ มันก็จะไม่แสดงอะไรออกมาอยู่ดี
  // ก่อนจะนำไปใช้เราจะต้องใส่ค่า [CUSTOM_ELEMENTS_SCHEMA] ให้ schemas ด้วย
  // เช่น schemas: [CUSTOM_ELEMENTS_SCHEMA] เพื่อให้เราใช้ custom tag ได้
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvancedConfiguration {}
