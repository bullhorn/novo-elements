// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import {
  NovoTabElement,
  NovoNavElement,
  NovoTabButtonElement,
  NovoTabLinkElement,
  NovoNavOutletElement,
  NovoNavContentElement,
  NovoNavHeaderElement,
} from './Tabs';

describe('Elements: NovoNavElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoNavElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoTabElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavElement, NovoTabElement],
      providers: [{ provide: NovoNavElement, useValue: { add: () => {}, select: () => {} } }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTabElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoTabButtonElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavElement, NovoTabButtonElement],
      providers: [{ provide: NovoNavElement, useValue: { add: () => {}, select: () => {} } }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTabButtonElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoTabLinkElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavElement, NovoTabLinkElement],
      providers: [{ provide: NovoNavElement, useValue: { add: () => {}, select: () => {} } }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTabLinkElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoNavOutletElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavElement, NovoNavOutletElement],
      providers: [{ provide: NovoNavElement, useValue: { add: () => {}, select: () => {} } }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoNavOutletElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoNavContentElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavContentElement],
      providers: [{ provide: NovoNavOutletElement, useValue: { add: () => {} } }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoNavContentElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoNavHeaderElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoNavHeaderElement],
      providers: [{ provide: NovoNavOutletElement, useValue: { items: [] } }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoNavHeaderElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
