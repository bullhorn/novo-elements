import { Injectable, EventEmitter } from 'angular2/core';

@Injectable()
export class DragulaService {
    constructor() {
        this.cancel = new EventEmitter();
        this.cloned = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragend = new EventEmitter();
        this.drop = new EventEmitter();
        this.out = new EventEmitter();
        this.over = new EventEmitter();
        this.remove = new EventEmitter();
        this.shadow = new EventEmitter();
        this.dropModel = new EventEmitter();
        this.removeModel = new EventEmitter();
        this.events = [
            'cancel',
            'cloned',
            'drag',
            'dragend',
            'drop',
            'out',
            'over',
            'remove',
            'shadow',
            'dropModel',
            'removeModel'
        ];
        this.bags = [];
    }

    add(name, drake) {
        let bag = this.find(name);
        if (bag) {
            throw new Error(`Bag named: ${name} already exists.`);
        }
        bag = {
            name: name,
            drake: drake
        };
        this.bags.push(bag);
        if (drake.models) { // models to sync with (must have same structure as containers)
            this.handleModels(name, drake);
        }
        if (!bag.initEvents) {
            this.setupEvents(bag);
        }
        return bag;
    }

    find(name) {
        for (let i = 0; i < this.bags.length; i++) {
            if (this.bags[i].name === name) {
                return this.bags[i];
            }
        }
        return null;
    }

    destroy(name) {
        let bag = this.find(name);
        let i = this.bags.indexOf(bag);
        this.bags.splice(i, 1);
        bag.drake.destroy();
    }

    setOptions(name, options) {
        let bag = this.add(name, dragula(options)); // eslint-disable-line
        this.handleModels(name, bag.drake);
    }

    handleModels(name, drake) {
        let dragElm;
        let dragIndex;
        let dropIndex;
        let sourceModel;
        drake.on('remove', (el, source) => {
            if (!drake.models) {
                return;
            }
            sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel.splice(dragIndex, 1);
            // console.log('REMOVE');
            // console.log(sourceModel);
            this.removeModel.emit([name, el, source]);
        });
        drake.on('drag', (el, source) => {
            dragElm = el;
            dragIndex = this.domIndexOf(el, source);
        });
        drake.on('drop', (dropElm, target, source) => {
            if (!drake.models) {
                return;
            }
            dropIndex = this.domIndexOf(dropElm, target);
            sourceModel = drake.models[drake.containers.indexOf(source)];
            // console.log('DROP');
            // console.log(sourceModel);
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            } else {
                let notCopy = dragElm === dropElm;
                let targetModel = drake.models[drake.containers.indexOf(target)];
                let dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));

                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
            this.dropModel.emit([name, dropElm, target, source]);
        });
    }

    setupEvents(bag) {
        bag.initEvents = true;
        let that = this;
        let emitter = (type) => {
            function replicate() {
                let args = Array.prototype.slice.call(arguments);
                that[type].emit([bag.name].concat(args));
            }

            bag.drake.on(type, replicate);
        };
        this.events.forEach(emitter);
    }

    domIndexOf(child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    }
}
