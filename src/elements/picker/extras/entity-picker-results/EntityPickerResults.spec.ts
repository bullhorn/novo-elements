// // APP
// import { EntityPickerResults } from './EntityPickerResults';
// import { APP_TEST_PROVIDERS } from './../../../../testing/test-providers';

// describe('Component: EntityPickerResults', () => {
//     let comp;

//     beforeEach(() => {
//         addProviders([
//             EntityPickerResults,
//             APP_TEST_PROVIDERS
//         ]);
//     });

//     beforeEach(inject([EntityPickerResults], _comp => {
//         comp = _comp;
//     }));

//     it('should initialize correctly', () => {
//         expect(comp).toBeDefined();
//     });

//     describe('Method: getIconForResult(result)', () => {
//         it('should return the right icon name for ClientContact', () => {
//             expect(comp.getIconForResult({ searchEntity: 'ClientContact' })).toBe('person contact');
//         });
//         it('should return the right icon name for ClientCorporation', () => {
//             expect(comp.getIconForResult({ searchEntity: 'ClientCorporation' })).toBe('company');
//         });
//         it('should return the right icon name for Opportunity', () => {
//             expect(comp.getIconForResult({ searchEntity: 'Opportunity' })).toBe('opportunity');
//         });
//         it('should return the right icon name for Candidate', () => {
//             expect(comp.getIconForResult({ searchEntity: 'Candidate' })).toBe('candidate');
//         });
//         it('should return the right icon name for Lead', () => {
//             expect(comp.getIconForResult({ searchEntity: 'Lead' })).toBe('lead');
//         });
//         it('should return the right icon name for JobOrder', () => {
//             expect(comp.getIconForResult({ searchEntity: 'JobOrder' })).toBe('job');
//         });
//         it('should return the right icon name for Placement', () => {
//             expect(comp.getIconForResult({ searchEntity: 'Placement' })).toBe('star placement');
//         });
//         it('should return empty string for unrecognized entity names', () => {
//             expect(comp.getIconForResult({ searchEntity: 'Unknown' })).toBe('');
//         });
//     });

//     describe('Method: getNameForResult(result)', () => {
//         it('should return a correctly formatted name for ClientContact', () => {
//             let input = {
//                 searchEntity: 'ClientContact',
//                 firstName: 'James',
//                 lastName: 'Bond'
//             };
//             expect(comp.getNameForResult(input)).toBe('James Bond');
//         });
//         it('should return a correctly formatted name for ClientCorporation', () => {
//             let input = {
//                 searchEntity: 'ClientCorporation',
//                 name: 'Bottles, Inc.'
//             };
//             expect(comp.getNameForResult(input)).toBe('Bottles, Inc.');
//         });
//         it('should return a correctly formatted name for Opportunity', () => {
//             let input = {
//                 searchEntity: 'Opportunity',
//                 title: 'Lead Bottlemaker'
//             };
//             expect(comp.getNameForResult(input)).toBe('Lead Bottlemaker');
//         });
//         it('should return a correctly formatted name for Lead', () => {
//             let input = {
//                 searchEntity: 'Lead',
//                 firstName: 'James',
//                 lastName: 'Bond'
//             };
//             expect(comp.getNameForResult(input)).toBe('James Bond');
//         });
//         it('should return a correctly formatted name for Candidate', () => {
//             let input = {
//                 searchEntity: 'Candidate',
//                 firstName: 'James',
//                 lastName: 'Bond'
//             };
//             expect(comp.getNameForResult(input)).toBe('James Bond');
//         });
//         it('should return a correctly formatted name for Job Order', () => {
//             let input = {
//                 searchEntity: 'JobOrder',
//                 title: 'Mock Job Title'
//             };
//             expect(comp.getNameForResult(input)).toBe('Mock Job Title');
//         });
//         it('should return a correctly formatted name for Placement', () => {
//             let input = {
//                 searchEntity: 'Placement',
//                 candidate: {
//                     firstName: 'James',
//                     lastName: 'Bond'
//                 }
//             };
//             expect(comp.getNameForResult(input)).toBe('James Bond');
//         });
//         it('should return the name when present for an unknown entity', () => {
//             let input = {
//                 searchEntity: 'Unknown',
//                 name: 'James Bond'
//             };
//             expect(comp.getNameForResult(input)).toBe('James Bond');
//         });
//         it('should return an empty string when name is not present for an unknown entity', () => {
//             let input = {
//                 searchEntity: 'Unknown',
//                 title: 'Mock Job Title'
//             };
//             expect(comp.getNameForResult(input)).toBe('');
//         });
//     });
// });
