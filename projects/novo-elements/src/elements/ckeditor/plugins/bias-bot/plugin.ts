import 'ckeditor';

((CKEDITOR as unknown) as CKEDITOR.editor).plugins.add('bias-bot', { init });

function init(editor: CKEDITOR.editor): void {
  editor.addCommand('insertTimestamp', { exec });

  editor.ui.addButton('Timestamp', {
    label: 'Insert Timestamp',
    command: 'insertTimestamp',
    toolbar: 'insert',
  });
}

function exec(editor: CKEDITOR.editor): boolean {
  const now = new Date();
  editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>');
  return true;
}
