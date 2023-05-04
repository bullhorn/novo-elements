import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BreadcrumbService } from '../Breadcrumb.service';
import { NovoBreadcrumbRef, NOVO_BREADCRUMB_REF } from '../Breadcrumb.tokens';
import { MenuConfig } from '../Breadcrumb.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'novo-breadcrumb-item',
  templateUrl: './BreadcrumbItem.html',
  styleUrls: ['./BreadcrumbItem.scss'],
})
export class BreadcrumbItemElement implements OnInit {
  @Input() showMenu = false;
  @Input() customMenuTemplate: TemplateRef<any>;
  @Input() menuList: Array<MenuConfig>;
  @Input() isSearch = false;
  @Output() toggleEvent: EventEmitter<any> = new EventEmitter<any>();

  menuListDisplay: Array<MenuConfig>;
  isOpen: boolean;

  constructor(private breadcrumbService: BreadcrumbService, @Inject(NOVO_BREADCRUMB_REF) public breadcrumbComponent: NovoBreadcrumbRef) {}
  ngOnInit(): void {
    this.menuListDisplay = this.menuList;
  }
  onToggle($event) {
    this.isOpen = $event;
    this.toggleEvent.emit($event);
  }
  searchEvent($event) {
    if (this.menuList) {
      this.menuListDisplay = this.menuList.filter((item) => item.name.toLowerCase().includes($event.toLowerCase()));
    }
  }
  navigateTo($event, item) {
    this.breadcrumbService.navigateTo($event, item);
  }
}
