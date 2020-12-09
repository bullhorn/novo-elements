import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BreadcrumbElement } from '../Breadcrumb';
import { BreadcrumbService } from '../Breadcrumb.service';
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

  constructor(public breadcrumbComponent: BreadcrumbElement, private breadcrumbService: BreadcrumbService) {}
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
