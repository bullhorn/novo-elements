// NG2
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
// Vendor
// APP
import { PluralPipe } from './../../pipes/plural/Plural';
import { Helpers } from './../../utils/Helpers';
import { EntityUtils } from './../../utils/entity-utils/EntityUtils';
import { NovoLabelService } from '../novo-label-service';

@Injectable()
export class EntityLabelService {
    entityFieldList: any = {
        'ClientCorporation': 'id,name',
        'Candidate': 'id,firstName,lastName',
        'ClientContact': 'id,firstName,lastName',
        'Lead': 'id,firstName,lastName',
        'JobOrder': 'id,title',
        'Opportunity': 'id,title',
        'Placement': 'id,candidate,jobOrder',
    };
    queryEntityFieldList: any = {
        'DistributionList': 'id,name',
        'CandidateSource': 'id,name',
    };
    plural: any = new PluralPipe();

    constructor(private labelService: NovoLabelService) {
    }

    getLabels(http: any, config: any, entity: any, values: any): any {
        return new Promise((resolve, reject) => {
            let query: string;
            let multiple: boolean = false;
            if (values.length) {
                let ids: any[] = values.map((item) => item.id);
                query = `id: ${ids.join(' ')}`;
                multiple = true;
            } else if (values.id) {
                query = `id: ${values.id}`;
            }
            let fields: string = this.entityFieldList[entity] || 'id';
            if (query && query.length > 4) {
                http.get(`${config.restUrl}search/${entity}?fields=${fields}&query=${query}&count=500`)
                    .subscribe((result) => {
                        let response: any[] = [];
                        if (result.data && result.data.length) {
                            response = result.data.map((item) => {
                                return this.setItemLabel(entity, item);
                            });
                        }
                        for (let value of response) {
                            value.searchEntity = entity;
                        }
                        if (!multiple && response.length) {
                            resolve(response[0]);
                        } else {
                            resolve(response);
                        }
                    }, reject);
            } else {
                resolve([]);
            }
        });
    }

    // This is used when you need to pre-populate a picker with a value and
    // and you only have something like an ID that corresponds to the return
    // of the optionsUrl for a field
    getOptionLabels(http: any, optionsUrl: any, values: any): any {
        if (!values) { return Promise.resolve([]); }
        let data: any[] = Array.isArray(values) ? values : [values];
        let ids: any[] = data.map((item) => item.id || item);

        return new Promise((resolve, reject) => {
            http.get(`${optionsUrl}/${ids.join(',')}`)
                .subscribe((response) => {
                    if (response && response.data) {
                        resolve(Array.isArray(values) ? response.data : response.data[0]);
                    } else {
                        resolve([]);
                    }
                }, reject);
        });
    }

    getMultipleLabels(http: any, config: any, values: any): any {
        let calls: any[] = [];
        let entities: any = Object.keys(this.entityFieldList);
        entities.push('Person');

        entities.forEach((entity) => {
            let ids: any[] = values.filter((item) => item.searchEntity === entity);
            if (ids.length > 0) {
                if (entity === 'Person') {
                    calls.push(this.getPersonLabels(http, config, values));
                } else {
                    calls.push(this.getLabels(http, config, entity, ids));
                }
            }
        });

        return Promise.all(calls).then(([...responses]) => {
            return [].concat.apply([], responses);
        });
    }

    /**
     * @name getPersonLabels
     * @param http
     * @param config
     * @param values
     * @param fields
     * @returns {Promise<T>}
     *
     * @desc This returns either the labels it get from a query call that correspond to the incoming id or a list
     * for of id(s) (1 or more in the list)
     *
     */
    getPersonLabels(http: any, config: any, values: any, fields: string = 'id,firstName,lastName'): any {
        // TODO: values: { id: string } | any[]
        // TODO: (cont.) values should be typed, but this is written in such a way that it can't be; refactor
        return new Promise((resolve, reject) => {
            let query: string;
            let multiple: boolean = false;
            let idList: number[] = [];
            for (const item of values) {
                if (!Helpers.isBlank(item.id)) {
                    idList.push(item.id);
                }
            }
            if (idList.length) {
                query = `id IN (${idList.join(',')})`;
                multiple = true;
            } else if (values.id) {
                query = `id = ${values.id}`;
            }
            if (query && (values.length ? query.length > 8 : query.length > 4)) {
                http.get(`${config.restUrl}query/Person?fields=${fields}&where=${query}&count=500`)
                    .subscribe((result) => {
                        let response: any[] = [];
                        if (result.data && result.data.length) {
                            response = result.data.map((item) => {
                                let person: any = this.setItemLabel('Person', item);
                                person.searchEntity = item._subtype;
                                return person;
                            });
                        }
                        if (!multiple && response.length) {
                            resolve(response[0]);
                        } else {
                            resolve(response);
                        }
                    }, reject);
            } else {
                resolve([]);
            }
        });
    }

    getDistributionListLabels(http: any, restUrl: string, settings: any, values: any): any {
        return this.getQueryEntityLabels(http, { restUrl }, 'DistributionList', values, settings);
    }

    getCandidateSourceLabels(http: any, config: any, values: any): any {
        return this.getQueryEntityLabels(http, config, 'CandidateSource', values);
    }

    getQueryEntityLabels(http: any, config: any, entity: string, values: any, settings: any = {}): any {
        return new Promise((resolve, reject) => {
            let query: string;
            let multiple: boolean = false;
            if (values.length) {
                let ids: number[] = values.map((item) => item.id);
                query = `id IN (${ids})`;
                multiple = true;
            } else if (values.id) {
                query = `id = ${values.id}`;
            }
            let fields: string = this.queryEntityFieldList[entity] || 'id';
            if (query && (values.length ? query.length > 8 : query.length > 4)) {
                http.get(`${config.restUrl}query/${entity}?fields=${fields}&where=${query}&count=500`)
                    .subscribe((result) => {
                        let response: any[] = [];
                        if (result.data && result.data.length) {
                            response = result.data.map((item) => {
                                return this.setItemLabel(entity, item, values, settings);
                            });
                        }
                        if (!multiple && response.length) {
                            resolve(response[0]);
                        } else {
                            resolve(response);
                        }
                    }, reject);
            } else {
                resolve([]);
            }
        });
    }

    setItemLabel(entity: string, item: any, values: any = [], settings: any = {}): any {
        switch (entity) {
            case 'CandidateSource':
                item.label = item.name || '';
                break;
            case 'DistributionList':
                item.label = item.name || '';
                if (values.id && values.id === item.id && values.entity) {
                    let entityLabel: string = settings[`entityTitle${values.entity}Many`] ? settings[`entityTitle${values.entity}Many`] : this.labelService[`entityTitle${values.entity}Many`];
                    item.label = `${item.label} (${entityLabel})`;
                } // FIXME LabelService has no info about these labels!!!
                break;
            case 'JobOrder':
            case 'Opportunity':
                // override EntityUtils.getEntityLabel because it uses a different format than expected for Job and Opp pickers
                item.label = item.title ? `${item.id}: ${item.title}` : item.id;
                break;
            default:
                item.label = EntityUtils.getEntityLabel(item, entity);
        }
        return item;
    }
}
