import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { vi } from 'vitest';
import { NovoTheme } from 'novo-elements/elements/common';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoDynamicFormElement } from './DynamicForm';
import { NovoFormModule } from './Form.module';

describe('NovoDynamicFormElement', () => {
  describe('effectiveCardSections', () => {
    let fixture: ComponentFixture<NovoDynamicFormElement>;
    let component: NovoDynamicFormElement;
    let isBh2026: ReturnType<typeof signal<boolean>>;

    beforeEach(() => {
      isBh2026 = signal(false);

      TestBed.configureTestingModule({
        imports: [NovoFormModule, OverlayModule],
        providers: [
          NovoTemplateService,
          { provide: NovoTheme, useValue: { isBh2026 } },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(NovoDynamicFormElement);
      component = fixture.componentInstance;
      component.form = { fieldsets: [], layout: null, controls: {}, valid: true, getRawValue: () => ({}) } as any;
    });

    it('returns true when hasCardSections is explicitly true', () => {
      fixture.componentRef.setInput('hasCardSections', true);
      expect(component.effectiveCardSections()).toBe(true);
    });

    it('returns false when hasCardSections is explicitly false, even under bh2026', () => {
      isBh2026.set(true);
      fixture.componentRef.setInput('hasCardSections', false);
      expect(component.effectiveCardSections()).toBe(false);
    });

    it('returns false when hasCardSections is undefined and theme is not bh2026', () => {
      isBh2026.set(false);
      expect(component.effectiveCardSections()).toBe(false);
    });

    it('returns true when bh2026 and not inside an overlay container', () => {
      isBh2026.set(true);
      vi.spyOn(component['element'].nativeElement, 'closest').mockReturnValue(null);
      expect(component.effectiveCardSections()).toBe(true);
    });

    it('returns false when bh2026 and inside novo-modal-container', () => {
      isBh2026.set(true);
      vi.spyOn(component['element'].nativeElement, 'closest').mockReturnValue(document.createElement('novo-modal-container'));
      expect(component.effectiveCardSections()).toBe(false);
    });

    it('returns false when bh2026 and inside slide-out', () => {
      isBh2026.set(true);
      vi.spyOn(component['element'].nativeElement, 'closest').mockReturnValue(document.createElement('slide-out'));
      expect(component.effectiveCardSections()).toBe(false);
    });
  });

  describe('showOnlyRequired', () => {
    let component: NovoDynamicFormElement;
    let requiredControlDef: any;
    let optionalControlDef: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NovoFormModule, OverlayModule],
        providers: [
          NovoTemplateService,
          { provide: NovoTheme, useValue: { isBh2026: signal(false) } },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(NovoDynamicFormElement);
      component = fixture.componentInstance;

      requiredControlDef = { key: 'name', required: true, hidden: false };
      optionalControlDef = { key: 'bio', required: false, hidden: false };

      component.form = {
        fieldsets: [{ controls: [requiredControlDef, optionalControlDef] }],
        layout: null,
        controls: {
          name: { key: 'name', hidden: false, errors: null, required: true, markAsDirty() {}, markAsTouched() {} },
          bio: { key: 'bio', hidden: false, errors: null, required: false, markAsDirty() {}, markAsTouched() {} },
        },
        getRawValue: () => ({ name: '', bio: '' }),
      } as any;
    });

    it('hides non-required controls on both formControl and control definition', () => {
      component.showOnlyRequired(false);

      expect(component.form.controls['bio'].hidden).toBe(true);
      expect(optionalControlDef.hidden).toBe(true);
    });

    it('leaves required controls with no value visible', () => {
      component.showOnlyRequired(false);

      expect(component.form.controls['name'].hidden).toBe(false);
      expect(requiredControlDef.hidden).toBe(false);
    });

    it('restores visibility for controls with errors, syncing control definition', () => {
      component.form.controls['name'].errors = { required: true };
      component.form.controls['name'].hidden = true;
      requiredControlDef.hidden = true;

      component.showOnlyRequired(false);

      expect(component.form.controls['name'].hidden).toBe(false);
      expect(requiredControlDef.hidden).toBe(false);
    });

    it('hides required controls that already have a value when hideRequiredWithValue is true', () => {
      (component.form.getRawValue as any) = () => ({ name: 'Alice', bio: '' });

      component.showOnlyRequired(true);

      expect(component.form.controls['name'].hidden).toBe(true);
      expect(requiredControlDef.hidden).toBe(true);
    });
  });

  describe('showAllFields', () => {
    let component: NovoDynamicFormElement;
    let optionalControlDef: any;
    let preHiddenControlDef: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NovoFormModule, OverlayModule],
        providers: [
          NovoTemplateService,
          { provide: NovoTheme, useValue: { isBh2026: signal(false) } },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(NovoDynamicFormElement);
      component = fixture.componentInstance;

      optionalControlDef = { key: 'bio', required: false, hidden: false };
      preHiddenControlDef = { key: 'notes', required: false, hidden: false };

      component.form = {
        fieldsets: [{ controls: [optionalControlDef, preHiddenControlDef] }],
        layout: null,
        controls: {
          bio: { key: 'bio', hidden: false, errors: null, required: false, markAsDirty() {}, markAsTouched() {} },
          notes: { key: 'notes', hidden: true, errors: null, required: false, markAsDirty() {}, markAsTouched() {} },
        },
        getRawValue: () => ({ bio: '', notes: '' }),
      } as any;
    });

    it('restores formControl.hidden and control.hidden for non-pre-hidden controls', () => {
      component.showOnlyRequired(false);
      component.showAllFields();

      expect(component.form.controls['bio'].hidden).toBe(false);
      expect(optionalControlDef.hidden).toBe(false);
    });

    it('leaves pre-hidden controls hidden', () => {
      component.showOnlyRequired(false);
      component.showAllFields();

      expect(component.form.controls['notes'].hidden).toBe(true);
    });
  });

  describe('hasVisibleControls', () => {
    let component: NovoDynamicFormElement;
    let firstControlDef: any;
    let secondControlDef: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NovoFormModule, OverlayModule],
        providers: [
          NovoTemplateService,
          { provide: NovoTheme, useValue: { isBh2026: signal(false) } },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(NovoDynamicFormElement);
      component = fixture.componentInstance;

      firstControlDef = { key: 'name', required: true };
      secondControlDef = { key: 'bio', required: false };

      component.form = {
        fieldsets: [],
        layout: null,
        controls: {
          name: { hidden: false },
          bio: { hidden: false },
        },
        getRawValue: () => ({}),
      } as any;
    });

    it('returns true when at least one form control is not hidden', () => {
      const fieldset = { controls: [firstControlDef, secondControlDef] };
      component.form.controls['name'].hidden = false;
      component.form.controls['bio'].hidden = true;

      expect(component.hasVisibleControls(fieldset as any)).toBe(true);
    });

    it('returns false when all form controls are hidden', () => {
      const fieldset = { controls: [firstControlDef, secondControlDef] };
      component.form.controls['name'].hidden = true;
      component.form.controls['bio'].hidden = true;

      expect(component.hasVisibleControls(fieldset as any)).toBe(false);
    });
  });

  describe('visibleFieldsets', () => {
    let component: NovoDynamicFormElement;
    let isBh2026: ReturnType<typeof signal<boolean>>;

    beforeEach(() => {
      isBh2026 = signal(false);

      TestBed.configureTestingModule({
        imports: [NovoFormModule, OverlayModule],
        providers: [
          NovoTemplateService,
          { provide: NovoTheme, useValue: { isBh2026 } },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(NovoDynamicFormElement);
      component = fixture.componentInstance;
      component.form = {
        fieldsets: [],
        layout: null,
        controls: {},
        getRawValue: () => ({}),
      } as any;
    });

    it('returns only fieldsets with controls when card sections are off', () => {
      component.form.fieldsets = [
        { controls: [{ key: 'name' }] },
        { controls: [] },
        { controls: [{ key: 'bio' }] },
      ] as any;
      component.form.controls = {
        name: { hidden: false },
        bio: { hidden: false },
      } as any;

      expect(component.visibleFieldsets.length).toBe(2);
    });

    it('excludes fieldsets where all controls are hidden when card sections are on', () => {
      isBh2026.set(true);
      vi.spyOn(component['element'].nativeElement, 'closest').mockReturnValue(null);

      component.form.fieldsets = [
        { controls: [{ key: 'name' }] },
        { controls: [{ key: 'bio' }] },
      ] as any;
      component.form.controls = {
        name: { hidden: true },
        bio: { hidden: false },
      } as any;

      const result = component.visibleFieldsets;
      expect(result.length).toBe(1);
      expect((result[0].controls[0] as any).key).toBe('bio');
    });

    it('includes fieldsets with at least one visible control when card sections are on', () => {
      isBh2026.set(true);
      vi.spyOn(component['element'].nativeElement, 'closest').mockReturnValue(null);

      component.form.fieldsets = [
        { controls: [{ key: 'name' }, { key: 'bio' }] },
      ] as any;
      component.form.controls = {
        name: { hidden: true },
        bio: { hidden: false },
      } as any;

      expect(component.visibleFieldsets.length).toBe(1);
    });
  });
});
