import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';

// ใน Angular เราสามารถสร้าง Guard เพื่อป้องกันการเข้าถึงที่ไม่ได้รับอนุญาตได้
// โดยจะสร้าง Guard ในรูปแบบของ Dependency ที่จะใช้ @Injectable() เหมือน Service ปกติ
@Injectable({
  providedIn: 'root',
})
// ให้ Class ของเรา implements CanActivate เข้ามาด้วย
// โดยนอกจาก CanActivate แล้วก็ยังมีตัวอื่นให้ implements เหมือนกัน
// แต่ละตัวจะใช้งานต่างกันออกไป มีดังนี้ CanActivateChild, CanDeactivate, CanMatch, Resolve
// CanActivateChild คือ จะให้เราเข้าถึง nested route ได้หรือไม่
// CanDeactivate คือ จะให้เราออกจากไซต์นี้ได้หรือไม่ (เหมาะกับทำงานส่งท้ายก่อน navigate ออก)
// CanMatch คือ จะตัดสินใจว่าจะให้เข้าถึง URL นี้ได้ไหม
// คล้าย ๆ กับ Middleware ที่จะปัด request ออกตั้งแต่ยังไม่ได้เข้าระบบ
// CanMatch ก็เหมือนกัน จะปัด navigation request ออกไปเลย ถือว่าไม่เจอ URL ด้วยซ้ำ
// เหมาะกับการนำมาใช้กับ route ที่ทำ lazy-loading ไว้ จะได้ไม่เสีย lazy-loading เวลามีการ access
// Resolve คือ การบอกว่า Component นี้สามารถทำ pre-fetch ข้อมูลให้กับ Resolver ได้หรือไม่
// ตอนนี้เรายังไม่เจอเรื่อง Resolver ให้รู้ไว้แค่ว่ามันคือการโหลดข้อมูลที่จำเป็นรอเอาไว้ก่อน พอเรียกใช้จะได้มีครบเลยไม่ต้องรอ
export class CustomGuard implements CanActivate {
  // CanActivate ที่เรา implements มาจะบังคับให้เราต้องมี canActivate() ข้างใน Class ด้วย
  // โดย canActivate() ก็จะมีอยู่สอง arguments สำคัญ ได้แก่ ActivatedRouteSnapshot และ RouterStateSnapshot
  // ActivatedRouterSnapshot ที่จะทำหน้าที่เป็นข้อมูล route ปัจจุบันของเรา (อย่างละเอียด)
  // ตัวที่สองคือ RouterStateSnapshot ที่จะทำหน้าที่เป็นภาพรวมของ Route ทุกตัวแบบอย่างละเอียดเหมือนกัน
  // โดยทั้งสองตัวสามารถลอง . เล่นเพื่อทดลองดึงข้อมูลต่าง ๆ ได้เลย
  // ถ้าไม่ได้ใช้ซับซ้อนอะไรส่วนมากก็ใช้แค่ .url นั่นแหละ แต่ถ้าซับซ้อนก็ต้องลองดูว่ามีข้อมูลอะไรในนั้นให้เล่นบ้าง
  // ส่วนสาเหตุที่ต้องใส่ Type เป็น MaybeAsync<GuardResult> ก็เพราะว่าเป็น Type ที่ทำมาเพื่อ Guard โดยเฉพาะแล้ว
  // เราจะได้ไม่ต้องมานั่งเขียน boolean | Promise<boolean> | Observable<boolean> ด้วย
  // และอีกอย่าง นอกจาก 3 ประเภทที่กล่าวถึงไป Guard เราก็สามารถ redirect ได้ด้วย UrlTree อีก
  // ดังนั้น return type ของ MaybeAsync<GuardResult> จะรวม UrlTree ที่จะ redirect เข้าไปด้วย ทำให้ครบกว่าเดิม
  // สาเหตุที่เราต้องใช้ ActivatedRouteSnapshot ทั้ง ๆ ที่ ActivatedRoute ก็ดึงข้อมูล route ปัจจุบันได้มีหลายข้อ
  // ข้อแรก ActivatedRoute ถูกสร้างมาเพื่อการติดตามความเปลี่ยนแปลงของ URL มากกว่าการนำมาให้ข้อมูล Guard
  // ข้อสอง ActivatedRoute เป็น Async สังเกตได้จากที่เราใช้ subscribe ซึ่ง Guard ทำงานง่าย ๆ ครั้งเดียวจบจึงไม่ต้องเปิด Sub
  // ข้อสาม ActivatedRoute ทำงานคนละช่วงเวลากับ Guard, Guard จะทำงานก่อนที่ Component จะ init เสร็จ
  // ActivatedRoute จะต้องรอ Component init เสร็จก่อน ในขณะที่ Guard ไม่สามารถรอได้
  // ให้นึกภาพว่าเราจะตรวจคนก่อนเข้า หรือว่าจะให้เข้ามาก่อนแล้วค่อยไล่ออกไป
  // ActivatedRouteSnapshot จึงถูกสร้างมาแทนที่ ActivatedRoute เพื่อ Guard โดยเฉพาะ
  // โดย snapshot จะทำงานช่วงเวลาเดียวกัน มีข้อมูลที่ Guard ต้องใช้งานครบ และเป็น Synchronous เข้าถึงได้ทันที
  // ด้วยเหตุผลเหล่านี้ เราจึงจะใช้ snapshot กับ Guard และใช้ ActivatedRoute กับการ track URL แบบ dynamic
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    // แสดงข้อมูลต่าง ๆ ของ route ที่ได้มาจาก ActivatedRouteSnapshot อย่างละเอียด
    console.log(route);
    console.log(route.component);

    // แสดงข้อมูลต่าง ๆ ของ routing tree อย่างละเอียด จะคล้าย ๆ กับ ActivatedRouteSnapshot แต่ . ได้มากกว่า
    console.log(state.url);
    console.log(state.root);

    // Guard จะต้องส่งค่า boolean กลับเสมอ
    return true;
  }
}

// เราสามารถเขียน Guard ได้อีกแบบ เรียกว่า inline-functional guard
// ให้เราเขียนเป็น callback function syntax โดย Type ของ const จะต้องเป็น CanActivateFn
// และตัวแปร route, state เราจะสามารถ pass เข้าไปใน callback ได้โดยไม่ต้อง implements Type ด้วยซ้ำ
// เหมาะกับ Guard ที่จะทำงานง่าย ๆ ไม่ซับซ้อนมาก เพราะว่าเราไม่สามารถทำ Dependency Injection ได้
export const inlineFunctionalGuard: CanActivateFn = (route, state) => {
  return true;
};
