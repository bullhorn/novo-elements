// NG2
import { EventEmitter, Injectable } from '@angular/core';
// Vendor
import dragula from '@bullhorn/dragula';

@Injectable()
export class NovoDragulaService {
  cancel: EventEmitter<any> = new EventEmitter();
  cloned: EventEmitter<any> = new EventEmitter();
  drag: EventEmitter<any> = new EventEmitter();
  dragend: EventEmitter<any> = new EventEmitter();
  drop: EventEmitter<any> = new EventEmitter();
  out: EventEmitter<any> = new EventEmitter();
  over: EventEmitter<any> = new EventEmitter();
  remove: EventEmitter<any> = new EventEmitter();
  shadow: EventEmitter<any> = new EventEmitter();
  dropModel: EventEmitter<any> = new EventEmitter();
  removeModel: EventEmitter<any> = new EventEmitter();
  events: Array<string> = ['cancel', 'cloned', 'drag', 'dragend', 'drop', 'out', 'over', 'remove', 'shadow', 'dropModel', 'removeModel'];
  bags: Array<any> = [];

  add(name, drake) {
    let bag = this.find(name);
    if (bag) {
      throw new Error(`Bag named: ${name} already exists.`);
    }
    bag = {
      name,
      drake,
    };
    this.bags.push(bag);
    if (drake.models) {
      // models to sync with (must have same structure as containers)
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
    const bag = this.find(name);
    const i = this.bags.indexOf(bag);
    this.bags.splice(i, 1);
    bag.drake.destroy();
  }

  setOptions(name, options) {
    const bag = this.add(name, dragula(options));
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
      if (target === source) {
        sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
      } else {
        const notCopy = dragElm === dropElm;
        const targetModel = drake.models[drake.containers.indexOf(target)];
        const dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));

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
    const that = this;
    const emitter = (type) => {
      function replicate() {
        const args = Array.prototype.slice.call(arguments);
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
