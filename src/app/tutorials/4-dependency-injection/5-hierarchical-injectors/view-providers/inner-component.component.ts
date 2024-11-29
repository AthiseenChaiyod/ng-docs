import { Component } from '@angular/core';
import { ViewProvidersService } from './services/view-providers.service';

@Component({
  standalone: true,
  selector: `inner-component`,
  template: `<h1>InnerComponent's name: {{ viewProvidersService.name }}</h1>`,
})
export class InnerComponent {
  constructor(protected viewProvidersService: ViewProvidersService) {}
}
