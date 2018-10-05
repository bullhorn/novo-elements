Composition
===========

A universal language
--------------------

Comprehensive design principles and language helps maintain usability and a sense of harmony across a large family of products. Consistency and common elements greatly reduce the user effort requred to learn a new interface.

![](assets/images/CompositionPageIcon.svg)

Mainframe
---------

The Mainframe refers to the permanently fixed portions of the application that never change. It contains the primary navigation and core functions.

###### Design Principles: Hierarchy & Unity

Unity implies relation through proximity, size, and color. Making elements clearly distinct or unified helps create a strong visual hierarchy. This is important because it helps to easily differentiate the level of importance between different elements, and controls a user's cognitive flow.

##### Top Frame

The top frame contains key functions (Find, Add) and navigation to the Resource Center and to User Profile options.

![mainframe](assets/images/LayoutMainframeTopFrame.svg)

##### Bowling Alley

The bowling alley is where all active items are displayed, allowing users to easily shift between them.

<img src="assets/images/LayoutMainframeBowlingAlley.svg" alt="bowling alley" width="300"/>

##### Menu

The menu functions as the primary navigation for the application. It contains links to every list, the dashboard, admin functions, tools, and third\-party applications. The items on the menu can be toggled, grouped, and organized however the user wishes.

![menu](assets/images/LayoutMainframeMenu.svg)

Headers
-------

Headers hold key information and controls for a page. They serve as a wayfinding marker to help the user understand context and easily access important actions.

##### Overviews & Slideouts

Overview and Slideout headers are dominant features which focus the user's attention to the context of a particular record and contains key information on the left, and actions on the right. These headers inherit the color of the entity type.

![overview header](assets/images/LayoutMainframeHeaderOverview.svg)

##### List Headers

List headers contain the filter and column controls for the list and the primary actions. They are fixed so that results can eaily be modified and actioned regardless of scrolling position.

![list header](assets/images/LayoutMainframeHeaderList.svg)

###### Design Principles: Navigation & Consistency

A consistent navigation structure allows users to master an interface much more quickly, as they know that certain functions are always in the same place. We use headers to provide quick access to key functions and aid findability of data in a complex system.

##### Add & Edit Pages

The headers of Add and Edit pages generally serve as a simple visual element to help provide context.

![add page header](assets/images/LayoutMainframeHeaderEditPage.svg)

Cards
-----

Essential to our design paradigm, cards are independent blocks of information. They can contain text, tables, and data visualizations. They offer a curated view of data. Bringing the most pertinent information to the forefont, they allow users to scan large amounts of data quickly.

##### Basic Structure

Cards have a header which contains the card title and the card controls. The controls can vary depending on card type, gut generally include move, refresh, configure, and remove. The content area has padding by default but can also run edge\-to\-edge. Pulse cards have a special icon next to the title.

![card](assets/images/LayoutMainframeCardsNPSCard.svg)

###### Design Principle: Cards

The card system scales easily, both in individual size and in groups. Because of this, cards are essential to our design language. Cards balance and align very easily, promoting findability. These handy little containers also provide a contextually relevant home for all content.

**Hint:** This is a great place for third\-party developers to fit into the Bullhorn system. **Are you a developer?** Check out card markup and documentation here

##### Dashboard & Overviews

Dashboards and Records Overviews are the primary home for our cards. They offer a customizable workspace to arrange and configure to most appropriately fit the user's needs. Cards have a fixed height, but mildly flexible width. They can also be expanded to full\-screen. The "add card" control is always located in the top right, to be consistent with the placement of action buttons on tables and lists.

![dashboard cards](assets/images/LayoutMainframeCardsDashboard.svg)

##### Slideouts and Mobile

Cards are so flexible, they also work well in a mobile setting. They help users to easily scan chunks of information and find what they need.

![mobile cards](assets/images/LayoutMobileCard.svg)