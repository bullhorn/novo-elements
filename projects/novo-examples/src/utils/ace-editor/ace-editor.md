---
section: Utils
page: Ace Editor
title: Ace Editor
order: 1
---

Ace Editor [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/addons/ace-editor)
====================================================================================================

Basic code editor using Ace Editor.

## Importing the code editor.

Ace Editor is not included by default in NovoElementsModule. To use it, you will need to import the `NovoAceEditorModule` for the component to display. Add the following lines to your `app.module.ts` file.

```ts
import { NovoElementsModule } from 'novo-elements';
import { NovoAceEditorModule } from 'novo-elements/addons/ace-editor';

@NgModule ({
  imports: [
    NovoElementsModule,
    NovoAceEditorModule
  ]
})
class AppModule {}
```

##### Basic Example

<code-example example="basic-ace"></code-example>