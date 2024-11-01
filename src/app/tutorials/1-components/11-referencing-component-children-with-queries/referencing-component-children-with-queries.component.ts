import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SimpleClass } from './simple-class.component';

@Component({
  standalone: true,
  selector: `referencing-component-children-with-queries`,
  templateUrl: `./referencing-component-children-with-queries.component.html`,
  styleUrl: `./referencing-component-children-with-queries.component.css`,

  imports: [SimpleClass],
})
export class ReferencingComponentChildrenWithQueries {
  // บางครั้ง เราก็อยากจะแก้ไขหรือดึงข้อมูล Component อื่น หรือ Tag ภายใน Component ของเรา
  // อันที่จริงเราสามารถทำได้ด้วยการใช้ getElementById() แหละ แต่ว่ามันวุ่นวาย
  // เราเลยมี @ViewChild() / @ContentChild() เอาไว้ให้เราเข้าถึงสิ่งเหล่านี้
  // @ViewChild() จะมีเอาไว้สำหรับเข้าถึง Tag ใด ๆ ภายใน Component ของเรา
  // เช่น เรามี template: `<h1>hello <span>{{ name }}</span></h1>`
  // แล้วเราอยากรู้แค่ว่า tag h1 มี textContent อะไร เราก็สามารถดึงข้อมูลของ h1 ด้วย @ViewChild ได้เลย
  // โดยการจะดึงข้อมูลด้วย @ViewChild() จะต้องรู้ก่อนว่าเราจะเขียนมันขึ้นมาได้อย่างไร
  // @ViewChild() ก็เหมือนการเขียน @Input() นั่นแหละ สามารถแปะ name: type เอาไว้ข้างหลังได้
  // เช่น @ViewChild() name: T;
  // แต่ว่าจะเกิด error 2 จุด
  // จุดแรกคือเราไม่ได้ใส่ค่าให้กับ name และอีกจุดคือเราจะต้องใส่ค่าให้กับ @ViewChild() ด้วย
  // ซึ่ง @ViewChild() จะรับค่า Class | string ข้างใน ( )
  // เช่น @ViewChild(SomeClass) name: T หรือ @ViewChild('anotherClass') lname: T
  // การใส่ค่า Class ข้างใน ViewChild หมายถึงให้เราดึงข้อมูล tag ของ Class นั้นใน Component นี้ออกมา
  // ดังนั้นตัวแปร name ของเราก็ควรจะมีค่าเป็น Class นั้น ๆ เช่น name: SomeClass
  // ง่าย ๆ ก็คือดึงเอาข้อมูลของ Class นั้นมาใช้นั่นแหละ
  // กับอีกวิธีคือการใส่ string เข้าไป เรียกว่าการใช้ Query Locator
  // โดย Query Locator ไม่ใช่ string ที่จะมาจากไหนก็ได้ เราจะต้องสร้างมันขึ้นมาเองใน tag ที่เราจะดึงข้อมูล
  // สร้างโดยการใช้ # นำหน้า text ใด ๆ เช่น <div #anotherClass />
  // แล้วเราถึงจะนำ 'anotherClass' ไปใส่ให้กับ @ViewChild() ได้ กลายเป็น @ViewChild('anotherClass')
  // วิธีนี้ส่วนมาจะใช้ในการดึงข้อมูลของ Tag ดังนั้น Type จะเป็น ElementRef<T> ซึ่งหมายถึงข้อมูลของ Element
  // ส่วน <T> ด้านหลังจะขึ้นอยู่กับเราว่าดึงมาจาก Tag อะไร เช่น ElementRef<HTMLDivElement>
  // ควรเขียน Generics ติดเอาไว้เพื่อเป็น Type Safety
  // สรุปแล้วเราจะได้ @ViewChild('anotherClass') anotherClass: ElementRef<HTMLDivElement>
  // ในการเข้าถึงข้อมูลนั้น Class จะสามารถ . เอาข้อมูลได้เลยเหมือนที่เราทำเป็นปกติ
  // แต่ว่า ElementRef จะต่างกัน เราจะต้อง . ผ่าน nativeElement เพื่อเอาข้อมูลของ Tag นั้น
  // เช่น อยากได้ข้อมูล text ก็จะใช้ .nativeElement.textContent
  // @ContentChild() หลักการเขียนก็จะเหมือนกับ @ViewChild ทุกอย่าง
  // ต่างกันที่ว่า @ContentChild() จะเอาไว้ใช้เพื่อรับข้อมูล ng-content ของ Component
  // เช่น โค้ดเรามี template: `<span>Content is: <ng-content /></span>`
  // เราสามารถใช้ @ViewChild() เพื่อดึงข้อมูลของ span ได้ แต่ ng-content จะต้องใช้ @ContentChild()
  // ถ้าเราใช้ Class ใน @ContentChild() ก็ไม่เป็นไร แต่ว่าถ้าใช้ Query Locator จะต่างกันกับ @ViewChild()
  // เราไม่สามารถแปะ Query Locator เอาไว้กับ ng-content ได้ เช่น <ng-content #someTag />
  // เมื่อเราดึงข้อมูลด้วย @ContentChild('someTag') จะเกิด Error ทันที
  // เพราะว่า ng-content เป็นแค่เหมือน container บอกเราเฉย ๆ ว่าเราต้องเอาอะไรใส่มาเพื่อ render นะ
  // แต่ข้อมูลจริง ๆ มันจะอยู่ตรง Tag ของ Component ที่เราเรียกใช้
  // สมมติว่าเรามี selector: `some-class` ที่ต้องการ <ng-content select="div" />
  // เวลาเรานำไปใช้ก็จะเป็น <some-class><div>SomeClass!</div></some-class>
  // ข้อมูลที่เราต้องการอย่าง <div>SomeClass!</div> นี่แหละที่เราจะต้องไปแปะ Query Locator เอาไว้
  // นึกภาพง่าย ๆ ก็คือบอก Component ว่าถ้ามีการนำไปใช้ให้ดูด้วยว่ามี ng-content Locator ชื่อนี้ไหม
  // ถ้ามีให้ดึงค่ามาเก็บไว้ใน @ContentChild() ตัวนี้ด้วย
  // แปลว่า Type ของ @ContentChild() จะขึ้นอยู่กับว่าเราจะใส่อะไรเข้ามาใน ng-content
  // รวม ๆ แล้วจะได้ @ContentChild('anotherClass') element!: ElementRef<HTMLHeadElement>
  // แล้วถ้าเราอยาก log ออกมาดูว่าสร้างเสร็จแล้วค่าถูกต้องไหม เราก็ไม่สามารถใช้ ngOnInit() อีก
  // เพราะการสร้าง Content / View จะอยู่ช่วง ngAfterContentInit() / AfterViewInit()
  // ถ้าเราใช้ OnInit ดึงค่าจะเกิด error: undefined
  // และการใช้ ngAfterContentInit() เพื่อดึงข้อมูลของ ngAfterViewInit() ของอีก Component ก็ไม่ได้
  // สมมติว่าเรามี ComponentA -> ComponentB (ComponentA ใช้ B เป็น ng-content)
  // ComponentB เป็น Component ที่ใช้ @ViewChild() ดึงข้อมูล tag ด้วย @ViewChild('header') ...
  // แล้ว ComponentA ที่ใช้ ComponentB อยากจะ ngAfterContentInit() @ViewChild ของ B มาดู
  // เราก็จะเขียนโค้ดเพื่อดึงข้อมูล ComponentB ก่อน @ContentChild(ComponentB) element: ComponentB
  // แล้วเราจะนำ element ไป log ใน ngAfterContentInit()
  // เช่น console.log(this.element.element.nativeElement.textContent)
  // โค้ดทั้งหมดที่เราเขียนจะทำงานไม่ได้
  // เพราะว่าอย่าลืมเรื่อง lifecycle ที่ Content Lifecycle จะทำงานก่อน View Lifecycle
  // ทำให้คำสั่ง log ของเราทำงานก่อนที่จะมีการสร้าง View ที่ ComponentB
  // นั่นทำให้ B เป็น undefined และจะแจ้งเตือนว่า nativeElement เป็น undefined นะ
  // สรุปคือเราจะไม่สามารถใช้ content เพื่อดึง view ของ Child Component มาดูช่วง AfterContentInit ได้
  // ถ้าอยากดูจริง ๆ จะต้องทำในช่วงของ AfterViewInit ของ ComponentA แทน (รอ B init View ก่อน)
  // โดยเราจะมี options ให้ใส่หลังเราใส่ Class | string ให้กับ @Viewchild() / @ContentChild() ด้วย
  // ตัวแรกคือ static: boolean ที่จะทำให้ข้อมูลถูกสร้างตั้งแต่ตอน OnInit แทนที่จะเป็น AfterView / Content
  // แต่ว่าข้อมูลที่เราแปะ static เอาไว้จะต้องแสดงบนหน้าจอตลอดเวลา ห้ามซ่อนหรือลบข้อมูลนี้เด็ดขาด
  // ระวังแค่ว่าการใส่ static หลาย ๆ ตัวเข้าจะทำให้ Application ของเรา init ช้า
  @ViewChild('someElement', { static: true })
  element!: ElementRef<HTMLHeadElement>;

  // ตัวต่อมาคือ descendants: boolean ที่จะเอาไว้ใช้กับพวก @Content...() โดยเฉพาะ
  // โดยทั่วไปแล้วเวลาที่เรา Query @Content...() มาดู เราจะดูแค่ ng-content ของ Component ตัวเราเอง
  // แต่ถ้าเกิดเราอยากให้ดูใน tag ทั้งหมดไม่ว่าจะของตัวเอง ของ Child, Grand Child, etc.
  // เราก็จะต้องใช้ { descendants: true } ในการสั่งให้ดูจนตัวสุดท้ายของ Component Tree ตัวนี้ไปเลย
  // อาจส่งผลต่อ performance เหมือนกัน เพราะดูข้อมูลเยอะต่อหนึ่งรอบ
  @ContentChild('someContent', { descendants: true })
  elementTwo!: ElementRef<HTMLParagraphElement>;

  // ตัวสุดท้ายก็คือ read: Class | string ที่จะเป็น Type Safety อีกตัวหนึ่งในโค้ดของเรา
  // เนื่องจากหากเราประกาศ Type หลังตัวแปร Angular จะเป็นคนเลือกให้ว่าจะใช้ ref อะไรดี
  // ดีหน่อยถ้า Angular เลือกให้ถูกตัว อย่าง ElementRef<HTMLParagraphElement>
  // แต่ถ้าวันไหนเลือกผิด ซวยแน่ ๆ เพราะฉะนั้นการป้องกันอีกทางก็ไม่ได้แย่อะไร
  // read จะทำงานประมาณว่า `แกไม่ต้องเลือกให้ฉันนะ ฉันจะเลือกเอง`
  // เช่น สมมติว่าเราจะใช้ Class ในการส่งเข้าไปใน Decorator แต่ว่าเราจะเข้าถึง element ของ Class แทน
  // เราก็อาจจะเขียน @ViewChild(SomeClass) element!: ElementRef<HTMLDivElement>
  // กรณีนี้อาจทำให้เกิดความสับสนได้เวลา Angular เลือก ref หรือเวลาเรากลับมาอ่านโค้ด
  // การแปะ { read: ElementRef<HTMLDivElement> } เอาไว้อีกชั้นก็จะช่วย Confirm จุดนี้ได้
  @ContentChild('anotherContent', { read: ElementRef<HTMLParagraphElement> })
  elementThree!: ElementRef<HTMLParagraphElement>;

  // สุดท้ายก็คือเรื่องของ @ViewChildren() / @ContentChildren() ที่จะพูดพร้อมกันเลยทีเดียว
  // พวก @ViewChild() / @ContentChild() หากเจอตัวที่มันต้องการแล้วมันจะเอาแค่ตัวแรกสุดเท่านั้น
  // ถ้าเกิดเราอยากให้มันเก็บตัวที่เราต้องการเอาไว้หลาย ๆ ตัวแทนที่จะใช้ Child เราจะเปลี่ยนเป็น Children แทน
  // การใส่ค่าใน (), การใส่ options หรือการสร้างตัวแปรจะเหมือนกันเลย ต่างกันแค่อย่างเดียวคือ type
  // เนื่องจาก Children จะมีหลายตัว ดังนั้นเราจะต้องใช้ type QueryList<T> แทน
  // เช่น @ViewChildren('someLocator') elementList: QueryList<T>
  // เราก็จะรู้แล้วว่าให้ไปหา someLocator ทุกตัวใน Component นี้มานะ เก็บด้วย Type QueryList<T>
  // ให้เรามอง QueryList<T> เป็น Array นั่นแหละ (เพราะเราต้องมา foreach เอาอยู่ดี)
  // แล้วทีนี้เก็บ someLocator เอาไว้ใน array แล้ว array ประเภทอะไรล่ะ?
  // เราเลยต้องประกาศ Generics Type ให้กับ QueryList<T> ด้วย
  // โดย Type ที่เราจะใช้ก็คือ type ที่เราอยากได้จาก View / Content นั่นแหละ
  // เช่นอยากได้ Class ก็ใช้ QueryList<SomeClass> อยากได้ element ก็ QueryList<ElementRef<T>>
  // ทีนี้เวลาเรานำไป .forEach() เราก็จะสามารถเรียกดูข้อมูลของ Query ได้แล้ว
  // ตัวอย่างการเขียนโค้ดทั้งหมดสามารถดูได้ที่ dir ของ referencing-component-children-with-queries
  @ViewChildren(SimpleClass) elementListA!: QueryList<SimpleClass>;
  @ContentChildren('queryLocator') elementListB!: QueryList<
    ElementRef<HTMLDivElement>
  >;
}
