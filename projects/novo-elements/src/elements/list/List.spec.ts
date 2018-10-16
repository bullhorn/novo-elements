// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import {
  NovoListElement,
  NovoListItemElement,
  NovoItemAvatarElement,
  NovoItemTitleElement,
  NovoItemHeaderElement,
  NovoItemDateElement,
  NovoItemContentElement,
  NovoItemEndElement,
} from './List';

describe('Elements: NovoListElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoListElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoListElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoListItemElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoListItemElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoListItemElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoItemAvatarElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemAvatarElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemAvatarElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoItemTitleElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemTitleElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemTitleElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoItemHeaderElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemHeaderElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemHeaderElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoItemDateElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemDateElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemDateElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoItemContentElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemContentElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemContentElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoItemEndElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoItemEndElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoItemEndElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
