export declare class NovoFile {
    name: string;
    file: any;
    type: any;
    contentType: string;
    lastModified: number;
    size: number;
    loaded: boolean;
    fileContents: string;
    dataURL: string;
    reader: FileReader;
    constructor(file: any);
    read(): Promise<{}>;
    toJSON(): {
        name: string;
        contentType: any;
        lastModified: number;
        size: number;
        fileContents: string;
    };
}
