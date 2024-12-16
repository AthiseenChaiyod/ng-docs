import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  standalone: true,
  selector: `common-routing-tasks`,
  templateUrl: `./common-routing-tasks.component.html`,
  styleUrl: `./common-routing-tasks.component.css`,

  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class CommonRoutingTasks {
  // นอกจากการใช้ anchor กับ routerLink ในการทำ routing แล้วเราก็สามารถใช้ Router.navigate() ได้เป็นตัวเลือกสำรอง
  // เหมาะกับการนำไปสร้างเป็น event เพราะว่าไม่ได้จำกัดอยู่แค่ต้องถูกคลิ๊กบน link แล้ว
  // ให้เราทำการ inject Router เข้ามาก่อน เพราะว่าเราจะใช้คำสั่ง navigate()
  // ต่อมาให้ถามตัวเองว่าจะต้องใช้ข้อมูลของ URL ปัจจุบันไหม
  // เช่น เราจะย้อนกลับไปหนึ่งระดับจาก URL ปัจจุบัน หรือเราจะเข้า path ลึกลงไปของ URL ปัจจุบัน
  // ถ้าเราต้องใช้ข้อมูลปัจจุบันด้วยให้เรา inject ActivatedRoute เข้ามาด้วย
  // ActivatedRoute จะเป็นตัวเก็บข้อมูลของ route ปัจจุบันที่เรากำลังใช้อยู่
  constructor(private route: ActivatedRoute, private router: Router) {}

  // ต่อมาเราก็จะสร้าง method เพื่อรองรับการทำ navigate()
  clickNavigate() {
    // ให้เราเรียกใช้คำสั่ง navigate() ของ Router ก่อน
    // จากนั้นก็ให้ใส่ argument ตัวแรกเป็น string[] ที่จะเก็บ string path ของเราเอาไว้
    // เช่น this.router.navigate(['something']) จะหมายถึงให้ไปที่ /something
    // เราสามารถใส่ string ได้หลายตัวใน array หรือจะใช้ตัวแปรก็ได้โดยให้คั่นด้วย ,
    // ให้เราคิดซะว่า , จะถูกเปลี่ยนเป็น / แล้วนำมารวมกับ string
    // เช่น .navigate(['something', 'another']) ก็จะหมายถึง /something/another
    // แต่ .navigate() จะอิงจาก domain ของเราเป็น base ไม่ใช่ URL ปัจจุบัน
    // เชน เราอยู่ที่ /user แล้วไป route อื่นด้วย .navigate(['something', 'another'])
    // เราจะไม่ได้ไปที่ /user/something/another แต่ว่าจะไปที่ /something/another
    // ตรงนี้แหละที่ ActivatedRoute จะเข้ามาช่วยให้งานเราง่ายขึ้น
    // เราจะประกาศ object เอาไว้ด้านหลังของ string[] โดยจะประกาศเอาไว้ข้างใน navigate() เหมือนกัน
    // ข้างใน object เราก็จะใช้ property relativeTo ที่มี value เป็น route ปัจจุบันของเรา
    // ซึ่งเราก็มี route ปัจจุบันเรียบร้อยแล้ว ถ้าเกิดเรา inject ActivatedRoute เข้ามา
    // ก็ให้ใส่ value ของ relativeTo เป็นตัวแปร ActivatedRoute ได้เลย
    // เช่น .navigate([...], { relativeTo: this.activatedRoute })
    // สามารถลอง log ออกมาดูได้ว่ามีอะไรให้เราใช้งานบ้าง
    // จะให้ข้อมูลคนละแบบกับ ActivatedRouterSnapshot
    console.log(this.route);

    this.router.navigate(
      ['../router-navigate', { firstName: 'Athiseen', lastName: 'Chaiyod' }],

      {
        relativeTo: this.route,
      }
    );
  }
}
