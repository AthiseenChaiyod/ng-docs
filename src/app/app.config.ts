import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // เราสามารถประกาศ service ที่ providers ของ AppConfig โดยตรงได้
  // แต่ service ที่เราจะนำมาใช้จะต้องเป็น service สำคัญต่อระบบจริง ๆ หรือใช้ร่วมกันทั้ง Application เท่านั้น
  // เช่น Authentication, Environment management, etc.
  // การจะเปิดใช้งานตัวแปร routes ที่เราสร้างจะต้องประกาศ provideRouter() ข้างใน providers ของ app.config.ts
  // โดยทั่วไปแล้ว Angular จะจัดการ step การสร้าง routes พื้นฐานให้ตั้งแต่ตอน ng new แล้ว
  // ตัว provideRouter() ของเราจะรับ argument หนึ่งตัว นั่นก็คือตัวแปร route ที่เราสร้าง
  // หลังจากประกาศ provideRouter(route) เสร็จ route ของเราก็สามารถเข้าถึงได้แล้ว
  // ในการทำ parameter binding กับ input ของ Component เราจะต้องประกาศ withComponentInputBinding() เอาไว้เสมอ
  // โดยให้ประกาศข้างใน provideRouter() เหมือนกับตัวแปร route
  // จะต้องมี () ตามหลังด้วยเ เพราะว่าเป็น function
  providers: [provideRouter(routes, withComponentInputBinding())],
};

// ในกรณีที่เราไม่อยากใช้ Class เป็น token เราก็ต้องสร้าง string token ขึ้นมาเอง
// ปกติแล้วจะนำ string token มาสร้างที่อื่น พอจะใช้ก็ค่อย imports เข้าไปแทน token ตรง provide
// โดยตอนสร้างเราจะต้องสร้าง new InjectionToken<T>('description')
// โดยนิยมใช้ชื่อตัวแปรเป็น Uppercase และใช้ _ แทน whitespace
// เช่น export const MY_DATA = new InjectionToken<string>('for some reason')
// เวลาเราจะนำไปใช้ก็จะใช้ตรง provide ของ providers object ไปเลย
// เช่น { provide: MY_DATA, useValue: 'something' }
// ประเด็นคือการ inject string token เราจะต้องใช้ @Inject(value) name: type
// เช่น constructor( @Inject(MY_DATA) data: string ) {}
// ตอนใช้เราถึงจะนำ data มาใช้แทน MY_DATA ได้ (จะมีค่าที่เราระบุเอาไว้ใน useValue)
export const STATIC_VALUE = new InjectionToken<string>('for useValue');
