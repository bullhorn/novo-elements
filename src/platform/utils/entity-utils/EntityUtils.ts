/**
 * Basic Utility for common Entity functions
 */
export class EntityUtils {
    static get ENTITY_TYPES(): string[] {
        return [
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
        ];
    }

    static get PERSON_SUBTYPES(): string[] {
        return [
            'Lead',
            'ClientContact',
            'ClientContact1',
            'ClientContact2',
            'ClientContact3',
            'ClientContact4',
            'ClientContact5',
            'Candidate',
            'CorporateUser',
        ];
    }

    static get ENTITY_SHORT_NAMES(): any {
        return {
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
        };
    }

    static get ENTITY_SHORT_NAMES_WITH_TRACKS(): any {
        return Object.assign(this.ENTITY_SHORT_NAMES, {
            ClientContact1: 'contact1',
            ClientContact2: 'contact2',
            ClientContact3: 'contact3',
            ClientContact4: 'contact4',
            ClientContact5: 'contact5',
            ClientCorporation1: 'company1',
            ClientCorporation2: 'company2',
            ClientCorporation3: 'company3',
            ClientCorporation4: 'company4',
            ClientCorporation5: 'company5',
            JobOrder1: 'job1',
            JobOrder2: 'job2',
            JobOrder3: 'job3',
            JobOrder4: 'job4',
            JobOrder5: 'job5',
        });
    }

    static get ENTITY_LONG_NAMES(): any {
        return {
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
        };
    }

    static get ENTITY_LUCENE_QUERY_NAMES(): any {
        return {
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
        };
    }

    static get ENTITY_LUCENE_QUERY_NAMES_PLURAL(): any {
        return {
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
        };
    }

    static get NOTE_LUCENE_QUERY_NAMES(): any {
        return {
            ClientContact: 'clientContactUser',
            ClientContact1: 'clientContactUser',
            ClientContact2: 'clientContactUser',
            ClientContact3: 'clientContactUser',
            ClientContact4: 'clientContactUser',
            ClientContact5: 'clientContactUser',
            Candidate: 'candidateUser',
            Lead: 'leadUser',
            JobOrder: 'jobOrder',
            JobOrder1: 'jobOrder',
            JobOrder2: 'jobOrder',
            JobOrder3: 'jobOrder',
            JobOrder4: 'jobOrder',
            JobOrder5: 'jobOrder',
            Placement: 'placement',
            Opportunity: 'opportunity',
        };
    }

    static get ENTITY_ICONS(): any {
        return {
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
        };
    }

    static get ENTITY_ICONS_FROM_PATH(): any {
        return {
            'activity': 'activity',
            'email': 'email',
            'work-history': 'clock-arrow',
            'education': 'education',
            'references': 'users',
            'notes': 'note',
            'files': 'file',
            'linkedin': 'linkedin-f',
        };
    }

    static getShortName(name: string): string {
        return this.ENTITY_SHORT_NAMES[name];
    }

    static getShortNameWithTrack(name: string): string {
        return this.ENTITY_SHORT_NAMES_WITH_TRACKS[name];
    }

    static getLuceneName(name: string): string {
        return this.ENTITY_LUCENE_QUERY_NAMES[name];
    }

    static getNoteLuceneName(name: string): string {
        return this.NOTE_LUCENE_QUERY_NAMES[name];
    }

    static getLongName(name: string): string {
        return this.ENTITY_LONG_NAMES[name];
    }

    static getIcon(longName: string): string {
        return this.ENTITY_ICONS[longName];
    }

    static getNameForResult(result: any): string {
        return this.getEntityLabel(result, result.searchEntity);
    }

    static getEntityLabel(item: any, entity: string): string {
        switch (entity) {
            case 'CorporateUser':
            case 'ClientContact':
            case 'ClientContact1':
            case 'ClientContact2':
            case 'ClientContact3':
            case 'ClientContact4':
            case 'ClientContact5':
            case 'Lead':
            case 'Candidate':
            case 'Person':
                return `${item.firstName || ''} ${item.lastName || ''}`.trim();
            case 'ClientCorporation':
            case 'ClientCorporation1':
            case 'ClientCorporation2':
            case 'ClientCorporation3':
            case 'ClientCorporation4':
            case 'ClientCorporation5':
                return `${item.name || ''}`.trim();
            case 'JobOrder':
            case 'JobOrder1':
            case 'JobOrder2':
            case 'JobOrder3':
            case 'JobOrder4':
            case 'JobOrder5':
            case 'Opportunity':
                return `${item.title || ''}`.trim();
            case 'Placement':
                let label: string = '';
                if (item.candidate) {
                    label = `${item.candidate.firstName} ${item.candidate.lastName}`.trim();
                }
                if (item.jobOrder) {
                    label = `${label} - ${item.jobOrder.title}`.trim();
                }
                return label;
            default:
                return '';
        }
    }

    static getEntityThemeColor(entity: string): string {
        switch (entity) {
            case 'PlacementChangeRequest':
                return 'neutral';
            default:
                return this.getShortName(entity) || entity.toLowerCase();
        }
    }

    static getAssociationName(entityType: string): string {
        return entityType.charAt(0).toLowerCase() + entityType.slice(1);
    }

    static formatSubject(entity: string, id: any, title: string): string {
        return `${entity} #${id}: ${title}`;
    }

    /**
     * Determines if the value is in valid entity track format
     * @param {string} val
     * @returns {boolean}
     */
    static isEntityTrack(val: string): boolean {
        return /[a-zA-Z]+\d+/g.test(val) && !/.*customobject.*/gi.test(val);
    }

    /**
     * If the entity is associated with a specific entity track, then it will have a number appended to the end of
     * the entity name. If this entity number is present, this method will strip it off, but only for the entities
     * that apply: Companies, Contacts, and Jobs.
     */
    static getBaseName(name: string): string {
        return name.replace(/(ClientCorporation|ClientContact|JobOrder)\d/g, '$1');
    }

    /**
     * Returns true if the given entity has tracks as entities enabled for it in the given settings.
     */
    static isTracksAsEntitiesEnabled(entity: string, settings: { clientTracksAsEntities: boolean, contactTracksAsEntities: boolean, jobTracksAsEntities: boolean }): boolean {
        const baseEntity: string = EntityUtils.getBaseName(entity);
        return (baseEntity === 'ClientCorporation' && settings.clientTracksAsEntities ||
            baseEntity === 'ClientContact' && settings.contactTracksAsEntities ||
            baseEntity === 'JobOrder' && settings.jobTracksAsEntities);
    }

    /**
     * Returns the title of the track for the given track name.
     *
     * @param {any[]} tracks the tracks array from meta for an entity
     * @param {string} trackName the name of the entity track to check
     * @returns {string} the track title, or empty string if not present
     */
    static getEntityTrackTitle(tracks: any[], trackName: string): string {
        let trackTitle: string = '';
        if (Array.isArray(tracks)) {
            let track: any = tracks.find((t) => t.name === trackName);
            if (track && Array.isArray(track.values) && track.values.length > 0) {
                trackTitle = track.values[0];
            }
        }
        return trackTitle;
    }

    /**
     * Returns the meta type to use when requesting data and meta for an entity
     *
     * @param {string} entity the canonical entity name
     * @returns {string} 'track' or 'full'
     */
    static getMetaType(entity: string): string {
        return ['JobOrder', 'Placement', 'Opportunity', 'ClientCorporation', 'ClientContact'].indexOf(entity) > -1 ? 'track' : 'full';
    }
}
