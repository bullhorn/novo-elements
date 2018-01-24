// NG2
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// App
import { EntityUtils } from './../../utils/entity-utils/EntityUtils';
import { SkillsSpecialtyPickerResults } from '../../elements/picker/extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { DistributionListPickerResults } from '../../elements/picker/extras/distributionlist-picker-results/DistributionListPickerResults';

@Injectable()
export class OptionsService {
    constructor() { }

    getOptionsConfig(http: any, field: any, config: { token?: string, restUrl?: string, military?: boolean }, settings: any): any {
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
