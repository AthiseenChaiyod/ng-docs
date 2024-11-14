import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[customDirective]',
})
// ลองสร้าง Directive 1 ตัวที่จะเปลี่ยนสีเมื่อ mouseenter / mouseleave
export class CustomDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.color = 'green';
  }

  // สร้าง input ด้วย 1 ตัว เพื่อจะทดสอบเรื่องการใช้ hostDirective: []
  @Input({ required: true }) color!: string;

  @HostListener('mouseenter') colorHighlight() {
    this.elementRef.nativeElement.style.color = this.color;
  }

  @HostListener('mouseleave') colorDefault() {
    this.elementRef.nativeElement.style.color = 'green';
  }

  ngOnInit(): void {
    console.log(`This is Custom Directive!`);
  }
}
