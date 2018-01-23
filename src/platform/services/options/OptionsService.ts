// NG2
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// App
import { EntityUtils } from './../../utils/entity-utils/EntityUtils';
import { EntityLabelService } from './../entity-label/EntityLabelService';
import { SkillsSpecialtyPickerResults } from '../../elements/picker/extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { DistributionListPickerResults } from '../../elements/picker/extras/distributionlist-picker-results/DistributionListPickerResults';

@Injectable()
export class OptionsService {
    constructor(private entityLabelService: EntityLabelService) { }
    getOptionEntity(field: any): string {
        let entity: any = (field.optionsType) ? field.optionsType : field.associatedEntity && field.associatedEntity.entity;
        if (entity === 'Client') {
            entity = 'ClientContact';
        }
        return entity;
    }

    getLabels(values: Object[] = []): Promise<any> {
        return new Promise((resolve) => {
            if (values.length > 0) {
                values = values.map((item) => {
                    return { value: item, label: item };
                });
            }
            resolve(values);
        });
    }

    buildNextLetterQuery(field: string, value: string): string {
        let nextLetter: string = String.fromCharCode(value.charCodeAt(value.length - 1) + 1);
        if (nextLetter === '{') {
            nextLetter = '*';
        }
        let nextWord: string = value.substring(0, value.length - 1) + nextLetter;
        value = value.replace(/\'/g, '\'\'');
        nextWord = nextWord.replace(/\'/g, '\'\'');
        return `(${field} >= '${value}' AND ${field} < '${nextWord}')`;
    }

    getOptions(query: any, http: any, config: { restUrl?: string }, entity: string, params: any = {}): any {//TODO: return observable
        let paramString: string = '';
        let keys: string[] = Object.keys(params);
        if (keys.length) {
            keys.forEach((key: string) => {
                paramString += `${key}=${params[key]}`
            });
            paramString = `&${paramString}`;
        }
        return new Promise((resolve, reject) => {
            if (query && query.length) {
                http.get(`${config.restUrl}lookup/expanded?entity=${entity}&filter=${query || ''}${paramString}`)
                    .subscribe(resolve, reject);
            } else {
                resolve([]);
            }
        });

    }

    removeValueFromArray(array: any[], value: any): any[] {
        let index: number = array.indexOf(value);
        while (index > -1) {
            array.splice(index, 1);
            index = array.indexOf(value);
        }
        return array;
    }

    makeLookupQuery(entityList: string[], http, restUrl, settings): any {
        return (query) => {
            if (query && query.length >= 1) {
                if (!settings.leadAndOpportunityEnabled) {
                    entityList = this.removeValueFromArray(entityList, 'Lead');
                    entityList = this.removeValueFromArray(entityList, 'Opportunity');
                }
                let url: string = `${restUrl}lookup/expanded?entity=${entityList.join(',')}&filter=${query || ''}&count=5&isCountPerEntity=true`;
                return http.get(url)
                    .map((response) => {
                        for (let item of response) {
                            item.label = EntityUtils.getNameForResult(item);
                        }
                        return response;
                    })
                    .toPromise();
            }
            return Promise.resolve([]);
        };
    }

    getOptionsConfig(http: any, field: any, config: { token?: string, restUrl?: string, military?: boolean }, settings: any): any { // TODO: Use OptionConfig and field interace and settings interface (??)
        let entityType: string, entityList: string;
        let options: any;
        let entity: string = this.getOptionEntity(field);
        let shortName: string = EntityUtils.getShortName(entity);
        switch (entity) {
            case 'ClientCorporation':
                return {
                    format: '$name',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entity),
                    getLabels: (values) => {
                        return this.entityLabelService.getLabels(http, config, entity, values);
                    },
                };
            case 'ClientCorporationText':
                return {
                    field: 'name',
                    format: '$name',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, 'ClientCorporation'),
                    getLabels: this.getLabels,
                };
            case 'CandidateSource':
                return {
                    format: '$name',
                    type: shortName,
                    options: (query, page) => {
                        let count: number = 20;
                        let start: number = (page - 1) * count;
                        return new Promise((resolve, reject) => {
                            if (query && query.length) {
                                http.get(`${config.restUrl}query/CandidateSource?where=${this.buildNextLetterQuery('name', query)}&orderBy=name&fields=id,name&start=${start}&count=${count}`)
                                    .subscribe(resolve, reject);
                            } else {
                                resolve([]);
                            }
                        });
                    },
                    getLabels: (values) => {
                        return this.entityLabelService.getCandidateSourceLabels(http, config, values);
                    },
                };
            case 'Candidate':
            case 'ClientContact':
            case 'Lead':
                return {
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entity),
                    getLabels: (values) => {
                        return this.entityLabelService.getLabels(http, config, entity, values);
                    },
                };
            case 'CandidateText':
            case 'ClientContactText':
            case 'ClientText':
            case 'LeadText':
            case 'CorporateUserText':
                entityType = field.optionsType.replace('Text', '');
                // Client is actually ClientContact in this case
                if (entityType === 'Client') {
                    entityType = 'ClientContact';
                }
                return {
                    valueFormat: '$firstName $lastName',
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entityType),
                    getLabels: this.getLabels,
                };
            case 'CorporateUser':
                return {
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query) => {
                        return new Promise((resolve, reject) => {
                            if (query && query.length) {
                                http
                                    .get(`${config.restUrl}lookup/expanded?entity=${entity}&filter=${query || ''}&showDisabled=${Boolean(field.showDisabledUsers)}`)
                                    .subscribe(resolve, reject);
                            } else {
                                resolve([]);
                            }
                        });
                    },
                    getLabels: this.getLabels,
                };
            case 'Internal':
                return {
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, 'CorporateUser'),
                    getLabels: (values) => {
                        return this.entityLabelService.getPersonLabels(http, config, values);
                    },
                };
            case 'External':
                if (Boolean(settings.leadAndOpportunityEnabled)) {
                    entityList = 'ClientContact,Lead,Candidate';
                }
                return {
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entityList),
                    getLabels: (values) => {
                        return this.entityLabelService.getPersonLabels(http, config, values);
                    },
                };
            case 'CorporationDepartment':
                return {
                    valueFormat: '$id',
                    format: '$name',
                    options: settings.userDepartments,
                };
            case 'Person':
                if (Boolean(settings.leadAndOpportunityEnabled)) {
                    entityList = 'ClientContact,Lead,Candidate,CorporateUser';
                } else {
                    entityList = 'ClientContact,Candidate,CorporateUser';
                }
                return {
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entityList, { count: 10, isCountPerEntity: true }),
                    getLabels: (values) => {
                        return this.entityLabelService.getPersonLabels(http, config, values);
                    },
                };
            case 'PersonText':
                if (Boolean(settings.leadAndOpportunityEnabled)) {
                    entityList = 'ClientContact,Lead,Candidate,CorporateUser';
                } else {
                    entityList = 'ClientContact,Candidate,CorporateUser';
                }
                return {
                    valueFormat: '$firstName $lastName',
                    format: '$firstName $lastName',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entityList, { count: 10, isCountPerEntity: true }),
                    getLabels: this.getLabels,
                };
            case 'Opportunity':
            case 'JobOrder':
                return {
                    format: '$id: $title',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entity),
                    getLabels: (values) => {
                        return this.entityLabelService.getLabels(http, config, entity, values);
                    },
                };
            case 'OpportunityText':
            case 'JobOrderText':
                entityType = field.optionsType.replace('Text', '');
                return {
                    valueFormat: '$id: $title',
                    format: '$id: $title',
                    type: shortName,
                    options: (query: any) => this.getOptions(query, http, config, entityType),
                    getLabels: this.getLabels,
                };
            case 'Placement':
                return {
                    format: '$label',
                    options: (query) => {
                        return new Promise((resolve, reject) => {
                            if (query && query.length) {
                                http
                                    .get(`${config.restUrl}lookup/expanded?entity=${entity}&filter=${query || ''}`)
                                    .subscribe((result: any) => {
                                        result.map((placement) => {
                                            placement.label = EntityUtils.getEntityLabel(placement, 'Placement');
                                            return placement;
                                        });
                                        resolve(result);
                                    }, reject);
                            } else {
                                resolve([]);
                            }
                        });
                    },
                    getLabels: (values) => {
                        return this.entityLabelService.getLabels(http, config, entity, values);
                    },
                };
            case 'Category':
            case 'BusinessSector':
            case 'Certification':
            case 'CertificationGroup':
                options = (query) => {
                    return new Promise((resolve, reject) => {
                        if (query && query.length) {
                            http
                                .get(`${field.optionsUrl}?filter=${query || ''}`)
                                .subscribe(resolve, reject);
                        } else {
                            resolve([]);
                        }
                    });
                };
                return {
                    field: 'value',
                    format: '$label',
                    options: options,
                    getLabels: (values) => {
                        return new Promise((resolve) => {
                            values.map((value) => {
                                if (value instanceof Object) {
                                    value.label = value.name || '';
                                }
                                return value;
                            });
                            resolve(values);
                        });
                    },
                };
            case 'Skill':
            case 'SkillText':
            case 'Specialty':
                let optionsEntity: string = entity === 'SkillText' ? 'Skill' : entity;
                options = (query) => {
                    return new Promise((resolve, reject) => {
                        if (query && query.length) {
                            http
                                .get(`all${optionsEntity}?filter=${query || ''}`)
                                .subscribe((items: any) => {
                                    items = items.filter((option: any) => {
                                        let nameMatches: any = option.name.toLowerCase().includes(query.toLowerCase());
                                        let categoryMatches: any = option.categories ? option.categories.toLowerCase().includes(query.toLowerCase()) : option.parentCategory.name.toLowerCase().includes(query.toLowerCase());
                                        return nameMatches || categoryMatches;
                                    });
                                    resolve(items);
                                }, reject);
                        } else {
                            resolve([]);
                        }
                    });
                };
                return {
                    field: entity === 'SkillText' ? 'name' : 'id',
                    format: '$name',
                    options: options,
                    resultsTemplate: SkillsSpecialtyPickerResults,
                    disableInfiniteScroll: true,
                    getLabels: this.getLabels,
                };
            case 'WorkersComp':
            case 'BillRateCategory':
                return {
                    field: 'value',
                    format: '$label',
                    options: (query) => {
                        return new Promise((resolve, reject) => {
                            if (query && query.length) {
                                http
                                    .get(`${field.optionsUrl}?filter=${query || ''}`)
                                    .subscribe(resolve, reject);
                            } else {
                                resolve([]);
                            }
                        });
                    },
                    getLabels: (values) => {
                        return this.entityLabelService.getOptionLabels(http, field.optionsUrl, values);
                    },
                };
            case 'CategoryText':
            case 'SpecialtyText':
            case 'BusinessSectorText':
                entityType = field.optionsType.replace('Text', '');
                field.optionsUrl.replace('Text', '');
                options = (query) => {
                    return new Promise((resolve, reject) => {
                        if (query && query.length) {
                            http
                                .get(`options/${entityType}?filter=${query || ''}`)
                                .subscribe(resolve, reject);
                        } else {
                            resolve([]);
                        }
                    });
                };
                return {
                    field: 'label',
                    format: '$label',
                    options: options,
                    getLabels: this.getLabels,
                };
            case 'All':
                return {
                    format: '$label',
                    options: this.makeLookupQuery(['ClientContact', 'Lead', 'Candidate', 'JobOrder', 'Opportunity', 'Placement'], http, config.restUrl, settings).bind(this),
                    getLabels: (values) => {
                        return this.entityLabelService.getMultipleLabels(http, config, values);
                    },
                };
            case 'DistributionList':
                return {
                    resultsTemplate: DistributionListPickerResults,
                    format: '$name',
                    options: (q, page) => {
                        return this.getDistributionListOptions(http, config, q, page);
                    },
                    getLabels: (values) => {
                        return this.entityLabelService.getDistributionListLabels(http, config.restUrl, settings, values);
                    },
                };
            default:
                return {
                    field: 'value',
                    format: '$label',
                    options: (query) => {
                        return new Promise((resolve, reject) => {
                            if (query && query.length) {
                                http.get(`${field.optionsUrl}?filter=${query || ''}`)
                                    .subscribe(resolve, reject);
                            } else {
                                resolve([]);
                            }
                        });
                    },
                };
        }
    }

    /**
 * @name getDistributionListOptions
 * @param query
 */
    getDistributionListOptions(http: any, config: any, query: any, page: any): any {
        let count: number = 20;
        let start: number = (page - 1) * count;
        return new Promise((resolve, reject) => {
            if (query && query.length >= 1) {
                let url: string = 'query/DistributionList';
                let params: any = {};
                params.count = count;
                params.start = start;
                params.orderBy = 'name';
                params.where = `(type<>'BH-Saved-Query' AND ${this.buildNextLetterQuery('name', query)})`;
                params.fields = 'id,name,owner(name),dateAdded,description';
                let fullUrl: string = http.buildUrl(config.restUrl, url, params);
                http.get(fullUrl)
                    .map((res) => res.data)
                    .subscribe(resolve, reject);
            } else {
                resolve([]);
            }
        });
    }

    getEntityOptions(http: any, config: any, entity: any, query: any): any {
        return new Promise((resolve, reject) => {
            if (query && query.length) {
                http
                    .get(`${config.restUrl}lookup/expanded?entity=${entity}&filter=${query || ''}`)
                    .subscribe(resolve, reject);
            } else {
                resolve([]);
            }
        });
    }
}
