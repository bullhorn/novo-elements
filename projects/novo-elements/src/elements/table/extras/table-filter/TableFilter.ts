// NG2
import {
  Directive,
  EventEmitter,
  ElementRef,
  Renderer2,
  OnChanges,
  OnInit,
  Input,
  Output,
  SimpleChanges,
  HostListener,
} from '@angular/core';
// APP
import { KeyCodes } from './../../../../utils/key-codes/KeyCodes';
import { Helpers } from './../../../../utils/Helpers';

@Directive({
  selector: '[novoTableFilter]',
})
export class TableFilter implements OnInit, OnChanges {
  @Input('novoTableFilter')
  config: any;
  @Output()
  onFilterChange: EventEmitter<any> = new EventEmitter();

  filterThrottle: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges(changes?: SimpleChanges) {
    let label = '';
    if (this.config.freetextFilter) {
      label = this.config.freetextFilter;
    } else if (this.config.filter) {
      label = this.config.filter;
    }
    this.renderer.setProperty(this.element, 'value', label);
  }

  @HostListener('keydown', ['$event'])
  public onChangeFilter(event: KeyboardEvent) {
    clearTimeout(this.filterThrottle);
    if (KeyCodes.ENTER === event.keyCode) {
      this.config.filter = (event.target as any).value;
      this.onFilterChange.emit({ filtering: this.config });
    } else {
      this.filterThrottle = setTimeout(() => {
        this.config.filter = (event.target as any).value;
        this.onFilterChange.emit({ filtering: this.config });
      }, 300);
    }
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    Helpers.swallowEvent(event);
  }
}
