import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
} from '@angular/core';
import { ContentChildClass } from './content-child-class.component';

@Component({
  standalone: true,
  selector: `content-child-locator`,
  template: `
    <h1>This is ContentChildLocator!</h1>
    <ng-content #queryLocator />
  `,

  imports: [ContentChildClass],
})
export class ContentChildLocator implements AfterContentInit {
  @ContentChild('queryLocator') elementB!: ElementRef<HTMLParagraphElement>;

  ngAfterContentInit(): void {
    console.log(this.elementB.nativeElement.textContent);
  }
}
