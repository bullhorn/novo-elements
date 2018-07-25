// NG2
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// Vendor
import { Subject } from 'rxjs/Subject';
// App
export type CHIPS_STATE = 'STABLE' | 'LOADING' | 'INITIALIZING';

@Injectable()
export class ChipsStateService {
  state: CHIPS_STATE = 'STABLE';
  public chipsStateChange: Subject<CHIPS_STATE>;

  updateState(state: CHIPS_STATE): void {
    this.state = state;
    this.chipsStateChange.next(state);
  }
}
