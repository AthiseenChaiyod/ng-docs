import { Component } from '@angular/core';
import { ViewProvidersService } from './services/view-providers.service';

@Component({
  standalone: true,
  selector: `outer-component`,
  template: `
    <h1>OuterComponent's name: {{ viewProvidersService.name }}</h1>
    <ng-content />
  `,

  viewProviders: [
    { provide: ViewProvidersService, useValue: { name: 'Chaiyod' } },
  ],
})
export class OuterComponent {
  constructor(protected viewProvidersService: ViewProvidersService) {}
}
