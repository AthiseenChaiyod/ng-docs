import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: `view-child-locator`,
  template: `<h1 #title>This is ViewChildLocator!</h1>`,
})
export class ViewChildLocator implements AfterViewInit {
  @ViewChild('title') element!: ElementRef<HTMLHeadElement>;

  ngAfterViewInit(): void {
    console.log(this.element.nativeElement.textContent);
  }
}
