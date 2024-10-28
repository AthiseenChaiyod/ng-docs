import { Component } from '@angular/core';

// หากเราต้องการที่จะสร้าง Component สักตัวหนึ่ง อันดับแรกก็ให้เราแปะ @Component() เอาไว้ข้างบนด้วย
// และจะต้องใส่ metadata เอาไว้ข้างในเสมอด้วย { }
@Component({
  // โดยทั่วไปแล้ว metadata ที่เราจะใส่เพื่อให้ Component นี้สามารถทำงานได้มีอยู่ไม่กี่ตัว
  // ตัวแรกคือ standalone ที่จะทำให้เราสามารถเขียน Component แยกออกมาได้ ไม่ต้องไปเก็บรวมใน Module
  standalone: true,

  // ตัวที่สองคือ selector ถ้า Angular เจอ tag ที่ถูกระบุเอาไว้เวลาเราจะนำ Component นี้ไปใช้
  // โดยเวลาที่เรานำ selector ไปใช้ ก็คือการนำโค้ด template ของเราไปวางไว้แทนที่ selector นั่นแหละ
  // สมมติว่าเรามี selector: 'something', template: '<div>Hello World!</div>'
  // แล้วเรา imports ไปใช้ที่อื่นเวลาที่เราแปะ tag <something /> เอาไว้ก็จะถูกแทนที่ด้วยโค้ดตรง template
  // เช่น จาก <something /> ก็จะเป็น <div>Hello World!</div> แทน
  selector: `anatomy-of-a-component`,

  // เป็นที่ที่เราจะเขียนโค้ด HTML ของ Component
  templateUrl: `./anatomy-of-a-component.component.html`,

  // เป็นที่ที่เราจะเขียนโค้ด CSS ของ Component
  styleUrl: `./anatomy-of-a-component.component.css`,
})
export class AnatomyOfAComponent {}
