import { Component } from '@angular/core';

/**
 * @title Basic Editor Example
 */
@Component({
  selector: 'basic-editor-example',
  templateUrl: 'basic-editor-example.html',
  styleUrls: ['basic-editor-example.css'],
})
export class BasicEditorExample {
  public editorValue: string = '<p>I AM A PRE-RENDERED VALUE</p><h1>TEST</h1>';

  insertText(editor) {
    editor.insertText('Hello World');
  }
}
