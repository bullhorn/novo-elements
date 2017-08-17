// NG2
import { Input, Compiler, Component, NgModule, OnInit, ViewChild, ViewContainerRef, OnDestroy, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'custom-picker-result',
    template: `
        <div #container></div>
    `,
})
export class CustomPickerResult implements OnInit, OnDestroy {
    @Input() match: any;
    @Input() template: string;

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    private component: ComponentRef<any>;

    constructor(private compiler: Compiler) { }

    public ngOnInit(): void {
        this.addComponent(this.template);
    }

    public ngOnDestroy(): void {
        this.component.destroy();
    }

    private addComponent(template: string): void {
        @Component({ template: template })
        class TemplateComponent { }

        @NgModule({ declarations: [TemplateComponent], imports: [CommonModule] })
        class TemplateModule { }

        const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        const factory = mod.componentFactories.find((comp) =>
            comp.componentType === TemplateComponent
        );
        this.component = this.container.createComponent(factory);
        this.component.instance.match = this.match;
    }
}
