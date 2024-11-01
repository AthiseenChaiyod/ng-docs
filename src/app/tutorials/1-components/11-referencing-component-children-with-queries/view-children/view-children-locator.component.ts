import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  standalone: true,
  selector: `view-children-locator`,
  template: `
    <div #container>First</div>
    <div #container>Second</div>
    <div #container>Third</div>
    <div #container>Fourth</div>
    <div #container>Fifth</div>
  `,
})
export class ViewChildrenLocator implements AfterViewInit {
  @ViewChildren('container') elementList!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  ngAfterViewInit(): void {
    this.elementList.forEach((item) => {
      console.log(item.nativeElement.textContent);
    });
  }
}
