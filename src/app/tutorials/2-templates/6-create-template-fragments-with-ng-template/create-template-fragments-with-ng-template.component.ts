import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentA } from './example-components/component-a.component';
import { ComponentB } from './example-components/component-b.component';

@Component({
  standalone: true,
  selector: `create-template-fragments-with-ng-template`,
  templateUrl: `./create-template-fragments-with-ng-template.component.html`,
  styleUrl: `./create-template-fragments-with-ng-template.component.css`,

  imports: [NgTemplateOutlet, ComponentA, ComponentB],
})
export class CreateTemplateFragmentsWithNgTemplate {
  value: number = 20;

  // ตัวอย่างโค้ดการนำ locator มาเก็บไว้ใน ViewChild
  // จะเขียนคล้าย ๆ กับ @ViewChild() ปกติที่เราเคยพูดถึงไปแล้ว
  @ViewChild(TemplateRef, { read: TemplateRef })
  templateElement!: TemplateRef<unknown>;
}
