import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: `accepting-data-with-input-properties`,
  templateUrl: `./accepting-data-with-input-properties.component.html`,
  styleUrl: `./accepting-data-with-input-properties.component.css`,
})
export class AcceptingDataWithInputProperties {
  // @Input() จะทำให้เราสามารถใส่ค่าให้กับตัวแปรนี้ใน selector ที่เรานำไปประกาศใช้ได้
  // สมมติว่าเรามีค่า @Input() height: number = 0; ใน selector: "some-component"
  // เวลานำไปใช้ ค่าของ @Input() สามารถตั้งค่าให้มันใหม่ได้โดยการประกาศชื่อและครอบ [] ให้มันใน selector
  // เช่น <some-component [height]="200" /> ถ้าเป็น string ก็ต้องมี '' ครอบไว้อีกชั้น
  // เช่น <some-component [lastName]="'Chaiyod'"
  // เหมาะกับการนำมาใช้เป็นตัวแปรในการรับค่ามา initiate Component เช่น ความสูง สี etc.
  // โดยข้างใน () ของ @Input เราก็สามารถใส่ metadata ไปให้ได้เหมือน @Component เลย
  // มีหลัก ๆ 3 ตัวคือ required: boolean, transform: function และ alias: string
  // required จะเป็นค่าที่จะบังคับให้เราต้องใส่ input นี้มาด้วยเสมอข้างใน selector หรือไม่
  // เช่น ถ้าเรามี @Input({ required: true }) height!: number ใน selector="some-thing"
  // แปลว่าตอนที่เราจะนำไปใช้ เราจะมี height ด้วยเสมอ เช่น <some-thing [height]="999" />
  // transform จะรับค่า function (ใส่มาแค่ชื่อ function ไม่ต้องใส่ () ตามหลัง)
  // สมมติว่าเรามี function ที่จะรับค่า parameter: string ไปและ return `Hello ${name}` กลับมา
  // เช่น หากเรามี function TransformText(text: string) { return `Text: ${text}` }
  // เราก็จะเรียกใช้ transform โดยการ : ด้านหลังและตามด้วยชื่อ function
  // เช่น @Input({ transform: TransformText }) name: string = 'Athiseen'
  // เมื่อเรานำ name ไปใช้จะได้ `Text: Athiseen` แทนที่จะเป็น `Athiseen` เฉย ๆ
  // แต่ว่าให้เราไปสร้าง function ด้านนอก Class ไม่อย่างนั้นเราจะ ref มาไม่ได้
  // และตัวสุดท้ายคือ alias: string
  // จะเป็นชื่อที่เราเอาไว้ใช้ตอนสร้าง tag แทนที่จะเป็นชื่อของ @Input() ที่เราตั้ง
  // เช่น @Input({ alias: 'anotherName' }) name: string = 'Athiseen'
  // เวลาเราเอาไปใช้ใน tag สมมติว่า selector ของเราคือ 'some-thing'
  // เราจะใช้ anotherName แทน name ในการใส่ค่าให้กับ name
  // เช่น <some-thing [anotherName]="'some-name'" />
  @Input({ required: true, transform: transformString, alias: 'firstName' })
  name: string = 'Athiseen';
}

// เวลาที่เราจะสร้าง function สำหรับนำมาใช้กับ transform ให้เราสร้างเอาไว้นอก Class
function transformString(name: string | undefined): string {
  return `Hello there: ${name}`;
}
