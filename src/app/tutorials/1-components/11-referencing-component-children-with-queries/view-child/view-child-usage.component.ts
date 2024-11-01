import { Component } from '@angular/core';
import { ViewChildLocator } from './view-child-locator.component';
import { ViewChildClass } from './view-child-class.component';

@Component({
  standalone: true,
  selector: `view-child-usage`,
  template: `
    <view-child-class />
    <view-child-locator />
  `,

  imports: [ViewChildLocator, ViewChildClass],
})
export class ViewChildUsage {}
