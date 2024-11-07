import {
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: `overview`,
  templateUrl: `./overview.component.html`,
  styleUrl: `./overview.component.css`,

  // directives ก่อนที่จะเอามาใช้จะต้อง imports เข้ามาก่อน
  // โดยส่วนมาเป็นสิ่งที่เราเจอ ๆ กันไปแล้วในบทก่อนหน้า
  // อย่าง class. หรือ style. ในบท template binding ที่เราเจอกันไปแล้ว
  // NgClass, NgStyle ก็ทำงานเหมือนกันเลยที่จะทำหน้าที่ binding style / class
  // NgModel ที่เราใช้ทำ two-way binding ก็เป็น directive เหมือนกัน
  // ก่อนหน้าที่เราจะมี @if, @for, @switch ใช้เราจะมี NgIf, NgFor, NgSwitch ในรุ่นก่อน ๆ
  // โดย Angular จะแบ่ง directive ออกเป็น 2 ประเภท คือ attribute / structural
  // attribute directive จะเกี่ยวข้องกับ property / style / class ซะส่วนใหญ่
  // ส่วน structural directive จะเป็นการทำงาน การ render ซะส่วนใหญ่
  // อย่าง NgClass, NgStyle, NgModel อันนี้เป็น attribute directive
  // ส่วน NgIf, NgFor, NgSwitch ก็จะจัดอยู่ใน structural directive
  // ถ้าจะใช้ NgSwitch จะต้อง import 3 ตัว คือ NgSwitch, NgSwitchCase, NgSwitchDefault
  // ใด ๆ ก็ตาม บทนี้แค่จะชี้ให้เห็นว่าเราใช้ directive อะไรกันมาแล้วบ้าง และแต่ละอย่างใช้อย่างไร
  // ปัจจุบันเราจะใช้ @if, @for, @switch, class., style., [()] แทนตัว Ng หมดแล้ว
  imports: [
    NgClass,
    NgStyle,
    FormsModule,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
})
export class Overview {
  // เอาไว้ใช้กับ NgClass
  singleClass: boolean = true;
  arrayClasses: Record<string, boolean> = {
    isColored: true,
    isBold: true,
    isItalic: false,
  };

  // เอาไว้ใช้กับ NgStyle
  arrayStyles: Record<string, string> = {
    color: 'gold',
    'font-weight': 'bold ',
  };

  // เอาไว้ใช้กับ NgIf
  isShow: boolean = true;

  // เอาไว้ใช้กับ NgFor
  itemList: string[] = ['apple', 'orange', 'banana'];

  // เอาไว้ใช้กับ NgSwitch
  whichCase: number = 3;
}
