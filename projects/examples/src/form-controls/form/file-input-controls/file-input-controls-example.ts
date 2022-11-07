import { Component } from '@angular/core';
// Vendor
import { FileControl, FormUtils, NovoFormGroup } from 'novo-elements';

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
  public multiFileControlMixRemove: FileControl;
  public fileForm: any;

  // custom upload validation
  public message: string = '';
  public customValidationFileControl: FileControl;
  public customValidationFileForm: NovoFormGroup;

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

    this.customValidationFileControl = new FileControl({
      key: 'customValidationFiles',
      name: 'customValidationFiles',
      label: 'Custom Validation',
      tooltip: 'Custom Validation Multiple Files',
      multiple: true,
      layoutOptions: {
        order: 'displayFilesBelow',
        download: true,
        edit: true,
        customActions: false,
        customValidation: [{ action: 'upload', fn: this.checkFileSize.bind(this) }],
      },
    });
    this.customValidationFileForm = formUtils.toFormGroup([this.customValidationFileControl]);
    this.multiFileControlMixRemove = new FileControl({
      key: 'mixDeleteFiles',
      name: 'mymixDeleteFiles',
      label: 'Multiple Files - Delete New Only',
      tooltip: 'Multiple Files - Delete New Only',
      multiple: true,
      layoutOptions: {
        order: 'displayFilesBelow',
        labelStyle: 'no-box',
        download: true,
        edit: false,
        removable: false,
        removableWhenNew: true,
      },
      value: [{ name: 'yourFile.pdf', loaded: true, link: 'www.google.com', description: 'file description' }],
    });
    this.fileForm = formUtils.toFormGroup([this.fileControl, this.multiFileControl, this.multiFileControlMixRemove]);
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

  public checkFileSize(fileList): boolean {
    const maxSizeKb: number = 5120; // (5 MB in KB)
    for (const file of fileList) {
      if (file.size > maxSizeKb * 1024) {
        this.message = 'File is bigger than the allowed 5MB';
        return false;
      }
    }
    return true;
  }

  public clearFileLists(): void {
    this.fileForm.patchValue({file: null, files: null, mixDeleteFiles: null});
  }
}
