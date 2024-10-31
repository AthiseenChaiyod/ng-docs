import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
} from '@angular/core';
import { ComponentC } from './component-c.component';

@Component({
  standalone: true,
  selector: `component-b`,
  template: `
    <h1>This is ComponentB</h1>
    <component-c />
  `,

  imports: [ComponentC],
})
export class ComponentB
  implements
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  ngDoCheck(): void {
    console.log(`This is Component B's ngDoCheck()`);
  }

  ngAfterContentInit(): void {
    console.log(`This is Component B's ngAfterContentInit()`);
  }

  ngAfterContentChecked(): void {
    console.log(`This is Component B's ngAfterContentChecked()`);
  }

  ngAfterViewInit(): void {
    console.log(`This is Component B's ngAfterViewInit()`);
  }

  ngAfterViewChecked(): void {
    console.log(`This is Component B's ngAfterViewChecked()`);
  }
}
