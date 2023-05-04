// APP
import { NovoFile } from './File';

describe('Class: NovoFile', () => {
  let file;
  beforeEach(() => {
    file = new NovoFile({
      name: 'test.pdf',
      type: 'application/pdf',
      lastModified: 10,
      size: 20,
    });
  });

  describe('Method: constructor()', () => {
    it('should be initialized.', () => {
      expect(file.name).toBe('test.pdf');
      expect(file.contentType).toBe('application/pdf');
      expect(file.lastModified).toBe(10);
      expect(file.size).toBe(20);
      expect(file.loaded).toBe(false);
    });
  });

  describe('Method: read()', () => {
    it('should read files.', async () => {
      return new Promise((resolve) => {
        jest.spyOn(file.reader, 'readAsDataURL').mockImplementation(() => {});
        file.read().then(() => {
          expect(file.fileContents).toEqual('The contents');
          resolve(true);
        });
        expect(file.reader.readAsDataURL).toHaveBeenCalled();
        file.reader.onload({
          target: {
            result: 'First,The contents',
          },
        } as any);
      });
    });
  });

  describe('Method: toJSON()', () => {
    it('should only show certain keys.', () => {
      expect(Object.keys(file.toJSON()).length).toBe(5);
    });
  });
});
