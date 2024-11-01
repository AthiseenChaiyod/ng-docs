import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SimpleClass } from './simple-class/simple-class.component';

@Component({
  standalone: true,
  selector: `view-children-class`,
  template: `
    <simple-class />
    <simple-class />
    <simple-class />
    <simple-class />
    <simple-class />
  `,

  imports: [SimpleClass],
})
export class ViewChildrenClass implements AfterViewInit {
  @ViewChildren(SimpleClass) elementList!: QueryList<SimpleClass>;

  ngAfterViewInit(): void {
    this.elementList.forEach((item) => {
      console.log(item.element.nativeElement.textContent);
    });
  }
}
