import { Component } from '@angular/core';
import { SimpleComponent } from './simple-component/simple-component.component';

@Component({
  standalone: true,
  selector: `binding-dynamic-text-properties-and-attributes`,
  templateUrl: `./binding-dynamic-text-properties-and-attributes.component.html`,
  styleUrl: `./binding-dynamic-text-properties-and-attributes.component.css`,

  imports: [SimpleComponent],
})
export class BindingDynamicTextPropertiesAndAttributes {
  // ตัวอย่าง property ของ text interpolation, properties and attributes binding
  text: string = 'Athiseen';
  isDisable: boolean = true;
  isAriaHidden: boolean = true;

  // ตัวอย่าง property ของ class binding
  isClassAvailable: boolean = true;

  // ตัวอย่าง property ของ CSS Style Binding
  isRed: string = 'red';
}
