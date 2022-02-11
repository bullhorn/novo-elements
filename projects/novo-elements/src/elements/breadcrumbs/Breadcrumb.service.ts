import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BreadcrumbService {
  constructor(private router: Router) {}
  navigateTo($event, item) {
    if ($event.button !== 0 || $event.ctrlKey || $event.metaKey || $event.shiftKey) {
      return;
    }
    if (typeof item.target === 'string' && item.target !== '_self') {
      return;
    }
    $event.preventDefault();
    this.router.navigateByUrl(item.link);
  }
}
