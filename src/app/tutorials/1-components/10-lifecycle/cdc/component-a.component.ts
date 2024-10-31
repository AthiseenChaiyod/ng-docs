import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
} from '@angular/core';
import { ComponentB } from './component-b.component';

// imports Component นี้ไปวางที่ Root เพื่อดูลำดับการทำงานได้เลย
@Component({
  standalone: true,
  selector: `component-a`,
  template: `
    <h1>This is ComponentA</h1>
    <component-b />
  `,

  imports: [ComponentB],
})
export class ComponentA
  implements
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  ngDoCheck(): void {
    console.log(`This is Component A's ngDoCheck()`);
  }

  ngAfterContentInit(): void {
    console.log(`This is Component A's ngAfterContentInit()`);
  }

  ngAfterContentChecked(): void {
    console.log(`This is Component A's ngAfterContentChecked()`);
  }

  ngAfterViewInit(): void {
    console.log(`This is Component A's ngAfterViewInit()`);
  }

  ngAfterViewChecked(): void {
    console.log(`This is Component A's ngAfterViewChecked()`);
  }
}
