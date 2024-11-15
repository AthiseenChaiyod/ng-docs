import { ApplicationConfig, InjectionToken } from '@angular/core';

export const appConfig: ApplicationConfig = {
  // เราสามารถประกาศ service ที่ providers ของ AppConfig โดยตรงได้
  // แต่ service ที่เราจะนำมาใช้จะต้องเป็น service สำคัญต่อระบบจริง ๆ หรือใช้ร่วมกันทั้ง Application เท่านั้น
  // เช่น Authentication, Environment management, etc.
  providers: [],
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
