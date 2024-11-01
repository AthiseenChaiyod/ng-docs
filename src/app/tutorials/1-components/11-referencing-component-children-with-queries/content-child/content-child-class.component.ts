import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { SimpleClass } from './simple-class/simple-class.component';

@Component({
  standalone: true,
  selector: `content-child-class`,
  template: `
    <h1>This is ContentChildClass!</h1>
    <ng-content select="simple-class" />
  `,
})
export class ContentChildClass implements AfterContentInit {
  @ContentChild(SimpleClass) element!: SimpleClass;

  ngAfterContentInit(): void {
    console.log(this.element.text);
  }
}
