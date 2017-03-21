// NG2
import { Renderer } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoCKEditorElement } from './CKEditor';

describe('Elements: NovoCKEditorElement', () => {
    // let component;
    //
    // beforeEachProviders(() => [
    //     CKEditor,
    //     { provide: Renderer, useClass: MockRenderer }
    // ]);
    //
    // beforeEach(inject([CKEditor], _comp => {
    //     component = _comp;
    //     component.instance = new MockInstance();
    //     component.host = {
    //         nativeElement: {
    //             value: 'INITIAL VALUE'
    //         }
    //     };
    //
    // }));

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
        // spyOn(component.instance, 'removeAllListeners');
        // spyOn(component.instance, 'destroy');
        // spyOn(component.instance, 'setData');
        // spyOn(component.instance, 'on');
        // spyOn(component.change, 'emit');
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

    // xdescribe('Method: ckeditorInit()', () => {
    //     beforeEach(() => {
    //         spyOn(console, 'error');
    //     });
    //
    //     it('should be defined', () => {
    //         expect(component.ckeditorInit).toBeDefined();
    //     });
    //
    //     it('should throw error if the CKEDITOR is not present', () => {
    //         window.CKEDITOR = null;
    //         component.ckeditorInit({});
    //         expect(console.error).toHaveBeenCalled();
    //     });
    //
    //     describe('with CKEDITOR added', () => {
    //         beforeEach(() => {
    //             window.CKEDITOR = new MockInstance();
    //
    //             spyOn(window.CKEDITOR, 'removeAllListeners');
    //             spyOn(window.CKEDITOR, 'destroy');
    //             spyOn(window.CKEDITOR, 'setData');
    //             spyOn(window.CKEDITOR, 'on');
    //         });
    //
    //         it('should create the instance', () => {
    //             component.ckeditorInit({});
    //             expect(component.instance).toBeDefined();
    //         });
    //
    //         it('should set the data on the instance', () => {
    //             component.ckeditorInit({});
    //             expect(component.instance.setData).toHaveBeenCalled();
    //         });
    //
    //         it('should setup the handlers', () => {
    //             component.ckeditorInit({});
    //             expect(component.instance.on).toHaveBeenCalled();
    //         });
    //     });
    // });

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
                toolbar: [
                    { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo', 'Scayt'] },
                    { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'] },
                    { name: 'links', items: ['Link'] },
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
