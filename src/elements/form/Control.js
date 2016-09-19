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
                transform: 'translate(0px, 25px) scale(1)'
            })),
            state('active', style({
                transform: 'translate(-5px, 0px) scale(.8)'
            })),
            state('horizontal', style({
                transform: 'translateY(0px. 0px) scale(1)'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out')),
            transition('inactive => horizontal', animate('0ms ease-in')),
            transition('horizontal => inactive', animate('0ms ease-out'))
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
    state:String = 'horizontal';
    alwaysActive:Array = ['tiles', 'checklist', 'checkbox', 'address', 'file', 'editor', 'radio', 'text-area', 'select', 'native-select', 'quick-note'];

    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.labels = labels;
    }

    ngOnInit() {
        // Make sure to initially format the time controls
        if (this.control && this.control.value) {
            if (this.control.controlType === 'date') {
                this.formatDateValue({ date: this.control.value });
            } else if (this.control.controlType === 'time') {
                this.formatTimeValue({ date: this.control.value });
            } else if (this.control.controlType === 'date-time') {
                this.formatDateTimeValue({ date: this.control.value });
            }
            this.checkState();
        }
        // Listen to clear events
        this.control.forceClear.subscribe(() => {
            this.clearValue();
        });
    }

    ngOnChanges() {
        this.checkState();
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
        } else if (part === 'time') {
            this.formattedDateTimeValue.setHours(event.hours, event.minutes, 0);
        } else {
            this.formattedDateTimeValue = new Date(event.date);
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
        setTimeout(() => {
            if (this.form.layout === 'vertical') {
                if (this.alwaysActive.indexOf(this.control.controlType) !== -1) {
                    this.state = 'active';
                } else {
                    this.state = (this.form.value[this.control.key]) ? 'active' : 'inactive';
                }
            } else {
                this.state = 'horizontal';
            }
        });
    }

    toggleState() {
        setTimeout(() => {
            if (this.form.layout === 'vertical') {
                if (this.alwaysActive.indexOf(this.control.controlType) !== -1) {
                    this.state = 'active';
                } else {
                    if (!this.form.value[this.control.key] && !this.form.value[this.control.key][0]) {
                        this.state = (this.state === 'active' ? 'inactive' : 'active');
                    }
                }
            } else {
                this.state = 'horizontal';
            }
        });
    }
}
