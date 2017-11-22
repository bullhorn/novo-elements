// NG2
import { Renderer } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoCKEditorElement } from './CKEditor';

describe('Elements: NovoCKEditorElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoCKEditorElement
            ],
            providers: [
                { provide: Renderer, useClass: Renderer }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoCKEditorElement);
        component = fixture.debugElement.componentInstance;

        window['CKEDITOR'] = {
            ENTER_P: 1,
            ENTER_BR: 2
        };
    }));

    describe('Method: ngOnDestroy()', () => {
        it('should remove everything if we have an instance of CKEditor', () => {
            expect(component.ngOnDestroy).toBeDefined();
        });
    });

    describe('Method: ngAfterViewInit()', () => {
        beforeEach(() => {
            spyOn(component, 'ckeditorInit');
        });

        it('should be defined', () => {
            expect(component.ngAfterViewInit).toBeDefined();
        });

        it('should set the base config', () => {
            spyOn(component, 'getBaseConfig').and.returnValue({ test: true });
            component.ngAfterViewInit();
            expect(component.ckeditorInit).toHaveBeenCalledWith({ test: true });
        });

        it('should set with passed config', () => {
            spyOn(component, 'getBaseConfig').and.returnValue({ test: false });
            component.config = { test: true };
            component.ngAfterViewInit();
            expect(component.ckeditorInit).toHaveBeenCalledWith({ test: true });
        });
    });

    describe('Method: writeValue()', () => {
        it('should be defined', () => {
            expect(component.writeValue).toBeDefined();
        });

        it('should work', () => {
            component.instance = null;
            component.writeValue({});
            expect(component.value).toEqual({});
        });

        xit('should update the instance', () => {
            component.writeValue({});
            expect(component.instance.setData).toHaveBeenCalledWith({});
        });
    });

    describe('Method: registerOnChange()', () => {
        it('should be defined', () => {
            expect(component.registerOnChange).toBeDefined();
        });

        it('should work', () => {
            component.registerOnChange({});
            expect(component.onChange).toEqual({});
        });
    });

    describe('Method: registerOnTouched()', () => {
        it('should be defined', () => {
            expect(component.registerOnTouched).toBeDefined();
        });

        it('should work', () => {
            component.registerOnTouched({});
            expect(component.onTouched).toEqual({});
        });
    });

    describe('Method: getBaseConfig()', () => {
        it('should be defined', () => {
            expect(component.getBaseConfig).toBeDefined();
        });

        it('should return extended config object', () => {
            expect(component.getBaseConfig()).toEqual({
                enterMode: window['CKEDITOR'].ENTER_BR,
                shiftEnterMode: window['CKEDITOR'].ENTER_P,
                disableNativeSpellChecker: false,
                removePlugins: 'liststyle,tabletools,contextmenu',
                toolbar: [
                    { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'] },
                    { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'] },
                    { name: 'links', items: ['Link'] },
                    { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                    { name: 'tools', items: ['Maximize', 'Source'] },
                    '/',
                    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                    { name: 'colors', items: ['TextColor', 'BGColor'] }
                ]
            });
        });

        it('should return minimal config object', () => {
            component.minimal = true;
            expect(component.getBaseConfig()).toEqual({
                enterMode: window['CKEDITOR'].ENTER_BR,
                shiftEnterMode: window['CKEDITOR'].ENTER_P,
                disableNativeSpellChecker: false,
                removePlugins: 'liststyle,tabletools,contextmenu',
                toolbar: [{
                    name: 'basicstyles',
                    items: ['Styles', 'FontSize', 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Link']
                }]
            });
        });
    });
});
