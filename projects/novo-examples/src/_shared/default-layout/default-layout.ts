// NG2
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'default-layout',
  templateUrl: './default-layout.html',
  styleUrls: ['./default-layout.scss'],
  host: { class: 'default-layout' },
  encapsulation: ViewEncapsulation.None,
})
export class DefaultLayout {
  public constructor(private route: ActivatedRoute) {}
}
