import { Component } from '@angular/core';
import { AnatomyOfAComponent } from '../1-anatomy-of-a-component/anatomy-of-a-component.component';

@Component({
  standalone: true,
  selector: `importing-and-using-components`,

  // ในการนำ Component ภายนอกมาใช้จะต้อง imports มาก่อน
  imports: [AnatomyOfAComponent],

  // แล้วเราก็ค่อยนำ selector ของ Component ตัวนั้นมาใช้
  template: `<anatomy-of-a-component />`,
})
export class ImportingAndUsingComponents {}
