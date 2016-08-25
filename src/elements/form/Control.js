// NG2
import { Component, Input, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
// Vendor
import moment from 'moment/moment';

@Component({
    selector: 'novo-control',
    template: require('./Control.html'),
    host: {
        '[hidden]': 'control.hidden || control.type === \'hidden\''
    },
    outputs: [
        'change'
    ]
})
export class NovoControlElement extends OutsideClick {
    @Input() control;
    @Input() form:FormGroup;
    change:EventEmitter = new EventEmitter;
    formattedValue:String = '';

    constructor(element:ElementRef) {
        super(element);
    }

    ngOnInit() {
        // Make sure to initially format the time controls
        if (this.control) {
            if (~['date', 'time', 'date-time'].indexOf(this.control.controlType) && this.control.value) {
                this.formatDateTimeValue({ date: this.control.value });
            }
        }
    }

    get errors() {
        return this.form.controls[this.control.key].errors;
    }

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    get isDirty() {
        return this.form.controls[this.control.key].dirty || this.control.dirty;
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
                if (event.hours || event.minutes || event.year || event.month || event.day) {
                    if (part === 'time') {
                        date.setHours(event.hours, event.minutes, 0);
                    } else {
                        date.setFullYear(event.year, event.month, event.day);
                    }
                }
                format = 'MMMM DD, YYYY hh:mm a';
                break;
            default: // 'date'
                format = 'MMMM DD, YYYY';
                break;
        }
        this.formattedValue = moment(date).format(format);
    }

    resizeTextArea(event) {
        // Reset the height
        let height = event.target.value.length > 0 ? `${event.target.scrollHeight}px` : '2rem';
        event.target.style.height = '';
        event.target.style.height = height;
    }

    modelChange(value) {
        this.change.emit(value);
    }
}
