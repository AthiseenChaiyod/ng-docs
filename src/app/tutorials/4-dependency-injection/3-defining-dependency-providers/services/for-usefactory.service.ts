import { Injectable } from '@angular/core';

@Injectable({
  providedIn: `root`,
})
export class ForUseFactory {
  logSomething() {
    console.log(`This is for useFactory!`);
  }
}
