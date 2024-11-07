import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: `[highlight]`,
})
export class HighlightDirective {
  // การที่เราจะใช้ Directive เพื่อตกแต่ง style ให้กับ Component โดยตรงก็เลี่ยงไม่ได้ที่จะใช้ ElementRef
  constructor(private elementRef: ElementRef) {
    // เราสามารถเขียนให้ style ทำงานบน Component ที่นำ Directive นี้ไปใช้ได้ทันที ผ่านการสร้างใน { }
    // การกำหนดค่าตรงนี้คือการกำหนดค่าการแสดงผลครั้งแรกเมื่อเรา init Component ที่ใช้ Directive นี้
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }

  // ถ้าเราอยากเขียนเป็น Event แทนก็ได้เหมือนกัน
  // ให้ใช้ HostListener ในการทำ event binding
  private highlight(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('red');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }
}
