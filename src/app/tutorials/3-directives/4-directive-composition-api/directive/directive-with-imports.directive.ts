import { Directive, OnInit } from '@angular/core';
import { CustomDirective } from './custom-directive.directive';

@Directive({
  standalone: true,
  selector: '[directiveWithImports]',

  // ทั่วไปแล้ว เราสามารถแปะ host เอาไว้ใน Component ได้ ถ้าเกิดเราประกาศอะไรในนั้นก็จะแสดงผลกับทั้ง Component
  // ใน Directive เราก็สามารถที่จะทำการ bind directive เอาไว้กับ Component / Directive ได้เหมือนกัน
  // ให้เราใช้ hostDirectives: [] ประกาศเอาไว้เป็น metadata ให้กับ @Directive()
  // ข้างใน hostDirective เราจะรับ object ที่จะมีค่าต่าง ๆ ของ Directive ที่เราจะทำ binding กับ Component
  // ค่าแรกคือ directive: Type ที่จะเป็นการ ref ไปยัง Directive ที่เราจะนำมาทำ Binding
  // ค่าต่อมา inputs: string[] ถ้าเกิด Directive ที่จะทำ Binding มี input ให้นำมาประกาศเอาไว้ในนี้
  // ค่าสำคัญค่าสุดท้ายก็คือ outputs: [] ที่ทำหน้าที่เก็บ output ของ Directives ที่นำมาทำ Binding เหมือนกัน
  // โดยเราจะมี directive binding กี่ตัวบน Component ก็ได้
  // ตัวอย่างการสร้าง object: { directive: SomeDirective, inputs: ['color', 'width'] }
  // ซึ่งถ้าหากเรานำ Directive ที่มี input มาทำ hostDirective เอาไว้บน Directive อีกทีนึง
  // จะอยู่ในรูป DirectiveA -> DirectiveB
  // เวลาเรานำ DirectiveB ที่มี input ของ DirectiveA ไปทำ hostDirective บน Component
  // เราจะไม่ต้องทำการประกาศ input ของ DirectieA ซ้ำบน Component แล้ว
  // เราสามารถเรียกใช้ input นั้นได้เลย เพราะเราประกาศตั้งแต่อยู่ใน DirectiveB แล้ว
  // ดูตัวอย่างได้จาก custom-directive, directive-with-imports สองตัว
  // เราจะเห็นว่า custom-directive มี input 1 ตัว
  // directive-with-imports ก็จะนำ input ของ custom-directive มาประกาศเอาไว้ให้แล้ว
  // เวลาที่เรานำ directive-with-imports ไปใช้ เราเลยไม่ต้องประกาศ input ตัวเดิมซ้ำ
  // และเราสามารถทำ alias ให้กับ input ได้โดยการใส่ : ตามด้วยชื่อที่เราจะทำ alias
  // เช่น inputs: ['width: screenWidth']
  // เวลาเรานำ input ไปใช้งาน แทนที่จะใช้ [width] เราจะใช้ [screenWidth] แทน
  // การสร้าง instance ของ Directive จะเริ่มจากตัวข้างใน hostDirective ก่อน
  // สมมติว่ามี DirectiveA -> DirectiveB และทั้งสองมี ngOnInit() ที่ log ข้อความทั้งคู่
  // log ของ DirectiveA จะขึ้นก่อน เพราะว่าจะต้องโหลด DirectiveA ขึ้นมาให้ DirectiveB ใช้
  // จากนั้น DirectiveB จึงค่อย log ออกมาทีหลัง
  // แล้วก็หากมีการประกาศ providers Token ชื่อเดียวกันของ Component / Directive
  // เราจะใช้ token ของ Component / Directive ปลายทางของความสัมพันธ์เสมอ
  // เช่น DirectiveA -> DirectiveB -> ComponentA
  // สมมติว่าเราประกาศ providers เดียวกันทั้งหมด
  // เราจะได้ Token ของ ComponentA มาใช้ เนื่องจากเป็นตัวสุดท้ายของ relation แล้ว
  // หรือเรียกว่าหลักการ Last-Write-Wins
  hostDirectives: [
    {
      directive: CustomDirective,
      inputs: ['color: someColor'],
    },
  ],
})
export class DirectiveWithImports implements OnInit {
  constructor(private customDirective: CustomDirective) {}

  ngOnInit(): void {
    console.log(`This is Directive with Imports!`);
  }
}
