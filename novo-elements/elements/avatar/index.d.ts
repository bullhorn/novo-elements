import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, QueryList } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i3 from '@angular/common';

declare class NovoAvatarElement implements OnInit {
    private sanitizer;
    source: any;
    label: string;
    theme: string;
    image: string;
    size: string;
    shape: string;
    color: string;
    get hb_classBinding(): string[];
    get background(): string;
    src: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): any;
    setPrefixedValue(elm: any, prop: any, value: any): any;
    private _isValidURL;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAvatarElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAvatarElement, "novo-avatar", never, { "source": { "alias": "source"; "required": false; }; "label": { "alias": "label"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "image": { "alias": "image"; "required": false; }; "size": { "alias": "size"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoAvatarStackElement implements AfterViewInit {
    total: number;
    viewChildren: QueryList<NovoAvatarElement>;
    showTotal: boolean;
    remainingCount: number;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAvatarStackElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAvatarStackElement, "novo-avatar-stack", never, { "total": { "alias": "total"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class NovoAvatarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAvatarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoAvatarModule, [typeof NovoAvatarElement, typeof NovoAvatarStackElement], [typeof i3.CommonModule], [typeof NovoAvatarElement, typeof NovoAvatarStackElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoAvatarModule>;
}

export { NovoAvatarElement, NovoAvatarModule, NovoAvatarStackElement };
