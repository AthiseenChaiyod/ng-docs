import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: `simple-class`,
  template: `<h1>This is SimpleClass!</h1>`,
})
export class SimpleClass {
  text: string = 'Athiseen';
}
