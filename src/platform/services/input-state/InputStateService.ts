// NG2
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// Vendor
import { Subject } from 'rxjs/Subject';
// App
export type INPUT_STATE = 'STABLE' | 'LOADING';

@Injectable()
export class InputStateService {
  state: INPUT_STATE = 'STABLE';
  public chipsStateChange: Subject<INPUT_STATE> = new Subject();

  updateState(state: INPUT_STATE): void {
    this.state = state;
    this.chipsStateChange.next(state);
  }
}
