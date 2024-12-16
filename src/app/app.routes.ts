import { Routes } from '@angular/router';
import { CommonRoutingTasks } from './tutorials/5-common-routing-tasks/common-routing-tasks.component';
import { ClassicRouterLink } from './tutorials/5-common-routing-tasks/components/classic-routerlink.component';
import { ActivatedRouterLink } from './tutorials/5-common-routing-tasks/components/activated-routerlink.component';
import { Wildcard } from './tutorials/5-common-routing-tasks/components/wildcard.component';
import { DynamicRoute } from './tutorials/5-common-routing-tasks/components/dynamic-route.component';
import { RelativePath } from './tutorials/5-common-routing-tasks/components/relative-path.component';
import { RouterNavigate } from './tutorials/5-common-routing-tasks/components/router-navigate.component';
import { GuardUsage } from './tutorials/5-common-routing-tasks/components/guard-usage.component';
import { CustomGuard } from './tutorials/5-common-routing-tasks/guards/custom-guard.guard';

// ขั้นตอนแรกสุดของการทำ routing ก็คือต้องมี routes ที่เราจะใช้งานก่อน
// สร้างโดยการ export const ที่มี Type Routes ที่ import มาจาก @angular/router
// โดยเราจะ assign array ที่เก็บ route แต่ละตัวเป็น value ให้กับ const ตัวนี้
// ตัวอย่างการสร้าง: export const myRoutes: Routes = [ ... ]
export const routes: Routes = [
  // ใน array เราจะสร้าง route เป็น object ที่จะมีข้อมูลสำคัญ 2 อย่างก็คือ path และ component
  // ทั้ง 2 property นี้จะไม่บังคับให้ใส่มา (ใส่ object เปล่ามาก็จะไม่ขึ้น error เตือนอยู่ดี)
  // path: string คือ URL ของ route ตัวนี้
  // เช่น path: 'something' ก็จะหมายถึง domain ของเราตามด้วย /something (domain.com/something)
  // ส่วน component: any ก็คือ Token ของ Component ที่เราจะ render เมื่อมีการเข้าถึง route นี้
  // ตัวอย่างการสร้าง: { path: 'something', component: SomeComponent }
  // เมื่อมีการเข้าถึง /something ก็จะ render SomeComponent ในตำแหน่งของ router-outlet
  // ดูเพิ่มเติมได้ที่ app.component.html
  {
    path: 'common-routing-tasks',
    component: CommonRoutingTasks,
    // เราสามารถทำ children path ได้ด้วยการใช้ property children: [...] ข้างใน route ของเรา
    // เช่นเราอยากให้มี route: /something/other เราก็จะต้องเพิ่ม children ข้างใน { path: 'something', ... }
    // จะได้ { path: 'something', children: [], ... }
    // โดย array ของ children ก็จะรับค่าเหมือนกับที่เราสร้าง path อยู่นี่แหละ (path ซ้อน path)
    // จากตัวอย่าง ถ้าเราอยากได้ /something/other เราจะต้องสร้าง route ดังนี้:
    // { path: 'something', children: [{ path: 'other }, { ... }, ...], ... }
    // จะใส่ children path กี่ตัวใน array ก็ได้
    children: [
      {
        path: 'classic-routerlink',
        component: ClassicRouterLink,

        // ถ้าเราอยากให้ Tab บน Browser เปลี่ยนชื่อ เราจะใช้ title: string ใส่เข้าไปให้กับ route object
        title: 'Classic routerLink',
      },

      {
        path: 'activated-routerlink',
        component: ActivatedRouterLink,
      },

      // หากจะส่งค่า Route param เราจะใช้ : คั่นเอาไว้หน้า parameter เพื่อบอกว่านี่เป็น Dynamic param นะ
      // เราจะสามารถดึงค่า route param ไปใส่ใน input ชื่อเดียวกันของ Component ได้เลยทันที
      // เช่น เรามี /something/:id ข้างใน Component ที่จะดึงค่านี้ไปใช้ก็ต้องมี @Input() id!: string ด้วย
      // ถ้าเราตั้งชือ่ว่า @Input() name!: string ค่าจะเป็น null เพราะว่าไม่ match กับ route parameter
      // หากเราไปที่ URL: /something/athiseen ค่าของ @Input() id!: string ก็จะกลายเป็น athiseen
      // เพราะว่าเราประกาศ /athiseen เอาไว้ที่เดียวกับ /:id แปลว่าหากเราดึง id ไปใช้เราก็จะได้ 'athiseen'
      // การแปะ : เอาไว้ก็เหมือนเป็นการบอกว่าสามารถดึงค่าของ URL segment ตรงนี้ไปใช้ได้นะนั่นแหละ
      // การที่เราจะใช้ทั้งหมดนี้ได้ก็ต้องประกาศ withComponentInputBinding() เอาไว้ด้วย
      // สามารถดูได้ที่ app.config.ts
      {
        path: 'dynamic-route/:value',
        component: DynamicRoute,
      },

      // เราสามารถตั้งให้เมื่อมีการเข้าถึง route นี้แล้วจะ redirect ไปที่ route อื่นได้ด้วย
      // ให้ใช้ redirectTo: '/path' ข้างใน route object (จะต้องมี / ด้วยเสมอ)
      {
        path: 'redirect',
        redirectTo: '/common-routing-tasks',

        // โดยทั่วไปแล้ว Angular route จะตรวจแค่ prefix เป็น default
        // ก็คือ สมมติว่าเรามี path: 'something' ต่อให้เราเข้า /something/another ก็จะถึงว่า match อยู่ดี
        // บางกรณีที่เราอยากจะให้ match แบบตรงเป๊ะไม่งั้นไม่ต้องแสดงผลก็จะสามารถใช้ pathMatch ได้
        // ปกติแล้วจะไม่ค่อยใช้ pathMatch ใน route เท่าไร แต่จะเจอกับ routerLinkActive บ่อย
        // ตัวอย่างคือ เวลาที่เราเข้า /something แล้ว routerLinkActive เปลี่ยน anchor เป็นสีแดง
        // แต่พอเข้า /something/1234 ที่เป็น dynamic route แล้วแต่ก็ยังแสดง anchor สีแดงอยู่
        // เพราะว่าเราเจอ prefix /something ใน /something/1234 ด้วย
        // ดังนั้นใช้ pathMatch ในเคสที่ต้องการความแม่นยำ นอกนั้นปล่อย ๆ ให้เป็น prefix ไปก็ได้
        pathMatch: 'full',
      },

      // เราสามารถ render component บน route แบบ lazy-loading ได้
      // แทนที่เราจะใช้ component ให้เราใช้ loadComponent แทน
      // โดย loadComponent จะใช้ callback function เป็น value
      // และเราจะใช้ import() เพื่อทำการ lazy-loading ก่อน จากนั้นจึงใช้ .then ดึงค่า ComponentClass ส่งกลับมา
      // เช่น loadComponent: () => import('path').then((comp) => comp.SomeComponent)
      // หากเราลองใช้ ngOnInit() เพื่อ log ข้อความ โดยมี Component ที่ใช้ component และ loadComponent
      // จะเห็นว่าทั้งคู่ก็ไม่ได้ log อะไรออกมาหรอก อ้าว งั้นต่างกันตรงไหน?
      // ต่างกันตรง component ปกติจะถูกรวมเข้าไปใน initial bundle
      // แต่ loadComponent จะไม่ถูกรวมเข้าไปใน initial bundle
      // ทำให้ตอนโหลด app ครั้งแรกจะไวกว่า (ดูได้บน network ของ console)
      {
        path: 'lazy-route',
        loadComponent: () =>
          import(
            './tutorials/5-common-routing-tasks/components/lazy-route.component'
          ).then((comp) => comp.LazyRoute),
      },

      // ถ้าเรามี guard ก็สามารถใช้งานได้โดยการใช้ property canActivate: [Token]
      {
        path: 'guard-usage',
        component: GuardUsage,
        canActivate: [CustomGuard],
      },
    ],
  },

  { path: 'relative-path', component: RelativePath },

  { path: 'router-navigate', component: RouterNavigate },

  // หากเราอยากปัดให้ URL ที่ไม่ตรงกับที่เราระบุเอาไว้ให้ไป render Component ตัวหนึ่ง
  // เราจะใช้ path: '**' ซึ่ง * (asterisk) 2 ตัวจะมีชื่อเรียกว่า wildcard
  // ไม่ว่าเราจะใส่ URL อะไรมาก็ตามก็จะถูกปัดไป render Component ที่เราระบุเอาไว้ใน route ของ wildcard
  // เหมาะกับการนำมาแสดง not found error
  // แต่ว่าจะต้องประกาศเป็นตัวสุดท้ายเสมอ
  // เพราะว่า Angular จะ match route แบบ first-match
  // เช่นเราเข้า /access-data
  // Angular ก็จะไล่หา route ทีละตัวตามลำดับ ว่ามี path: 'access-data' หรือเปล่า
  // ถ้าเจอ route ตัวไหนตรงตัวแรกก็จะเอามาแสดงเลย
  // ดังนั้นถ้าเราประกาศ wildcard เอาไว้แต่แรกก็จะแสดง wildcard เสมอ
  // เพราะว่า wildcard ถูก match ตั้งแต่แรกนั่นเอง
  { path: '**', component: Wildcard },
];
