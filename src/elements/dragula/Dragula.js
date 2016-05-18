import { Directive, ElementRef } from 'angular2/core';
import { DragulaService } from './DragulaService';

@Directive({
    selector: '[dragula]',
    inputs: ['bag:dragula', 'dragulaModel']
})
export class Dragula {

    constructor(el:ElementRef, dragulaService:DragulaService) {
        this.container = el.nativeElement;
        this.dragulaService = dragulaService;
        this.drake = null;
    }

    ngOnInit() {
        // console.log(this.bag);
        let bag = this.dragulaService.find(this.bag);

        if (bag) {
            this.drake = bag.drake;
            this.checkModel();
            this.drake.containers.push(this.container);
        } else {
            this.drake = dragula({ // eslint-disable-line
                containers: [this.container]
            });
            this.checkModel();
            this.dragulaService.add(this.bag, this.drake);
        }
    }

    checkModel() {
        if (this.dragulaModel) {
            if (this.drake.models) {
                this.drake.models.push(this.dragulaModel);
            } else {
                this.drake.models = [this.dragulaModel];
            }
        }
    }

    ngOnChanges(changes) {
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    let modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                } else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    }
}

export const NOVO_DRAGULA_ELEMENTS = [Dragula, DragulaService];
