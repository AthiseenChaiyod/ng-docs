import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: `.some-class:not(div)`,
  template: `<div>This is Class Selector!</div>`,
})
export class ClassSelector {}
