import { Component, inject } from '@angular/core';
import { CustomService } from './dependencies/custom-service.service';
import { ComponentB } from './components/component-b.component';

@Component({
  standalone: true,
  selector: 'understanding-dependency-injection',
  templateUrl: `./understanding-dependency-injection.component.html`,
  styleUrl: `./understanding-dependency-injection.component.css`,

  // ใน Component นี้ แม้ว่าเราจะ import ComponentB มาก็ตาม แต่ว่า instance service ที่ใช้จะแยกกัน
  // เพราะ ComponentB ประกาศ providers เอาไว้แล้ว
  // แต่ Component นี้จะใช้ singleton instance เพราะว่าไม่ได้ประกาศ providers เอาไว้
  // และเป็นตัวสุดท้ายของความสัมพันธ์ จึงไม่มี parent ให้ไปขอ instance มาด้วย
  imports: [ComponentB],
})
export class UnderstandingDependencyInjection {
  // การ inject service มาใช้มีสองวิธี
  // วิธีแรกที่นิยมคือการใช้ constructor() ให้เราประกาศตัวแปร Type Service นั้นเอาไว้ได้เลย
  constructor(private customService: CustomService) {}

  // กับอีกวิธีคือการใช้ inject() โดยให้สร้างตัวแปรขึ้นมาแล้ว assign ค่าให้เท่ากับ inject(service)
  // เช่น someService = inject(SomeService)
  // คล้าย ๆ กับที่เราทำ Lazy-loading ที่เราเคยทำไปในบทก่อน ๆ
  sameService = inject(CustomService);

  clickTest() {
    this.customService.logSomething();
  }
}
