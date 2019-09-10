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
  public editorValue: string = ''; // The engineer we are looking for boasts superior technical skills and is ready to take the keys to our codebase and dominate. They have the touch of a craftsman and can courageously handle hostile issues in production.

  insertText(editor) {
    editor.insertText('Hello World');
  }
}
