// NG2
import { Renderer2 } from '@angular/core';
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
                { provide: Renderer2, useClass: Renderer2 }
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

    xdescribe('Method: ngAfterViewInit()', () => {
        beforeEach(() => {
            spyOn(component, 'ckeditorInit');
        });

        it('should be defined', () => {
            expect(component.ngAfterViewInit).toBeDefined();
        });

        it('should set the base config', () => {
            component.config = {};
            component.ngAfterViewInit();
            expect(component.ckeditorInit).toHaveBeenCalledWith({});
        });

        it('should set with passed config', () => {
            component.config = { test: 123 };
            component.ngAfterViewInit();
            expect(component.ckeditorInit).toHaveBeenCalledWith({ test: 123 });
        });
    });

    xdescribe('Method: onValueChange()', () => {
        it('should be defined', () => {
            expect(component.onValueChange).toBeDefined();
        });

        it('should emit the change', () => {
            component.onValueChange();
            expect(component.change.emit).toHaveBeenCalledWith('INITIAL VALUE');
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

        it('should work', () => {
            let config = component.getBaseConfig();
            expect(config).toEqual({
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
    });
});
