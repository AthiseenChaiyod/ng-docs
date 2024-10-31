import { Component } from '@angular/core';
import { OnDestroyTest } from './on-destroy-test.component';
import { NgIf } from '@angular/common';

// เอา Component นี้ไปวางที่ Root เพื่อทดสอบการทำงานได้เลย
@Component({
  standalone: true,
  selector: `hide-button`,
  template: `
    <button (click)="showContent()">Click</button>
    <on-destroy-test *ngIf="hideContent" />
  `,

  imports: [OnDestroyTest, NgIf],
})
export class HideButton {
  hideContent: boolean = true;

  showContent() {
    this.hideContent === false
      ? (this.hideContent = true)
      : (this.hideContent = false);
  }
}
