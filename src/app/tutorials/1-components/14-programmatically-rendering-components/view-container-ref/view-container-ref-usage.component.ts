import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { SimpleComponent } from './simple-component/component-a.component';

@Component({
  standalone: true,
  selector: `view-container-ref-usage`,
  template: `
    <button (click)="loadComponent()">Load</button>
    <button (click)="removeComponent()">Remove</button>
  `,
})
export class ViewContainerRefUsage {
  // วิธีที่สองเราจะใช้ ViewContainerRef ซึ่งที่จริงเรื่องนี้จะอธิบายอย่างละเอียดในบทถัด ๆ ไป
  // บทนี้เราจะรู้แค่ว่า ViewContainerRef ใช้ทำ dynamic rendering ยังไงก็พอ
  // วิธีนี้จะไม่ใช่การ render ตาม condition เหมือนกับ NgComponentOutlet
  // แต่จะเป็นการสั่งให้สร้าง Component ขึ้นมาใหม่เลยเมื่อเราต้องการ
  // อันดับแรกให้เรา inject ViewContainerRef เข้ามาก่อน
  // ViewContainerRef จะทำหน้าที่ในการสร้าง Component ของเราขึ้นมา
  // ต่อมาก็ให้เราไปเขียน event อะไรก็ได้ที่พอเกิดแล้วจะสร้าง Component ขึ้นมา
  constructor(private viewContainerRef: ViewContainerRef) {}

  // ถ้าเราอยากแก้ไข Component ที่เราสร้างแต่ละตัวด้วย เราก็ต้องมีการกำหนดค่าเพิ่มเติม
  // โดยใช้ type เป็น ComponentRef<T> เพื่อให้เราสามารถใช้คำสั่งบางอย่างที่เกี่ยวข้องกับ ComponentRef ได้
  // เช่น .destroy() เพื่อทำลาย Component ที่เราเพิ่งสร้าง
  // ส่วน Generics จะบังคับให้เราใส่มา เราจะผูก Component ที่เราอยากจะสร้างขึ้นมาเอาไว้ด้วย
  // ทำให้เราสามารถเข้าถึง property / method ข้างใน Component ได้ด้วย .instance
  // การประกาศตัวแปร: createdComponent!: ComponentRef<SomeComponent>
  // เราจะได้ตัวแปร createdComponent ที่ใช้ ComponentRef method ได้และอ้างอิงถึง SomeComponent ด้วย
  // สมมติว่า SomeComponent มี property name: string = 'Athiseen'
  // เราก็สามารถเข้าถึงได้ด้วย this.createdComponent.instance.name
  // แต่ว่าให้เราไปวางไว้หลัง .createComponent() ของ ContainerRef ด้วย
  // เพราะเราไม่สามารถเข้าถึงตัวแปรของ Component ได้ถ้าเกิดเรายังไม่ได้สร้างมันขึ้นมา
  eachComponent!: ComponentRef<SimpleComponent>;

  loadComponent() {
    // method นี้ เมื่อทำงานก็จะสร้าง ComponentA ขึ้นมาต่อจาก Component ของตัวมันเอง
    // สมมติว่าเรามี <h1>Hello</h1><button click="load()">load</button><h2>There</h2>;
    // เมื่อเรากด click ที่ button เราจะได้ Component ใหม่ของเราก่อนหน้า h2
    // เพราะว่า Component ที่เราสร้าง จะต่อจากโค้ด template ของเรานี่แหละ
    this.eachComponent = this.viewContainerRef.createComponent(SimpleComponent);

    // ทดสอบว่าเราสามารถเข้าถึง instance ของ Component ได้ด้วย
    this.eachComponent.instance.text = 'Chaiyod';
    console.log(this.eachComponent.instance.text);
  }

  removeComponent() {
    // ระวังว่าถ้าเราไม่ได้เขียนดักการกดสร้าง Component หลายตัวขึ้นมา .destroy() จะลบแค่ตัวล่าสุด
    // หลังจากลบแล้วก็ควรเคลียร์ค่าของ eachComponent ด้วย ไม่งั้นก็ยังเข้าดู instance ได้อยู่
    this.eachComponent.destroy();
    this.eachComponent = null!;
  }
}
