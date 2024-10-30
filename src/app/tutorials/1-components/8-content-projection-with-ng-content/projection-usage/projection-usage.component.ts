import { Component } from '@angular/core';
import { ContentProjectionWithNgContent } from '../content-projection-with-ng-content.component';

@Component({
  standalone: true,
  selector: `projection-usage`,
  templateUrl: `./projection-usage.component.html`,

  imports: [ContentProjectionWithNgContent],
})
export class ProjectionUsage {}
