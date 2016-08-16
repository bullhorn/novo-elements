// NG2
import { Component, Input, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
// Vendor
import moment from 'moment/moment';

@Component({
    selector: 'novo-control',
    template: require('./Control.html'),
    host: {
        '[hidden]': 'control.hidden'
    }
})
export class NovoControlElement extends OutsideClick {
    @Input() control;
    @Input() form:FormGroup;

    formattedValue:String = '';

    constructor(element:ElementRef) {
        super(element);
    }

    get errors() {
        return this.form.controls[this.control.key].errors;
    }

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    get isDirty() {
        return this.form.controls[this.control.key].dirty;
    }

    formatDateTimeValue(event, part) {
        let format = '';
        let date = event.date;
        switch (this.control.controlType) {
            case 'time':
                format = 'hh:mm a';
                break;
            case 'date-time':
                date = new Date();
                if (part === 'time') {
                    date.setHours(event.hours, event.minutes, 0);
                } else {
                    date.setFullYear(event.year, event.month, event.day);
                }
                format = 'MMMM DD, YYYY hh:mm a';
                break;
            default: // 'date'
                format = 'MMMM DD, YYYY';
                break;
        }
        this.formattedValue = moment(date).format(format);
    }

    getCurrencyLabel(currencyFormat) {
        let moneySymbol;
        switch (currencyFormat) {
            case 'USD':
            case 'CAD':
            case 'AUD':
            case 'HKD':
            case 'NZD':
                moneySymbol = '$';
                break;
            case 'GBP':
                moneySymbol = '£';
                break;
            case 'EUR':
                moneySymbol = '€';
                break;
            case 'JPY':
                moneySymbol = '¥';
                break;
            default:
                moneySymbol = '';
                break;
        }
        return `${moneySymbol} ${currencyFormat || ''}`.trim();
    }

    resizeTextArea(event) {
        // Reset the height
        let height = event.target.value.length > 0 ? `${event.target.scrollHeight}px` : '2rem';
        event.target.style.height = '';
        event.target.style.height = height;
    }
}
