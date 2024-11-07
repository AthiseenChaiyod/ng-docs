import { Component } from '@angular/core';
import { HighlightDirective } from './directives/highlight-directive.directive';
import { ColorDirective } from './directives/color-directive.directive';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: `attribute-directives`,
  templateUrl: `./attribute-directives.component.html`,
  styleUrl: `./attribute-directives.component.css`,

  imports: [HighlightDirective, ColorDirective, CurrencyPipe],
})
export class AttributeDirectives {
  forBindable: number = 3000;
}
