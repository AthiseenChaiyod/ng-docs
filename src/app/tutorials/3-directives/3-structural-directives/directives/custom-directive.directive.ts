import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

// ในการสร้าง Structural Directive ก็เหมือนกับการสร้าง Attribute Directive
// เราจะต้องแปะ Decorator @Directive() เอาไว้ให้ export class ด้วย
// ส่วนชื่อของ selector ก็จะเขียนเอาไว้ใน [ ] เหมือนกัน และใส่ standalone: true เหมือนกัน
@Directive({
  standalone: true,
  selector: '[customDirective]',
})
export class CustomDirective implements OnInit {
  // อันดับแรกให้เรา inject TemplateRef, ViewContainerRef มาด้วย
  // structural directive จะเกี่ยวกับการ render เป็นหลักเลยต้องใช้ 2 dependencies นี้
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  // เราสามารถสร้าง Input ให้กับ Directive ได้เหมือนกัน
  // สำคัญที่สุดคือการใช้ prefix เป็น selector ของ Directive เรา
  // ถ้าเราตั้งชื่อ [someDirective] เราก็ต้องใช้ชื่อ input ขึ้นด้วย someDirective
  // เช่น @Input() someDirectiveValue!: string;
  // แต่ว่าเราสามารถใช้ alias แทนก็ได้เหมือนกัน
  // เช่น @Input({ alias: 'someDirectiveValue' }) value!: string;
  // ถ้าเราไม่ตั้งชื่อตามนี้เราจะเจอปัญหาตอนเขียน shorthand syntax
  // มีตัวอย่างทั้งแบบ input ที่มี alias และ ไม่มี alias
  @Input() customDirectiveData: any;
  @Input({ required: true, alias: 'customDirectiveValue' }) value!: string;

  // ที่เราใช้ ngOnInit ตรงนี้เพราะว่าจะจำลองการ render template เมื่อนำ directive นี้ไปแปะเอาไว้บน template
  // เราเลยจะใช้ .createEmbedView ของ ViewContainerRef โดยส่งค่า template เข้าไป
  // ค่าของ template ก็มาจาก template ที่เรานำ directive นี้ไปแปะเอาไว้นั่นแหละ
  ngOnInit(): void {
    // ลอง log ค่าออกมาดูว่า input ของเรารับค่ามาถูกต้องไหม
    console.log('From:', this.customDirectiveData);
    console.log('Value:', this.value);

    if (this.customDirectiveData) {
      // object ที่เราส่งไปด้านหลัง templateRef เรียกว่า template context
      // ทำหน้าที่ map ค่าที่เราตั้งเอาไว้ใน " " ของ shorthand syntax Directive เรา
      // สมมติว่า *someDirective="let data; inputA: 'value'; let antData; inputB: 'value2'"
      // แปลว่า เราสร้างตัวแปร data, antData ขึ้นมาก่อน จากนั้นเราจะ assign ค่าให้ inputA, inputB
      // โดยเราให้ inputA ของเรามีค่า 'value' ส่วน inputB จะมีค่า 'value2'
      // แต่ว่าถ้าเกิดเราไม่ได้สร้าง inputA แบบ @Input() someDirectiveInputA: ... จะใช้ syntax นี้ไม่ได้
      // เพราะว่า *someDirective จะทำให้เราต้องเขียน prefix ด้วยชื่อ directive เสมอ
      // จากโค้ดที่เราเขียนมา ถ้าเกิดเรานำ data, antData ไปใช้ใน template expression ก็จะยังไม่มีค่า
      // เพราะว่าแค่สร้างตัวแปร ไม่ได้ assign ค่าให้กับมันซะหน่อย
      // ถ้าเราอยาก assign ค่าของ input ให้กับ data, antData เราก็จะต้องทำ assign ให้ทั้งสองตัวเหมือนกัน
      // จะกลายเป็น let data = inputA, let antData = inputB, inputA: 'value', inputB: 'value2'
      // เพียงเท่านี้เราก็จะสามารถนำ data, antData ไปใช้ได้แล้ว
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        // สำคัญตรง template context นี่แหละ เพราะถ้าเราเขียนผิดจะ map ข้อมูลผิดเหมือนกัน
        // $implicit ก็คือ ถ้าเกิดว่าเราไม่ได้ assign ค่าให้กับตัวแปรใน template เราจะใช้ค่าของ $implicit แทน
        // ถ้าเกิดเราประกาศ $implicit: this.inputA เราไม่ต้อง assign ค่าให้กับ data ก็ได้
        // พอเรานำ let data; ไปใช้ เราก็จะได้ค่าของ inputA มาเลย
        // ส่วนการ assign ค่านั้นจะต้องดูที่ template object เป็นหลัก
        // สมมติว่าเรามี key inputA อยู่ แล้วเราให้ inputA: this.inputA
        // หมายความว่าเราสามารถใช้ key inputA ในการทำ mapping บน directive นี้ได้แล้ว แต่จะต้องชื่อ inputA
        // เวลาที่เราเขียน inputA: 'value' ที่เราสามารถใส่ค่าให้กับ input ได้ก็เพราะเราสามารถ mapping กลับมาได้
        // ถ้าเกิดเราเขีียน inputA: 'value' แต่ว่าใน context เรามี inputB: this.inputB จะได้ค่า undefined
        // สรุปงา่ย ๆ ก็คือ ให้เรามาทำอ้างอิงเอาไว้ ว่าจะใช้ชื่ออะไรในการ bind ค่าบน Directive กลับมาที่ input
        // ที่ inputA: this.inputA ก็เพราะว่าเราใช้ชื่อ inputA บน tag จะเป็นการตั้งค่าให้กับ @Input inputA
        // ถ้าเกิดเราเปลี่ยน context เป็น something: this.inputA
        // แทนที่เราจะใช้ inputA: 'value' เราจะต้องเปลี่ยนเป็น something: 'value' แทน
        // เพราะว่าเราใช้ชื่อ something บน tag ที่จะอ้างอิงถึง @Input inputA นั่นเอง
        // ที่จริงมีเรื่องสำคัญของ structural directive อีกสองเรื่อง
        // template guard / template guard context
        // แต่ว่าจะเจออีกทีในอนาคต บท Angular CLI
        $implicit: this.customDirectiveData,
        value: this.value,
        data: this.customDirectiveData,
      });
    }
  }
}
