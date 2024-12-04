import { CircularLazyLoadingA } from './circular-lazy-loading-a.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CircularLazyLoadingB {
  constructor(private serviceA: CircularLazyLoadingA) {}

  logSomething() {
    console.log(`This is CircularLazyLoadingB!`);
  }
}
