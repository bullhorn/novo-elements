import { Component } from '@angular/core';

// Vendor
import { FormUtils, FileControl } from 'novo-elements';

// import { MockMeta, MockMetaHeaders } from './MockMeta';

/**
 * @title File Input Controls Example
 */
@Component({
  selector: 'file-input-controls-example',
  templateUrl: 'file-input-controls-example.html',
  styleUrls: ['file-input-controls-example.css'],
})
export class FileInputControlsExample {
  public fileControl: any;
  public multiFileControl: any;
  public fileForm: any;

  constructor(private formUtils: FormUtils) {
    // File input controls
    this.fileControl = new FileControl({ key: 'file', name: 'myfile', label: 'File', tooltip: 'Files Control' });
    this.multiFileControl = new FileControl({
      key: 'files',
      name: 'myfiles',
      label: 'Multiple Files',
      tooltip: 'Multiple Files',
      multiple: true,
      layoutOptions: { order: 'displayFilesBelow', download: true, edit: true, customActions: true, labelStyle: 'no-box' },
      value: [{ name: 'yourFile.pdf', loaded: true, link: 'www.google.com', description: 'file description' }],
    });
    this.fileForm = formUtils.toFormGroup([this.fileControl, this.multiFileControl]);
  }

  public handleEdit(file) {
    console.log('This is an Edit Action!', file); // tslint:disable-line
  }

  public handleSave(file) {
    console.log('This is a Save Action!', file); // tslint:disable-line
  }

  public handleDelete(file) {
    console.log('This is a Delete Action!', file); // tslint:disable-line
  }

  public handleUpload(files) {
    console.log('This is an upload Action!', files); // tslint:disable-line
  }
}
