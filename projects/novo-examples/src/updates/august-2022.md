---
section: updates
page: v7dot3
title: August 2022
order: 1
tag: new
---

📢  August 2022 (version 7.3.x)
===========================

**Announcement**: New features and improvements!

Bullhorn is continually seeking to update and innovate our products, and leverage the latest features in the frameworks we use. In support of that mission, we are updating our Novo UI and its supporting novo-elements library to Angular 13.  This update  allows us to continue offering a streamlined and consistent experience across Bullhorn’s complete product portfolio.  This update includes both an Angular upgrade, as well as supporting the latest Typescript updates.  You can find more details in the Technical Release Notes section below.

## Release Timeline

Bullhorn has released a Release Candidate v7.3.x of Novo-elements. Bullhorn will update Novo to use Novo-Elements v7.3.x in the 2022.8 release

```sh
npm install novo-elements@next
# or
npm install novo-elements@7.3.x
```

Notable changes [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#notable-changes){#notable-changes}
--------------------------------------------------------------------

- [#1331](https://github.com/bullhorn/novo-elements/pull/1331) - Chips: updated disabled chip styles for better readability
- [#1326](https://github.com/bullhorn/novo-elements/pull/1326) - Autocomplete: Autocomplete now works with ChipList
- [#1334](https://github.com/bullhorn/novo-elements/pull/1334) - NonIdealState: New loading pattern for Non Ideal State
- [#1333](https://github.com/bullhorn/novo-elements/pull/1333) - Forms: field hints now support html text w/ FieldInteractionApi support


New Features[#](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#new-features){#new-features}
--------------------------------------------------------------------

### Chips: updated disabled chip styles for better [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#better-chips){#better-chips}

- darken the opacity to improve readability
- update text color of disabled chips to look non-selectable
- remove the X icon to further confer that this chip is read-only

previous state was 40% opacity:
![chips-before](https://user-images.githubusercontent.com/21197268/180056798-84c36888-96bb-4d72-99fd-ebd80a157f1a.png)

After updates:

![chips-after](https://user-images.githubusercontent.com/21197268/180057064-f549895c-82f2-4092-bf05-00172f0dcb09.png)

example with disabled and non disabled chips

![after-example-both](https://user-images.githubusercontent.com/21197268/180057201-ab8717aa-17be-49c3-a18d-97bf1a8889dd.png)

* * * * *

### Autocomplete [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#autocomplete){#autocomplete}

Autocomplete now works with the NovoChipList when used in a NovoFormField.  The manual events are no longer necessary to utilize the autocomplete functionality.  Now basic functionality can be supported with a limited specification.

```html
<novo-field>
  <novo-label>Favorite Fruits</novo-label>
  <novo-chip-list #chipList [formControl]="fieldCtrl">
    <novo-chip *ngFor="let fruit of chipList.value" [value]="fruit">
      <novo-text>fruit</novo-text>
      <novo-icon novoChipRemove>close</novo-icon>
    </novo-chip>
    <input #chipInput novoChipInput placeholder="New fruit..." autocomplete="off" [formControl]="searchCtrl" />
  </novo-chip-list>
  <novo-autocomplete (optionSelected)="selected($event)" multiple>
    <novo-option *ngFor="let fruit of filteredFruits | async" [value]="fruit">
      fruit
    </novo-option>
  </novo-autocomplete>
</novo-field>
```

![doqFeEqHOa](https://user-images.githubusercontent.com/1056055/175618421-05e8898a-caaf-488d-b384-acdc922b6647.gif)

* * * * *

### Loading Pattern for Non Ideal State [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#loading-pattern){#loading-pattern}

Adding a message next to the novo-loading component is not a known pattern. This could be used to display a message while loading with the flag controlled at implementation. This can be used for a loading message displaying all the time for a loading screen, or having a timer flipping the flag to show a message during a long long loading screen.

##### **Screenshots**

![image](https://user-images.githubusercontent.com/73492464/181272237-66468bd6-7b3c-443a-b5df-ae87a8cdae54.png)
![image](https://user-images.githubusercontent.com/73492464/181272305-689554f1-2cb5-434d-af7c-8fbe10724728.png)

* * * * *

### New HTML Form Field Hints [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#html-hints){#html-hints}

Added the ability to set the `description` (aka hint text) on form controls to display HTML

![image](https://user-images.githubusercontent.com/1056055/181560747-1d77a522-bc0c-40c2-b117-330ec901aa29.png)

Also added the ability for the FieldInteractionAPI to update the description of a field (potentially adding in HTML):

```typescript
API.setDescription('description', '<span><b>BOLD</b> description with a <a target="_blank" href="https://www.google.com">Google</a> Link</span>');
```

![field-interaction-description](https://user-images.githubusercontent.com/5430919/181575015-bb30bcb2-c8a1-4ae0-b99c-1250d5784fd6.gif)


[Check out the demo!](https://bullhorn.github.io/novo-elements/docs/#/updates/v7dot3#html-hints)

