import { Routes, UrlSegment } from '@angular/router';
import { CommonRoutingTasks } from './tutorials/5-common-routing-tasks/common-routing-tasks.component';
import { ClassicRouterLink } from './tutorials/5-common-routing-tasks/components/classic-routerlink.component';
import { ActivatedRouterLink } from './tutorials/5-common-routing-tasks/components/activated-routerlink.component';
import { Wildcard } from './tutorials/5-common-routing-tasks/components/wildcard.component';
import { DynamicRoute } from './tutorials/5-common-routing-tasks/components/dynamic-route.component';
import { RelativePath } from './tutorials/5-common-routing-tasks/components/relative-path.component';
import { RouterNavigate } from './tutorials/5-common-routing-tasks/components/router-navigate.component';
import { GuardUsage } from './tutorials/5-common-routing-tasks/components/guard-usage.component';
import { CustomGuard } from './tutorials/5-common-routing-tasks/guards/custom-guard.guard';
import { CustomMatcher } from './tutorials/5-common-routing-tasks/components/custom-matcher.component';

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

  // บางครั้งเราก็ต้องการ URL ที่ซับซ้อนซึ่ง path ไม่สามารถแก้ไขให้เราได้ เราเลยต้องเขียนโค้ดเพื่อ match URL ของเราเอง
  // เราจะใช้ keyword matcher แทน path สำหรับการเขียน match URL นอกนั้นก็เขียนเหมือนปกติทั้งหมด
  // value ของ matcher จะเป็น callback function ที่จะส่งค่า matched URL กลับมา หรือถ้าไม่เจอก็จะส่ง null กลับมา
  // syntax ในการสร้าง route จะได้ { matcher: () => {}, component: SomeComponent }
  {
    // ให้เราส่งตัวแปร url เข้าไปใน callback ของ matcher ด้วย เป็นตัวแทนของ URL ปัจจุบันที่เรากำลังจะตรวจสอบ
    // จากนั้นข้างใน body ของ callback เราก็จะเขียน logic ที่จะส่งค่า URL หรือ null กลับมา
    // โดยตัวแปร url ที่เราส่งไปกับ callback จะเป็น type UrlSegment[] โดยอัตโนมัติ
    matcher: (url) => {
      // สองสิ่งที่เราต้องรู้ก่อนเลยก็คือ URL ของเรามีกี่ segment และเราจะตรวจ segment ไหนบ้าง
      // เราสามารถลอง log ออกมาดูได้ว่า url ของเรามีข้อมูล segment อะไรบ้าง
      // จะเจอว่า url: UrlSegment[] เป็น array ที่เก็บ object segment ทั้งหมดของ URL เราปัจจุบันเราเอาไว้
      // โดยทุก object ที่อยู่ใน array นี้จะเป็น segment แต่ละตัวของ URL เรา
      console.log('All URL Segments:', url);

      // เนื่องจาก url ของเราเป็น array จึงสามารถใช้ array method ได้ด้วย
      // เราสามารถ .length เพื่อดูความยาวของ array ได้
      console.log(`URL length:`, url.length);

      // หรือจะลองใช้ index เพื่อเข้าถึง segment แต่ละตัวก็ได้เหมือนกัน
      console.log(`First URL Segment:`, url[0]);

      // เราสามาถใช้ .path เพื่อเข้าถึง property path ของ url ได้เลย
      console.log(`Segment path:`, url[0].path);

      // ในการจะตรวจสอบว่า path ตรงกับที่เราอยากได้หรือไม่จะใช้ .match() ตามหลัง path
      // โดย .match() จะรับ string ตัวหนึ่งที่จะนำไปเทียบว่า segment ของเราใช่ string ที่อยากได้ไหม
      // ถ้าตรงกันก็จะส่งค่าตัวมันเองกลับมา ถ้าไม่ตรงจะส่งค่า null
      // ไม่ใช่ true / false ห้ามจำสลับเด็ดขาด
      console.log(
        `Check if path works: ${url[0].path.match(`custom-matcher`)}`
      );

      // เราสามารถสร้าง Segment ใหม่แล้วก็เพิ่มให้กับ URL ของเราได้ด้วย
      // โดยการสร้าง Segment ให้เราสร้าง instance ใหม่ของ UrlSegment ขึ้นมา
      // จากที่เรา log ด้านบน เราจะเห็นว่ามี property อยู่ใน UrlSegment แต่ละตัวสองค่า คือ path และ parameters
      // ให้เราส่งค่า string ที่จะเป็น path เป็น parameter ตัวแรก และ object parameters เป็นตัวที่สอง
      // เช่น const newPath = new UrlSegment('new-path', { newParam: 'test' })
      // โดยเราจะปล่อย parameters (parameter ที่สอง) ว่างเอาไว้ก็ได้ แต่จะต้องใส่ {} มาด้วยเสมอ
      // ถ้าเราใส่ parameters ไปด้วย เราจะเจอว่าบน URL เรา parameters ก็คือ matrix parameter นั่นเอง
      const newSegment: UrlSegment = new UrlSegment('new-path', {
        additional: 'test',
      });

      // เมื่อเราสร้าง segment ใหม่เสร็จแล้วเราก็จะนำ segment ให่มาเพิ่มให้กับ url ของเรา
      // ให้เราสร้าง url ขึ้นมาใหม่ด้วย spread operator (...)
      // เช่น const newPath = [...url, newSegment]
      // เท่านี้เราก็จะได้ URL ใหม่แล้ว
      // ที่ไม่ใช่ .push ก็เพราะว่าถ้า .push() ทำงานหลายรอบ url ก็จะเพี้ยน
      const newPath = [...url, newSegment];

      // หลังจากที่เรารู้จัก matcher / UrlSegment[] ไปบ้างแล้วก็ถึงเวลานำมาใช้งานจริง
      // เราจะต้องตรวจว่า segment ที่เรารับมาตรงกับที่เราอยากให้เป็นหรือไม่
      // อันดับแรกให้เขียน if-else เพื่อตรวจสอบก่อน (ลำดับการทำงานคล้ายกับ Authentication / Guard นั่นแหละ)
      // ถ้าเกิด url ที่เรารับมาตรงกับที่เราอยากได้ เราก็จะส่ง url นั้นกลับไปให้ browser
      // ถ้าไม่เจอเราก็จะให้ไปดูที่ route อื่นที่ยังเหลืออยู่ด้านล่างของเรา (ไล่ route บนลงล่างปกติ)
      // condition แรกของเราคือ segment ที่เรากำลัง process มีความยาวที่เราต้องการหรือไม่
      // หากเราต้องการ /something/test ความยาว = 2 การส่ง segment ที่ความยาวมากกว่าหรือน้อยกว่ามาก็ควรจะไม่ผ่าน if
      // เราจะใช้ url.length เพื่อตรวจความยาวที่เราอยากได้
      // เช่น if(url.length === 2) { ... }
      // อีก condition ที่สำคัญก็คือ แล้ว segment ที่รับมาล่ะ ตรงกับที่เราอยากได้ไหม
      // เช่น เราอยากรู้ว่า segment 2 ของ url เป็น test หรือไม่
      // เราก็จะใช้ index เพื่อเข้าถึง segment 2 เช่น url[1]
      // จากนั้นเราจึงจะใช้ .path เพื่อดึงเอา segment string ออกมาเทียบกับสิ่งที่เราอยากได้ด้วย .match()
      // เช่น url[1].path.match('test')
      // หากผ่านทั้ง 2 conditions เราจึงจะให้ navigate ไปหน้าที่ระบุได้ โดยเราจะใช้ && คั่นใน if()
      // เช่น if(url.length === 2 && url[1].path.match('test')) { ... }
      if (url.length === 1 && url[0].path.match('custom-matcher')) {
        // ตอนส่งค่ากลับก็ไม่ใช่ว่าเราจะส่งอะไรกลับไปก็ได้ เราจะต้องส่ง object ที่มี property สำคัญสองตัวกลับไป
        return {
          // property แรกคือ consumed ก็คือ URL ที่เราจะส่งค่ากลับไปให้ browser
          consumed: newPath,

          // ตัวที่สองคือ posParams ที่จะเป็น parameters ให้กับ urlของเรา
          // อย่างที่เราสร้าง UrlSegment ที่ด้านบนนั่นแหละ ข้างใน postParams ก็จะเป็น key: value เหมือนกัน
          // แต่ value ของ key ใน posParams จะต้องเป็น UrlSegment เท่านั้น ไม่สามารถ binding เฉย ๆ ได้
          // ตัวอย่าง posParams ที่ผิด: posParams: { location: 'Thailand' }
          // ตัวอย่างที่ถูก: posParams: { location: new UrlSegment('Thailand', {}) }
          // โดย argument ที่สองปล่อยว่างไปเลยก็ได้ เพราะว่า key location จะ bind กับแค่ string ตัวแรกเท่านั้น
          // key ของ posParams สามารถนำไปทำ withComponentInputBinding() ได้เลย
          // แค่เราสร้าง @Input() ชื่อเดียวกันรอเอาไว้ก็พอ ค่าจะอัปเดตให้อัตโนมัติ
          // ต่างจาก dynamic route ที่เราจะต้องมาเขียน path ด้วย : เอาเอง
          // แต่ว่า posParams จะไม่ขึ้นอยู่บน URL ของเรา ถูกล่องหนเอาไว้ โดยเราสามารถดึงค่าด้วย .parameters ได้เสมอ
          posParams: {
            username: new UrlSegment('Athiseen', {}),
          },
        };
      }
      // ถ้าไม่ตรงกับ condition ใด condition หนึ่งก็แค่ส่ง null กลับไป
      // แล้ว Angular จะไล่ route ลงไปด้านล่างต่อ
      // อารมณ์ประมาณ อ้าวไม่เจอหรอ ไปไล่ route อื่นด้านล่างต่อละ แบบนี้
      else {
        return null;
      }
    },
    component: CustomMatcher,
  },

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
