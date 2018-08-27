import { Component } from '@angular/core';

/**
 * @title Minimal Editor Example
 */
@Component({
  selector: 'minimal-editor-example',
  templateUrl: 'minimal-editor-example.html',
  styleUrls: ['minimal-editor-example.css'],
})
export class MinimalEditorExample {
  public editorValue: string = '<p>I AM A PRE-RENDERED VALUE</p><h1>TEST</h1>';

  insertText(editor) {
    editor.insertText('Hello World');
  }
}
