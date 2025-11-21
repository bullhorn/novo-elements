// NG2
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers, Key, OutsideClick } from 'novo-elements/utils';

@Component({
    selector: 'novo-category-dropdown',
    template: `
    <ng-content select="button"></ng-content>
    @if (active) {
      <div class="dropdown-container">
        @if (search) {
          <div class="novo-category-dropdown-search" data-automation-id="novo-category-dropdown-search">
            <input
              type="text"
              [placeholder]="search.placeholder || labels.search"
              [value]="_query"
              (input)="queryCategories($event.target.value)"
              />
            @if (!_query) {
              <i class="bhi-search"></i>
            }
            @if (_query) {
              <i class="bhi-times" (click)="clearQuery($event)"></i>
            }
          </div>
        }
        <novo-nav theme="white" [outlet]="novoCategoryDropdownOutlet" direction="vertical">
          @for (category of _categories; track category) {
            <novo-tab [attr.data-automation-id]="category" (activeChange)="onCategorySelected(category)">
              <span>{{ category }} ({{ _categoryMap[category].length }})</span>
            </novo-tab>
          }
        </novo-nav>
        <novo-nav-outlet #novoCategoryDropdownOutlet>
          @for (category of _categories; track category) {
            <novo-nav-content>
              <novo-list direction="vertical">
                @for (item of _categoryMap[category]; track item) {
                  <novo-list-item
                    (click)="select($event, item)"
                    [attr.data-automation-id]="item.label"
                    >
                    <item-content>{{ item.label }}</item-content>
                    @if (item.hoverText && !item.selected) {
                      <item-end class="novo-category-dropdown-hover">{{ item.hoverText }}</item-end>
                    }
                    @if (item.hoverIcon && !item.selected) {
                      <item-end class="novo-category-dropdown-hover"
                        ><i class="bhi-{{ item.hoverIcon }}"></i
                      ></item-end>
                    }
                    @if (item.selected) {
                      <item-end><i class="bhi-check"></i></item-end>
                    }
                  </novo-list-item>
                }
                @if (_categoryMap[category].length === 0 && search) {
                  <novo-list-item class="novo-category-dropdown-empty-item">
                    <item-content>{{ search.emptyMessage || labels.noItems }}</item-content>
                  </novo-list-item>
                }
              </novo-list>
            </novo-nav-content>
          }
        </novo-nav-outlet>
        @if (footer) {
          <footer class="novo-category-dropdown-footer-align-{{ footer.align || 'right' }}">
            @for (link of footer.links; track link) {
              <a (click)="executeClickCallback($event, link)">{{ link.label }}</a>
            }
          </footer>
        }
      </div>
    }
    `,
    styleUrls: ['./CategoryDropdown.scss'],
    host: {
        '(keydown)': 'onKeyDown($event)',
        '[class.active]': 'active',
    },
    standalone: false
})
export class NovoCategoryDropdownElement extends OutsideClick implements OnInit, OnDestroy {
  _query: string = '';
  _categoryMap: any = {};
  _categories: string[] = [];
  clickHandler: Function;
  _masterCategoryMap: any;
  _queryTimeout: any;
  // Boolean to keep the selection persist when closing the dropdown
  @Input()
  persistSelection: boolean = false;
  // Boolean to close the dropdown on selection
  @Input()
  closeOnSelect: boolean = false;
  // Search Config
  // {
  //   placeholder: 'STRING' // defaults to "SEARCH" - placeholder for search input
  //   emptyMessage: 'STRING' // defaults to "There are no items." - empty message when there are no items in the category
  //   debounce: 'NUMBER (in MS)' // defaults to 300ms - debounce time for the search
  //   compare: 'FUNCTION' // default to simple indexOf - compare function for category search, should accept (query, item) and return true/false
  // }
  @Input()
  search: any;
  // Footer config
  // {
  //   align: 'STRING' // defaults to "right" - alignment of the links
  //   links: 'ARRAY' // array of links to go into the footer, be away of spacing - { label, callback } for the object inside
  // }
  @Input()
  footer: any;
  // Event that is emitted whenever an item is selected
  @Output('itemSelected')
  _select: EventEmitter<any> = new EventEmitter();
  // Event that is emitted whenever a category is selected
  @Output()
  categorySelected: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set categories(categories: any) {
    this._masterCategoryMap = Object.assign({}, categories);
    this._categoryMap = Object.assign({}, categories);
    this._categories = Object.keys(categories);
  }

  constructor(element: ElementRef, public labels: NovoLabelService) {
    super(element);
    this.clickHandler = this.toggleActive.bind(this);
  }

  ngOnInit() {
    const button = this.element.nativeElement.querySelector('button');
    button.addEventListener('click', this.clickHandler);
  }

  ngOnDestroy() {
    const button = this.element.nativeElement.querySelector('button');
    if (button) {
      button.removeEventListener('click', this.clickHandler);
    }
  }

  onKeyDown(event) {
    if (this.active && (event.key === Key.Escape || event.key === Key.Enter)) {
      this.toggleActive();
    }
  }

  clearSelection() {
    this._categories.forEach((category) => {
      this._categoryMap[category].forEach((item) => {
        item.selected = false;
      });
    });
  }

  select(event, item) {
    Helpers.swallowEvent(event);
    // If we persist the selection, clear and show a check
    if (this.persistSelection) {
      this.clearSelection();
      item.selected = true;
    }
    // Emit the item
    this._select.emit(item);
    // Close, if input is set
    if (this.closeOnSelect) {
      this.toggleActive();
    }
  }

  onCategorySelected(category) {
    this.categorySelected.emit(category);
  }

  clearQuery(event) {
    Helpers.swallowEvent(event);
    this._query = '';
    // Reset the categories
    this._categories.forEach((category) => {
      this._categoryMap[category] = this._masterCategoryMap[category];
    });
  }

  queryCategories(query) {
    // Save the query
    this._query = query;
    // Check timeout
    if (this._queryTimeout) {
      clearTimeout(this._queryTimeout);
    }
    // Store a timeout, to debounce user input
    this._queryTimeout = setTimeout(() => {
      this._categories.forEach((category) => {
        if (this.search.compare) {
          this._categoryMap[category] = this._masterCategoryMap[category].filter((item) => this.search.compare(query, item));
        } else {
          this._categoryMap[category] = this._masterCategoryMap[category].filter(
            (item) => ~item.label.toLowerCase().indexOf(query.toLowerCase()),
          );
        }
      });
    }, this.search.debounce || 300);
  }

  executeClickCallback(event, link) {
    link.callback(event);
    // Close, if input is set
    if (this.closeOnSelect) {
      this.toggleActive();
    }
  }
}
