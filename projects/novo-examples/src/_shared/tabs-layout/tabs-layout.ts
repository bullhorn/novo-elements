// NG2
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tabs-layout',
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
  host: { class: 'tabs-layout' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsLayout {
  title: string = 'Unknown';
  pages: any[] = [];

  public constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'];
    this.pages = this.route.snapshot.data['pages'];
  }
}
