import { Component } from '@angular/core';
import { AcceptingDataWithInputProperties } from '../accepting-data-with-input-properties.component';

@Component({
  standalone: true,
  selector: `input-usage`,
  // เวลาที่เรานำ input มาใช้ เราก็จะครอบ [ ] ให้กับ input ใน selector tag ของเรา
  // ถ้าเราจะใส่ค่า string ให้กับ input เราจะต้องครอบด้วย ' ' อีกชั้นด้วย
  // เช่น [someData]="'something'"
  // เพราะว่า "" ไม่ใช่ string notation แต่เป็นสัญลักษณ์ที่บอกแค่ว่าเราจะใส่ค่าเฉย ๆ
  // ถ้าเป็นตัวแปรก็สามารถประกาศได้ตรง ๆ เลย แต่ถ้าเป็น string จะต้องครอบด้วย ' '
  template: `<accepting-data-with-input-properties [firstName]="'Gasin'" />`,

  imports: [AcceptingDataWithInputProperties],
})
export class InputUsage {}
