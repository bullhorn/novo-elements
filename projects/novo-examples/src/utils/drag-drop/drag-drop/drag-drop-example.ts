import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NovoDragFinishEvent } from 'novo-elements/elements/drag-drop';

interface DemoButtonObject {
  name: string;
  headerText: string;
  bgClass: string;
}

/**
 * @title Drag and Drop Example
 */
@Component({
    selector: 'drag-drop-example',
    templateUrl: 'drag-drop-example.html',
    styleUrls: ['drag-drop-example.css'],
    standalone: false,
})
export class DragDropExample implements OnChanges {
  objects: DemoButtonObject[] = [
    { name: 'Object 1', headerText: 'Item 1', bgClass: 'bgc-grapefruit' },
    { name: 'Object 2', headerText: 'Item 2', bgClass: 'bgc-bittersweet' },
    { name: 'Object 3', headerText: 'Item 3', bgClass: 'bgc-sunflower' },
    { name: 'Object 4', headerText: 'Item 4', bgClass: 'bgc-grass' },
    { name: 'Object 5', headerText: 'Item 5', bgClass: 'bgc-mint' },
    { name: 'Object 6', headerText: 'Item 6', bgClass: 'bgc-aqua' },
    { name: 'Object 7', headerText: 'Item 7', bgClass: 'bgc-ocean' },
  ];

  objects2: DemoButtonObject[] = [
    { name: 'Object 11', headerText: 'Item 11', bgClass: 'bgc-grapefruit' },
    { name: 'Object 12', headerText: 'Item 12', bgClass: 'bgc-bittersweet' },
    { name: 'Object 13', headerText: 'Item 13', bgClass: 'bgc-sunflower' },
    { name: 'Object 14', headerText: 'Item 14', bgClass: 'bgc-grass' },
    { name: 'Object 15', headerText: 'Item 15', bgClass: 'bgc-mint' },
    { name: 'Object 16', headerText: 'Item 16', bgClass: 'bgc-aqua' },
    { name: 'Object 17', headerText: 'Item 17', bgClass: 'bgc-ocean' },
  ];

  objects3: DemoButtonObject[] = [...this.objects];

  ngOnChanges(changes: SimpleChanges): void {
      console.info('box processed changes', changes);
  }

  objectMoved?: DemoButtonObject;

  dragFinished(event: NovoDragFinishEvent<DemoButtonObject>) {
    this.objectMoved = event.draggedItem;
    this.objects = event.allItems;
  }

  dragFinished2(event: NovoDragFinishEvent<DemoButtonObject>) {
    this.objectMoved = event.draggedItem;
    this.objects2 = event.allItems;
  }

  dragFinished3(event: NovoDragFinishEvent<DemoButtonObject>) {
    this.objectMoved = event.draggedItem;
    this.objects3 = event.allItems;
  }

  addObject2(): void {
    this.objects2.push({ name: `Object ${this.objects.length}`, headerText: `Item ${this.objects2.length + 11}`, bgClass: 'bgc-lavender'})
  }

  removeObject(item: DemoButtonObject): void {
    this.objects.splice(this.objects.findIndex(a => a === item), 1);
  }

  removeObject2(item: DemoButtonObject): void {
    this.objects2.splice(this.objects2.findIndex(a => a === item), 1);
  }

  get objectsAsString(): string {
    return this.objects.map(obj => obj.name).join(', ');
  }
}
