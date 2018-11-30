/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED 'build-examples-module' */
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoExamplesModule } from './examples.module';
import { NovoExamplesSharedModule } from './_shared/shared.module';

@Component({
  selector: 'ace-editor-page',
  template: `<h1>Ace Editor <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/ace-editor">(source)</a></h1><p>Basic code editor using Ace Editor.</p><h5>Basic Example</h5><p><code-example example="basic-ace"></code-example></p>`,
})
export class AceEditorPage {}

@Component({
  selector: 'buttons-page',
  template: `<h1>Button <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/button">(source)</a></h1><p>A button clearly indicates a point of action for the user. Bullhorn buttons come in a variety of themes, custom tailored to fit your use-case.</p><h2>Themes</h2><p>Bullhorn button themes were hand crafted to make your life easier. Most buttons used in the Bullhorn platform should utilize a <code>theme</code> attribute. Theme attributes provide access to every variation of Bullhorn UX approved buttons. Depending on the theme, some buttons may also utilize <code>icon</code>, <code>side</code>, and <code>inverse</code> attributes. Button are divided by function into four main categories: Primary, Secondary, Neutralizing, Subtractive. There are also three other button types that are independent of function: Dialogue, Icon, and Header.</p><h2>Colors</h2><p>Acceptable colors include <code>Primary</code>, <code>Success</code>, <code>Warning</code>, <code>Negative</code>, and <strong>all analytics colors</strong> which can be found in the color section of the style guide.</p><p><code-example example="button-overview"></code-example></p><h2>Primary</h2><p>Primary buttons are used to as primary calls-to-action. They should <strong>always</strong> get an <code>icon</code> attribute. Primary buttons with a &quot;success&quot; color <code>color=&quot;success&quot;</code> are used for saving and will almost always contain a &quot;check&quot; icon. Negative color primary buttons <code>color=&quot;negative&quot;</code> are used to delete, clear, or otherwise remove an extant element. Primary buttons should never have a <code>side</code> attribute.</p><!-- Example: ButtonOverviewExample --><p><code-example example="button-primary"></code-example></p><h2>Secondary</h2><p>Secondary buttons are used as an alternative Primary button or when there is a second major action on a page. They usually appears only in Overview and Slideout headers. This theme with an <code>inverse</code> attribute is often used as the action button in dropdown menus.</p><p><code-example example="button-secondary"></code-example></p><p>Secondary buttons can also get an <code>inverse</code> attribute for use on a colored background.</p><p><code-example example="button-inverse"></code-example></p><h2>Dialogue</h2><p>Similar to icon buttons, dialogue buttons require less visual dominance but often need additional helper text. Dialogue buttons <em>may</em> contain <strong>any</strong> icon and a <code>side</code> may be specified eg:<code>side=&quot;right&quot;</code> to place the icon on the right or left side of the text. Dialogue buttons may also use an <code>inverse</code> attribute to change its text color to white.</p><p><code-example example="button-dialogue"></code-example></p><h2>Standard</h2><p>Standard buttons are the most generic button style. Standard buttons by default are styled identically to standard buttons with a <code>color=&quot;light&quot;</code> attribute. Typically, a standard button is used to cancel an action, or to cease any additional progress. Although standard buttons <em>can</em> get an <code>icon</code> attribute, they should almost never be used with an icon. If your proposed design calls for a standard button with an icon, consider using a different button theme, like dialogue.</p><p><code-example example="button-standard"></code-example></p><h2>Icon</h2><p>The <code>icon</code> theme is used to create <strong>icon-only</strong> buttons, which contain no text. They can occupy any of the four main functions but require far less visual dominance than normal buttons. Icon buttons <strong>always</strong> have an <code>icon</code> attribute and can use <strong>any</strong> icon. Icon buttons may also use an <code>inverse</code> attribute to change its icon color to white.</p><p><code-example example="button-icon"></code-example></p><h2>Fab</h2><p>Fab buttons are used to as primary calls-to-action. They should <strong>always</strong> get an <code>icon</code> attribute. Fab buttons with a &quot;success&quot; color <code>color=&quot;success&quot;</code> are used for saving and will almost always contain a &quot;check&quot; icon. Negative color primary buttons <code>color=&quot;negative&quot;</code> are used to delete, clear, or otherwise remove an extant element. Fab buttons should never have a <code>side</code> attribute.</p><p><code-example example="button-fab"></code-example></p><h2>Dynamic</h2><p>Button parameters can be dynamically set and change at runtime. The styles should change and be applied when the values change.</p><p><code-example example="button-dynamic"></code-example></p><h2>Loading</h2><p>Buttons can display a loading state when given the &quot;loading&quot; parameter. When loading is true the button will be disabled and get a loading spinner.</p><p><code-example example="button-loading"></code-example></p>`,
})
export class ButtonsPage {}

@Component({
  selector: 'calendar-page',
  template: `<h1>Calendars &amp; Schedules</h1><p>These allow users to easily select a time and date. It comes in a handful of varieties based on the content of the field.</p><h2>Calendar Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/date-picker">(source)</a></h2><p>The calendar picker is used to select a date. It appears in all date picker fields.</p><h5>Full Calendar Picker</h5><p><code-example example="calendar"></code-example></p><h2>Time Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/time-picker">(source)</a></h2><p>Time pickers come in 12 hour or 24 hour style.</p><h5>Standalone Time Picker</h5><p><code-example example="time"></code-example></p><h5>Range Picker</h5><p><code-example example="range"></code-example></p><h5>Big Calendar Picker</h5><p><code-example example="big-calendar"></code-example></p>`,
})
export class CalendarPage {}

@Component({
  selector: 'components-page',
  template: `<h1>Components</h1><p>This is a landing page</p>`,
})
export class ComponentsPage {}

@Component({
  selector: 'data-table-page',
  template: `<h1>Data Table <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/data-table">(source)</a></h1><h5>Working with static data</h5><h6>Change Dataset</h6><h6>Change Pagination Style</h6><h6>Toggle Global Search</h6><h6>Configure Columns</h6><p>Configure Columns</p><h6>Configure Columns</h6><p>Show Row Details (first table) Hide Row Details (first table)</p><h5>Passing an array of rows</h5><p><code-example example="data-table-rows"></code-example></p><h5>Using the static data service</h5><p><code-example example="data-table-service"></code-example></p><h5>Working with remote data</h5><h5>Using the remote data service</h5><p>Data won't actually change, the URL will update with the proper request it will make!</p><h6>URL</h6><p><code-example example="data-table-remote"></code-example></p>`,
})
export class DataTablePage {}

@Component({
  selector: 'dropdown-page',
  template: `<h1>Dropdown <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/dropdown">(source)</a></h1><p>Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p><h2>Types</h2><h5>Dropdown Menu</h5><p>This is a simple dropdown menu.</p><p><code-example example="basic-drop-down"></code-example></p><h5>Dropdown Position Options</h5><p>This is an example of how dropdowns can be positioned. Use the [side] input to specify how the popup positions or re-positions itself on the page using a preferred location and one or more fallback locations:</p><p><code-example example="position-drop-down"></code-example></p><h5>Lots of data!</h5><p>Crazy large dropdown to demonstrate how the smart positioning works.</p><p><code-example example="large-drop-down"></code-example></p><h5>Scrollable Container Class</h5><p>This is an example of using a dropdown within a scrollable container. Simply place the directive cdkScrollable on the ancestor element that does the scrolling.</p><p><code-example example="scrollable-drop-down"></code-example></p><h5>Custom Class</h5><p>You can have custom classes on the dropdown container that opens up by using the &quot;containerClass&quot; property. Use scrollStrategy to close, block or reposition the dropdown when the parent scrolls. The default scrollStrategy is reposition.</p><p><code-example example="custom-drop-down"></code-example></p><h5>Keep Open</h5><p>You can set the &quot;keepOpen&quot; property on the &quot;item&quot; in order to keep it from closing the dropdown automatically.</p><p><code-example example="multi-drop-down"></code-example></p>`,
})
export class DropdownPage {}

@Component({
  selector: 'icon-page',
  template: `<h1>Icons <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/icon">(source)</a></h1><p>If you want to use bullhorn icons, it is easier to use the <code>novo-icon</code> element to style them.  You can always style them within the <code>i</code> tag too.</p><h5>Basic Usage</h5><p><code-example example="basic-icons"></code-example></p><h5>Themes &amp; Colors</h5><p><code-example example="themed-icons"></code-example></p><h5>Raised Icons</h5><p><code-example example="raised-icons"></code-example></p>`,
})
export class IconPage {}

@Component({
  selector: 'loading-page',
  template: `<h1>Loading Animations <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/loading">(source)</a></h1><p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p><h2>Themes</h2><h5>Line</h5><p>The Dot Line animation is indeterminate.</p><p><code-example example="loading-line"></code-example></p><h5>Spinner</h5><p>The Dot Spinner animation is used as an alternate to the loading line animation.</p><p><code-example example="loading-circle"></code-example></p>`,
})
export class LoadingPage {}

@Component({
  selector: 'quick-note-page',
  template: `<h1>Quick Note <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/quick-note">(source)</a></h1><p>Tag Autocomplete</p><h5>Basic Examples</h5><p><code-example example="basic-quick-note"></code-example></p><h5>Custom Triggers</h5><p><code-example example="custom-quick-note"></code-example></p><h5>Custom Results Template</h5><p><code-example example="custom-quick-note-results"></code-example></p>`,
})
export class QuickNotePage {}

@Component({
  selector: 'search-page',
  template: `<h1>Search Input <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></h1><p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p><h2>Types</h2><h5>Searches</h5><p>Searches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p><p><code-example example="search-usage"></code-example></p>`,
})
export class SearchPage {}

@Component({
  selector: 'slides-page',
  template: `<h1>slides</h1><h1>Slides <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/slides">(source)</a></h1><p>Slide element to toggle some information</p><h5>Basic</h5><p><code-example example="basic-slide"></code-example></p>`,
})
export class SlidesPage {}

@Component({
  selector: 'switch-page',
  template: `<h1>Switches &amp; Toggles <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></h1><p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p><h2>Types</h2><h5>Tiles</h5><p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p><h5>Switches</h5><p>Switches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p><p><code-example example="switch-usage"></code-example></p>`,
})
export class SwitchPage {}

@Component({
  selector: 'table-page',
  template: `<h1>Table <a href="https://bullhorn.github.io/novo-elements/blob/master/src/elements/table">(source)</a></h1><p>Tables allow users to view date in a tabular format and perform actions such as Sorting and Filtering. Different configuration are possible for pagination or infinite scroll. Feature to be added include: Custom Item Renderers, etc...</p><h2>Types</h2><h5>Basic Table</h5><p>This is the most basic table.</p><p><code-example example="table"></code-example></p><h5>Details Table</h5><p>This has a row renderer to show a new details row that is expanded when you click on the action column.</p><p><code-example example="details-table"></code-example></p><h5>Select All Table w/ Custom Actions</h5><p>This has checkboxes for selection with custom actions.</p><p><code-example example="select-all-table"></code-example></p><h5>Editable Table</h5><p>Can be put into edit mode and use editors that are set on the column to modify the data.</p><p><code-example example="editable-table"></code-example></p><h5>Total/Average Footer</h5><p>Easily configure a footer to sum or average up columns.</p><p><code-example example="total-footer-table"></code-example></p>`,
})
export class TablePage {}

@Component({
  selector: 'colors-page',
  template: `<h1>Color</h1><h2>Efficient and expressive</h2><p>Our colors are bold, fresh, and approachable. They are expressive and delightful, but selected with usability and accessibility in mind.</p><h2>Primary Colors</h2><p>These are the base colors of the application.</p><p><primary-colors-example></primary-colors-example></p><h2>Entity Colors</h2><p>This bold palette uses carefully balanced colors to distinguish entities from one another.</p><p><entity-colors-example></entity-colors-example></p><h2>Analyltics Colors</h2><p>This palette features vibrant, bold colors for use in data visualization.</p><p><analytics-colors-example></analytics-colors-example></p>`,
})
export class ColorsPage {}

@Component({
  selector: 'composition-page',
  template: `<h1>Composition</h1><h2>A universal language</h2><p>Comprehensive design principles and language helps maintain usability and a sense of harmony across a large family of products. Consistency and common elements greatly reduce the user effort requred to learn a new interface.</p><p><img src="assets/images/CompositionPageIcon.svg" alt=""></p><h2>Mainframe</h2><p>The Mainframe refers to the permanently fixed portions of the application that never change. It contains the primary navigation and core functions.</p><h6>Design Principles: Hierarchy &amp; Unity</h6><p>Unity implies relation through proximity, size, and color. Making elements clearly distinct or unified helps create a strong visual hierarchy. This is important because it helps to easily differentiate the level of importance between different elements, and controls a user's cognitive flow.</p><h5>Top Frame</h5><p>The top frame contains key functions (Find, Add) and navigation to the Resource Center and to User Profile options.</p><p><img src="assets/images/LayoutMainframeTopFrame.svg" alt="mainframe"></p><h5>Bowling Alley</h5><p>The bowling alley is where all active items are displayed, allowing users to easily shift between them.</p><img src="assets/images/LayoutMainframeBowlingAlley.svg" alt="bowling alley" width="300"/><h5>Menu</h5><p>The menu functions as the primary navigation for the application. It contains links to every list, the dashboard, admin functions, tools, and third-party applications. The items on the menu can be toggled, grouped, and organized however the user wishes.</p><p><img src="assets/images/LayoutMainframeMenu.svg" alt="menu"></p><h2>Headers</h2><p>Headers hold key information and controls for a page. They serve as a wayfinding marker to help the user understand context and easily access important actions.</p><h5>Overviews &amp; Slideouts</h5><p>Overview and Slideout headers are dominant features which focus the user's attention to the context of a particular record and contains key information on the left, and actions on the right. These headers inherit the color of the entity type.</p><p><img src="assets/images/LayoutMainframeHeaderOverview.svg" alt="overview header"></p><h5>List Headers</h5><p>List headers contain the filter and column controls for the list and the primary actions. They are fixed so that results can eaily be modified and actioned regardless of scrolling position.</p><p><img src="assets/images/LayoutMainframeHeaderList.svg" alt="list header"></p><h6>Design Principles: Navigation &amp; Consistency</h6><p>A consistent navigation structure allows users to master an interface much more quickly, as they know that certain functions are always in the same place. We use headers to provide quick access to key functions and aid findability of data in a complex system.</p><h5>Add &amp; Edit Pages</h5><p>The headers of Add and Edit pages generally serve as a simple visual element to help provide context.</p><p><img src="assets/images/LayoutMainframeHeaderEditPage.svg" alt="add page header"></p><h2>Cards</h2><p>Essential to our design paradigm, cards are independent blocks of information. They can contain text, tables, and data visualizations. They offer a curated view of data. Bringing the most pertinent information to the forefont, they allow users to scan large amounts of data quickly.</p><h5>Basic Structure</h5><p>Cards have a header which contains the card title and the card controls. The controls can vary depending on card type, gut generally include move, refresh, configure, and remove. The content area has padding by default but can also run edge-to-edge. Pulse cards have a special icon next to the title.</p><p><img src="assets/images/LayoutMainframeCardsNPSCard.svg" alt="card"></p><h6>Design Principle: Cards</h6><p>The card system scales easily, both in individual size and in groups. Because of this, cards are essential to our design language. Cards balance and align very easily, promoting findability. These handy little containers also provide a contextually relevant home for all content.</p><p><strong>Hint:</strong> This is a great place for third-party developers to fit into the Bullhorn system. <strong>Are you a developer?</strong> Check out card markup and documentation here</p><h5>Dashboard &amp; Overviews</h5><p>Dashboards and Records Overviews are the primary home for our cards. They offer a customizable workspace to arrange and configure to most appropriately fit the user's needs. Cards have a fixed height, but mildly flexible width. They can also be expanded to full-screen. The &quot;add card&quot; control is always located in the top right, to be consistent with the placement of action buttons on tables and lists.</p><p><img src="assets/images/LayoutMainframeCardsDashboard.svg" alt="dashboard cards"></p><h5>Slideouts and Mobile</h5><p>Cards are so flexible, they also work well in a mobile setting. They help users to easily scan chunks of information and find what they need.</p><p><img src="assets/images/LayoutMobileCard.svg" alt="mobile cards"></p>`,
})
export class CompositionPage {}

@Component({
  selector: 'design-page',
  template: `<h1>Design</h1><p>This is a landing page</p>`,
})
export class DesignPage {}

@Component({
  selector: 'iconography-page',
  template: `<h1>Iconography</h1><h2>Certified Pixel-Perfect</h2><p>Icons are used to represent an action or concept through the most simplistic imagery possible. Icons give additional context to written material, allowing the user to quickly comprehend any given concept. The icons are designed on a highly specific grid to ensure maximum clarity even at a small size. Their design is friendly, human, and bold.</p><p><a href="http://bullhorn.github.io/bullhorn-icons/">Bullhorn's Icon Set</a></p><p><img src="assets/images/IconographyPageIcon.svg" alt=""></p><h2>Icons with Typography</h2><p>An icon will always have slightly larger dimensions than text when they are paired together. This ensures that the icon is visually the same size as the text and that it scales proportionally.</p><h5>Base sizing</h5><p>Icons placed next to typography should alays follow this convention.</p><p>Bullhorn Glyphicons <strong>Size:</strong> 1.29em <strong>Padding:</strong> .25em <strong>Border Radius:</strong> .625em</p><h1>Company Name</h1><h5>Padding</h5><p>Icons should have sufficient padding when followed by text.</p><div class="padding">    <div>        <h4><i class="bhi-circle"></i>Alice Hughes</h4>        <h6><i class="bhi-location"></i>Boston, MA</h6>        <span class="not-accepted"><i class="bhi-close-o"></i>I feel squished</span>    </div>    <div>        <h4><i class="bhi-circle"></i>Alice Hughes</h4>        <h6><i class="bhi-location"></i>Boston, MA</h6>        <span class="accepted"><i class="bhi-check"></i>Much better</span>    </div></div><h4>Alice Hughes</h4><h6>Boston, MA</h6><p>I feel squished</p><h4>Alice Hughes</h4><h6>Boston, MA</h6><p>Much better</p><h2>Entity Icons</h2><h5>Standard Entity Icons</h5><p>Used with corresponding entity color.</p><p>Lead</p><p>Contact</p><p>Company</p><p>Candidate</p><p>Opportunity</p><p>Job</p><p>Placement</p><pre><code>            &lt;i theme=&quot;entity&quot; class=&quot;bhi-lead lead&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Lead&lt;/h6&gt;            &lt;i theme=&quot;entity&quot; class=&quot;bhi-person contact&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Contact&lt;/h6&gt;            &lt;i theme=&quot;entity&quot; class=&quot;bhi-company company&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Company&lt;/h6&gt;            &lt;i theme=&quot;entity&quot; class=&quot;bhi-candidate candidate&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Candidate&lt;/h6&gt;            &lt;i theme=&quot;entity&quot; class=&quot;bhi-opportunity opportunity&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Opportunity&lt;/h6&gt;            &lt;i theme=&quot;entity&quot; class=&quot;bhi-job job&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Job&lt;/h6&gt;            &lt;i theme=&quot;entity&quot; class=&quot;bhi-star placement&quot;&gt;&lt;/i&gt;            &lt;h6&gt;Placement&lt;/h6&gt;</code></pre><h2>Contained Icons</h2><h5>Scaling</h5><p>Make sure to scale the corner radius appropriately when enlarging or decreasing the size of the icon.</p><p><img src="assets/images/IconographyScalingDont.svg" alt=""></p><p>That doesn't look like a rectangle</p><p><img src="assets/images/IconographyScalingDo.svg" alt=""></p><p>Always maintain the proportions</p><h5>Padding</h5><p>To preserve readability, icons should have sufficient padding from the edges of their containers. Additionally, the icons should be visually centered in their containers.</p><p><img src="assets/images/IconographyPaddingDont.svg" alt=""></p><p>It's getting crowded in here</p><p><img src="assets/images/IconographyPaddingDo.svg" alt=""></p><p>It's good to have some breathing room</p><h5>Examples</h5><h1>Heading One</h1><h2>Heading Two</h2><h3>Heading Three</h3><h4>Heading Four</h4><h5>Heading Five</h5><h6>Heading Six</h6><pre><code>            &lt;h1&gt;&lt;i theme=&quot;contained&quot; class=&quot;bhi-lead lead&quot;&gt;&lt;/i&gt;Heading One&lt;/h1&gt;            &lt;h2&gt;&lt;i theme=&quot;contained&quot; class=&quot;bhi-person contact&quot;&gt;&lt;/i&gt;Heading Two&lt;/h2&gt;            &lt;h3&gt;&lt;i theme=&quot;contained&quot; class=&quot;bhi-company company&quot;&gt;&lt;/i&gt;Heading Three&lt;/h3&gt;            &lt;h4&gt;&lt;i theme=&quot;contained&quot; class=&quot;bhi-candidate candidate&quot;&gt;&lt;/i&gt;Heading Four&lt;/h4&gt;            &lt;h5&gt;&lt;i theme=&quot;contained&quot; class=&quot;bhi-opportunity opportunity&quot;&gt;&lt;/i&gt;Heading Five&lt;/h5&gt;            &lt;h6&gt;&lt;i theme=&quot;contained&quot; class=&quot;bhi-job job&quot;&gt;&lt;/i&gt;Heading Six&lt;/h6&gt;</code></pre>`,
})
export class IconographyPage {}

@Component({
  selector: 'typography-page',
  template: `<h1>Typography</h1><h2>Roboto, not robotic.</h2><p>Roboto's refined letterforms combine geometry with open, rounded features to create a structured, yet friendly typeface. It maintains a human-like quality while expressing a clean and modern aesthetic.</p><p><a href="https://www.google.com/fonts/specimen/Roboto">Roboto Typeface on Google Fonts</a></p><p><img src="assets/images/TypographyPageIcon.svg" alt=""></p><h6>Design Principle: Clarity</h6><p>Proper line length, adequate white space, and appropriate line breaks are necessary to preserve readability, rhythm, and overall clarity.</p><h5>Line Height</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p><p>These lines are too close for comfort</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p><p>Thumbs up for great readability</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p><p>I'm losing focus with all this space</p><h6>Design Principle: Balance</h6><p>Typographic balance is critical to readability and understanding information hierarchy. The weight and size of the font helps determine which element on a page receives a user’s attention first.</p><h5>Line Length</h5><hr><p>30</p><p>Short lines interrupt the reader's rhythm</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p><hr><p>55-75</p><p>Optimal line length for readability</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p><hr><p>100</p><p>Difficult to jump to the next line</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p><h6>How does this work with responsive design?</h6><p>Line length is always relative to its font-size. This means that if a font scales up or down in sizing (relative to its device's screen size) the line length will automatically scale with it. Line length is about maintaining a comfortable reading flow and rhythm from line to line.</p><p><strong>When implementing</strong>, native line length will always be secondary to the width of the text's container. This means that if a screen's width is smaller than the text's native line length, the text will wrap early.</p><h2>Styles</h2><p>There a number of general styles that are present throughout the application. To maintain consistency, these styles should be adhered to as much as possible.</p><h1>Header 1</h1><p>Roboto <strong>Size:</strong> 2.5em (35px) <strong>Weight:</strong> 400 <strong>Margin:</strong> 0 <strong>Padding:</strong> 0.45em 0 0.35em</p><h2>Header 2</h2><p>Roboto <strong>Size:</strong> 2em (28px) <strong>Weight:</strong> 500 <strong>Margin:</strong> 0 <strong>Padding:</strong> 0.75em 0 0.3em</p><h3>Header 3</h3><p>Roboto <strong>Size:</strong> 1.75em (24px) <strong>Weight:</strong> 300 <strong>Margin:</strong> 0 <strong>Padding:</strong> 0.6em 0 0.4em</p><h4>Header 4</h4><p>Roboto <strong>Size:</strong> 1.375em (19.25px) <strong>Weight:</strong> 400 <strong>Margin:</strong> 0 <strong>Padding:</strong> 0.75em 0 0.5em</p><h5>Header 5</h5><p>Roboto <strong>Size:</strong> 1.125em (15.75px) <strong>Weight:</strong> 700 <strong>Margin:</strong> 0 <strong>Padding:</strong> 0.75em 0 0.25em <strong>Transform:</strong> UPPERCASE</p><h6>Header 6</h6><p>Roboto <strong>Size:</strong> 1.125em (15.75px) <strong>Weight:</strong> 500 <strong>Margin:</strong> 0 <strong>Padding:</strong> 0.75em 0 0.25em</p><p>Caption</p><h4>Section Header</h4><h2>Large Section Header with Icon</h2><h6>Small Section Header with Icon</h6><pre><code>        &lt;h1&gt;Heading 1&lt;/h1&gt;        &lt;h2&gt;Heading 2&lt;/h2&gt;        &lt;h3&gt;Heading 3&lt;/h3&gt;        &lt;h4&gt;Heading 4&lt;/h4&gt;        &lt;h5&gt;Heading 5&lt;/h5&gt;        &lt;h6&gt;Heading 6&lt;/h6&gt;        &lt;p&gt;        Body        &lt;/p&gt;        &lt;hr&gt;        &lt;span class=&quot;caption&quot;&gt;Caption&lt;/span&gt;        &lt;h4 class=&quot;novo-section-header&quot;&gt;Section Header&lt;/h4&gt;        &lt;h2 class=&quot;novo-section-header&quot;&gt;          &lt;i class=&quot;bhi-section&quot;&gt;          Large Section Header with Icon        &lt;/h2&gt;        &lt;h6 class=&quot;novo-section-header&quot;&gt;          &lt;i class=&quot;bhi-idea&quot;&gt;          Small Section Header with Icon        &lt;/h6&gt;</code></pre>`,
})
export class TypographyPage {}

@Component({
  selector: 'chips-page',
  template: `<h1>Chips <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/chips">(source)</a></h1><p>The chips element (<code>chips</code>) represents a control that presents a menu of options. The options within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code> attribute. Chips are the multi-select version of <code>pickers</code></p><h5>Basic Examples</h5><p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p><p><code-example example="basic-chips"></code-example></p><h5>Async Examples</h5><p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p><p><code-example example="async-chips"></code-example></p><h5>Formatted Examples</h5><p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p><p><code-example example="formatted-chips"></code-example></p><h5>Options Closing Example</h5><p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values and the options list will be removed.</p><p><code-example example="close-on-select-chips"></code-example></p><h5>Grouped Multi Picker (categories) with Chips</h5><p>Having custom templates makes it easy to customize the functionality of the picker, here is an example of a category selector</p><p><code-example example="grouped-multi-picker"></code-example></p><h5>Row Chips Example</h5><p>By clicking on the <code>row-chips</code> element, the options list will be displayed.  Select any of the options by clicking on the item in the list.  The value selected will be added to the list of selected values as a new row. By clicking the delete icon at the end of the row, the row will be removed from the list of selected values.</p><p><code-example example="row-chips"></code-example></p>`,
})
export class ChipsPage {}

@Component({
  selector: 'date-picker-page',
  template: `<h1>Date and Time Pickers</h1><p>These allow users to easily select a time and date. It comes in a handful of varieties based on the content of the field.</p><h2>Date Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/date-picker">(source)</a></h2><p>The calendar picker is used to select a date. It appears in all date picker fields.</p><h5>Full Date Picker</h5><p><code-example example="date-picker"></code-example></p><h2>Time Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/time-picker">(source)</a></h2><p>Time pickers come in 12 hour or 24 hour style.</p><h5>Standalone Time Picker</h5><p><code-example example="time-picker"></code-example></p><h5>Range Picker</h5><p><code-example example="date-range"></code-example></p><h5>Date Time Picker</h5><p><code-example example="date-time"></code-example></p><h5>Date Time Input Picker</h5><p><code-example example="date-time-input"></code-example></p><h5>Customizing Week Start</h5><p><code-example example="week-start"></code-example></p><h5>Different Locale</h5><p>TBD</p>`,
})
export class DatePickerPage {}

@Component({
  selector: 'editor-page',
  template: `<h1>CK Editor <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/ckeditor">(source)</a></h1><p>Basic HTML editor using CK Editor.</p><h5>Basic Example</h5><p><code-example example="basic-editor"></code-example></p><h5>Minimal Example</h5><p><code-example example="minimal-editor"></code-example></p>`,
})
export class EditorPage {}

@Component({
  selector: 'form-controls-page',
  template: `<h1>Form Controls</h1><p>This is a landing page</p>`,
})
export class FormControlsPage {}

@Component({
  selector: 'form-groups-page',
  template: `<h1>Grouped Forms / Form Controls <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/form">(source)</a></h1><p>Useful when needing to group smaller sections of forms, can be used in the larger form. Static or Dynamic too!</p><h5>Horizontal</h5><p><code-example example="horizontal"></code-example></p><h5>Horizontal (options)</h5><p><code-example example="horizontal-options"></code-example></p><h5>Vertical</h5><p><code-example example="vertical"></code-example></p><h5>Horizontal (options)</h5><p><code-example example="vertical-options"></code-example></p><h5>Custom Template (you control everything!)</h5><p><code-example example="custom-template"></code-example></p>`,
})
export class FormGroupsPage {}

@Component({
  selector: 'form-page',
  template: `<h1>Forms <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/form">(source)</a></h1><p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'</p><h2>Static Form</h2><p>Static forms <code>&lt;novo-form /&gt;</code>.</p><h5>Textbox Based Controls</h5><p><code-example example="text-based-controls"></code-example></p><h5>Checkbox Controls</h5><p><code-example example="check-box-controls"></code-example></p><h5>File Input Controls</h5><p><code-example example="file-input-controls"></code-example></p><h5>Calendar Controls</h5><p><code-example example="calendar-input-controls"></code-example></p><h5>Picker Controls</h5><p><code-example example="picker-controls"></code-example></p><h5>Address Controls</h5><p><code-example example="address-control"></code-example></p><h2>Dynamic Form</h2><p>Dynamic forms are composed of one element, <code>&lt;novo-dynamic-form [controls]=&quot;controls&quot;/&gt;</code> and allow you to pass in the controls and form and it will create the form for you.</p><h5>Basic</h5><p><code-example example="dynamic-form"></code-example></p><h5>Vertical</h5><p><code-example example="vertical-dynamic-form"></code-example></p><h5>Fieldsets</h5><p><code-example example="dynamic-form-field-sets"></code-example></p><h5>Updating Fields/Status</h5><p><code-example example="updating-form"></code-example></p><h5>Disabled Field States</h5><p><code-example example="disabled-form"></code-example></p>`,
})
export class FormPage {}

@Component({
  selector: 'multi-picker-page',
  template: `<h1>MultiPicker <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/multi-picker">(source)</a></h1><p>The multipicker element (<code>multipicker</code>) represents a control that presents a menu of options of multiple types. The options within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code> attribute. Multipicker is the multi-category version of <code>chips</code></p><p>.</p><h5>Basic Example</h5><p>By clicking on the <code>multi-picker</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p><p><code-example example="basic-multi-picker"></code-example></p><h5>Nested Example</h5><p>The multipicker can also support a parent-child relationship between the types, such as the relationship between a state with many cities or a department with users.</p><p><code-example example="nested-multi-picker"></code-example></p>`,
})
export class MultiPickerPage {}

@Component({
  selector: 'picker-page',
  template: `<h1>Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/picker">(source)</a></h1><p>The picker element (<code>input[picker]</code>) represents a control that presents a menu of options. The options within are set by the <code>items</code> attribute. Options can be pre-pickered for the user using the <code>value</code> attribute.</p><h5>Basic Examples</h5><p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p><p><code-example example="basic-picker"></code-example></p><h5>Async Examples (With Infinite Scroll)</h5><p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p><p><code-example example="async-picker"></code-example></p><h5>Formatted Picker Examples</h5><p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p><p><code-example example="formatted-picker"></code-example></p><h5>Custom Picker Examples</h5><p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p><p><code-example example="custom-picker-results"></code-example></p><h5>Overriding the Result Template</h5><p>You can provide a string to override the base result template. You have access to <code>match</code> which is the data to be displayed.</p><p><code-example example="override-template"></code-example></p><h5>Default Options</h5><p>You can set a function or array for the default options on the config, for these options to appear when the user clicks in and doesn't have enough keys entered to perform a search</p><p><code-example example="default-options-picker"></code-example></p><h5>Entity Single Picker</h5><p>You can provide custom config to style the picker to select entities too!</p><p><code-example example="entity-picker"></code-example></p><h5>Grouped Multi Picker (categories) with Picker</h5><p>Having custom templates makes it easy to customize the functionality of the picker, here is an example of a category selector</p><p><code-example example="grouped-picker"></code-example></p>`,
})
export class PickerPage {}

@Component({
  selector: 'radio-buttons-page',
  template: `<h1>Radio <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/radio">(source)</a></h1><p>A radio group</p><h5>Basic</h5><p><code-example example="basic-radio"></code-example></p><h5>Vertical</h5><p><code-example example="vertical-radio"></code-example></p><h5>Button Radio</h5><p><code-example example="button-radio"></code-example></p><h5>Icon Radio</h5><p><code-example example="icon-radio"></code-example></p>`,
})
export class RadioButtonsPage {}

@Component({
  selector: 'select-page',
  template: `<h1>Select <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/select">(source)</a></h1><p>The select element (<code>novo-select</code>) represents a control that presents a menu of options. The options within are set by the <code>items</code> attribute. Options can be pre-selected for the user using the <code>value</code> attribute.</p><h5>Basic Examples</h5><p>By clicking on the <code>novo-select</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be displayed and the options list will be removed.</p><p><code-example example="basic-select"></code-example></p><h5>Lots of Options</h5><p>The most common need for the <code>select</code> component is when there are too many options that would fit on on the screen. The options list will display appropriately and scroll as needed.</p><p><code-example example="long-select"></code-example></p>`,
})
export class SelectPage {}

@Component({
  selector: 'tiles-page',
  template: `<h1>Tiles <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tiles">(source)</a></h1><p>This component is intended to behave akin to the radio button component.</p><h4>Demo</h4><p><code-example example="tiles-usage"></code-example></p><h4>Code</h4>`,
})
export class TilesPage {}

@Component({
  selector: 'value-page',
  template: `<h1>Value/Details/Summary <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/value">(source)</a></h1><p>Used to render data based on its field type provided in meta. It has two themes, DEFAULT - horizontal view and MOBILE - vertical view</p><h2>Mobile Theme</h2><h5>Value/Details/Summary</h5><p>Render SCALAR fields</p><p><code-example example="basic-value"></code-example></p><h5>Category Value</h5><p>Render TO_ONE fields</p><p><code-example example="category-value"></code-example></p><h5>Using Icons w/Values</h5><p>Render fields with one or multiple icons on the right with an onclick event that calls a function on the meta object</p><p><code-example example="icon-value"></code-example></p><h5>CorporateUser</h5><p>Render TO_ONE fields with CorporateUser as an Associated Entity</p><p><code-example example="corporate-user-value"></code-example></p><h5>Custom Formatter</h5><p>Render Entity TO_ONE fields as links</p><p><code-example example="formatter-value"></code-example></p><h5>External Links</h5><p>Render external links</p><p><code-example example="external-link-value"></code-example></p><h5>DateTime</h5><p>Render DateTime and Timestamp fields in the localized Date format</p><p><code-example example="date-time-value"></code-example></p><h5>Address</h5><p>Render Address fields</p><p><code-example example="address-value"></code-example></p><h5>Associated Entities</h5><p>Render associated fields</p><p><code-example example="associated-value"></code-example></p><h5>Entity Lists</h5><p>Render entity lists</p><p><code-example example="entity-list-value"></code-example></p>`,
})
export class ValuePage {}

@Component({
  selector: 'home-page',
  template: `<h1>Introduction</h1><h2>Crafted amid Complexity</h2><p>Enterprise software is highly complex and demands a high level of flexibility. Design offers clarity and enables us to make deep, powerful connections.</p><img src="assets/images/IntroPageHeaderImage.svg" width="300"/><h5>A NEW STANDARD</h5><p>Elegance in utility helps to create a system for humans, not robots. We strive not just to empower users but to delight them in the process.</p><h5>INSIGHTS AT SCALE</h5><p>Vast data reservoirs need a finely tuned system to surface the critical information right when it is needed, no matter the scale or setting.</p><h5>POWER IN FLEXIBILITY</h5><p>Users have vastly differing needs and goals. By identifying key commonalities and themes, we provide a strong experience for all.</p><p>Are you a developer and what to skip right to the code?<br><a href="#">View Components here</a></p><p>Looking for the Bullhorn corporate brand guidelines?<br><a href="https://brandfolder.com/bullhorn">Bullhorn Brand Folder</a></p>`,
})
export class HomePage {}

@Component({
  selector: 'cards-page',
  template: `<h1>Cards <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/card">(source)</a></h1><p>Components and elements for cards to make sure the loading/empty/layout views are all consistent.</p><h5>Examples</h5><h2>Basic Card (using attributes)</h2><p><code-example example="basic-card"></code-example></p><h2>Card (using config object and card-actions)</h2><p><code-example example="card-config"></code-example></p>`,
})
export class CardsPage {}

@Component({
  selector: 'expansion-page',
  template: `<h1>Expandable Containers<a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/expansion">(source)</a></h1><p>Expansion Panel provides an expandable details-summary view. Each expansion-panel must include a header and may optionally include an action bar.</p><p>By default, the expansion-panel header includes a toggle icon at the end of the header to indicate the expansion state. This icon can be hidden via the hideToggle property.</p><h2>Basic Usage</h2><h5>Standard Expansion Panel</h5><p>This is an example of a standard list.</p><p><code-example example="basic-expansion"></code-example></p><h5>Accordion Expansion Panel</h5><p>This is an example of a Accordion.</p><p><code-example example="accordion"></code-example></p><h5>Lazy Expansion Panel</h5><p>This is an example of a Lazy loaded list.</p><p><code-example example="lazy-expansion"></code-example></p><h5>Patterns</h5><p>Check out the <a routerLink="/patterns">Activity Section</a> pattern</p>`,
})
export class ExpansionPage {}

@Component({
  selector: 'header-page',
  template: `<h1>Headers <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/header">(source)</a></h1><p>Headers are used in Mainframe Record pages and some modals.</p><h2>Types</h2><h5>Record Header</h5><p>Record headers have details about the entity record and tabbed navigation.</p><p><code-example example="basic-header"></code-example></p><h5>Condensed</h5><p><code-example example="condensed-header"></code-example></p><h2>Options</h2><h5>SubTitle</h5><p><code-example example="header-subtitle"></code-example></p><h5>With Search</h5><p><code-example example="header-searchbar"></code-example></p>`,
})
export class HeaderPage {}

@Component({
  selector: 'layouts-page',
  template: `<h1>Layouts</h1><p>This is a landing page</p>`,
})
export class LayoutsPage {}

@Component({
  selector: 'list-page',
  template: `<h1>List / Item <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/list">(source)</a></h1><p>Lists are used to display rows of information like entities or entity data and appear on cards, our mobile app, and several other places across the Bullhorn platform.</p><h2>Basic Usage</h2><h5>Standard List</h5><p>This is an example of a standard list.</p><p><code-example example="basic-list"></code-example></p><h5>Themed List</h5><p>This is an example of a themed list.</p><p><code-example example="themed-list"></code-example></p>`,
})
export class ListPage {}

@Component({
  selector: 'stepper-page',
  template: `<h1>Steppers <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/stepper">(source)</a></h1><p>Stepper component provides a wizard-like workflow by dividing content into logical steps.</p><p>Material stepper builds on the foundation of the CDK stepper that is responsible for the logic that drives a stepped workflow. Material stepper extends the CDK stepper and has Material Design styling.</p><h2>Stepper variants</h2><p>There are two stepper components: novo-horizontal-stepper and novo-vertical-stepper. They can be used the same way. The only difference is the orientation of stepper.</p><h5>Horizontal Stepper</h5><p>This is the default stepper great for many reasons.</p><p><code-example example="stepper-horizontal"></code-example></p><h5>Linear stepper</h5><p>The linear attribute can be set on novo-horizontal-stepper and novo-vertical-stepper to create a linear stepper that requires the user to complete previous steps before proceeding to following steps. For each novo-step, the stepControl attribute can be set to the top level AbstractControl that is used to check the validity of the step.</p><p>There are two possible approaches. One is using a single form for stepper, and the other is using a different form for each step.</p><p>Alternatively, if you don't want to use the Angular forms, you can pass in the completed property to each of the steps which won't allow the user to continue until it becomes true. Note that if both completed and stepControl are set, the stepControl will take precedence.</p><h5>Vertical Stepper</h5><p>This is an alternative stepper great for many other reasons.</p><p><code-example example="stepper-vertical"></code-example></p>`,
})
export class StepperPage {}

@Component({
  selector: 'tabs-page',
  template: `<h1>Tabs <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tabs">(source)</a></h1><p>Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs in Bullhorn have two different themes; A 'color' theme for tabbed navigation on a colored background, and a 'white' theme for tabs on a white background.</p><h2>Themes</h2><h5>Color</h5><p>Colored background tab navigation gets the theme <code>theme=&quot;color&quot;</code></p><p><code-example example="tabs-color"></code-example></p><h5>White</h5><p>White background tab navigation gets the theme <code>theme=&quot;white&quot;</code></p><p><code-example example="tabs-color"></code-example></p><h2>Styles</h2><p>Condensed tabs to help utilize more space with <code>condensed=&quot;true&quot;</code></p><p><code-example example="tabs-condensed"></code-example></p><h2>Types</h2><h5>Vertical</h5><p>Vertical tabs get a direction attribute <code>direction=&quot;vertical&quot;</code></p><p><code-example example="tabs-vertical"></code-example></p><h5>Button Tab Bars</h5><p>Tabbed Button Bars get a similar style treatment to the <code>&quot;header&quot;</code> theme button.</p><!-- <code-example example="tabs-condensed"></code-example> --><h2>As Application Routing Mechanism</h2><p>Follows the same color/white theme as above, but doesn't use the &quot;novo-tabs&quot; tag and you have to add the classes and html accordingly. The header will now control and route your application and put the content in the &quot;router-outlet&quot; and look/feel like our tabs component.</p><p><code-example example="tabs-router"></code-example></p>`,
})
export class TabsPage {}

@Component({
  selector: 'patterns-page',
  template: `<h1>Design Patterns</h1><p>The following are examples of know composition patterns to create a common user exeperience.  The component library is design to be used in these patterns.</p><h2>Activity Sections</h2><p>Displaying a series of list data in ... blah, blah, blah</p><p><code-example example="activity-section"></code-example></p><h2>Record Headers</h2><p>Entity Record Headers Patterns.</p><p><code-example example="record-header"></code-example></p>`,
})
export class PatternsPage {}

@Component({
  selector: 'templates-page',
  template: `<h2>Bullhorn Application Templates</h2><h2>Example starter templates for your application</h2><h3>Email</h3><p>List App</p><p>TODO: Add linked image</p><h3>Form App</h3><p>form-based app template</p><p>TODO: Add linked image</p><h3>Custom Card Starter Template</h3><p>empty starter template</p><p>TODO: Add linked image</p><h3>Dashboard</h3><p>dashboard template</p><p>TODO: Add linked image</p>`,
})
export class TemplatesPage {}

@Component({
  selector: 'chomsky-page',
  template: `<h1>Chomsky-NG2 Documentation</h1><p>A lightweight Angular 2 i18n wrapper.</p><ul><li>English</li><li>Russian</li><li>French</li></ul><h5>Simple Translation</h5><p><code-example example="simple-translations"></code-example></p><h5>Translation with Variables</h5><p><code-example example="translations-variables"></code-example></p><h5>Translation with Date Variables</h5><p>Other short formats include (bold is default):<br><em>short - 02/14/2017, 1:17 PM</em><br><em>medium - Feb 14, 2017, 1:17 PM</em><br><em>long - Febuary 14, 2017, 1:17 PM CST</em><br><strong><em>dateShort - 02/14/2017</em></strong><br><em>dateMedium - Feb 14, 2017</em><br><em>dateLong - Febuary 14, 2017</em><br><em>timeShort - 1:17 PM</em><br><em>timeLong - 1:17 PM CST</em></p><p><code-example example="date-translations"></code-example></p><h5>Translation with Number &amp; Currency Variables</h5><p>Can be used with syntax from <a href="//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat">Intl.NumberFormat</a>.</p><p><code-example example="number-translations"></code-example></p><h5>Translation with Pluralization and Gender</h5><p><code-example example="plural-translations"></code-example></p>`,
})
export class ChomskyPage {}

@Component({
  selector: 'field-interactions-page',
  template: `<h1>Field Interactions</h1><p>Field Interactions is a simple API that allows you to modify NovoForms based on field changes.</p><p>The Field Interaction API gives you a simple to use API object when writing your field interaction functions.</p><p>Look below for samples of what you can do with this API...</p><h2>Configuration</h2><p>Inspect Form Configuration on Field Getting Current Context Write Field Interaction</p><h5>Inspect Form</h5><p>There is a special <code>data-control-key</code> property added to the <code>novo-control</code> element.</p><p>You can inspec the DOM at the input and see the property to know what 'key' to use in the API</p><p>By default, if you are writing a Field Interaction for the active field you can use <code>API.getActiveKey()</code></p><h5>Configuration on Field</h5><pre><code>event: 'change|focus|blur|init', script: Function, invokeOnInit?: boolean</code></pre><p>The Field Interactions are configured on a per control basis. There are three scenarios in which they will be fired: 'change', 'focus' and 'blur'.</p><p>init -- gets fired only when the form is initialized</p><p>change -- gets fired when the value of the form control changes</p><p>focus -- gets fired when the field gets focused</p><p>blur -- gets fired when the field loses focus</p><p>The script function represents the function that will be fired for the event, you can see examples of these below.</p><p>Lastly, 'invokeOnInit' will also trigger the Field Interaction when the form is created as well.</p><h5>Getting Current Context</h5><p>If you need to write Field Interaction based on if you are on an add or edit page, or you need to know the current entity type and ID then you can get those via:</p><p>edit: 'API.isEdit'</p><p>entity: 'API.currentEntity'</p><p>id: 'API.currentEntityId'</p><h5>Write Field Interaction</h5><p>Writing Field Interactions is very simple. You can refer to all the examples below. If you ever get stuck, you can always open a <a href="https://github.com/bullhorn/novo-elements/issues">Github Issue</a> as well!</p><p><strong>IMPORTANT</strong></p><p>When writing field interactions, you will be writing everything only the contents of the function. <strong>You do not</strong> write the surrounding function.</p><p><strong>All field interactions must be written in vanilla ES5 as well!</strong></p><h2>Basic API</h2><p>Validation Mark Fields as Required Field Calculations &amp; Modification Hide / Show Fields Enable / Disable Fields Messaging / Notifications Modifying Config on Static Pickers / Selects Using Globals Async Interactions Confirm Changes Adding / Removing Fields Add Tooltip</p><h5>Validation</h5><p>If you need to perform some custom validation on a field, you can use the API to quickly mark a field as invalid</p><p><code-example example="fi-validation"></code-example></p><h5>Mark Fields as Required</h5><p>If you need to mark fields as required or not based on some changes in the form, you can use the API to do that!</p><p><code-example example="fi-required"></code-example></p><h5>Field Calculations &amp; Modification</h5><p>If you need to do some custom calculations based off other form data, you can do that easily with the API</p><p><code-example example="fi-calculation"></code-example></p><h5>Hide / Show Fields</h5><p>You can also hide or show certain fields based on interaction with the form. Note that the value is still present in the form's value</p><p><code-example example="fi-hide-show"></code-example></p><h5>Enable / Disable Fields</h5><p>You can also enable or disable certain fields based on interaction with the form. Note that the value is still present in the form's value but does not respond to any interactions</p><p><code-example example="fi-enable-disable"></code-example></p><h5>Messaging / Notifications</h5><p>You can trigger messages to users in a few different ways using the API</p><p><code-example example="fi-messaging"></code-example></p><h5>Modifying Config on Static Pickers / Selects</h5><p>You have full control over the control, you can modify the options array of static pickers and select controls!</p><p><code-example example="fi-modify-options"></code-example></p><h5>Using Globals</h5><p>Using the config from above, you can figure the API to have a set of global variables that you can key off of inside your field interactions</p><p><code-example example="fi-globals"></code-example></p><h5>Async Interactions</h5><p>You can perform async interactions and keep the form from saving by setting a loading state</p><p><code-example example="fi-async"></code-example></p><h5>Confirm Changes</h5><p>You can prompt the user if they want to update the field or not too!</p><p><code-example example="fi-confirm"></code-example></p><h5>Adding / Removing Fields</h5><p>With the API you can quickly add and remove fields on the form.</p><p><strong>ONLY WORKS WITH DYNAMIC FORMS</strong></p><p><code-example example="fi-adding-removing"></code-example></p><h5>Add Tooltip</h5><p>You are able to dynamically change a field's tooltip.</p><p><code-example example="fi-tooltip"></code-example></p>`,
})
export class FieldInteractionsPage {}

@Component({
  selector: 'modal-page',
  template: `<h1>Modals <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/modal">(source)</a></h1><p>Modals are pop-up dialogues designed to grab attention and inform the user of something critical, force a decision, or extend a workflow. There are two categories of modals: notification and workflow. Regardless of type, a modal should have a maximum of two main buttons.</p><h2>Notification Modals</h2><h5>Success</h5><p>This modal uses only a primary action button. It is a confirmation that an action has been completed when the result is not immediately apparent. A workflow modal often transitions into a success modal.</p><p><code-example example="success-modal"></code-example></p><h5>Warning</h5><p>Warning modals ask for additional confirmation to complete an action because the action is either irreversible or there is an exception. The first line should always clarify the action or eventual result.</p><p><code-example example="warning-modal"></code-example></p><h5>Error</h5><p>Error modals indicate that an attempted action has failed. The first line should apologize and state the what happened. The second line should quickly attempt to explain to the user why this has happened, and instruct the user on the best course of action.</p><p><code-example example="error-modal"></code-example></p><h5>Custom</h5><p>In the case where &quot;Success&quot;, &quot;Warning&quot;, and &quot;Error&quot; notfications aren't enough, use the custom notification. Custom notifcations allow any of the Bullhorn Icons to be used in the notification.</p><p><code-example example="custom-modal"></code-example></p><h2>Workflow Modals</h2><h5>Add</h5><p>Add modals have a colored title bar based on the record type being created. Additionally, due to a greater than average amount of content, they have fixed footers.</p><p><code-example example="modal-add-form"></code-example></p><h5>Edit &amp; Send</h5><p>Edit, Send, and non-Add workflow modals possess a plain header to remind the user of the action they are taking. They generally have a neutralizing button, and a primary button.</p><p><code-example example="modal-edit-form"></code-example></p>`,
})
export class ModalPage {}

@Component({
  selector: 'pipes-page',
  template: `<h1>Pipes</h1><p>Utility and helpful pipes.</p><h5>Pluralize <a href="https://github.com/bullhorn/novo-elements/blob/master/src/pipes/plural">(source)</a></h5><p>Makes works plural or vice-versa</p><p><code-example example="pluralize"></code-example></p>`,
})
export class PipesPage {}

@Component({
  selector: 'pop-over-page',
  template: `<h1>PopOvers <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/popover">(source)</a></h1><p>PopOvers are tooltips with dynamic html content. This component is used when you need help text that requires the user to perform an action before closing.</p><h5>Placement</h5><p><code-example example="pop-over-placement"></code-example></p><h5>Horizontal Alignment</h5><p><code-example example="pop-over-horizontal"></code-example></p><h5>Vertical Alignment</h5><p><code-example example="pop-over-vertical"></code-example></p><h5>Behavior</h5><p><code-example example="pop-over-behaviors"></code-example></p><h5>Dynamic HTML in PopOver</h5><p><code-example example="pop-over-dynamic"></code-example></p><h5>Automatic Placement of PopOver</h5><p><code-example example="pop-over-auto-placement"></code-example></p>`,
})
export class PopOverPage {}

@Component({
  selector: 'security-page',
  template: `<h1>Security</h1><p>The security component for this library a simple wrapper to implement ngIf functionality with a Security service.</p><h4>Configuration</h4><p>blah blah blah</p><p><code-example example="security"></code-example></p>`,
})
export class SecurityPage {}

@Component({
  selector: 'tip-well-page',
  template: `<h1>TipWell <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tip-well">(source)</a></h1><p>This component is meant to be akin to Bootstrap's 'well'. It's a small container for help text.</p><h4>Demo</h4><p><code-example example="basic-tip-well"></code-example></p><h4>No Button Demo</h4><p><code-example example="buttonless-tip-well"></code-example></p><h4>Icon Demo</h4><p><code-example example="icon-tip-well"></code-example></p><h4>HTML Demo</h4><p><code-example example="html-tip-well"></code-example></p>`,
})
export class TipWellPage {}

@Component({
  selector: 'toaster-page',
  template: `<h1>Toast Notifications <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/toast">(source)</a></h1><p>Toasts are used as system notifications. They can contain custom text titles and messages, as well as any icons from bh-icons and any color from our color palletes.</p><h2>Types</h2><h5>Alert</h5><p>This type of toast notification takes a template, a style, and a location.</p><h2>Embedded Toast</h2><p><code-example example="toast-usage"></code-example></p><h2>Toaster Service</h2><p><code-example example="toast-service"></code-example></p>`,
})
export class ToasterPage {}

@Component({
  selector: 'tooltip-page',
  template: `<h1>Tooltips <a href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/tooltip">(source)</a></h1><h2>Helper</h2><p>Helper tooltips contain basic text that provides some additional information about an element.</p><h5>Placement</h5><p><code-example example="tooltip-placement"></code-example></p><h5>Alignment</h5><p><code-example example="tooltip-align"></code-example></p><h5>Types</h5><p><code-example example="tooltip-types"></code-example></p><h5>Sizes</h5><p><code-example example="tooltip-sizes"></code-example></p><h5>Options</h5><p><code-example example="tooltip-options"></code-example></p><h5>Toggle Trigger</h5><p><code-example example="tooltip-toggle"></code-example></p>`,
})
export class TooltipPage {}

const routes: Routes = [
  //{ path: '', component: Home, data: {} },
  { path: 'components/ace-editor', component: AceEditorPage, data: { title: 'Ace Editor', section: 'components' } },
  { path: 'components/buttons', component: ButtonsPage, data: { title: 'Buttons', section: 'components' } },
  { path: 'components/calendar', component: CalendarPage, data: { title: 'Calendar', section: 'components' } },
  { path: 'components', component: ComponentsPage, data: { title: 'Components', section: 'src' } },
  { path: 'components/data-table', component: DataTablePage, data: { title: 'Data Table', section: 'components' } },
  { path: 'components/dropdown', component: DropdownPage, data: { title: 'Dropdown', section: 'components' } },
  { path: 'components/icon', component: IconPage, data: { title: 'Icon', section: 'components' } },
  { path: 'components/loading', component: LoadingPage, data: { title: 'Loading', section: 'components' } },
  { path: 'components/quick-note', component: QuickNotePage, data: { title: 'Quick Note', section: 'components' } },
  { path: 'components/search', component: SearchPage, data: { title: 'Search', section: 'components' } },
  { path: 'components/slides', component: SlidesPage, data: { title: 'Slides', section: 'components' } },
  { path: 'components/switch', component: SwitchPage, data: { title: 'Switch', section: 'components' } },
  { path: 'components/table', component: TablePage, data: { title: 'Table', section: 'components' } },
  { path: 'design/colors', component: ColorsPage, data: { title: 'Colors', section: 'design' } },
  { path: 'design/composition', component: CompositionPage, data: { title: 'Composition', section: 'design' } },
  { path: 'design', component: DesignPage, data: { title: 'Design', section: 'src' } },
  { path: 'design/iconography', component: IconographyPage, data: { title: 'Iconography', section: 'design' } },
  { path: 'design/typography', component: TypographyPage, data: { title: 'Typography', section: 'design' } },
  { path: 'form-controls/chips', component: ChipsPage, data: { title: 'Chips', section: 'form-controls' } },
  { path: 'form-controls/date-picker', component: DatePickerPage, data: { title: 'Date Picker', section: 'form-controls' } },
  { path: 'form-controls/editor', component: EditorPage, data: { title: 'Editor', section: 'form-controls' } },
  { path: 'form-controls', component: FormControlsPage, data: { title: 'Form Controls', section: 'src' } },
  { path: 'form-controls/form-groups', component: FormGroupsPage, data: { title: 'Form Groups', section: 'form-controls' } },
  { path: 'form-controls/form', component: FormPage, data: { title: 'Form', section: 'form-controls' } },
  { path: 'form-controls/multi-picker', component: MultiPickerPage, data: { title: 'Multi Picker', section: 'form-controls' } },
  { path: 'form-controls/picker', component: PickerPage, data: { title: 'Picker', section: 'form-controls' } },
  { path: 'form-controls/radio-buttons', component: RadioButtonsPage, data: { title: 'Radio Buttons', section: 'form-controls' } },
  { path: 'form-controls/select', component: SelectPage, data: { title: 'Select', section: 'form-controls' } },
  { path: 'form-controls/tiles', component: TilesPage, data: { title: 'Tiles', section: 'form-controls' } },
  { path: 'form-controls/value', component: ValuePage, data: { title: 'Value', section: 'form-controls' } },
  { path: 'home', component: HomePage, data: { title: 'Home', section: 'src' } },
  { path: 'layouts/cards', component: CardsPage, data: { title: 'Cards', section: 'layouts' } },
  { path: 'layouts/expansion', component: ExpansionPage, data: { title: 'Expansion', section: 'layouts' } },
  { path: 'layouts/header', component: HeaderPage, data: { title: 'Header', section: 'layouts' } },
  { path: 'layouts', component: LayoutsPage, data: { title: 'Layouts', section: 'src' } },
  { path: 'layouts/list', component: ListPage, data: { title: 'List', section: 'layouts' } },
  { path: 'layouts/stepper', component: StepperPage, data: { title: 'Stepper', section: 'layouts' } },
  { path: 'layouts/tabs', component: TabsPage, data: { title: 'Tabs', section: 'layouts' } },
  { path: 'patterns', component: PatternsPage, data: { title: 'Patterns', section: 'src' } },
  { path: 'templates', component: TemplatesPage, data: { title: 'Templates', section: 'src' } },
  { path: 'utils/chomsky', component: ChomskyPage, data: { title: 'Chomsky', section: 'utils' } },
  { path: 'utils/field-interactions', component: FieldInteractionsPage, data: { title: 'Field Interactions', section: 'utils' } },
  { path: 'utils/modal', component: ModalPage, data: { title: 'Modal', section: 'utils' } },
  { path: 'utils/pipes', component: PipesPage, data: { title: 'Pipes', section: 'utils' } },
  { path: 'utils/pop-over', component: PopOverPage, data: { title: 'Pop Over', section: 'utils' } },
  { path: 'utils/security', component: SecurityPage, data: { title: 'Security', section: 'utils' } },
  { path: 'utils/tip-well', component: TipWellPage, data: { title: 'Tip Well', section: 'utils' } },
  { path: 'utils/toaster', component: ToasterPage, data: { title: 'Toaster', section: 'utils' } },
  { path: 'utils/tooltip', component: TooltipPage, data: { title: 'Tooltip', section: 'utils' } },
  // Catch All
  { path: '**', redirectTo: '/home', data: {} },
];

export const PAGE_LIST = [
  AceEditorPage,
  ButtonsPage,
  CalendarPage,
  ComponentsPage,
  DataTablePage,
  DropdownPage,
  IconPage,
  LoadingPage,
  QuickNotePage,
  SearchPage,
  SlidesPage,
  SwitchPage,
  TablePage,
  ColorsPage,
  CompositionPage,
  DesignPage,
  IconographyPage,
  TypographyPage,
  ChipsPage,
  DatePickerPage,
  EditorPage,
  FormControlsPage,
  FormGroupsPage,
  FormPage,
  MultiPickerPage,
  PickerPage,
  RadioButtonsPage,
  SelectPage,
  TilesPage,
  ValuePage,
  HomePage,
  CardsPage,
  ExpansionPage,
  HeaderPage,
  LayoutsPage,
  ListPage,
  StepperPage,
  TabsPage,
  PatternsPage,
  TemplatesPage,
  ChomskyPage,
  FieldInteractionsPage,
  ModalPage,
  PipesPage,
  PopOverPage,
  SecurityPage,
  TipWellPage,
  ToasterPage,
  TooltipPage,
];

@NgModule({
  declarations: PAGE_LIST,
  entryComponents: PAGE_LIST,
  imports: [RouterModule.forRoot(routes, { useHash: true }), NovoExamplesModule, NovoExamplesSharedModule],
  exports: [RouterModule],
})
export class NovoExamplesRoutesModule {}
