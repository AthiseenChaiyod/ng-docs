import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: `using-dom-apis`,
  templateUrl: `./using-dom-apis.component.html`,
  styleUrl: `./using-dom-apis.component.css`,
})
export class UsingDomApis implements OnInit {
  // เรื่องของการใช้ DOM APIs เราเพิ่งทำกันมาเมื่อบทที่แล้ว
  // นั่นก็คือการเข้าถึง Element โดยตรงเพื่อแก้ไขมันด้วย ElementRef<T>
  // เราสามารถทำได้โดยตรงเหมือนกันด้วยการ inject ElementRef เข้ามาใน constructor
  // การ inject ElementRef เข้ามาจะหมายถึง Component ตัวนี้นี่แหละ
  // ระวังไว้แค่ว่าการที่เราใช้ style บน @Component({}) นั้นจะ override elementRef ไปเลย
  // สามารถใช้ Renderer2 ก็ได้เหมือนกัน แต่ว่าจะไปพูดถึงอีกทีในบท Animation
  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  ngOnInit(): void {
    // ทดสอบการแก้ไขสีของ Component และลอง log ออกมาดู
    this.elementRef.nativeElement.style.color = 'red';
    console.log(this.elementRef.nativeElement.style.color);
  }
}
