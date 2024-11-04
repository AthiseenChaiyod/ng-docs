import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: `adding-event-listeners`,
  templateUrl: `./adding-event-listeners.component.html`,
  styleUrl: `./adding-event-listeners.component.css`,
})
export class AddingEventListeners {
  // ในการรับค่า argument นั้น ถ้าเกิดเราจะใช้ event ประเภทไหนก็ใส่ประเภทนั้นไป
  // เช่น MouseEvent, KeyboardEvent, etc.
  logEvent(event: MouseEvent) {
    console.log(`Click at X: ${event.clientX}, Y: ${event.clientY}`);
  }
}
