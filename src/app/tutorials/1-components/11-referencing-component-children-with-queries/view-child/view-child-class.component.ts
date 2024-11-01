import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SimpleClass } from './simple-class/simple-class.component';

@Component({
  standalone: true,
  selector: `view-child-class`,
  template: `<simple-class />`,

  imports: [SimpleClass],
})
export class ViewChildClass implements AfterViewInit {
  @ViewChild(SimpleClass) element!: SimpleClass;

  ngAfterViewInit(): void {
    console.log(this.element.element.nativeElement.textContent);
  }
}
