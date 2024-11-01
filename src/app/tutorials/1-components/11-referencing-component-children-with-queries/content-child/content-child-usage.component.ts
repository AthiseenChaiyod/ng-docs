import { Component } from '@angular/core';
import { ContentChildLocator } from './content-child-locator.component';
import { ContentChildClass } from './content-child-class.component';
import { SimpleClass } from './simple-class/simple-class.component';

@Component({
  standalone: true,
  selector: `content-child-usage`,
  template: `
    <content-child-locator>
      <p #queryLocator>This is some locator text content.</p>
    </content-child-locator>

    <content-child-class>
      <simple-class />
    </content-child-class>
  `,

  imports: [ContentChildLocator, ContentChildClass, SimpleClass],
})
export class ContentChildUsage {}
