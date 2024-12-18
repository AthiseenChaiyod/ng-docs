import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: `custom-matcher`,
  template: `<h1>This is CustomMatcher Component!</h1>`,
})
export class CustomMatcher implements OnInit {
  // ในการใช้ดึงของ URL เราก็จะต้อง inject ActivatedRoute เข้ามาด้วย
  constructor(private activatedRoute: ActivatedRoute) {}

  // นอกจากการใช้ dynamic route parameter แล้วเราก็สามารถใช้งาน posParams ของ matcher ได้เหมือนกัน
  // เราก็ตั้ง Input ชื่อเดียวกันกับ key ใน object ของ posParam เอาไว้เลย จะได้ค่ามาอัตโนมัติ
  @Input() username!: string;

  ngOnInit(): void {
    // เรา log ข้อมูล route ของเราออกมาดูได้ด้วย .snapshot
    console.log(`Route Snapshot:`, this.activatedRoute.snapshot);

    // จากข้อมูลใน snapshot เราสามารถ log segment ของเราออกมาดูได้ด้วย .url ต่อ
    console.log(`URL Snapshot:`, this.activatedRoute.snapshot.url);

    // ถ้าเราอยากดึงข้อมูล parameters ของ segment นั้นออกมาก็จะใช้ .parameters['param_name'] ที่หลัง segment
    console.log(
      `Extract parameters from segment:`,
      this.activatedRoute.snapshot.url[1].parameters['additional']
    );

    // ตัว posParam ให้เราดึงได้ที่ snapshot เลย โดยใช้ .params['param_name']
    console.log(
      `Extracts posParam from URL:`,
      this.activatedRoute.snapshot.params['username']
    );

    // หรือถ้าเรามี input binding ก็เรียกใช้ได้เลย
    console.log(`Your posParams:`, this.username);
  }
}
