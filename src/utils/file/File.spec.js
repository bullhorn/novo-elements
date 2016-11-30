import { NovoFile } from './File';

describe('Class: NovoFile', () => {
    let file;
    beforeEach(() => {
        file = new NovoFile({
            name: 'test.pdf',
            type: 'application/pdf',
            lastModified: 10,
            size: 20
        });
    });

    describe('Function: constructor()', () => {
        it('should be initialized.', () => {
            expect(file.name).toBe('test.pdf');
            expect(file.contentType).toBe('application/pdf');
            expect(file.lastModified).toBe(10);
            expect(file.size).toBe(20);
            expect(file.loaded).toBe(false);
        });
    });

    describe('Function: read()', () => {
        it('should read files.', () => {
            spyOn(file.reader, 'readAsDataURL');
            file.read();
            expect(file.reader.readAsDataURL).toHaveBeenCalled();
        });
    });

    describe('Function: toJSON()', () => {
        it('should only show certain keys.', () => {
            expect(Object.keys(file.toJSON()).length).toBe(5);
        });
    });
});
