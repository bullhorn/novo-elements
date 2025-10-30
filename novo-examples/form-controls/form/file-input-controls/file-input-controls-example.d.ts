import { FileControl, FormUtils, NovoFormGroup } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title File Input Controls Example
 */
export declare class FileInputControlsExample {
    private formUtils;
    fileControl: any;
    multiFileControl: any;
    multiFileControlMixRemove: FileControl;
    fileForm: any;
    message: string;
    customValidationFileControl: FileControl;
    customValidationFileForm: NovoFormGroup;
    constructor(formUtils: FormUtils);
    handleEdit(file: any): void;
    handleSave(file: any): void;
    handleDelete(file: any): void;
    handleUpload(files: any): void;
    checkFileSize(fileList: any): boolean;
    clearFileLists(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileInputControlsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileInputControlsExample, "file-input-controls-example", never, {}, {}, never, never, false, never>;
}
