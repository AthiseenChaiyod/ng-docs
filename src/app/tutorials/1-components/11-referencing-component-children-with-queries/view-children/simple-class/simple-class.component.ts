import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: `simple-class`,
  template: `<h1 #header>This is SimpleClass!</h1>`,
})
export class SimpleClass {
  @ViewChild('header') element!: ElementRef<HTMLHeadElement>;
}
