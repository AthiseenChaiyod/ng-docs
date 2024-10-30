import { Component } from '@angular/core';
import { ProjectionUsage } from './tutorials/1-components/8-content-projection-with-ng-content/projection-usage/projection-usage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

  imports: [ProjectionUsage],
})
export class AppComponent {}
