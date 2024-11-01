import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { SimpleClass } from './simple-class/simple-class.component';

@Component({
  standalone: true,
  selector: `content-children-class`,
  template: `
    <h1>This is ContentChildrenClass!</h1>
    <ng-content select="simple-class" />
  `,

  imports: [SimpleClass],
})
export class ContentChildrenClass implements AfterContentInit {
  @ContentChildren(SimpleClass) elementList!: QueryList<SimpleClass>;

  ngAfterContentInit(): void {
    this.elementList.forEach((item) => {
      console.log(item.text);
    });
  }
}
