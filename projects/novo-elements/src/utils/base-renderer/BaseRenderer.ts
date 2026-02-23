export class BaseRenderer {
  _data: any = {};
  _value: any = '';
  meta: any = {};

  get data() {
    return this._data;
  }

  set data(d: any) {
    this._data = d;
  }

  get value() {
    return this._value;
  }

  set value(v: any) {
    this._value = v;
  }
}
