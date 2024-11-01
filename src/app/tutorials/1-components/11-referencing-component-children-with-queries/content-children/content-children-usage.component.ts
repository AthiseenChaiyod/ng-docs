import { Component } from '@angular/core';
import { ContentChildrenClass } from './content-children-class.component';
import { SimpleClass } from './simple-class/simple-class.component';
import { ContentChildrenLocator } from './content-children-locator.component';

@Component({
  standalone: true,
  selector: `content-children-usage`,
  template: `
    <content-children-class>
      <simple-class></simple-class>
      <simple-class></simple-class>
      <simple-class></simple-class>
      <simple-class></simple-class>
      <simple-class></simple-class>
    </content-children-class>

    <content-children-locator>
      <div #children>First</div>
      <div #children>Second</div>
      <div #children>Third</div>
      <div #children>Fourth</div>
      <div #children>Fifth</div>
    </content-children-locator>
  `,

  imports: [ContentChildrenClass, ContentChildrenLocator, SimpleClass],
})
export class ContentChildrenUsage {}
