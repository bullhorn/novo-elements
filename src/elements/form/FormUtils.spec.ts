// // APP
// import { FormUtils } from './FormUtils';
//
// describe('FormUtils', () => {
//     let formUtils;
//     beforeEach(() => {
//         formUtils = new FormUtils;
//     });
//     describe('Method: toFormGroup(controls)', () => {
//         it('should be defined', () => {
//             expect(formUtils.toFormGroup).toBeDefined();
//         });
//     });
//     describe('Method: determineInputType(field)', () => {
//         it('should return the type of all entity chips correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'Candidate' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'ClientContact' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'ClientCorporation' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'Lead' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'Opportunity' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'JobOrder' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'CorporateUser' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'Person' } })).toBe('entitychips');
//             expect(formUtils.determineInputType({ type: 'TO_MANY', associatedEntity: { entity: 'Placement' } })).toBe('entitychips');
//         });
//         it('should return the type of all non-entity chips correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'TO_MANY' })).toBe('chips');
//         });
//         it('should return the type of all entity pickers correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'Candidate' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'ClientContact' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'ClientCorporation' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'Lead' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'Opportunity' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'JobOrder' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'CorporateUser' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'Person' } })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', associatedEntity: { entity: 'Placement' } })).toBe('entitypicker');
//         });
//         it('should return the type of all non-entity chips correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'TO_ONE' })).toBe('picker');
//         });
//         it('should return the type of dates correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataSpecialization: 'DATETIME' })).toBe('datetime');
//         });
//         it('should return the type of times correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataSpecialization: 'TIME' })).toBe('time');
//         });
//         it('should return the type of money correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataSpecialization: 'MONEY' })).toBe('currency');
//         });
//         it('should return the type of percents correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataSpecialization: 'PERCENTAGE' })).toBe('percentage');
//         });
//         it('should return the type of HTML correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataSpecialization: 'HTML' })).toBe('editor');
//         });
//         it('should return the type of timestamps correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataType: 'Timestamp' })).toBe('date');
//         });
//         it('should return the type of booleans correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataType: 'Boolean' })).toBe('tiles');
//         });
//         it('should return the type of doubles/decimals correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataType: 'Double' })).toBe('float');
//             expect(formUtils.determineInputType({ dataType: 'BigDecimal' })).toBe('float');
//         });
//         it('should return the type of floats correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'TEXTAREA' })).toBe('textarea');
//         });
//         it('should return the type of textarea correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'TO_ONE' })).toBe('picker');
//         });
//         it('should return the type of checklists correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'CHECKBOX', options: 1, multiValue: true })).toBe('checklist');
//             expect(formUtils.determineInputType({ inputType: 'RADIO', options: 1, multiValue: true })).toBe('checklist');
//         });
//         it('should return the type of radio correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'RADIO', options: 1, multiValue: false })).toBe('radio');
//             expect(formUtils.determineInputType({ inputType: 'CHECKBOX', options: 1, multiValue: false })).toBe('radio');
//         });
//         it('should return the type of entity select picker correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'CandidateText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'ClientText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'ClientContactText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'ClientCorporationText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'LeadText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'OpportunityText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'JobOrderText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'CorporateUserText' })).toBe('entitypicker');
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, optionsType: 'PersonText' })).toBe('entitypicker');
//         });
//         it('should return the type of select picker correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1 })).toBe('picker');
//         });
//         it('should return the type of chips select correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'SELECT', options: 1, multiValue: true })).toBe('chips');
//         });
//         it('should return the type of select correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'SELECT', options: 1, multiValue: false })).toBe('select');
//         });
//         it('should return the type of tiles select correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'TILES', options: 1, multiValue: false })).toBe('tiles');
//         });
//         it('should return the type of address correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'COMPOSITE' })).toBe('address');
//         });
//         it('should return the type of number correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ dataType: 'Integer' })).toBe('number');
//         });
//         it('should return the type of file correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ type: 'file' })).toBe('file');
//         });
//
//         // Overrides
//         it('should return the override type of checklist correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, multiValue: true })).toBe('chips');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', multiValue: true })).toBe('chips');
//         });
//         it('should return the override type of checklist correctly.', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//             expect(formUtils.determineInputType({ inputType: 'SELECT', optionsUrl: 1, associatedEntity: { entity: 'Candidate' }, multiValue: true })).toBe('chips');
//             expect(formUtils.determineInputType({ type: 'TO_ONE', optionsType: 'Candidate', multiValue: true })).toBe('chips');
//         });
//     });
//     describe('Method: getControlForField(field, http, config)', () => {
//         it('should be defined', () => {
//             expect(formUtils.getControlForField).toBeDefined();
//         });
//     });
//     describe('Method: toControls(meta, currencyFormat, http, config)', () => {
//         it('should be defined', () => {
//             expect(formUtils.determineInputType).toBeDefined();
//         });
//     });
//     describe('Method: getControlOptions(field, http, config)', () => {
//         it('should be defined', () => {
//             expect(formUtils.getControlOptions).toBeDefined();
//         });
//     });
//     describe('Method: setInitialValues(controls, values, keepClean)', () => {
//         it('should be defined', () => {
//             expect(formUtils.setInitialValues).toBeDefined();
//         });
//     });
//     describe('Method: forceShowAllControls(controls)', () => {
//         it('should be defined', () => {
//             expect(formUtils.forceShowAllControls).toBeDefined();
//         });
//     });
// });
