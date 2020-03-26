export class NovoFile {
  name: string = '';
  file: any;
  type: any;
  contentType: string = '';
  lastModified: number = 0;
  size: number = 0;
  loaded: boolean = false;
  fileContents: string;
  dataURL: string;
  reader: FileReader = new FileReader();
  readPromise: Function;

  constructor(file) {
    this.name = `${encodeURIComponent(file.name || '')}`;
    this.contentType = file.type;
    this.lastModified = file.lastModified;
    this.size = file.size;
    this.file = file;
    this.reader.onload = (event: any) => {
      this.fileContents = event.target.result.split(',')[1];
      this.dataURL = event.target.result;
      this.loaded = true;
      if (this.readPromise) {
        this.readPromise(this);
      }
    };
  }

  read() {
    return new Promise((resolve) => {
      this.readPromise = resolve;
      // when the file is read it triggers the onload event above.
      this.reader.readAsDataURL(this.file);
    });
  }

  toJSON() {
    return {
      name: this.name,
      contentType: this.type,
      lastModified: this.lastModified,
      size: this.size,
      fileContents: this.fileContents,
    };
  }
}
