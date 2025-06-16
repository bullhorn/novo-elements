import { DateUtil } from './Date';

describe('DateUtil', () => {

    it('should parse en-GB format correctly', () => {
        const parsed = DateUtil.parse('25/12/2025 08:30 AM', { userDateFormat: 'dd/MM/YYYY'});
        expect(parsed.getTime()).toEqual(1766669400000);
    });

    it('should parse de-DE format correctly', () => {
        const parsed = DateUtil.parse('25.12.2025 08:30 AM', { userDateFormat: 'dd.MM.YYYY'});
        expect(parsed.getTime()).toEqual(1766669400000);
    });

    xit('should parse fr-FR format correctly', () => {
        const parsed = DateUtil.parse('25/12/2025 à 08:30 AM', { userDateFormat: 'dd/MM/YYYY'});
        expect(parsed.getTime()).toEqual(1766669400000);
    });

    it('should parse nl-NL format correctly', () => {
        const parsed = DateUtil.parse('25-12-2025 08:30 AM', { userDateFormat: 'dd-MM-YYYY'});
        expect(parsed.getTime()).toEqual(1766669400000);
    });

    xit('should parse es-ES format correctly', () => {
        const parsed = DateUtil.parse('25/12/2025 08:30 A.M.', { userDateFormat: 'dd/MM/YYYY'});
        expect(parsed.getTime()).toEqual(1766669400000);
    });
});