import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: `programmatically-rendering-components`,
  templateUrl: `./programmatically-rendering-components.component.html`,
  styleUrl: `./programmatically-rendering-components.component.css`,
})
export class ProgrammaticallyRenderingComponents {
  // ในบทนี้เราจะมาพูดถึงการ render Component แบบ dynamic กัน
  // ที่ผ่านมาเราเขียนว่าให้ render Component โดยตรงมาตลอด (เขียนแบบ static)
  // เต็มที่ก็อาจจะมีซ่อน Component เอาไว้ด้วย NgIf บ้าง แต่ว่านั่นก็ไม่ได้เรียกว่า dynamic
  // การ render แบบ dynamic ใน Angular จะทำอยู่ 3 วิธีด้วยกัน
  // วิธีแรก ngComponentOutlet, วิธีที่สอง ViewContainerRef, และสุดท้าย Lazy-Loading
  // โดยแต่ละวิธีสามารถอ่านได้ที่ dir: component-outlet, view-container-ref และ lazy-loading
}
