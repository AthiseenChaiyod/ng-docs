import { Injectable } from '@angular/core';

@Injectable({
  providedIn: `root`,
})
export class ForUseExisting {
  logSomething() {
    console.log(`This is for useExisting!`);
  }
}
