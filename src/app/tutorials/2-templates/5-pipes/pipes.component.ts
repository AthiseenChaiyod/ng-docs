import {
  CurrencyPipe,
  DatePipe,
  PercentPipe,
  UpperCasePipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { CustomPipe } from './pipes/custom-pipe.pipe';

@Component({
  standalone: true,
  selector: `pipes`,
  templateUrl: `./pipes.component.html`,
  styleUrl: `./pipes.component.css`,

  imports: [CurrencyPipe, DatePipe, PercentPipe, UpperCasePipe, CustomPipe],
})
export class Pipes {
  forCurrency: number = 1000;
  forDate = new Date();
  forPercent: number = 10;
  forCustom: string = 'Athiseen';
}
