import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  logSomething() {
    console.log(`This is CustomService!`);
  }
}
