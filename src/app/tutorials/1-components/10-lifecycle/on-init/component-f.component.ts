import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: `component-f`,
  template: `<h1>This is ComponentF</h1>`,
})
export class ComponentF implements OnInit {
  ngOnInit(): void {
    console.log(`ComponentF's ngOnInit()!`);
  }
}
