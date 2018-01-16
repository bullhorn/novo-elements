// APP
import { EntityUtils } from './EntityUtils';

describe('Util: EntityUtils', () => {
    describe('object: ENTITY_TYPES', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_TYPES).toEqual([
                'Lead',
                'ClientContact',
                'ClientContact1',
                'ClientContact2',
                'ClientContact3',
                'ClientContact4',
                'ClientContact5',
                'ClientCorporation',
                'ClientCorporation1',
                'ClientCorporation2',
                'ClientCorporation3',
                'ClientCorporation4',
                'ClientCorporation5',
                'Opportunity',
                'Note',
                'Task',
                'DistributionList',
            ]);
        });
    });

    describe('object: PERSON_SUBTYPES', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.PERSON_SUBTYPES).toEqual([
                'Lead',
                'ClientContact',
                'ClientContact1',
                'ClientContact2',
                'ClientContact3',
                'ClientContact4',
                'ClientContact5',
                'Candidate',
                'CorporateUser',
            ]);
        });
    });

    describe('object: ENTITY_SHORT_NAMES', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_SHORT_NAMES).toEqual({
                Lead: 'lead',
                ClientContact: 'contact',
                ClientContact1: 'contact',
                ClientContact2: 'contact',
                ClientContact3: 'contact',
                ClientContact4: 'contact',
                ClientContact5: 'contact',
                ClientCorporation: 'company',
                ClientCorporation1: 'company',
                ClientCorporation2: 'company',
                ClientCorporation3: 'company',
                ClientCorporation4: 'company',
                ClientCorporation5: 'company',
                Opportunity: 'opportunity',
                Task: 'task',
                Note: 'note',
                CorporateUser: 'user',
                Candidate: 'candidate',
                JobOrder: 'job',
                JobOrder1: 'job',
                JobOrder2: 'job',
                JobOrder3: 'job',
                JobOrder4: 'job',
                JobOrder5: 'job',
                Placement: 'placement',
                JobSubmission: 'submission',
                CandidateReference: 'references',
                DistributionList: 'distributionList',
                Appointment: 'appointment',
            });
        });
    });

    describe('object: ENTITY_SHORT_NAMES_WITH_TRACKS', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_SHORT_NAMES_WITH_TRACKS).toEqual({
                Lead: 'lead',
                ClientContact: 'contact',
                ClientContact1: 'contact1',
                ClientContact2: 'contact2',
                ClientContact3: 'contact3',
                ClientContact4: 'contact4',
                ClientContact5: 'contact5',
                ClientCorporation: 'company',
                ClientCorporation1: 'company1',
                ClientCorporation2: 'company2',
                ClientCorporation3: 'company3',
                ClientCorporation4: 'company4',
                ClientCorporation5: 'company5',
                Opportunity: 'opportunity',
                Task: 'task',
                Note: 'note',
                CorporateUser: 'user',
                Candidate: 'candidate',
                JobOrder: 'job',
                JobOrder1: 'job1',
                JobOrder2: 'job2',
                JobOrder3: 'job3',
                JobOrder4: 'job4',
                JobOrder5: 'job5',
                Placement: 'placement',
                JobSubmission: 'submission',
                CandidateReference: 'references',
                DistributionList: 'distributionList',
                Appointment: 'appointment',
            });
        });
    });

    describe('object: ENTITY_LUCENE_QUERY_NAMES', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_LUCENE_QUERY_NAMES).toEqual({
                Lead: 'lead',
                ClientContact: 'clientContact',
                ClientContact1: 'clientContact',
                ClientContact2: 'clientContact',
                ClientContact3: 'clientContact',
                ClientContact4: 'clientContact',
                ClientContact5: 'clientContact',
                ClientCorporation: 'clientCorporation',
                ClientCorporation1: 'clientCorporation',
                ClientCorporation2: 'clientCorporation',
                ClientCorporation3: 'clientCorporation',
                ClientCorporation4: 'clientCorporation',
                ClientCorporation5: 'clientCorporation',
                Opportunity: 'opportunity',
                Task: 'task',
                Note: 'note',
                DistributionList: 'distributionList',
                Candidate: 'candidate',
                JobOrder: 'jobOrder',
                JobOrder1: 'jobOrder',
                JobOrder2: 'jobOrder',
                JobOrder3: 'jobOrder',
                JobOrder4: 'jobOrder',
                JobOrder5: 'jobOrder',
                Placement: 'placement',
                JobSubmission: 'jobSubmission',
                CandidateReference: 'candidateReference',
            });
        });
    });

    describe('object: ENTITY_LUCENE_QUERY_NAMES_PLURAL', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_LUCENE_QUERY_NAMES_PLURAL).toEqual({
                Lead: 'leads',
                ClientContact: 'clientContacts',
                ClientContact1: 'clientContacts',
                ClientContact2: 'clientContacts',
                ClientContact3: 'clientContacts',
                ClientContact4: 'clientContacts',
                ClientContact5: 'clientContacts',
                ClientCorporation: 'clientCorporations',
                ClientCorporation1: 'clientCorporations',
                ClientCorporation2: 'clientCorporations',
                ClientCorporation3: 'clientCorporations',
                ClientCorporation4: 'clientCorporations',
                ClientCorporation5: 'clientCorporations',
                Opportunity: 'opportunities',
                Task: 'tasks',
                Note: 'notes',
                DistributionList: 'distributionLists',
                Candidate: 'candidates',
                JobOrder: 'jobOrders',
                JobOrder1: 'jobOrders',
                JobOrder2: 'jobOrders',
                JobOrder3: 'jobOrders',
                JobOrder4: 'jobOrders',
                JobOrder5: 'jobOrders',
                Placement: 'placements',
                JobSubmission: 'jobSubmissions',
                CandidateReference: 'candidateReferences',
            });
        });
    });

    describe('object: ENTITY_LONG_NAMES', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_LONG_NAMES).toEqual({
                lead: 'Lead',
                contact: 'ClientContact',
                company: 'ClientCorporation',
                opportunity: 'Opportunity',
                task: 'Task',
                note: 'Note',
                user: 'CorporateUser',
                candidate: 'Candidate',
                job: 'JobOrder',
                placement: 'Placement',
                submission: 'JobSubmission',
                references: 'CandidateReference',
                distributionList: 'DistributionList',
                appointment: 'Appointment',
                tearsheet: 'Tearsheet',
            });
        });
    });

    describe('object: ENTITY_ICONS', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_ICONS).toEqual({
                Appointment: 'appointment',
                Candidate: 'candidate',
                CandidateEducation: 'education',
                CandidateReference: 'users',
                CandidateWorkHistory: 'job',
                ClientContact: 'person',
                ClientContact1: 'person',
                ClientContact2: 'person',
                ClientContact3: 'person',
                ClientContact4: 'person',
                ClientContact5: 'person',
                ClientCorporation: 'company',
                ClientCorporation1: 'company',
                ClientCorporation2: 'company',
                ClientCorporation3: 'company',
                ClientCorporation4: 'company',
                ClientCorporation5: 'company',
                CustomObject: 'custom-objects',
                DistributionList: 'users',
                JobOrder: 'job',
                JobOrder1: 'job',
                JobOrder2: 'job',
                JobOrder3: 'job',
                JobOrder4: 'job',
                JobOrder5: 'job',
                Lead: 'lead',
                Note: 'note',
                Opportunity: 'opportunity',
                Placement: 'star',
                Task: 'check-o',
                JobSubmission: 'star-o',
                Sendout: 'sendout',
                PlacementChangeRequest: 'republish',
            });
        });
    });

    describe('object: ENTITY_ICONS_FROM_PATH', () => {
        it('should be defined and populated', () => {
            expect(EntityUtils.ENTITY_ICONS_FROM_PATH).toEqual({
                'activity': 'activity',
                'email': 'email',
                'work-history': 'clock-arrow',
                'education': 'education',
                'references': 'users',
                'notes': 'note',
                'files': 'file',
                'linkedin': 'linkedin-f',
            });
        });
    });

    describe('Method: getShortName', () => {
        it('should return ClientContact short name', () => {
            expect(EntityUtils.getShortName('ClientContact')).toBe('contact');
        });

        it('should return ClientCorporation short name', () => {
            expect(EntityUtils.getShortName('ClientCorporation')).toBe('company');
        });
    });

    describe('Method: getShortNameWithTrack', () => {
        it('should return ClientContact4 short name', () => {
            expect(EntityUtils.getShortNameWithTrack('ClientContact4')).toBe('contact4');
        });
    });

    describe('Method: getLuceneName', () => {
        it('should return ClientContact lucene name', () => {
            expect(EntityUtils.getLuceneName('ClientContact')).toBe('clientContact');
        });

        it('should return ClientCorporation lucene name', () => {
            expect(EntityUtils.getLuceneName('ClientCorporation')).toBe('clientCorporation');
        });
    });

    describe('Method: getNoteLuceneName', () => {
        it('should return ClientContact lucene name', () => {
            expect(EntityUtils.getNoteLuceneName('ClientContact')).toBe('clientContactUser');
        });

        it('should return Candidate lucene name', () => {
            expect(EntityUtils.getNoteLuceneName('Candidate')).toBe('candidateUser');
        });

        it('should return JobOrder lucene name', () => {
            expect(EntityUtils.getNoteLuceneName('JobOrder')).toBe('jobOrder');
        });
    });

    describe('function: getLongName', () => {
        it('should return ClientContact long name', () => {
            expect(EntityUtils.getLongName('contact')).toBe('ClientContact');
        });

        it('should return ClientCorporation long name', () => {
            expect(EntityUtils.getLongName('company')).toBe('ClientCorporation');
        });
    });

    describe('function: getIcon', () => {
        it('should return ClientContact icon', () => {
            expect(EntityUtils.getIcon(EntityUtils.getLongName('contact'))).toBe('person');
        });

        it('should return ClientCorporation icon', () => {
            expect(EntityUtils.getIcon('ClientCorporation')).toBe('company');
        });
    });

    describe('Method: getNameForResult(result)', () => {
        it('should return a correctly formatted name for CorporateUser', () => {
            let input: any = {
                searchEntity: 'CorporateUser',
                firstName: 'James',
                lastName: 'Bond',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('James Bond');
        });
        it('should return a correctly formatted name for ClientContact', () => {
            let input: any = {
                searchEntity: 'ClientContact',
                firstName: 'James',
                lastName: 'Bond',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('James Bond');
        });
        it('should return a correctly formatted name for ClientCorporation', () => {
            let input: any = {
                searchEntity: 'ClientCorporation',
                name: 'Bottles, Inc.',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('Bottles, Inc.');
        });
        it('should return a correctly formatted name for Job Order', () => {
            let input: any = {
                searchEntity: 'JobOrder',
                title: 'Lead Bottlemaker',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('Lead Bottlemaker');
        });
        it('should return a correctly formatted name for Opportunity', () => {
            let input: any = {
                searchEntity: 'Opportunity',
                title: 'Lead Bottlemaker',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('Lead Bottlemaker');
        });
        it('should return a correctly formatted name for Lead', () => {
            let input: any = {
                searchEntity: 'Lead',
                firstName: 'James',
                lastName: 'Bond',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('James Bond');
        });
        it('should return a correctly formatted name for Candidate', () => {
            let input: any = {
                searchEntity: 'Candidate',
                firstName: 'James',
                lastName: 'Bond',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('James Bond');
        });
        it('should return a correctly formatted name for Placement', () => {
            let input: any = {
                searchEntity: 'Placement',
                candidate: {
                    firstName: 'James',
                    lastName: 'Bond',
                },
            };
            expect(EntityUtils.getNameForResult(input)).toBe('James Bond');
        });
        it('should return an empty string for an unknown entity', () => {
            let input: any = {
                searchEntity: 'Unknown',
                name: 'James Bond',
            };
            expect(EntityUtils.getNameForResult(input)).toBe('');
        });
    });

    describe('Method: getEntityLabel(item, Placement)', () => {
        it('should not include the job if there is not job', () => {
            let item: any = {
                candidate: {
                    firstName: 'John',
                    lastName: 'Snow',
                },
            };
            expect(EntityUtils.getEntityLabel(item, 'Placement')).toBe('John Snow');
        });

        it('should include the candidate and the job', () => {
            let item: any = {
                candidate: {
                    firstName: 'John',
                    lastName: 'Snow',
                },
                jobOrder: {
                    title: 'Defender of the Watch ',
                },
            };
            expect(EntityUtils.getEntityLabel(item, 'Placement')).toBe('John Snow - Defender of the Watch');
        });
    });

    describe('Method: getEntityThemeColor(entity)', () => {
        it('should return neutral if PlacementChangeRequest', () => {
            expect(EntityUtils.getEntityThemeColor('PlacementChangeRequest')).toBe('neutral');
        });

        it('should return entity title shortname if it has one', () => {
            expect(EntityUtils.getEntityThemeColor('JobOrder')).toBe('job');
        });

        it('should return entity title as lowercase for any other', () => {
            expect(EntityUtils.getEntityThemeColor('Batman')).toBe('batman');
        });
    });

    describe('Method: getAssociationName(entityType)', () => {
        it('should lowercase the first letter', () => {
            let entityName: string = 'JohnSnow';
            expect(EntityUtils.getAssociationName(entityName)).toBe('johnSnow');
        });
    });

    describe('Method: setOpportunitySubject(entity, id, title)', () => {
        it('should return formatted subject with given params', () => {
            expect(EntityUtils.formatSubject('Opportunity', 1776, 'USA')).toBe('Opportunity #1776: USA');
        });
    });

    describe('function: isEntityTrack', () => {
        it('should return true if value is an entity track', () => {
            expect(EntityUtils.isEntityTrack('job2')).toBeTruthy();
        });

        it('should return false if value is not an entity track', () => {
            expect(EntityUtils.isEntityTrack('job')).toBeFalsy();
        });

        it(`should return false if value contains 'customobject' (case-insensitive)`, () => {
            expect(EntityUtils.isEntityTrack('customobject')).toBeFalsy();
            expect(EntityUtils.isEntityTrack('jobCustomObject1')).toBeFalsy();
            expect(EntityUtils.isEntityTrack('xXjObCuStOmObJeCt1Xx')).toBeFalsy();
        });
    });

    describe('function: getBaseName', () => {
        it('should remove the number for the three "tracks as entity" entities', () => {
            expect(EntityUtils.getBaseName('Candidate')).toEqual('Candidate');
            expect(EntityUtils.getBaseName('CandidateReference')).toEqual('CandidateReference');
            expect(EntityUtils.getBaseName('JobSubmission')).toEqual('JobSubmission');
            expect(EntityUtils.getBaseName('JobOrder')).toEqual('JobOrder');
            expect(EntityUtils.getBaseName('JobOrder2')).toEqual('JobOrder');
            expect(EntityUtils.getBaseName('JobOrder5')).toEqual('JobOrder');
            expect(EntityUtils.getBaseName('ClientContact')).toEqual('ClientContact');
            expect(EntityUtils.getBaseName('ClientContactCustomObject2')).toEqual('ClientContactCustomObject2');
            expect(EntityUtils.getBaseName('ClientContact2')).toEqual('ClientContact');
            expect(EntityUtils.getBaseName('ClientContact5')).toEqual('ClientContact');
            expect(EntityUtils.getBaseName('ClientCorporation')).toEqual('ClientCorporation');
            expect(EntityUtils.getBaseName('ClientCorporation2')).toEqual('ClientCorporation');
            expect(EntityUtils.getBaseName('ClientCorporationCustomObject1')).toEqual('ClientCorporationCustomObject1');
        });
    });

    describe('function: isTracksAsEntitiesEnabled', () => {
        it('should return false if tracks are not enabled', () => {
            let settings: any = {
                clientTracksAsEntities: false,
                contactTracksAsEntities: false,
                jobTracksAsEntities: false,
            };
            expect(EntityUtils.isTracksAsEntitiesEnabled('Candidate', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('CandidateReference', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobSubmission', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder5', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContactCustomObject2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact5', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporationCustomObject1', settings)).toEqual(false);
        });
        it('should return true for client if tracks are enabled', () => {
            let settings: any = {
                clientTracksAsEntities: true,
                contactTracksAsEntities: false,
                jobTracksAsEntities: false,
            };
            expect(EntityUtils.isTracksAsEntitiesEnabled('Candidate', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('CandidateReference', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobSubmission', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder5', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContactCustomObject2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact5', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation2', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporationCustomObject1', settings)).toEqual(false);
        });
        it('should return true for contact if tracks are enabled', () => {
            let settings: any = {
                clientTracksAsEntities: false,
                contactTracksAsEntities: true,
                jobTracksAsEntities: false,
            };
            expect(EntityUtils.isTracksAsEntitiesEnabled('Candidate', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('CandidateReference', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobSubmission', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder5', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContactCustomObject2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact2', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact5', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporationCustomObject1', settings)).toEqual(false);
        });
        it('should return true for job if tracks are enabled', () => {
            let settings: any = {
                clientTracksAsEntities: false,
                contactTracksAsEntities: false,
                jobTracksAsEntities: true,
            };
            expect(EntityUtils.isTracksAsEntitiesEnabled('Candidate', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('CandidateReference', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobSubmission', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder2', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('JobOrder5', settings)).toEqual(true);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContactCustomObject2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientContact5', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporation2', settings)).toEqual(false);
            expect(EntityUtils.isTracksAsEntitiesEnabled('ClientCorporationCustomObject1', settings)).toEqual(false);
        });
    });

    describe('function: getEntityTrackTitle', () => {
        let tracks: any[] = [{
            name: 'ClientContact1',
            values: ['Contact #1'],
        }, {
            name: 'ClientContact2',
            values: ['Contact #2'],
        }, {
            name: 'ClientContact3',
            values: ['Contact #3'],
        }, {
            name: 'ClientContact4',
            values: [],
        }, {
            name: 'ClientContact5',
            values: ['Contact #5', 'Contact #5 - 2'],
        }];

        it('should return track title if present', () => {
            expect(EntityUtils.getEntityTrackTitle(tracks, 'ClientContact1')).toEqual('Contact #1');
            expect(EntityUtils.getEntityTrackTitle(tracks, 'ClientContact2')).toEqual('Contact #2');
            expect(EntityUtils.getEntityTrackTitle(tracks, 'ClientContact3')).toEqual('Contact #3');
            expect(EntityUtils.getEntityTrackTitle(tracks, 'ClientContact5')).toEqual('Contact #5');
        });
        it('should return empty string if not present', () => {
            expect(EntityUtils.getEntityTrackTitle(tracks, 'ClientContact1')).toEqual('Contact #1');
            expect(EntityUtils.getEntityTrackTitle(tracks, 'ClientContact4')).toEqual('');
            expect(EntityUtils.getEntityTrackTitle(tracks, '')).toEqual('');
        });
        it('should handle missing track data', () => {
            expect(EntityUtils.getEntityTrackTitle([], 'ClientContact')).toEqual('');
            expect(EntityUtils.getEntityTrackTitle([{ name: 'ClientContact' }], 'ClientContact')).toEqual('');
            expect(EntityUtils.getEntityTrackTitle([{ name: 'ClientContact', values: 'bogus' }], 'ClientContact')).toEqual('');
        });
    });

    describe('function: getMetaType', () => {
        it('should return track if an entity that can ever have tracks', () => {
            expect(EntityUtils.getMetaType('ClientContact')).toEqual('track');
            expect(EntityUtils.getMetaType('ClientCorporation')).toEqual('track');
            expect(EntityUtils.getMetaType('JobOrder')).toEqual('track');
            expect(EntityUtils.getMetaType('Opportunity')).toEqual('track');
            expect(EntityUtils.getMetaType('Placement')).toEqual('track');
        });
        it('should return full if an entity that can never have tracks', () => {
            expect(EntityUtils.getMetaType('Candidate')).toEqual('full');
            expect(EntityUtils.getMetaType('Lead')).toEqual('full');
            expect(EntityUtils.getMetaType('Submission')).toEqual('full');
        });
    });
});
