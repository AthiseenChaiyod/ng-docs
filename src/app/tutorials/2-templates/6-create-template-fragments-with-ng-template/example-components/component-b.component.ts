import { Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  standalone: true,
  selector: `component-b`,
  template: `<button (click)="showTemplate()">Show context!</button>`,
})
export class ComponentB {
  constructor(private viewContainerRef: ViewContainerRef) {}

  @Input({ required: true }) templateWithContext!: TemplateRef<unknown>;

  showTemplate() {
    this.viewContainerRef.createEmbeddedView(this.templateWithContext, {
      firstName: 'Athiseen',
    });
  }
}
