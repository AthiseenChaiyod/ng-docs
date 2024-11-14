import { Component } from '@angular/core';
import { DirectiveCompositionApi } from '../directive-composition-api.component';

@Component({
  standalone: true,
  selector: 'directive-usage',
  template: `<directive-composition-api [someColor]="'red'" />`,

  imports: [DirectiveCompositionApi],
})
export class DirectiveUsage {}
