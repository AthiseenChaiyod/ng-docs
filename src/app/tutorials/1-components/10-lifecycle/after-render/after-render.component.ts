import { afterNextRender, afterRender, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: `after-render`,
  template: `<h1 id="nice">Text color</h1>`,
  styleUrl: `./after-render.component.css`,
})
export class AfterRender {
  constructor() {
    afterRender({
      earlyRead: () => {
        // อ่านค่า color ก่อนที่จะเปลี่ยนแปลงค่า
        const h1 = document.getElementById('nice');
        const initialColor = window.getComputedStyle(h1!).color;
        console.log('Initial color:', initialColor);
      },
      write: () => {
        // หลังจากอ่านค่าแรกเริ่มแล้วก็ให้เปลี่ยนสีเป็น blue
        const h1 = document.getElementById('nice');
        h1!.style.color = 'blue';
      },
      read: () => {
        // อ่านค่าอีกครั้งหลังจากสีเปลี่ยนแล้ว จะได้ค่า rgb ของ blue มา
        const h1 = document.getElementById('nice');
        const newColor = window.getComputedStyle(h1!).color;
        console.log('New color:', newColor);
      },
    });

    // afterNextRender() ก็ทำงานเหมือนกันแหละ แค่ทำงานครั้งที่สองของการ render ครั้งเดียว
    afterNextRender({});
  }
}
