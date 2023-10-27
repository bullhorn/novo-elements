import { Component } from '@angular/core';
import { NovoDragFinishEvent } from 'novo-elements/elements/drag-drop';

interface DemoButtonObject {
  name: string;
  btnText: string;
  bgColor: string;
}

/**
 * @title Drag and Drop Example
 */
@Component({
  selector: 'drag-drop-example',
  templateUrl: 'drag-drop-example.html',
  styleUrls: ['drag-drop-example.css'],
})
export class DragDropExample {
  objects: DemoButtonObject[] = [
    { name: 'Object 1', btnText: 'Button 1', bgColor: 'red' },
    { name: 'Object 2', btnText: 'Button 2', bgColor: 'blue' },
    { name: 'Object 3', btnText: 'Button 3', bgColor: 'green' },
    { name: 'Object 4', btnText: 'Button 4', bgColor: 'yellow' },
    { name: 'Object 5', btnText: 'Button 5', bgColor: 'wheat' },
    { name: 'Object 6', btnText: 'Button 6', bgColor: 'purple' },
    { name: 'Object 7', btnText: 'Button 7', bgColor: 'teal' }
  ];

  objects2: DemoButtonObject[] = [
    { name: 'Object 11', btnText: 'Button 11', bgColor: 'red' },
    { name: 'Object 12', btnText: 'Button 12', bgColor: 'blue' },
    { name: 'Object 13', btnText: 'Button 13', bgColor: 'green' },
    { name: 'Object 14', btnText: 'Button 14', bgColor: 'yellow' },
    { name: 'Object 15', btnText: 'Button 15', bgColor: 'wheat' },
    { name: 'Object 16', btnText: 'Button 16', bgColor: 'purple' },
    { name: 'Object 17', btnText: 'Button 17', bgColor: 'teal' }
  ];

  objectMoved?: DemoButtonObject;

  dragFinished(event: NovoDragFinishEvent<DemoButtonObject>) {
    this.objectMoved = event.draggedItem;
    this.objects = event.allItems;
  }

  dragFinished2(event: NovoDragFinishEvent<DemoButtonObject>) {
    this.objectMoved = event.draggedItem;
    this.objects2 = event.allItems;
  }

  addObject(): void {
    this.objects.push({ name: `Object ${this.objects.length}`, btnText: `Button ${this.objects.length}`, bgColor: 'maroon'})
  }

  removeObject(item: DemoButtonObject): void {
    this.objects.splice(this.objects.findIndex(a => a === item), 1);
  }

  get objectsAsString(): string {
    return this.objects.map(obj => obj.name).join(', ');
  }
}
