import { Injectable } from '@angular/core';

@Injectable({
  providedIn: `root`,
})
export class ForUseValue {
  logSomething() {
    console.log(`This is for useValue!`);
  }
}
