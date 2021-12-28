// NG2
import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'tabs-layout',
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
  host: { class: 'tabs-layout' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsLayout implements AfterViewInit {
  title: string = 'Unknown';
  pages: any[] = [];
  @ViewChild('dynamic', {
    read: ViewContainerRef,
  })
  viewContainerRef: ViewContainerRef;

  private componentToCreate;

  public constructor(private route: ActivatedRoute, protected resolver: ComponentFactoryResolver) {
    this.title = this.route.snapshot.data.title;
    this.pages = this.route.snapshot.data.pages;
    this.componentToCreate = this.route.snapshot.data.description;
  }

  ngAfterViewInit() {
    if (this.componentToCreate) {
      const factory = this.resolver.resolveComponentFactory(this.componentToCreate);
      const component = this.viewContainerRef.createComponent(factory);
      // this.viewContainerRef.insert(component.hostView);
    }
  }
}
