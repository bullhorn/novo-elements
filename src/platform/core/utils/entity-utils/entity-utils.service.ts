/**
 * Basic Utility for common Entity functions
 */
export class EntityUtils {
    static get ENTITY_TYPES(): string[] {
        return [
            'Lead',
            'ClientContact',
            'ClientCorporation',
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
            'Candidate',
            'CorporateUser',
        ];
    }

    static get ENTITY_SHORT_NAMES(): any {
        return {
            Lead: 'lead',
            ClientContact: 'contact',
            ClientCorporation: 'company',
            Opportunity: 'opportunity',
            Task: 'task',
            Note: 'note',
            CorporateUser: 'user',
            Candidate: 'candidate',
            JobOrder: 'job',
            Placement: 'placement',
            JobSubmission: 'submission',
            DistributionList: 'distributionList',
        };
    }

    static get ENTITY_LONG_NAMES(): any {
        return {
            lead: 'Lead',
            contact: 'ClientContact',
            company: 'ClientCorporation',
            opportunity: 'Opportunity',
            user: 'CorporateUser',
            task: 'Task',
            note: 'Note',
            distributionList: 'DistributionList',
            candidate: 'Candidate',
            job: 'JobOrder',
            placement: 'Placement',
            submission: 'JobSubmission',
            references: 'CandidateReference',
            appointment: 'Appointment',
        };
    }

    static get ENTITY_LUCENE_QUERY_NAMES(): any {
        return {
            Lead: 'lead',
            ClientContact: 'clientContact',
            ClientCorporation: 'clientCorporation',
            Opportunity: 'opportunity',
            Task: 'task',
            Note: 'note',
            DistributionList: 'distributionList',
            Candidate: 'candidate',
            JobOrder: 'jobOrder',
            Placement: 'placement',
            JobSubmission: 'jobSubmission',
            CandidateReference: 'candidateReference',
        };
    }

    static get ENTITY_LUCENE_QUERY_NAMES_PLURAL(): any {
        return {
            Lead: 'leads',
            ClientContact: 'clientContacts',
            ClientCorporation: 'clientCorporations',
            Opportunity: 'opportunities',
            Task: 'tasks',
            Note: 'notes',
            DistributionList: 'distributionLists',
            Candidate: 'candidates',
            JobOrder: 'jobOrders',
            Placement: 'placements',
            JobSubmission: 'jobSubmissions',
            CandidateReference: 'candidateReferences',
        };
    }

    static get NOTE_LUCENE_QUERY_NAMES(): any {
        return {
            ClientContact: 'clientContactUser',
            Candidate: 'candidateUser',
            Lead: 'leadUser',
            JobOrder: 'jobOrder',
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
            ClientCorporation: 'company',
            CustomObject: 'custom-objects',
            DistributionList: 'users',
            JobOrder: 'job',
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

    public static getShortName(name: string): string {
        return this.ENTITY_SHORT_NAMES[name];
    }

    public static getLuceneName(name: string): string {
        return this.ENTITY_LUCENE_QUERY_NAMES[name];
    }

    public static getNoteLuceneName(name: string): string {
        return this.NOTE_LUCENE_QUERY_NAMES[name];
    }

    public static getLongName(name: string): string {
        return this.ENTITY_LONG_NAMES[name];
    }

    public static getIcon(longName: string): string {
        return this.ENTITY_ICONS[longName];
    }

    public static getNameForResult(result: any): string {
        return this.getEntityLabel(result, result.searchEntity);
    }

    public static getEntityLabel(item: any, entity: string): string {
        switch (entity) {
            case 'CorporateUser':
            case 'ClientContact':
            case 'Lead':
            case 'Candidate':
            case 'Person':
                return `${item.firstName || ''} ${item.lastName || ''}`.trim();
            case 'ClientCorporation':
                return `${item.name || ''}`.trim();
            case 'JobOrder':
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

    public static getEntityThemeColor(entity: string): string {
        switch (entity) {
            case 'PlacementChangeRequest':
                return 'neutral';
            default:
                return this.getShortName(entity) || entity.toLowerCase();
        }
    }

    public static getAssociationName(entityType: string): string {
        return entityType.charAt(0).toLowerCase() + entityType.slice(1);
    }

    public static formatSubject(entity: string, id: any, title: string): string {
        return `${entity} #${id}: ${title}`;
    }
}
