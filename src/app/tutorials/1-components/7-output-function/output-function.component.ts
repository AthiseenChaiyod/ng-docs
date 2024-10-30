import { Component, output } from '@angular/core';

@Component({
  standalone: true,
  selector: `output-function`,
  templateUrl: `./output-function.component.html`,
  styleUrl: `./output-function.component.css`,
})
export class OutputFunction {
  // output() function ก็คือ @Output() นั่นแหละ แต่ใช้ง่ายกว่า
  // จากเดิมเราเขียน @Output() nameChange = new EventEmitter<T>();
  // เราจะเปลี่ยนไปเขียนแค่ nameChange = output<string>() แทน
  // โดยเราสามารถทำ alias ได้ที่ () ด้านหลัง
  // เช่น nameChange = output<string>({ alias: 'something' });
  nameChange = output<string>();
}
