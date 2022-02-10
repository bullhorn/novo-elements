---
page: home
title: Introduction
order: 1
---

Novo Elements, Bullhorn's design system
============

> Version 6.0 is now available! Read about the new features and fixes [here](#/updates/v6).

Crafted amid Complexity
-----------------------

Enterprise software is highly complex and demands a high level of flexibility. Design offers clarity and enables us to make deep, powerful connections.

<img class="cover-img" src="assets/images/DesignSystem.png" width="100%"/>


<novo-grid columns="3" align="start" gap="2rem">

> ##### A NEW STANDARD
> 
> Elegance in utility helps to create a system for humans, not robots. We strive not just to empower users but to delight them in the process.

> ##### INSIGHTS AT SCALE
> 
> Vast data reservoirs need a finely tuned system to surface the critical information right when it is needed, no matter the scale or setting.

> ##### POWER IN FLEXIBILITY
> 
> Users have vastly differing needs and goals. By identifying key commonalities and themes, we provide a strong experience for all.

</novo-grid>


Quick Start
-----------------------

Use the Angular CLI's installation schematic to set up your project by running the following command:

```bash

# Install
ng add novo-elements

```

The ng add command will install Novo-Element and Novo Design Tokens library, it will additionally perform the following actions:

- Add project dependencies to package.json
- Add the Gotham and Montserrat font to your index.html
- Add the Bullhorn Glyphicon font to your index.html
- Add a few global CSS styles to:

You did it! Your application is now configured to use Novo Elements.

## Using a component

Let's add a **button** component to our app and verify that everything works.

You need to import the `NovoButtonModule` for the component to display, add the following lines to your `app.module.ts` file.

```ts
import { NovoButtonModule } from 'novo-elements';

@NgModule ({
  imports: [
    NovoButtonModule,
  ]
})
class AppModule {}
```

Add the `<novo-button>` tag to the `app.component.html` like so:

```html
<novo-button theme="primary">Default</novo-button>
```

Run your local dev server:

```bash
ng serve
```

Open your browser to (http://localhost:4200)[http://localhost:4200] to see the results!


References
-----------------------

Looking for the Bullhorn corporate brand guidelines?  
[Bullhorn Brand Folder](https://brandfolder.com/bullhorn)