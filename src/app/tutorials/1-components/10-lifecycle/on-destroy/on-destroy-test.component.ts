import { Component, OnDestroy } from '@angular/core';

@Component({
  standalone: true,
  selector: `on-destroy-test`,
  template: `<h1>{{ text }}</h1>`,
})
export class OnDestroyTest implements OnDestroy {
  text: string = 'Pikaboo!';

  ngOnDestroy(): void {
    console.log(`Hidden!`);
  }
}
