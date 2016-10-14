// NG2
import { Component, Input, Output, ElementRef, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
import { FormGroup } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../services/novo-label-service';

@Component({
    selector: 'novo-control',
    template: require('./Control.html'),
    animations: [
        trigger('verticalState', [
            state('inactive', style({
                transform: 'translate(0px, 25px) scale(1.1)'
            })),
            state('active', style({
                transform: 'translate(-1px, 0px) scale(1)'
            })),
            state('horizontal', style({
                transform: 'translateY(0px. 0px) scale(1)'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out')),
            transition('inactive => horizontal', animate('0ms ease-in')),
            transition('horizontal => inactive', animate('0ms ease-out'))
        ]),
        trigger('hiddenState', [
            state('hidden', style({
                'opacity': '0',
                'height': '0',
                'min-height': '0'
            })),
            state('shown', style({
                'opacity': '1',
                'height': 'auto',
                'min-height': '44px'
            })),
            transition('hidden <=> shown', animate('200ms ease-in'))
        ])
    ],
    host: {
        '[@hiddenState]': 'calcHideState()'
    }
})
export class NovoControlElement extends OutsideClick {
    @Input() control;
    @Input() form:FormGroup;
    @Output() change:EventEmitter = new EventEmitter();
    formattedValue:String = '';
    state:String = 'horizontal';
    hideState:String = 'hidden';
    alwaysActive:Array = ['tiles', 'checklist', 'checkbox', 'address', 'file', 'editor', 'radio', 'text-area', 'select', 'native-select', 'quick-note'];

    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.labels = labels;
        this.onActiveChange.subscribe(active => {
            if (!active) {
                setTimeout(() => {
                    this.checkState();
                });
            }
        });
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
        this.form.controls[this.control.key].setValue(null);
        this.formattedValue = null;
        this.checkState();
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

    calcHideState() {
        let hideState;
        if (this.control) {
            hideState = (this.control.hidden || this.control.type === 'hidden') ? 'hidden' : 'shown';
        }
        return hideState;
    }

    emitChange(value) {
        this.change.emit(value);
    }

    checkState() {
        setTimeout(() => {
            if (this.form.layout === 'vertical') {
                if (this.alwaysActive.indexOf(this.control.controlType) !== -1) {
                    this.state = 'active';
                } else {
                    this.state = (this.form.value[this.control.key] || this.control.placeholder) ? 'active' : 'inactive';
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
                    if (!this.form.value[this.control.key] && !this.control.placeholder) {
                        this.state = (this.state === 'active' ? 'inactive' : 'active');
                    }
                }
            } else {
                this.state = 'horizontal';
            }
        });
    }
}
