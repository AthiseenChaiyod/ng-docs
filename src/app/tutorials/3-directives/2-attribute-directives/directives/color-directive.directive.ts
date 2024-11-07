import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: `[color]`,
})
export class ColorDirective {
  constructor(private elementRef: ElementRef) {}

  // directive เราจะมี input กี่ตัวก็ได้ รับส่งค่าเหมือนกันหมด
  // การสร้าง input จะมีอยู่สองกรณี
  // กรณีแรก มี input เดียว และใช้ชื่อซ้ำกับ selector
  // เช่น selector: [something], @Input({ required: true }) something!: string
  // กรณีนี้เวลาเรานำไปใช้ เราจะสามารถรวบรัดประกาศสองอย่างพร้อมกันทีเดียวได้โดยการใช้ [ ] ครอบ
  // เช่น <h1 [something]="'Athiseen'">Hello There!</h1>
  // จะเหมือนกับว่าเราประกาศ something [something]="'Athiseen'" บน tag เลย
  // ข้อดีก็คือเราไม่ต้องพิมพ์ input แยกกับ directive ส่วนข้อเสียก็คือมีตัวซ้ำได้แค่ตัวเดียว
  // อีกกรณีคือเราใช้ input คนละชื่อกับ directive เราก็จะประกาศ directive / input แยกกันปกติ
  // เช่น <h1 someDirective [someProp]="x" [anotherProp]="y">Ayooo</h1>
  @Input() color!: string;
  @Input({ required: true }) defaultColor!: string;

  changeColor(color: string) {
    this.elementRef.nativeElement.style.color = color;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.color !== undefined) {
      this.changeColor(this.color);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.changeColor(this.defaultColor);
  }
}
