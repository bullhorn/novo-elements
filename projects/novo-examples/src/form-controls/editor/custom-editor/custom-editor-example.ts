import { Component } from '@angular/core';

/**
 * @title Custom Editor Example
 */
@Component({
  selector: 'custom-editor-example',
  templateUrl: 'custom-editor-example.html',
  styleUrls: ['custom-editor-example.css'],
})
export class CustomEditorExample {
  public editorValue: string = '<p>I AM A PRE-RENDERED VALUE</p><h1>TEST</h1>';
  public config: object = {
    height: 400,
    width: 320,
    resize_enabled: false,
    uiColor: '#AADC6E',
    toolbar: [
      {
        items: ['Bold', 'Italic', 'Underline', 'Link'],
      },
      {
        items: ['Cut', 'Copy', 'Paste', 'Undo', 'Redo'],
      },
    ],
  };

  insertText(editor) {
    editor.insertText('Hello World');
  }
}
