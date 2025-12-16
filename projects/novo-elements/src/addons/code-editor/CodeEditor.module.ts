import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCodeEditor } from './CodeEditor';

@NgModule({
    imports: [CommonModule, FormsModule ],
    declarations: [NovoCodeEditor],
    exports: [NovoCodeEditor]
})
export class NovoCodeEditorModule {}
