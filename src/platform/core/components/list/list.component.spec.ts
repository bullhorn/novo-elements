import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NovoListDividerComponent } from './list.component';
import { NovoListItemComponent } from './list.component';
import { NovoItemContentComponent } from './list.component';
import { NovoListComponent } from './list.component';
import { NovoListModule } from './list.module';

describe('NovoListDividerComponent', () => {
  let comp: NovoListDividerComponent;
  let fixture: ComponentFixture<NovoListDividerComponent>;

  beforeEach(() => {
    const elementRefStub: any = {
      nativeElement: {},
      childNodes: {
        length: {},
        nodeType: {},
        textContent: {},
      },
    };
    TestBed.configureTestingModule({
      imports: [NovoListModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ElementRef, useValue: elementRefStub }],
    });
    fixture = TestBed.createComponent(NovoListDividerComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('role defaults to: separator', () => {
    expect(comp.role).toEqual('separator');
  });
});
describe('NovoListItemComponent', () => {
  let comp: NovoListItemComponent;
  let fixture: ComponentFixture<NovoListItemComponent>;

  beforeEach(() => {
    const elementRefStub: any = {
      nativeElement: {},
      childNodes: {
        length: {},
        nodeType: {},
        textContent: {},
      },
    };
    TestBed.configureTestingModule({
      imports: [NovoListModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ElementRef, useValue: elementRefStub }],
    });
    fixture = TestBed.createComponent(NovoListItemComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('role defaults to: list-item', () => {
    expect(comp.role).toEqual('list-item');
  });

  it('focused defaults to: false', () => {
    expect(comp.focused).toEqual(false);
  });
});
describe('NovoItemContentComponent', () => {
  let comp: NovoItemContentComponent;
  let fixture: ComponentFixture<NovoItemContentComponent>;

  beforeEach(() => {
    const elementRefStub: any = {
      nativeElement: {},
      childNodes: {
        length: {},
        nodeType: {},
        textContent: {},
      },
    };
    TestBed.configureTestingModule({
      imports: [NovoListModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ElementRef, useValue: elementRefStub }],
    });
    fixture = TestBed.createComponent(NovoItemContentComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('direction defaults to: vertical', () => {
    expect(comp.direction).toEqual('vertical');
  });
});
describe('NovoListComponent', () => {
  let comp: NovoListComponent;
  let fixture: ComponentFixture<NovoListComponent>;

  beforeEach(() => {
    const elementRefStub: any = {
      nativeElement: {},
      childNodes: {
        length: {},
        nodeType: {},
        textContent: {},
      },
    };
    TestBed.configureTestingModule({
      imports: [NovoListModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ElementRef, useValue: elementRefStub }],
    });
    fixture = TestBed.createComponent(NovoListComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('role defaults to: list', () => {
    expect(comp.role).toEqual('list');
  });

  it('direction defaults to: vertical', () => {
    expect(comp.direction).toEqual('vertical');
  });
});
