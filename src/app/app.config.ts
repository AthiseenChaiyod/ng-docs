import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  // เราสามารถประกาศ service ที่ providers ของ AppConfig โดยตรงได้
  // แต่ service ที่เราจะนำมาใช้จะต้องเป็น service สำคัญต่อระบบจริง ๆ หรือใช้ร่วมกันทั้ง Application เท่านั้น
  // เช่น Authentication, Environment management, etc.
  providers: [],
};
