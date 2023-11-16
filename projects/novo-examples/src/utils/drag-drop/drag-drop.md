---
section: Utils
page: Drag and Drop
title: Drag and Drop
order: 1
tag: new
---


Drag and Drop [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/drag-drop)
====================================================================================================

A draggable container, using `[novoDragDrop]`, allows the user to click and drag controls within that container to rearrange them. There is no hard requirement on what types of controls are placed inside, but [cards](https://bullhorn.github.io/novo-elements/docs/#/layouts/card/design) are recommended.

This utility was built to replace Dragula, which was deprecated in Novo Elements in V8. Novo Elements allows for the use of other drag-and-drop libraries such as [cdkDragDrop](https://material.angular.io/cdk/drag-drop/overview) and [Sortable.js](https://sortablejs.github.io/ngx-sortablejs/sortable-array), but several of them exhibit problems when rearranging items in a two-dimensional grid. This implementation uses simple HTML behavior and events for reordering to maximize compatibility. Users may consider using another drag and drop library if they require support dragging items between multiple containers, or prefer more detailed animation behaviors.

##### Basic Example

<code-example example="drag-drop"></code-example>