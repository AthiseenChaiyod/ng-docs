import {
  AfterContentChecked,
  AfterContentInit,
  afterNextRender,
  afterRender,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  standalone: true,
  selector: `lifecycle`,
  templateUrl: `./lifecycle.component.html`,
  styleUrl: `./lifecycle.component.css`,
})
export class Lifecycle
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // afterRender(), afterNextRender() คือ lifecycle ตัวพิเศษที่เพิ่งเพิ่มเข้ามาใหม่
  // จะต้องสร้างเอาไว้ในส่วนของ { } ของ constructor
  // ทั้งสองตัวเป็น function ที่จะรับ argument object 1 ตัว
  // object จะมี earlyRead, write, read, mixedReadWrite ให้เราใช้งาน
  // property จะมีไว้ให้เราใช้งานแต่ละสถานการณ์ไม่เหมือนกัน เพื่อให้เราอ่านโค้ดง่ายขึ้นด้วย
  // earlyRead จะให้เราอ่านค่าก่อนที่เราจะแก้ไข Element นั้น
  // write จะเอาไว้ให้เราแก้ไขค่าของ Element
  // read จะเอาไว้ให้เราอ่านค่าหลังจากที่เรา render ค่าใหม่แล้ว (หลังจาก read)
  // mixedReadWrite เอาไว้ทำทั้ง read / write พร้อมกัน
  constructor() {
    // afterRender() จะทำงานทุกครั้งที่มีการ render Component ตัวนี้
    afterRender({});

    // ส่วน afterNextRender() จะทำงานแค่ครั้งเดียว คือครั้งที่สองของการ render
    afterNextRender({});
  }

  // ngOnInit() จะทำงานเฉพาะเมื่อ Component นี้ถูก Init ขึ้นมา
  // ก่อนอื่นต้องมาพูดเรื่องการสร้าง Component Tree กันก่อน
  // เวลาที่เราจะเริ่มสร้าง Component Tree เราจะเริ่มจากตัวที่ถูกนำมา bootstrap
  // โดยส่วนมากจะเป็น AppModule, RootModule ที่มาพร้อมกับการสร้าง Application ด้วย CLI อยู่แล้ว
  // พอเราจะสร้าง Root เมื่อ Angular เจอ Component ตัวไหน ngOnInit() ก็จะทำงาน
  // และด้วยความที่ Root ก็มี Child Component ที่ถูก imports เข้ามาก็เลยต้องไปสร้าง Child ด้วย
  // ทำไล่ลงไปเรื่อย ๆ จนถึงตัวล่างสุดของ Application
  // แปลว่า ngOnInit() จะทำงานไล่จาก Root ลงไปจนถึงตัวล่างสุด
  // ลำดับของบรรทัดใน HTML ก็มีผลต่อการสร้าง Instance ของ Component ด้วย
  // ตัวไหนที่อยู่บรรทัดบน (แสดงผลก่อน) ก็จะถูกสร้างก่อน ดังนั้น ngOnInit() จะทำงานก่อน
  // ทดสอบการทำงานได้จากโค้ดใน dir: on-init
  ngOnInit(): void {
    console.log(`This is Lifecycle's ngOnInit()`);
  }

  // ตัวต่อไปคือ ngOnChanges() ที่จะทำงานก่อน ngOnInit()
  // ที่เอามาไว้เป็นลำดับที่สองเพราะว่าจะต้องอธิบายเรื่องการสร้าง Component Tree ก่อนไม่งั้นจะอ่านไม่เข้าใจ
  // ngOnChanges() จะทำงานทุกครั้งที่มีการเปลี่ยนแปลงค่า Input จากภายนอก (ที่ที่ไม่ใช้ตัวมันเอง)
  // เช่น เรามี ComponentA อยู่ตัวนึงที่มี @Input({ required: true }) name!: string;
  // จะเห็นได้ว่าตอนแรกสุดค่าของ name ไม่มี ดังนั้นเราจะตั้งค่าให้มันใน tag ผ่าน input binding แทน
  // เช่น <component-a [name]="'Somebody'" />
  // เมื่อมีค่าถูกเปลี่ยนแปลงตรงที่นำมันไปใช้งาน ก็จะทำงาน OnChanges ขึ้นเสมอ
  // โดยตัว ngOnChanges() จะมี argument ที่เรียกว่า SimpleChanges ให้ใช้งานด้วย
  // เราสามารถเข้าถึงค่าก่อนหน้า ค่าปัจจุบัน และค่าถูกเปลี่ยนครั้งแรกหรือเปล่ามาใช้งานได้
  // แต่ว่าไม่ใช่จะเข้าใช้ผ่านการ . เข้าไปใน changes ได้เลย
  // changes เป็นแค่ตัวแปรที่จะเก็บค่าที่มีการเปลี่ยนแปลงเอาไว้ข้างใน
  // เช่น @Input() ชื่อ state เปลี่ยนแปลงก็จะมี object changes ที่มี object state อยู่ข้างในอีกที
  // ถ้าเราเข้าถึง state ได้ก็จะสามารถ . เข้าไปดูค่าล่าสุด ค่าก่อนหน้า และค่านี้ถูกเปลี่ยนครั้งแรกหรือเปล่าได้
  // เช่น changes[state].currentValue; แต่อาจเห็น error อ่านค่า defined ไม่ได้
  // สรุปก็คือ เราสามารถ . ดูความเปลี่ยนแปลงได้โดยการระบุชื่อของสิ่งที่เราจะดูไว้ใน [ ] หลัง changes
  // ถ้าเราไม่มีชื่อตัวแปร หรือต้องการเขียนให้มัน dynamic มากขึ้นเราก็จะต้อง for loop ออกมาดูเองว่ามีอะไรบ้าง
  // แต่ว่าในการทำ ngOnChanges() ครั้งแรก ค่าของ previousValue จะเป็น undefined เสมอ
  // ทดสอบการทำงานได้จากโค้ดใน dir: on-changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`This is Lifecycle's ngOnChanges()`);

    // ตัวอย่างโค้ดการ loop ออกมาดูว่ามีตัวแปรอะไรที่สามารถส่องดูได้ด้วย changes ได้บ้าง (กรณีมีหลายตัวแปร)
    // และทำการ log ค่า currentValue, previousValue, firstChange ออกมาดู
    // หรือเราจะเข้าดูโดยตรงเลยก็ได้เหมือนกัน ถ้าเรามีชื่อของ change ที่เราอยากดูอยู่แล้ว
    // เช่น changes[someVar].currentValue;
    // แต่การเข้าดูโดยตรงจะ static หน่อย ไม่ค่อย dynamic
    for (const item in changes) {
      const value = changes[item];
      console.log(value.currentValue);
      console.log(value.previousValue);
      console.log(value.firstChange);
    }
  }

  // ต่อมาคือ ngDoCheck() ที่จะทำงานทุกครั้งเมื่อเข้าสู่ Change Detection Cycle
  // ก่อนอื่นมาทำความเข้าใจเรื่องของการ Check กับ Change Detection Cycle กันก่อน
  // การ Check จะเกิดขึ้นเมื่อ Change Detection Cycle ทำงาน (เรียกสั้น ๆ ว่า CDC)
  // โดย CDC ส่วนมากแล้วก็จะทำงานเมื่อมีค่าเปลี่ยนแปลง, event ทำงาน หรือพวก async method ทำงาน
  // เช่น เมื่อเรากด click button ที่ binding เอาไว้กับ method ที่จะเปลี่ยนค่า state ของบาง Component
  // CDC จะทำงานหลังเรากด เพื่อ Check ว่าค่ามีการเปลี่ยนแปลงหรือไม่ ถ้าเปลี่ยนแปลงก็จะ update หลัง Check เสร็จ
  // พอ CDC ทำงานเสร็จแล้วก็ถึงจะ trigger ngDoCheck()
  // โดย CDC จะทำงานแบบ top-down approach เหมือนกับการ Init Component
  // จะไล่ Check Component ทีละตัว ไม่ใช่ DoCheck() ทีเดียวแล้ว Check รวดเดียว
  // โดยจะเช็คจาก root ลงไปข้างล่างสุด แต่จะแบ่งการ Check ออกเป็น 2 ส่วนคือ Content / View
  // Check Content ก็คือเช็คว่า Component ตัวนี้ต้องการ Component ภายนอกตัวอื่นไหม
  // เช่น เรามี ComponentA ที่ต้องการ ComponentB และ ComponentB ก็ต้องการ ComponentC
  // ความสัมพันธ์ประมาณนี้ ComponentA -> ComponentB -> ComponentC
  // เวลา Check เราจะเริ่มจาก A ก่อน โดย A จะต้องการ B ดังนั้น B ก็คือ Content ของ ComponentA
  // เราจะสร้าง tag เปล่า ๆ ของ ComponentB ให้กับ ComponentA ก่อน ทำให้ ngAfterContentInit() ทำงาน
  // PS. ที่จริงเป็นการทำ content projection ไม่ใช่ tag เปล่า แต่ว่าไม่เห็นภาพเลยอธิบายมุมมองส่วนตัว
  // แล้วเราก็จะเช็คว่า tag ของ ComponentB ที่เราสร้างขึ้นมานั้นมีการเปลี่ยนแปลงหรือไม่
  // ซึ่งไม่มีอยู่แล้ว เพราะเราเพิ่งสร้างครั้งแรก ทำให้การทำงานของ ngAfterContentChecked ก็จะผ่านไปอีกลำดับนึง
  // แต่อย่าลืมว่าตอนนี้ tag ComponentB ของเราเป็น tag เปล่า ทำให้เราต้องไปสร้าง ComponentB ขึ้นมาก่อน
  // ไม่อย่างนั้น A จะไม่สามารถแสดงผลได้ จะเข้าสู่ขั้นตอนการ Generate View
  // เมื่อเราจะสร้าง B ก็ทำงานตามลำดับของ CDC อีกรอบ
  // ให้เราดูว่า B ต้องใช้อะไรบ้างในการสร้าง Template ซึ่งเราก็จะเจอ C แล้วก็สร้าง tag เปล่าขึ้นมาเหมือนเดิม
  // จากการตรวจสอบของ ComponentB's ngAfterContentChecked การเปลี่ยนแปลงจะยังไม่เกิด
  // เมื่อตรวจสอบครบแล้วว่าต้องการอะไรบ้างก็ให้ไปดูที่ C เพราะ B จะสร้าง View ไม่ได้ถ้าไม่มี C
  // ทีนี้วนตามลำดับเดิม content init ก่อนว่าใช้อะไรบ้าง content checked ว่ามีการเปลี่ยนแปลงไหม
  // เราจะเห็นว่า C ไม่ได้ต้องการอะไรแล้ว จบที่ตัวของมันเอง ทีนี้เราก็จะสร้าง View ของ C ได้แล้ว
  // View ก็คือ template ทั้งหมดของ Component โดยที่ตัว Component เองไม่ต้องการ source ภายนอกอีก
  // ทำให้ C ผ่านการทำงานของ ViewInit ไปได้ จากนั้นก็เช็คด้วย View Checked ว่าเจอความเปลี่ยนแปลงไหม
  // ซึ่งไม่เจอเพราะเราเพิ่งสร้าง ทำให้ตอนนี้ C จะทำงานครบ CDC เป็นตัวแรก
  // กล่าวคือ ContentInit -> ContentChecked -> ViewInit -> ViewChecked ทำงานครบแล้ว
  // ทีนี้ B ก็พร้อมที่จะสร้าง View แล้วเพราะว่าเราได้ C มาแล้ว
  // ViewInit, ViewChecked ของ B ก็จะทำงานเหมือนกัน แล้วเราก็จะได้ B มา
  // สุดท้าย A เราก็พร้อมสร้างเสียที ViewInit, ViewChecked ของ A จะทำงานเป็นลำดับสุดท้าย
  // สรุปได้ดังนี้
  // ContentInit A -> ContentChecked A -> ContentInit B -> ContentChecked B -> ...
  // ContentInit C -> ContentChecked C -> ViewInit C -> ViewChecked C -> ...
  // ViewInit B -> ViewChecked B -> ViewInit A -> ViewChecked A จะทำให้เราได้ A มา
  // เป็นอันสิ้นสุดการทำงานของ Content / View Lifecycle
  // ทดสอบการทำงานได้จากโค้ดใน dir: cdc
  ngDoCheck(): void {
    // เข้า CDC ปุ๊บ ทำงานปั๊บ
    console.log(`This is Lifecycle's ngDoCheck()`);
  }

  // ngAfterContentInit() จะทำงานหลังจาก DoCheck() และจะทำงานแค่ครั้งเดียว
  // จะเป็นการสร้าง tag เปล่าที่ Component นี้ต้องการให้กับมันเอง
  ngAfterContentInit(): void {
    console.log(`This is Lifecycle's ngAfterContentInit()`);
  }

  // ngAfterContentChecked() จะทำงานหลังจาก ContentInit ในครั้งแรก
  // ครั้งต่อ ๆ ไปจะทำงานหลัง DoCheck()
  // ทำงานเพื่อตรวจสอบว่า Content ที่เราอยากได้มีการเปลี่ยนแปลงใด ๆ หรือไม่
  ngAfterContentChecked(): void {
    console.log(`This is Lifecycle's ngAfterContentChecked()`);
  }

  // ngAfterViewInit() จะทำงานเหมือนกับ ContentInit นั่นแหละ แค่เปลี่ยนไปสร้าง View แทน
  // ก็คือสร้าง template ทั้งหมดที่ Component นี้ต้องการ
  // จะทำงานขั้นตอนนี้ไม่ได้ถ้ายังไม่ผ่าน ContentInit / ContentChecked มา
  // ไม่งั้นก็จะไม่รู้ว่า Content ตัวไหนที่เราต้องใช้บ้าง
  ngAfterViewInit(): void {
    console.log(`This is Lifecycle's ngAfterViewInit()`);
  }

  // ngAfterViewChecked() จะเป็น lifecycle ตัวสุดท้ายของ CDC
  // ทำงานหลัง DoCheck เสมอ และทำงานหลัง ContentChecked ในครั้งแรก
  // ในครั้งถัด ๆ ไปจะทำงานหลัง ContentChecked
  // หรือ DoCheck() -> ContentChecked() -> ViewChecked()
  // มีหน้าที่ตรวจสอบความเปลี่ยนแปลงของ template Component
  ngAfterViewChecked(): void {
    console.log(`This is Lifecycle's ngAfterViewChecked()`);
  }

  // ngOnDestroy() จะทำงานเมื่อ Component ถูกนำออกจากการแสดงผลบนหน้าจอ
  // ไม่ว่าจะจากการหยุดการทำงานหรือการซ่อน Component ด้วย NgIf
  // เหมาะกับการทำงานปิดท้ายที่จะลดการใช้ resource ของ application ลง เช่น ปิด subscribe rxjs
  // ทดสอบการทำงานได้จากโค้ดใน dir: on-destroy
  ngOnDestroy(): void {
    console.log(`This is Lifecycle's ngOnDestroy()`);
  }
}
