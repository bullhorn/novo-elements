// NG2
import { Component, Input, ElementRef, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
import { FormGroup } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../services/novo-label-service';

@Component({
    selector: 'novo-control',
    template: require('./Control.html'),
    animations: [
        trigger('heroState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ],
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
    state:String = 'inactive';

    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.labels = labels;
    }

    ngOnInit() {
        // Make sure to initially format the time controls
        if (this.control) {
            if (~['date', 'time', 'date-time'].indexOf(this.control.controlType) && this.control.value) {
                this.formatDateTimeValue({ date: this.control.value });
            }
            this.checkState();
        }
        // Listen to clear events
        this.control.forceClear.subscribe(() => {
            this.clearValue();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        // Unlisten for clear events
        this.control.forceClear.unsubscribe();
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

    get hasValue() {
        return !!this.form.value[this.control.key];
    }

    clearValue() {
        this.form.controls[this.control.key].updateValue(null);
        this.formattedValue = null;
    }

    formatDateValue(event) {
        this.formattedValue = this.labels.formatDateWithFormat(event.date, this.labels.dateFormat);
        this.toggleActive(null, false);
    }

    formatTimeValue(event) {
        this.formattedValue = this.labels.formatDateWithFormat(event.date, this.labels.timeFormat);
    }

    formatDateTimeValue(event, part) {
        this.formattedDateTimeValue = this.formattedDateTimeValue || new Date();

        if (part === 'date') {
            this.formattedDateTimeValue.setFullYear(event.year, event.month - 1, event.day);
        } else {
            this.formattedDateTimeValue.setHours(event.hours, event.minutes, 0);
        }

        this.formattedValue = this.labels.formatDateWithFormat(this.formattedDateTimeValue, this.labels.dateTimeFormat);
    }

    resizeTextArea(event) {
        // Reset the height
        let height = event.target.value.length > 0 ? `${event.target.scrollHeight}px` : '2rem';
        event.target.style.height = '';
        event.target.style.height = height;
    }

    modelChange(value) {
        this.change.emit(value);
        this.checkState();
    }

    checkState() {
        if (this.control.key === 'note') {
            this.state = (this.form.value[this.control.key].note) ? 'active' : 'inactive';
        } else {
            this.state = (this.form.value[this.control.key]) ? 'active' : 'inactive';
        }
    }

    toggleState() {
        if (this.control.key === 'note') {
            if (!this.form.value[this.control.key].note) {
                this.state = (this.state === 'active' ? 'inactive' : 'active');
            }
        } else {
            if (!this.form.value[this.control.key]) {
                this.state = (this.state === 'active' ? 'inactive' : 'active');
            }
        }
    }
}
