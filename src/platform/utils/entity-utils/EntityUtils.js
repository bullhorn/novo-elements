"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic Utility for common Entity functions
 */
var EntityUtils = (function () {
    function EntityUtils() {
    }
    Object.defineProperty(EntityUtils, "ENTITY_TYPES", {
        get: function () {
            return [
                'Lead',
                'ClientContact',
                'ClientCorporation',
                'Opportunity',
                'Note',
                'Task',
                'DistributionList',
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "PERSON_SUBTYPES", {
        get: function () {
            return [
                'Lead',
                'ClientContact',
                'Candidate',
                'CorporateUser',
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "ENTITY_SHORT_NAMES", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "ENTITY_LONG_NAMES", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "ENTITY_LUCENE_QUERY_NAMES", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "ENTITY_LUCENE_QUERY_NAMES_PLURAL", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "NOTE_LUCENE_QUERY_NAMES", {
        get: function () {
            return {
                ClientContact: 'clientContactUser',
                Candidate: 'candidateUser',
                Lead: 'leadUser',
                JobOrder: 'jobOrder',
                Placement: 'placement',
                Opportunity: 'opportunity',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "ENTITY_ICONS", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityUtils, "ENTITY_ICONS_FROM_PATH", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    EntityUtils.getShortName = function (name) {
        return this.ENTITY_SHORT_NAMES[name];
    };
    EntityUtils.getLuceneName = function (name) {
        return this.ENTITY_LUCENE_QUERY_NAMES[name];
    };
    EntityUtils.getNoteLuceneName = function (name) {
        return this.NOTE_LUCENE_QUERY_NAMES[name];
    };
    EntityUtils.getLongName = function (name) {
        return this.ENTITY_LONG_NAMES[name];
    };
    EntityUtils.getIcon = function (longName) {
        return this.ENTITY_ICONS[longName];
    };
    EntityUtils.getNameForResult = function (result) {
        return this.getEntityLabel(result, result.searchEntity);
    };
    EntityUtils.getEntityLabel = function (item, entity) {
        switch (entity) {
            case 'CorporateUser':
            case 'ClientContact':
            case 'Lead':
            case 'Candidate':
            case 'Person':
                return ((item.firstName || '') + " " + (item.lastName || '')).trim();
            case 'ClientCorporation':
                return ("" + (item.name || '')).trim();
            case 'JobOrder':
            case 'Opportunity':
                return ("" + (item.title || '')).trim();
            case 'Placement':
                var label = '';
                if (item.candidate) {
                    label = (item.candidate.firstName + " " + item.candidate.lastName).trim();
                }
                if (item.jobOrder) {
                    label = (label + " - " + item.jobOrder.title).trim();
                }
                return label;
            default:
                return '';
        }
    };
    EntityUtils.getEntityThemeColor = function (entity) {
        switch (entity) {
            case 'PlacementChangeRequest':
                return 'neutral';
            default:
                return this.getShortName(entity) || entity.toLowerCase();
        }
    };
    EntityUtils.getAssociationName = function (entityType) {
        return entityType.charAt(0).toLowerCase() + entityType.slice(1);
    };
    EntityUtils.formatSubject = function (entity, id, title) {
        return entity + " #" + id + ": " + title;
    };
    return EntityUtils;
}());
exports.EntityUtils = EntityUtils;
//# sourceMappingURL=EntityUtils.js.map