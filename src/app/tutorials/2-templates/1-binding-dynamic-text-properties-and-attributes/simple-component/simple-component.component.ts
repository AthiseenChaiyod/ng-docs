import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: `simple-component`,
  template: `<h1>This is SimpleComponent!</h1>`,
})
export class SimpleComponent {
  @Input({ required: true }) name: string = 'Athiseen';
}
