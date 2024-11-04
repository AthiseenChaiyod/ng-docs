import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  selector: `component-b`,
  template: `<input #locator type="text" (keyup)="updateName()" />`,
})
export class ComponentB {
  // อันดับแรก เราจะต้องทำความสัมพันธ์แบบ ComponentA -> ComponentB ก่อน
  // เราจะสร้าง @Input() เพื่อให้เราสามารถผูกค่า property ของ ComponentA กับ input ได้
  // แล้วค่าของ property ที่เราจะนำมาแสดงก็จะมีค่าขึ้นอยู่กับ input แล้ว
  @Input({ required: true }) name!: string;
  @Output() nameChange = new EventEmitter<string>();
  @ViewChild('locator') inputElement!: ElementRef<HTMLInputElement>;

  updateName() {
    this.nameChange.emit(this.inputElement.nativeElement.value);
  }
}
