import { Component } from '@angular/core';
import { CustomDirective } from './directives/custom-directive.directive';

@Component({
  standalone: true,
  selector: 'structural-directive',
  templateUrl: `./structural-directives.component.html`,
  styleUrl: `./structural-directives.component.css`,

  imports: [CustomDirective],
})
export class StructuralDirective {
  personalInfo = {
    name: 'Athiseen',
    age: 25,
  };

  valuableA: any = 'Dragonite';
  valuableB: any = 'Pikachu';
}
