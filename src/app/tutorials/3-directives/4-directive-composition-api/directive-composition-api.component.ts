import { Component } from '@angular/core';
import { DirectiveWithImports } from './directive/directive-with-imports.directive';

@Component({
  standalone: true,
  selector: 'directive-composition-api',
  templateUrl: `./directive-composition-api.component.html`,
  styleUrl: `./directive-composition-api.component.css`,

  // หรือประกาศ Class ตรง ๆ เลยก็ได้ ถ้าไม่มี customize อะไร
  hostDirectives: [DirectiveWithImports],
})
export class DirectiveCompositionApi {}
