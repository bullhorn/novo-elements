// APP
import { DecodeURIPipe } from './DecodeURI';

describe('Pipe: DecodeURIPipe', () => {
    let pipe;

    beforeEach(() => {
        pipe = new DecodeURIPipe();
    });

    describe('When rendering strings', () => {
        it('should transform a URL encoded value into a decoded value.', () => {
            let encodedString: string = encodeURIComponent('Hello!%20This%2C%20is.%20a%23%20string');
            const val: string = pipe.transform(encodedString);
            expect(val).toBe('Hello! This, is. a# string');
        });
    });
});
