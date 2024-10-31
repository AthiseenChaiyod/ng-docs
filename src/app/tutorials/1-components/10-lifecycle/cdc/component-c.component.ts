import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
} from '@angular/core';

@Component({
  standalone: true,
  selector: `component-c`,
  template: `<h1>This is ComponentC</h1>`,
})
export class ComponentC
  implements
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  ngDoCheck(): void {
    console.log(`This is Component C's ngDoCheck()`);
  }

  ngAfterContentInit(): void {
    console.log(`This is Component C's ngAfterContentInit()`);
  }

  ngAfterContentChecked(): void {
    console.log(`This is Component C's ngAfterContentChecked()`);
  }

  ngAfterViewInit(): void {
    console.log(`This is Component C's ngAfterViewInit()`);
  }

  ngAfterViewChecked(): void {
    console.log(`This is Component C's ngAfterViewChecked()`);
  }
}
