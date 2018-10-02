// NG2
import { Injectable, Pipe, ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { findByCountryId } from '../../utils/countries/Countries';

/**
 * @class RenderPipe
 * @classdesc
 * Renders data appropriately based on the data type found in Meta
 * All data types defined by bullhorn should be supported:
 *
 * - **String**: trims value and returns
 * - **Integer**: return value
 * - **Double**: return value fixed to 2 decimals
 * - **BigDecimal**: return value fixed to 2 decimals
 * - **Address**: only city and/or state returned
 * - **Address1**: only city and/or state returned
 * - **AddressWithoutCountry**: only city and/or state returned
 * - **Currency**: put a $ in front
 * - **Percentage**: divide by 100 fix to 2 decimals place and return
 * - **Options**: returns the appropriate 'label' for the 'value' from 'options'
 * - **Array**: returns list comma separated
 * - **DateTime**: formats the date
 * - **TimeStamp**: formats the date
 * - **ToOne**: return the entity specific name (ie. name, firstName lastName, title, ...)
 * - **ToMany**: return an array of the entity specific names (ie. name, firstName lastName, title, ...)
 *
 * @example
 * ```
 * {{ expression | render:field }}
 * ```
 */
@Pipe({
  name: 'render',
  pure: false,
})
@Injectable()
export class RenderPipe implements PipeTransform {
  value: any;
  lastValue: any;
  lastArgs: any;

  constructor(private changeDetector: ChangeDetectorRef, private sanitizationService: DomSanitizer, private labels: NovoLabelService) {}

  equals(objectOne: any, objectTwo: any): any {
    if (objectOne === objectTwo) {
      return true;
    }
    if (objectOne === null || objectTwo === null) {
      return false;
    }
    if (objectOne !== objectOne && objectTwo !== objectTwo) {
      return true;
    }
    let t1: any = typeof objectOne;
    let t2: any = typeof objectTwo;
    let length: number;
    let key: any;
    let keySet: any;
    if (t1 === t2 && t1 === 'object') {
      if (Array.isArray(objectOne)) {
        if (!Array.isArray(objectTwo)) {
          return false;
        }
        length = objectOne.length;
        if (length === objectTwo.length) {
          for (key = 0; key < length; key++) {
            if (!this.equals(objectOne[key], objectTwo[key])) {
              return false;
            }
          }
          return true;
        }
      } else {
        if (Array.isArray(objectTwo)) {
          return false;
        }
        keySet = Object.create(null);
        for (key in objectOne) {
          if (objectOne[key]) {
            if (!this.equals(objectOne[key], objectTwo[key])) {
              return false;
            }
            keySet[key] = true;
          }
        }
        for (key in objectTwo) {
          if (!(key in keySet) && typeof objectTwo[key] !== 'undefined') {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  getEntityLabel(item: any, entity: string): string {
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

  /**
   * Define the fields to set or retrieve for the given entity. Getter and Setter methods will automagically
   * be set up on the entity once the fields are defined.
   * @name fields
   * @memberOf Entity#
   * @param value
   * @param {args} args - fields can either be sent as a list of arguments or as an Array
   * @return text
   */
  render(value: any, args: any): any {
    let type: any = null;
    let text: any = value;
    let rezonedTime: any;

    // Handle when we don't have meta, but passing an entity
    if (value && value._subtype && !args) {
      return this.getEntityLabel(value, value._subtype);
    }

    // Stop logic for nulls
    if (value === undefined || value === null || !args) {
      return text;
    }

    if (args.formatter && typeof args.formatter === 'function') {
      return args.formatter(value, args);
    }
    // TODO move this to a service
    // Determine TYPE because its not just 1 value that determines this.
    if (args.type === 'TO_MANY') {
      type = 'ToMany';
    } else if (args.type === 'TO_ONE') {
      type = args.associatedEntity.entity;
    } else if (args.dataSpecialization === 'DATETIME') {
      type = 'DateTime';
    } else if (args.dataSpecialization === 'YEAR') {
      type = 'Year';
    } else if (args.dataType === 'Timestamp') {
      type = 'Timestamp';
    } else if (['mobile', 'phone', 'phone1', 'phone2', 'phone3', 'workPhone'].indexOf(args.name) > -1) {
      type = 'Phone';
    } else if (args.name && args.name.substring(0, 5) === 'email') {
      type = 'Email';
    } else if ((args.name && args.name === 'address.countryID') || args.optionsType === 'Country') {
      type = 'Country';
    } else if (args.optionsType === 'SkillText') {
      type = 'SkillText';
    } else if (args.options || args.inputType === 'SELECT') {
      type = 'Options';
    } else if (['MONEY', 'PERCENTAGE', 'HTML', 'SSN'].indexOf(args.dataSpecialization) > -1) {
      type = this.capitalize(args.dataSpecialization.toLowerCase());
    } else {
      type = args.dataType || 'default';
    }

    // Transform data here
    switch (type) {
      case 'Address':
      case 'Address1':
      case 'AddressWithoutCountry':
        let country: any = findByCountryId(Number(value.countryName));
        text = '';
        if (value.address1 || value.address2) {
          text += `${value.address1 || ''} ${value.address2 || ''}<br />\n`;
        }
        text += `${value.city || ''} ${value.state || ''} ${value.zip || ''}${value.city || value.state || value.zip ? '<br />\n' : ''}`;
        text += `${country ? country.name : value.countryName || ''}${country || value.countryName ? '<br />\n' : ''}`;
        text = this.sanitizationService.bypassSecurityTrustHtml(text.trim());
        break;
      case 'DateTime':
      case 'Timestamp':
        text = this.labels.formatDateShort(value);
        break;
      case 'Year':
        text = new Date(value).getFullYear();
        break;
      case 'Phone':
      case 'Email':
        text = value;
        break;
      case 'Money':
        text = this.labels.formatCurrency(value);
        break;
      case 'Percentage':
        text = this.labels.formatNumber(parseFloat(value).toString(), { style: 'percent', minimumFractionDigits: 2 });
        break;
      case 'Double':
      case 'BigDecimal':
        text = this.labels.formatNumber(value, { minimumFractionDigits: this.getNumberDecimalPlaces(value) });
        break;
      case 'Integer':
        text = value;
        break;
      case 'BusinessSector':
      case 'Category':
      case 'Certification':
      case 'ClientCorporation':
      case 'CorporationDepartment':
      case 'DistributionList':
      case 'Skill':
      case 'Tearsheet':
      case 'Specialty':
        text = value.label || value.name || '';
        break;
      case 'SkillText':
        text = Array.isArray(value) ? value.join(', ') : value;
        break;
      case 'Lead':
      case 'Candidate':
      case 'ClientContact':
      case 'CorporateUser':
      case 'Person':
        text = value.label || `${value.firstName || ''} ${value.lastName || ''}`;
        break;
      case 'Opportunity':
      case 'JobOrder':
        text = value.label || value.title || '';
        break;
      case 'Placement':
        if (value.candidate) {
          text = `${value.candidate.firstName || ''} ${value.candidate.lastName || ''}`;
        }
        if (value.jobOrder) {
          text = value.candidate ? `${text} - ${value.jobOrder.title || ''}` : `${value.jobOrder.title || ''}`;
        }
        break;
      case 'JobSubmission':
        text =
          value.label ||
          `${value.jobOrder ? `${value.jobOrder.title} - ` : ''} ${value.candidate ? value.candidate.firstName : ''} ${
            value.candidate ? value.candidate.lastName : ''
          }`;
        break;
      case 'WorkersCompensationRate':
        text = `${value.compensation ? `${value.compensation.code} - ` : ''} ${value.compensation ? value.compensation.name : ''}`;
        break;
      case 'Options':
        text = this.options(value, args.options);
        break;
      case 'ToMany':
        if (['Candidate', 'CorporateUser', 'Person'].indexOf(args.associatedEntity.entity) > -1) {
          text = this.concat(value.data, 'firstName', 'lastName');
          if (value.data.length < value.total) {
            text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
          }
        } else if (
          ['Category', 'BusinessSector', 'Skill', 'Specialty', 'ClientCorporation', 'CorporationDepartment'].indexOf(
            args.associatedEntity.entity,
          ) > -1
        ) {
          text = this.concat(value.data, 'name');
          if (value.data.length < value.total) {
            text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
          }
        } else if (args.associatedEntity.entity === 'MailListPushHistoryDetail') {
          text = this.concat(value.data, 'externalListName');
        } else {
          text = `${value.total || ''}`;
        }
        break;
      case 'Country':
        let countryObj: any = findByCountryId(Number(value));
        text = countryObj ? countryObj.name : value;
        break;
      case 'Html':
        if (Array.isArray(value)) {
          value = value.join(' ');
        }
        if (typeof text === 'string') {
          text = this.sanitizationService.bypassSecurityTrustHtml(value.replace(/\<a/gi, '<a target="_blank"'));
        }
        break;
      case 'CandidateComment':
        text = value.comments ? `${this.labels.formatDateShort(value.dateLastModified)} (${value.name}) - ${value.comments}` : '';
        break;
      default:
        text = value.trim ? value.trim() : value;
        break;
    }
    return text;
  }

  updateValue(value: any, args: any): any {
    this.value = this.render(value, args);
    this.changeDetector.markForCheck();
  }

  transform(value?: any, args?: any): any {
    if (value === undefined || value === null) {
      return '';
    }

    if (this.equals(value, this.lastValue) && this.equals(args, this.lastArgs)) {
      return this.value;
    }

    this.lastValue = value;
    this.lastArgs = args;

    this.updateValue(this.lastValue, this.lastArgs);

    return this.value;
  }

  /**
   * Simple function concat a list of fields from a list of objects
   * @name options
   * @param {Array} list - the list of values to use
   * @param {Array} fields - list of fields to extract
   * @return {String}
   */
  concat(list: any, ...fields: any[]): any {
    let data: any = [];
    for (let item of list) {
      let label: any = [];
      for (let field of fields) {
        label.push(`${item[field]}`);
      }
      data.push(label.join(' '));
    }
    return data.join(', ');
  }

  /**
   * Simple function to look up the **label** to display from options
   * @name options
   * @param {Object} value - the value to find
   * @param {Array} list - list of options (label/value pairs)
   * @return {String}
   */
  options(value: any, list: any): any {
    try {
      for (const item of list) {
        if (item.value === value) {
          return item.label;
        }
      }
    } catch (e) {
      // do nothing
    }
    return value;
  }

  getNumberDecimalPlaces(value: any): any {
    let decimalPlaces: any;
    if (value) {
      let numberString: any = parseFloat(value).toString();
      let decimalPlace: any = (numberString || '').split('.')[1] || '';
      decimalPlaces = decimalPlace.length;
    }
    return decimalPlaces || 1;
  }

  /**
   * Capitalizes the first letter
   * @param string
   * @returns {string}
   */
  capitalize(value: any): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
