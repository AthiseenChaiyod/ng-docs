import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
} from '@angular/core';

@Component({
  standalone: true,
  selector: `content-children-locator`,
  template: `
    <h1>This is ContentChildrenLocator!</h1>
    <ng-content select="div" #children />
  `,
})
export class ContentChildrenLocator implements AfterContentInit {
  @ContentChildren('children') elementList!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  ngAfterContentInit(): void {
    this.elementList.forEach((item) => {
      console.log(item.nativeElement.textContent);
    });
  }
}
