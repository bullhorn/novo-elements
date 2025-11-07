import { DateUtil } from './Date';

describe('DateUtil', () => {

    function assertMDYHM(date: Date, month: number, day: number, year: number, hour: number, minute: number) {
        expect(isNaN(date.getTime())).toBeFalsy();
        expect(date.getDate()).toBe(day);
        expect(date.getMonth() + 1).toBe(month); // zero indexing
        expect(date.getFullYear()).toBe(year);
        expect(date.getHours()).toBe(hour);
        expect(date.getMinutes()).toBe(minute);
    }

    it('should parse en-GB format correctly', () => {
        const parsed = DateUtil.parse('25/12/2025 08:30 AM', { userDateFormat: 'dd/MM/YYYY'});
        assertMDYHM(parsed, 12, 25, 2025, 8, 30);
    });

    it('should parse de-DE format correctly', () => {
        const parsed = DateUtil.parse('25.12.2025 08:30 AM', { userDateFormat: 'dd.MM.YYYY'});
        assertMDYHM(parsed, 12, 25, 2025, 8, 30);
    });

    it('should parse nl-NL format correctly', () => {
        const parsed = DateUtil.parse('25-12-2025 08:30 AM', { userDateFormat: 'dd-MM-YYYY'});
        assertMDYHM(parsed, 12, 25, 2025, 8, 30);
    });
});