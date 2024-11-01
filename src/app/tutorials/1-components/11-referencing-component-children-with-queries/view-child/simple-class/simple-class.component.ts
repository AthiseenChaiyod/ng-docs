import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: `simple-class`,
  template: `<h1 #header>This is SimpleClass!</h1>`,
})
export class SimpleClass implements AfterViewInit {
  @ViewChild('header') element!: ElementRef<HTMLHeadElement>;

  ngAfterViewInit(): void {
    console.log(`From SimpleClass: ${this.element.nativeElement.textContent}`);
  }
}
