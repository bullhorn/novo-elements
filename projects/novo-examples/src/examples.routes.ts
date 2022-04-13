
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED 'build-examples-module' */
import {NgModule, Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoExamplesModule } from './examples.module';
import { NovoExamplesSharedModule, TabsLayout, DefaultLayout } from './_shared';
import { NovoElementsModule } from 'novo-elements';

@Component({
  selector: 'ace-editor-page',
  template: `<h1>Ace Editor <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/ace-editor">(source)</a></h1>
<p>Basic code editor using Ace Editor.</p>
<h5>Basic Example</h5>
<p><code-example example="basic-ace"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class AceEditorPage {
  public params: any = {};
}


@Component({
  selector: 'agenda-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
Used to help display scheduled events for the day/week/month. The agenda component allow you to display events for any range grouped by days.  You can provide custom templates to each view to modify how the event is displayed and to add additional content.
</div>
<p><img src="assets/images/AgendaDayView.png" alt="Overview"></p>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When representing scheduled events or a history of actions.</novo-text></p>
<p>The Agenda should be used to plot dates or events already tracked in the system and should be used as a way to visualize those events.</p>
</li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use to select a date or range of dates.</novo-text></p>
<p>While the Agenda and events can be interactive it should not be used to select dates.  Instead use the <code>calendar</code> or <code>date-picker</code></p>
</li>
</ul>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Ensure the view has enough space to display the Agenda components, the often take up the whole page.</li>
<li>Allow the user to switch between Month, Week, Day views of their data.</li>
<li>Avoid showing to many types of events, the views will get bloated and hard to read.</li>
</ul>
<h2>Options</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Month View</strong></div>
<div class="p">Used to present the user with a calendar of scheduled event for a month.  The event styles can be overridden with a custom template, this allows the implementation to determine how the display should change based on the context of the scheduled event.</div>
</blockquote>
<p><img src="assets/images/AgendaMonthView.png" alt="Month View"></p>
<p><img src="assets/images/AgendaWeekView.png" alt="Week View"></p>
<blockquote>
<div class="p"><strong>Week View</strong></div>
<div class="p">The agenda's week view component can disply the scheduled events showing the 5-7 days of that week.  Unlike the Month View, events will be plotted vertically based on the time of day the event starts. Event containers height will only be as tall as the duration of the event.</div>
</blockquote>
<blockquote>
<div class="p"><strong>Day View</strong></div>
<div class="p">Similar to the Week View but only display events for a single day.  This is helpful when the week view is very congested because this allows overlapping events to stack horizontally, allowing for better readability.</div>
</blockquote>
<p><img src="assets/images/AgendaDayView.png" alt="Day View"></p>
</novo-grid>
<h2>Accessibility</h2>
<ul>
<li>If using an illustrative image for the supplement content, it’s generally safe to use an empty or null alternative text for example alt=&quot;&quot;</li>
</ul>
`,
  host: { class: 'markdown-page' }
})
export class AgendaDesignPage {
  public params: any = {};
}


@Component({
  selector: 'agenda-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/avatar">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoAgendaModule &#125; form 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html">  <span class="hljs-tag">&lt;<span class="hljs-name">novo-agenda-month</span> [(<span class="hljs-attr">viewDate</span>)]=<span class="hljs-string">&quot;viewDate&quot;</span> [<span class="hljs-attr">events</span>]=<span class="hljs-string">&quot;events&quot;</span>
    (<span class="hljs-attr">dayClicked</span>)=<span class="hljs-string">&quot;dayClicked($event.day.date)&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-agenda-month</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p><em>renamed to Agenda in this version</em></p>
<h1>Components</h1>
<h2>NovoAgendaMonthViewElement <code>novo-agenda-month</code></h2>
<p>Display <code>events</code> with a Month view calendar.</p>
<h3>Properties</h3>
<p><props-table component="NovoAgendaMonthViewElement"></props-table></p>
<h2>NovoAgendaWeekViewElement <code>novo-agenda-month</code></h2>
<p>Display <code>events</code> within a Week view calendar.</p>
<h3>Properties</h3>
<p><props-table component="NovoAgendaWeekViewElement"></props-table></p>
<h2>NovoAgendaDayViewElement <code>novo-agenda-month</code></h2>
<p>Display <code>events</code> within single day view</p>
<h3>Properties</h3>
<p><props-table component="NovoAgendaDayViewElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class AgendaDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'agenda-examples-page',
  template: `<h2>Agenda Example</h2>
<p><code-example example="agenda"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class AgendaExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'aside-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Asides are slideouts designed to provide a view into related content within the page without navigating away.  Asides work similar to Modal but the content is meant to be correlated and the workflow should be non-blocking.</p>
</div>
<img src="assets/images/AsideOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Providing supporting visual content, e.g., an image or chart, within the context of a larger composition</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> The content provided doesn't block the workflow of the previous context.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> The content of the aside requires immediate action or response. Instead, use a modal.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Ensure the content opened is highly correlated to the context that opened it. When showing a preview of a related content that can opened for various contexts, present the user with the data related to the context that opened it, rather than the same view.</li>
<li>When using an aside to present the user with a form, ensure that it is beneficial to have the current view still available to the user, if not consider opening a new page.</li>
</ul>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Form Slideout</novo-text></li>
</ul>
<div class="p">Utilize the aside to open quick forms within the application. With the <code>aside</code> you can provide a workflow to enter data quickly while still provide a partial view of the parent context. This will allow the user to maintain context and see how the addition of new data affects there current view.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Record Preview</novo-text></li>
</ul>
<div class="p">Utilize the aside to open record previews within the application. With the <code>aside</code> you can allow the user to view a significant amount data about a related entity with losing the context of the current view.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class AsideDesignPage {
  public params: any = {};
}


@Component({
  selector: 'aside-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/aside">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoAsideModule &#125; from 'novo-elements';</code></li>
<li><strong>service:</strong> <code>import &#123; NovoAsideService &#125; form 'novo-elements/aside';</code></li>
</ul>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Better support for common patterns</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Investigate Sharing injection tokens with Modal</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><em>Added in v5.0.0</em></p>
<h2>Properties</h2>
<p><em>No Properties</em></p>
<h1>Services</h1>
<h2>NovoAsideService</h2>
<p>Asides (a.k.a. Slideout) should be invoked via <code>NovoAsideService</code> and therefore all properties should be private or internal. Any values that need to be passed to the your <code>aside</code> instance should be passed by the service and will be available in your slideout via <code>NovoAsideRef.params</code>.</p>
<pre><code class="language-typescript"><span class="hljs-meta">@Component</span>(&#123;...&#125;)
<span class="hljs-keyword">class</span> <span class="hljs-title class_">RandomComponent</span> &#123;
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> aside:NovoAsideService</span>) &#123;&#125;
  <span class="hljs-title function_">handleAction</span>(<span class="hljs-params"></span>) &#123;
    <span class="hljs-keyword">const</span> ref = <span class="hljs-variable language_">this</span>.<span class="hljs-property">aside</span>.<span class="hljs-title function_">open</span>(<span class="hljs-title class_">AddFormSlideout</span>, &#123; <span class="hljs-attr">record</span>: <span class="hljs-number">123</span> &#125;);
    <span class="hljs-comment">/* you can listen to the close event */</span>
    ref.<span class="hljs-property">onClosed</span>.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> &#123;
      <span class="hljs-comment">/* result is the argument sent via the ref */</span>
      <span class="hljs-keyword">if</span> (res === <span class="hljs-string">&#x27;success&#x27;</span>) &#123;
        <span class="hljs-comment">/* perfom some action */</span>
      &#125;
    &#125;);
    <span class="hljs-comment">/* close the slideout from the parent */</span>
    ref.<span class="hljs-title function_">close</span>(<span class="hljs-string">&#x27;success&#x27;</span>)
  &#125;
&#125;
</code></pre>
<h3>Methods</h3>
<h4><strong>open(component, params)</strong></h4>
<p>Used to open all modals via the service. Use <code>params</code> to pass values to you component.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">component</td>
<td style="text-align:left"><em>Class</em><br>The angular component which represents the Modal to be opened.</td>
</tr>
<tr>
<td style="text-align:left">params</td>
<td style="text-align:left"><em>Object</em><br><strong>Optional</strong> arguments that will be injected into <code>NovoAsideRef.params</code></td>
</tr>
</tbody>
</table>
<p><em>Note:</em> All modal components should be declared as <code>entryComponents</code> in the module.</p>
<h2>NovoAsideRef&lt;T&gt;</h2>
<p><code>NovoAsideRef</code> should be injected into your modal component and all pass params can be accessed in the <code>params</code> property.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AddFormParams</span> &#123;
  <span class="hljs-attr">record</span>: <span class="hljs-built_in">number</span>;
&#125;
<span class="hljs-meta">@Component</span>(&#123;&#125;)
<span class="hljs-keyword">class</span> <span class="hljs-title class_">AddFormSlideout</span> &#123;
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">ref:NovoAsideRef&lt;AddFormParams&gt;</span>) &#123;
    <span class="hljs-comment">/**
     * All passed values are available
     * via ref.params
     **/</span>
  &#125;

  <span class="hljs-title function_">handleClose</span>(<span class="hljs-params"></span>) &#123;
    <span class="hljs-comment">/* To close the modal use the close method */</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ref</span>.<span class="hljs-title function_">close</span>(<span class="hljs-comment">/* Return a value */</span>)
  &#125;

&#125;
</code></pre>
<h3>Methods</h3>
<h4><strong>close(response)</strong></h4>
<p>Will close the modal will emit events to both the <code>beforeClose</code> and <code>afterClosed</code> observables, as well as the .</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">response</td>
<td style="text-align:left"><em>any</em><br>Any value you wish to return to calling components, will be resovled in the <code>onClosed</code> promise.</td>
</tr>
</tbody>
</table>
`,
  host: { class: 'markdown-page' }
})
export class AsideDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'aside-examples-page',
  template: `<h2>Custom</h2>
<p>In the case where &quot;Success&quot;, &quot;Warning&quot;, and &quot;Error&quot; notifications aren't enough, use the custom notification. Custom notifications allow any of the Bullhorn Icons to be used in the notification.</p>
<p><code-example example="aside-usage"></code-example></p>
<h2>Add</h2>
<p>Add modals have a colored title bar based on the record type being created. Additionally, due to a greater than average amount of content, they have fixed footers.</p>
<p><code-example example="aside-form"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class AsideExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'autocomplete-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>The autocomplete component is designed to provide a list of options as the user types that can be used to set the field value.  The component can be used to set more complex data to the form. Usually the input does not require a valid option to be selected.</p>
</div>
<img src="assets/images/AutocompleteOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> A list of possible values are known but not required.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> The form field requires the value to be one of the predefined options. use a select or picker instead.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>Behaviors</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Sizing</strong></div>
<div class="p">A popovers width should match the width of the input it is correlated to a min width of 15rem is set to avoid readability issues.  The popover have a fixed height and should be scrollable, a persistent scrollbar should be visible if this is the case.</div>
</blockquote>
<blockquote>
<div class="p"><strong>Multiple Selections</strong></div>
<div class="p">When the input allows multiple selection the autocomplete popover should add values to the input as a comma-separated list.  The component can be paired with a chip-list as-well.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>KeyBoard Controls</strong></p>
<p>The user should be able to use the <code>up</code> and <code>own</code> arrows to navigate between options and press <code>enter</code> to select the active option.</p>
<p><strong>Implementation</strong></p>
<p>The component should follow the <a href="https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html">ARIA combobox interaction</a> pattern and have a role of <code>combobox</code>.</p>
`,
  host: { class: 'markdown-page' }
})
export class AutocompleteDesignPage {
  public params: any = {};
}


@Component({
  selector: 'autocomplete-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading">(github)</a></li>
<li><strong>module:</strong> <strong>part of</strong> <code>NovoFieldModule</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-full-width&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Number<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Pick one&quot;</span> <span class="hljs-attr">autocomplete</span>=<span class="hljs-string">&quot;off&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-autocomplete</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>One<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">&quot;2&quot;</span>&gt;</span>Two<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">&quot;3&quot;</span>&gt;</span>Three<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-autocomplete</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Default filtering of options</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Components</h1>
<h2>NovoAutocompleteElement <code>novo-autocomplete</code></h2>
<p>The <code>novo-autocomplete</code> component automatically links its list of values to the the novoInput of the <code>novo-field</code>. Subscribe to value changes inorder to update your options list.</p>
<h3>Properties</h3>
<p><props-table component="NovoAutocompleteElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class AutocompleteDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'autocomplete-examples-page',
  template: `<h2>Autocomplete</h2>
<p>tbw...</p>
<p><code-example example="autocomplete-usage"></code-example></p>
<h2>Autocomplete with Chips</h2>
<p>tbw...</p>
<p><code-example example="autocomplete-with-chips"></code-example></p>
<h2>Autocomplete with Stacked Chips</h2>
<p>tbw...</p>
<p><code-example example="autocomplete-stacked-chips"></code-example></p>
<h2>Autocomplete Textarea</h2>
<p>tbw...</p>
<p><code-example example="autocomplete-textarea"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class AutocompleteExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'avatar-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Avatars are images used to represent users and organizations. They typically are squares with rounded edges.</p>
<p>An avatar acts as a proxy for a user or entity (such as a company) in a product. They're often combined with status or presence indicators to give more context. Users generally upload their own image, otherwise, a default image is displayed</p>
</div>
<img src="assets/images/AvatarOverview.png"/>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>circular avatars to quickly identify people (users, contact)</li>
<li>square avatars to help identify other entities like companies, jobs</li>
</ul>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Avatar Menu</strong></div>
<div class="p">Avatars are a great place to attach a menu with options that you can perform against that user.  This is a common web paradigm that the user will understand intuitively.</div>
</blockquote>
<p><img src="assets/images/AvatarMenu.png" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Avatar Stack</strong></div>
<div class="p">Avatars are a great place to attach a menu with options that you can perform against that user.  This is a common web paradigm that the user will understand intuitively.</div>
</blockquote>
<p><img src="assets/images/AvatarStack.gif" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>ARIA Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class AvatarDesignPage {
  public params: any = {};
}


@Component({
  selector: 'avatar-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/avatar">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoAvatarModule &#125; form 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-avatar</span> [<span class="hljs-attr">source</span>]=<span class="hljs-string">&quot;&#123;name: &#x27;Brian Kimball&#x27;&#125;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-avatar</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><em>added in this version</em></p>
<h1>Components</h1>
<h2>NovoAvatarElement <code>novo-avatar</code></h2>
<p>All tabs must be incapsulated in a <code>novo-nav</code> container. The nav will control the context and active tab.</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">theme</td>
<td style="text-align:left"><em>String</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">Color theme used.</td>
</tr>
<tr>
<td style="text-align:left">color</td>
<td style="text-align:left"><em>String</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">Color theme used.</td>
</tr>
<tr>
<td style="text-align:left">label</td>
<td style="text-align:left"><em>String</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">refs to the <code>novo-tab-outlet</code> these navigation controls.</td>
</tr>
<tr>
<td style="text-align:left">source</td>
<td style="text-align:left"><em>Object</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">Object containing props used to generate avatar. <code>name</code>, <code>firstName</code>, or <code>profileImage</code></td>
</tr>
<tr>
<td style="text-align:left">size</td>
<td style="text-align:left"><em>Size</em></td>
<td style="text-align:left">'medium'</td>
<td style="text-align:left">Determines the height and widht of the avatar. (<code>small</code>, <code>medium</code> or <code>large</code>)</td>
</tr>
</tbody>
</table>
<h2>NovoAvatarStackElement <code>novo-avatar-stack</code></h2>
<p>An avatar stack displays a number of avatars grouped together in a row or list.</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">total</td>
<td style="text-align:left"><em>Number</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">Used to calculate <code>+N</code> icon based on ViewChildren added</td>
</tr>
</tbody>
</table>
`,
  host: { class: 'markdown-page' }
})
export class AvatarDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'avatar-examples-page',
  template: `<h2>Types</h2>
<h3>Avatar</h3>
<p>Avatars are images used to represent users and organizations. They typically are squares with rounded edges.</p>
<p><code-example example="avatar-usage"></code-example></p>
<h3>Avatar Stack</h3>
<p>AvatarStack is used to display more than one Avatar in an inline stack.</p>
<p><code-example example="avatar-stack-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class AvatarExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'breadcrumb-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.</p>
</div>
<img src="assets/images/BreadcrumbsOverview.png"/>
</novo-grid>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When the system has more than two layers in a hierarchy.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When you need to inform the user of where they are.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When the user may need to navigate back to a higher level.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When the application has multi-layer architecture.</novo-text></li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Ensure the content opened is highly correlated to the context that opened it. When showing a preview of a related content that can opened for various contexts, present the user with the data related to the context that opened it, rather than the same view.</li>
<li>When using an aside to present the user with a form, ensure that it is beneficial to have the current view still available to the user, if not consider opening a new page.</li>
</ul>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>This component is intended to follow the <a href="https://www.w3.org/TR/wai-aria-practices/#breadcrumb">Aria Breadcrumb Design Pattern</a>.</p>
`,
  host: { class: 'markdown-page' }
})
export class BreadcrumbDesignPage {
  public params: any = {};
}


@Component({
  selector: 'breadcrumb-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/breadcrumbs">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoBreadcrumbModule &#125; form 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-breadcrumb</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-breadcrumb-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">&quot;/components/get-start&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-breadcrumb-item</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-breadcrumb-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Components<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-breadcrumb-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-breadcrumb</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><em>new in v5</em></p>
<h1>Components</h1>
<h2>NovoBreadcrumbElement <code>novo-breadcrumb</code></h2>
<p>Container Element for the card. Can optionally contain <code>novo-card-header</code>, <code>novo-card-footer</code>, and <code>novo-card-content</code> to provide a better layout to the card when displaying more structured data.</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">source</td>
<td style="text-align:left"><em>SourceConfig[]</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">used for dynamic breadcrumbs in a more imperative approach.</td>
</tr>
<tr>
<td style="text-align:left">separatorIcon</td>
<td style="text-align:left"><em>TemplateRef</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">defaults to template with slash character.</td>
</tr>
</tbody>
</table>
<h2>NovoBreadcrumbItemElement <code>novo-breadcrumb-item</code></h2>
<p>Represents an section in the breadcrumb list, can be an anchor tag to link to previous content, static text, or a dropdown...</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">showMenu</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">false</td>
<td style="text-align:left">TBW</td>
</tr>
<tr>
<td style="text-align:left">customMenuTemplate</td>
<td style="text-align:left"><em>TemplateRef</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">TBW</td>
</tr>
<tr>
<td style="text-align:left">menuList</td>
<td style="text-align:left"><em>MenuConfig[]</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">TBW</td>
</tr>
<tr>
<td style="text-align:left">isSearch</td>
<td style="text-align:left"><em>boolean</em></td>
<td style="text-align:left">false</td>
<td style="text-align:left">TBW</td>
</tr>
</tbody>
</table>
`,
  host: { class: 'markdown-page' }
})
export class BreadcrumbDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'breadcrumb-examples-page',
  template: `<h2>Static</h2>
<p>Breadcrumbs can be use statical with the <code>novo-breadcrumb</code> and <code>novo-breadcrumb-item</code> elements. You can also set the breadcrumb item to have a menu too.</p>
<p><code-example example="breadcrumb-usage"></code-example></p>
<h2>Dynamic</h2>
<p>If you need to build the breadcrumbs dynamically based on data within the app you can use the <code>source</code> attribute pass the values of the breadcrumb.</p>
<p><code-example example="breadcrumb-source-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class BreadcrumbExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'button-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>A button clearly indicates a point of action for the user. Bullhorn buttons come in a variety of themes, custom tailored to fit your use-case.</p>
<p>Bullhorn button themes were hand crafted to make your life easier. Most buttons used in the Bullhorn platform should utilize a <code>theme</code> attribute. Theme attributes provide access to every variation of Bullhorn UX approved buttons. Depending on the theme, some buttons may also utilize <code>icon</code>, <code>side</code>, and <code>inverse</code> attributes. Button are divided by function into four main categories: Primary, Secondary, Neutralizing, Subtractive. There are also three other button types that are independent of function: Dialogue, Icon, and Header.</p>
</div>
<img src="assets/images/ButtonOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Affording interaction to key behaviors and features.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Confirming or submitting information entered into a form.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Cancelling an action.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Resetting a form or dataset.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Closing a container or section.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Opening a popover.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Moving forward or backward through a stepper workflow.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Creating an object within a group.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Applying a non-critical action to a dataset.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Displaying a collection of links to sections. Use links instead.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Linking to an external site. Use links instead.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ButtonAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
The button container is displayed differently based on the type of button.</p>
</li>
<li>
<p><strong>Icon (Optional)</strong><br>
Icons can be display to the left or right of the text.</p>
</li>
<li>
<p><strong>Text (Optional)</strong><br>
Use text that conveys the action performed when clicked, this should be a Verb.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Types</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<ol>
<li>
<p><strong>Basic</strong><br>
The basic button is used when a light weight action is needed or when placed within a component that would make the button to noisy. ie.  When adding an actions button to a table row.</p>
</li>
<li>
<p><strong>Primary</strong><br>
Should be used to draw attention to the user that this is the primary call to action for the current view. eg. Save on an Edit Page.</p>
</li>
<li>
<p><strong>Secondary</strong><br>
This is used to convey Alternative actions that can be taken within a view that are important to the workflow.</p>
</li>
<li>
<p><strong>Standard</strong><br>
Used to provide a equally weighted option that is optional when displayed next to a primary or secondary button.  eg. Close button for a Modal.</p>
</li>
</ol>
</div>
<img src="assets/images/ButtonTypes.png" width="450">
</novo-grid>
<h2>Behaviors</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Icons</strong></div>
<div class="p">Buttons can be configured with an Icon (<code>icon=&quot;check&quot;</code>) with <code>side=&quot;left&quot;</code> or <code>side=&quot;right&quot;</code>(default). The context should usually determine the placement of the icon. When the button text is a predicate, eg. <strong>Add Candidate</strong>, the <code>bhi-add</code> icon should be a prefix. When the button text is imperative, eg . <strong>Save</strong>, then icon should be display as a suffix. Exception may occur.</div>
</blockquote>
<p><img src="assets/images/ButtonWithIcon.png" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Only Icon</strong></div>
<div class="p">When spacing is limited and an actions meaning can be conveyed with just an icon, it is acceptable to use the <code>icon</code> or <code>fab</code> themed buttons.  In general icon buttons are used to help provide actions withing complex components, eg. next and previous in the <code>novo-calendar</code> or <code>novo-pagination</code> components.  The <code>novo-action</code> button is a wrapper for icon buttons to show in the <code>novo-header</code> action area.</div>
</blockquote>
<p><img src="assets/images/ButtonIcons.png" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>aria-label</code> or <code>aria-labelledby</code> attribute when using icon buttons. When the button is disabled <code>aria-disabled=&quot;true&quot;</code> and <code>tabindex=&quot;-1&quot;</code> should be set automatically by the component.</p>
`,
  host: { class: 'markdown-page' }
})
export class ButtonDesignPage {
  public params: any = {};
}


@Component({
  selector: 'button-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/button">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoButtonModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Depreacted <code>theme</code> property in favor of <code>type</code></li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p><em>better sizing</em></p>
<h1>Components</h1>
<h2>NovoButtonElement <code>novo-button</code></h2>
<p>All tabs must be incapsulated in a <code>novo-nav</code> container. The nav will control the context and active tab.</p>
<h3>Properties</h3>
<p><props-table component="NovoButtonElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class ButtonDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'button-examples-page',
  template: `<h2>Themes</h2>
<p>Bullhorn button themes were hand crafted to make your life easier. Most buttons used in the Bullhorn platform should utilize a <code>theme</code> attribute. Theme attributes provide access to every variation of Bullhorn UX approved buttons. Depending on the theme, some buttons may also utilize <code>icon</code>, <code>side</code>, and <code>inverse</code> attributes. Button are divided by function into four main categories: Primary, Secondary, Neutralizing, Subtractive. There are also three other button types that are independent of function: Dialogue, Icon, and Header.</p>
<h2>Colors</h2>
<p>Acceptable colors include <code>Primary</code>, <code>Success</code>, <code>Warning</code>, <code>Negative</code>, and <strong>all analytics colors</strong> which can be found in the color section of the style guide.</p>
<p><code-example example="button-overview"></code-example></p>
<h2>Primary</h2>
<p>Primary buttons are used to as primary calls-to-action. They should <strong>always</strong> get an <code>icon</code> attribute. Primary buttons with a &quot;success&quot; color <code>color=&quot;success&quot;</code> are used for saving and will almost always contain a &quot;check&quot; icon. Negative color primary buttons <code>color=&quot;negative&quot;</code> are used to delete, clear, or otherwise remove an extant element. Primary buttons should never have a <code>side</code> attribute.</p>
<!-- Example: ButtonOverviewExample -->
<p><code-example example="button-primary"></code-example></p>
<h2>Secondary</h2>
<p>Secondary buttons are used as an alternative Primary button or when there is a second major action on a page. They usually appears only in Overview and Slideout headers. This theme with an <code>inverse</code> attribute is often used as the action button in dropdown menus.</p>
<p><code-example example="button-secondary"></code-example></p>
<p>Secondary buttons can also get an <code>inverse</code> attribute for use on a colored background.</p>
<p><code-example example="button-inverse"></code-example></p>
<h2>Dialogue</h2>
<p>Similar to icon buttons, dialogue buttons require less visual dominance but often need additional helper text. Dialogue buttons <em>may</em> contain <strong>any</strong> icon and a <code>side</code> may be specified eg:<code>side=&quot;right&quot;</code> to place the icon on the right or left side of the text. Dialogue buttons may also use an <code>inverse</code> attribute to change its text color to white.</p>
<p><code-example example="button-dialogue"></code-example></p>
<h2>Standard</h2>
<p>Standard buttons are the most generic button style. Standard buttons by default are styled identically to standard buttons with a <code>color=&quot;light&quot;</code> attribute. Typically, a standard button is used to cancel an action, or to cease any additional progress. Although standard buttons <em>can</em> get an <code>icon</code> attribute, they should almost never be used with an icon. If your proposed design calls for a standard button with an icon, consider using a different button theme, like dialogue.</p>
<p><code-example example="button-standard"></code-example></p>
<h2>Icon</h2>
<p>The <code>icon</code> theme is used to create <strong>icon-only</strong> buttons, which contain no text. They can occupy any of the four main functions but require far less visual dominance than normal buttons. Icon buttons <strong>always</strong> have an <code>icon</code> attribute and can use <strong>any</strong> icon. Icon buttons may also use an <code>inverse</code> attribute to change its icon color to white.</p>
<p><code-example example="button-icon"></code-example></p>
<h2>Fab</h2>
<p>Fab buttons are used to as primary calls-to-action. They should <strong>always</strong> get an <code>icon</code> attribute. Fab buttons with a &quot;success&quot; color <code>color=&quot;success&quot;</code> are used for saving and will almost always contain a &quot;check&quot; icon. Negative color primary buttons <code>color=&quot;negative&quot;</code> are used to delete, clear, or otherwise remove an extant element. Fab buttons should never have a <code>side</code> attribute.</p>
<p><code-example example="button-fab"></code-example></p>
<h2>Dynamic</h2>
<p>Button parameters can be dynamically set and change at runtime. The styles should change and be applied when the values change.</p>
<p><code-example example="button-dynamic"></code-example></p>
<h2>Loading</h2>
<p>Buttons can display a loading state when given the &quot;loading&quot; parameter. When loading is true the button will be disabled and get a loading spinner.</p>
<p><code-example example="button-loading"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ButtonExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'calendar-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Calendars allow users to easily select dates. It comes in a handful of varieties based on the data the user is trying to enter, ie. A Single Date, Date Ranges, or Multiple Dates.</p>
<p>The <code>novo-calendar</code> component is used to select a dates in a reactive way to be used in the presentation or filtering of data within a view container. The <code>novo-calendar</code> component is not a FormControl itself but is use in the <code>novo-date-picker</code> component when selecting dates.</p>
</div>
<p><img src="assets/images/CalendarOverview.png" alt="placeholder"></p>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When the user needs to select a date to control or filter data on the page.</novo-text></p>
<p>The <code>novo-calendar</code> component by itself is just a way to store a date or date range value in the view model.  These date can be used to manipulate the UI.</p>
</li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> When you are capturing dates as part of a Form.</novo-text></p>
<p>If you need to store the date(s) in a Form with validation, you should use the <code>date-picker</code> component, which wraps the calendar in a FormControl.</p>
</li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/CalendarAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Month/Year Indicator</strong><br>
These indicators are clickable and will diplay a Month or Year selection view.</p>
</li>
<li>
<p><strong>Next/Prev Buttons</strong><br>
These buttons will control the current viewable month, allowing the user to move the view forward and backwards a month.</p>
</li>
<li>
<p><strong>Current Date</strong><br>
The current date should always have an indicator to help the user</p>
</li>
<li>
<p><strong>Selected Date</strong><br>
Selected Date(s) will be highlighted as such.  When a range of dates are selected the selection will appear continous.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Card dimensions are based on its content and the container in which it resides.</li>
<li>Apply custom heights and width to meet product requirements.</li>
<li>Avoid the appearance of nested cards, and therefore don’t use cards within a modal or another card.</li>
<li>When creating a group of cards, use consistently sized content within a grid or flex layout.</li>
</ul>
<h2>Behaviors</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="assets/images/CalendarMultiMonth.png" alt="placeholder"></div>
<div class="p"><strong>Multiple Months</strong></div>
<div class="p">Sometimes dates and ranges are more valueable to see over the multiple months,
for this reason the component allows you to show consecutive months in the view.
The view is responsive and will show the months horizontally first, to have a vertical
list just set a fixed width on the container.</div>
</blockquote>
<blockquote>
<div class="p"><img src="assets/images/CalendarRange.png" alt="placeholder"></div>
<div class="p"><strong>Range Selection</strong></div>
<div class="p">When selection a range of dates...</div>
</blockquote>
<blockquote>
<div class="p"><img src="assets/images/CalendarWeek.png" alt="placeholder"></div>
<div class="p"><strong>Week Selection</strong></div>
<div class="p">Sometimes selecting the by a fixed range of dates, like the week is necessary to ensure the right data is selected. For example, when selecting a pay period or work week.  Using this selection mode with the appropriate <code>weekStart</code> property to set which day the week starts on.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<ul>
<li>If using an illustrative image for the supplement content, it’s generally safe to use an empty or null alternative text for example alt=&quot;&quot;</li>
</ul>
`,
  host: { class: 'markdown-page' }
})
export class CalendarDesignPage {
  public params: any = {};
}


@Component({
  selector: 'calendar-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/calendar">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoCalendarModule &#125; form 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<typedef-example>
  <typedef-content>
    <novo-calendar
    [mode]="mode.value"
    [numberOfMonths]="months.value"
    ></novo-calendar>
  </typedef-content>
  <typedef-specs>
    <novo-label>Selection mode</novo-label>
    <novo-radio-group #mode appearance="vertical" value="single">
      <novo-radio name="mode" value="single">single</novo-radio>
      <novo-radio name="mode" value="multiple">multiple</novo-radio>
      <novo-radio name="mode" value="range">range</novo-radio>
      <novo-radio name="mode" value="week">week</novo-radio>
    </novo-radio-group>
    <novo-label># of Months</novo-label>
    <novo-radio-group #months appearance="vertical" value="1">
      <novo-radio name="months" value="1">1</novo-radio>
      <novo-radio name="months" value="2">2</novo-radio>
    </novo-radio-group>
  </typedef-specs>
  <typedef-snippet>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-calendar</span> [<span class="hljs-attr">activeDate</span>]=<span class="hljs-string">&quot;birthday&quot;</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">&quot;single&quot;</span> <span class="hljs-attr">numberOfMonths</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-calendar</span>&gt;</span>
</code></pre>
  </typedef-snippet>
</typedef-example>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p><em>added in this version</em></p>
<h1>Components</h1>
<h2>NovoCalendarElement <code>novo-calendar</code></h2>
<p>All tabs must be incapsulated in a <code>novo-nav</code> container. The nav will control the context and active tab.</p>
<h3>Properties</h3>
<p><props-table component="NovoCalendarElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class CalendarDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'calendar-examples-page',
  template: `<h2>Basic Usage</h2>
<p><code-example example="calendar"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class CalendarExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'components-page',
  template: `<h1>Components</h1>
<p>This is a landing page</p>
`,
  host: { class: 'markdown-page' }
})
export class ComponentsPage {
  public params: any = {};
}


@Component({
  selector: 'data-table-page',
  template: `<h1>Data Table <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/data-table">(source)</a></h1>
<h5>Working with static data</h5>
<h6>Change Dataset</h6>
<h6>Change Pagination Style</h6>
<h6>Toggle Global Search</h6>
<h6>Configure Columns</h6>
<p>Configure Columns</p>
<h6>Configure Columns</h6>
<p>Show Row Details (first table) Hide Row Details (first table)</p>
<h5>Passing an array of rows</h5>
<p><code-example example="data-table-rows"></code-example></p>
<h5>Using the static data service</h5>
<p><code-example example="data-table-service"></code-example></p>
<h5>Working with remote data</h5>
<h5>Using the remote data service</h5>
<p>Data won't actually change, the URL will update with the proper request it will make!</p>
<h6>URL</h6>
<p><code-example example="data-table-remote"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class DataTablePage {
  public params: any = {};
}


@Component({
  selector: 'dropdown-design-page',
  template: `<novo-grid columns="2" align="start" gap="2rem">
<div>
<h3>Why?</h3>
<p>Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>
</div>
<img src="https://via.placeholder.com/350x250"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Affording interaction to key behaviors and features.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Confirming or submitting information entered into a form.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Cancelling an action.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Resetting a form or dataset.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Closing a container or section.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Opening a popover.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Moving forward or backward through a stepper workflow.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Creating an object within a group.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Applying a non-critical action to a dataset.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Displaying a collection of links to sections. Use links instead.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Linking to an external site. Use links instead.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Trigger</strong><br>
A button that may contain an icon, or be labeled with text.</p>
</li>
<li>
<p><strong>Menu</strong><br>
Container for all options and option groups.</p>
</li>
<li>
<p><strong>Option Group (Optional)</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Option</strong><br>
The action items displayed within the list.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>A number of components can be used to give people the ability to select options. See the list of related components below for advice on choosing the right one.</li>
<li>When organizing dropdown menu items, sort the list in a logical order by putting the most selected option at the top, if known. Test and refine over time to re-evaluate if all menu items are needed.</li>
<li>For long lists, group related menu items. If including radio buttons and checkboxes as menu items, try grouping related actions.</li>
<li>Grouped items are separated by a short, uppercase title that describes the options in that sub-category.</li>
</ul>
<h2>How to configure</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Always do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Never do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
</novo-grid>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class DropdownDesignPage {
  public params: any = {};
}


@Component({
  selector: 'dropdown-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/dropdown">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoDropdownModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-dropdown</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">&quot;secondary&quot;</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;collapse&quot;</span>&gt;</span>Actions<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;alert(&#x27;Item 1&#x27;)&quot;</span>&gt;</span>Menu Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;alert(&#x27;Item 2&#x27;)&quot;</span>&gt;</span>Menu Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-dropdown</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>You should no longer use <code>list</code> and <code>item</code> components, these are non-standard components and have been replaced with <code>novo-option</code> as used in the usage above.</li>
</ul>
<h1>Components</h1>
<h2>NovoDropdownElement <code>novo-dropdown</code></h2>
<p>The <code>novo-dropdown</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoDropdownElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class DropdownDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'dropdown-examples-page',
  template: `<h2>Dropdown Menu</h2>
<p>This is a simple dropdown menu.</p>
<p><code-example example="basic-drop-down"></code-example></p>
<h2>Dropdown Position Options</h2>
<p>This is an example of how dropdowns can be positioned. Use the [side] input to specify how the popup positions or re-positions itself on the page using a preferred location and one or more fallback locations:</p>
<p><code-example example="position-drop-down"></code-example></p>
<h2>Lots of data!</h2>
<p>Crazy large dropdown to demonstrate how the smart positioning works.</p>
<p><code-example example="large-drop-down"></code-example></p>
<h2>Scrollable Container Class</h2>
<p>This is an example of using a dropdown within a scrollable container. Simply place the directive cdkScrollable on the ancestor element that does the scrolling.</p>
<p><code-example example="scrollable-drop-down"></code-example></p>
<h2>Custom Class</h2>
<p>You can have custom classes on the dropdown container that opens up by using the &quot;containerClass&quot; property. Use scrollStrategy to close, block or reposition the dropdown when the parent scrolls. The default scrollStrategy is reposition.</p>
<p><code-example example="custom-drop-down"></code-example></p>
<h2>Keep Open</h2>
<p>You can set the &quot;keepOpen&quot; property on the &quot;item&quot; in order to keep it from closing the dropdown automatically.</p>
<p><code-example example="multi-drop-down"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class DropdownExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'field-design-page',
  template: `<novo-grid columns="2" align="start" gap="2rem">
<div>
<h3>Why?</h3>
<p>A Field is a component used to wrap several Angular Material components and apply common Text field styles such as the underline, label and hint messages.</p>
<p>In this document, &quot;form field&quot; refers to the wrapper component <code>&lt;novo-field&gt;</code> and &quot;form field control&quot; refers to the component that the <code>&lt;novo-field&gt;</code> is wrapping (e.g. the input, textarea, select, etc.)</p>
<p><strong>Works with following input types</strong></p>
<ul>
<li>Default input, select, textarea</li>
<li>novo-select</li>
<li>novo-datepicker</li>
</ul>
</div>
<img src="assets/images/FieldOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> A user must enter text data</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Gathering multiple lines of text. Instead, use a text area.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Selecting value from preset list, use a select or radio.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/FieldAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Input Prefix (Optional element)</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Label</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Input Control</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
<li>
<p><strong>Input Suffix (Optional element)</strong><br>
The element/icon displayed after the input. eg. calendar icon for date picker.</p>
</li>
<li>
<p><strong>Helper/Error text (Optional element)</strong><br>
Caption text to display helpful information, warnings, or errors.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Only supply placeholder text where clarification is required, try not to overuse it.</li>
<li>Place labels directly above the input, and align to the left.</li>
</ul>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class FieldDesignPage {
  public params: any = {};
}


@Component({
  selector: 'field-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/field">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoFieldModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Amount<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-right-align&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">novoPrefix</span>&gt;</span>$<span class="hljs-symbol">&amp;nbsp;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">novoSuffix</span>&gt;</span>.00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-hint</span>&gt;</span>Enter some money<span class="hljs-tag">&lt;/<span class="hljs-name">novo-hint</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>You should no longer use <code>list</code> and <code>item</code> components, these are non-standard components and have been replaced with <code>novo-option</code> as used in the usage above.</li>
</ul>
<h1>Components</h1>
<h2>NovoFieldElement <code>novo-field</code></h2>
<p>The <code>novo-field</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoFieldElement"></props-table></p>
<h1>Directive</h1>
<h2>NovoInput <code>[novoInput]</code></h2>
<p>The <code>novoInput</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoInput"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class FieldDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'field-examples-page',
  template: `<h2>Basic Usage</h2>
<p>tbw...</p>
<p><code-example example="field-usage"></code-example></p>
<h2>Anatomy</h2>
<p>Form fields consists of the following parts:</p>
<ul>
<li>Container</li>
<li>Leading icon (Optional element)</li>
<li>Label</li>
<li>Placeholder/Input text</li>
<li>Trailing icon (Optional element)</li>
<li>Helper text/Error text (Optional element)</li>
</ul>
<p>See how they are used below...</p>
<p><code-example example="field-anatomy"></code-example></p>
<h2>Native Controls</h2>
<p>The following input types can be used with novoInput:</p>
<ul>
<li>Text: text, password, email, search, tel, url, number</li>
<li>Date: date, datetime-local, month, week, time</li>
<li>Other: color, range</li>
</ul>
<p><code-example example="field-native"></code-example></p>
<h2>Form Controls</h2>
<p>How to use form fields tied to a form with FormControls and validation</p>
<p><code-example example="form-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class FieldExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'icon-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>If you want to use bullhorn icons, it is easier to use the <code>novo-icon</code> element to style them. You can always style them within the <code>i</code> tag too.</p>
<p><strong>Use When</strong></p>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Additional context for action is required.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Help user easily identify what action does.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Help identify state, ie. error, warning, etc.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Spacing is limited.</novo-text></li>
</ul>
</div>
<img src="https://via.placeholder.com/350x250"/>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>Variations</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Color</strong></div>
<div class="p">Use color to convey additional meaning when displaying icons. Application colors such as <code>success</code> and <code>negative</code> can help express the meaning of the context being used.  Entity colors such as <code>job</code> and <code>candidate</code> can help the user identify context quickly when parsing large amounts of data.</div>
</blockquote>
<blockquote>
<div class="p"><strong>Filled</strong></div>
<div class="p">Icons can have color and optionally you can set the background color to show as well. This creates a visual emphasis on the icon and context it is describing. This style can be used when it is important to draw more attention to an item or when it asthetically makes sense for the icon to have a heavier presence in the UI.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class IconDesignPage {
  public params: any = {};
}


@Component({
  selector: 'icon-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/icon">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoIconModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>bull<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Components</h1>
<h2>NovoIconComponent <code>novo-icon</code></h2>
<p>The <code>novo-icon</code> component is used as a convience wrapper for all the bullhorn icons. This is to enable consistent styling when using the icons in various usecase, ie. inline, headers, buttons, etc...</p>
<h3>Properties</h3>
<p><props-table component="NovoIconComponent"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class IconDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'icon-examples-page',
  template: `<h2>Basic Usage</h2>
<p><code-example example="basic-icons"></code-example></p>
<h2>Themes &amp; Colors</h2>
<p><code-example example="themed-icons"></code-example></p>
<h2>Raised Icons</h2>
<p><code-example example="raised-icons"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class IconExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'loading-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>
</div>
<img src="https://via.placeholder.com/350x250"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Loading content.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Processing an long running action.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> When not loading data.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Input Prefix (Optional element)</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Label</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Input Control</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
<li>
<p><strong>Input Suffix (Optional element)</strong><br>
The element/icon displayed after the input. eg. calendar icon for date picker.</p>
</li>
<li>
<p><strong>Helper/Error text (Optional element)</strong><br>
Caption text to display helpful information, warnings, or errors.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>How to configure</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Always do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Never do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
</novo-grid>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class LoadingDesignPage {
  public params: any = {};
}


@Component({
  selector: 'loading-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoLoadingModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-loading</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-loading</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Components</h1>
<h2>NovoLoadingElement <code>novo-loading</code></h2>
<p>The <code>novo-loading</code> component displays the loading dots in a linear line. This commonly used for loading the page, content within a modal, or when refreshing data within a table.</p>
<h3>Properties</h3>
<p><props-table component="NovoLoadingElement"></props-table></p>
<h2>NovoSpinnerElement <code>novo-spinner</code></h2>
<p>The <code>novo-spinner</code> component displays the circular loading visual, usually used within the button to indicate the action is performing but not complete yet.</p>
<h3>Properties</h3>
<p><props-table component="NovoSpinnerElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class LoadingDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'loading-examples-page',
  template: `<h2>Line</h2>
<p>The Dot Line animation is indeterminate.</p>
<p><code-example example="loading-line"></code-example></p>
<h2>Spinner</h2>
<p>The Dot Spinner animation is used as an alternate to the loading line animation.</p>
<p><code-example example="loading-circle"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class LoadingExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'menu-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Menu allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>
<p>Menus are contextual and all for actions to be performed based upon the context of the trigger or selection. Menus are great for consolidating many actions available to the user and can be used in a variety of different ways. Menus can be triggered from any element but usually limited to links, button, and icons.</p>
</div>
<img src="assets/images/MenuOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Displaying multiple actions to perform on an item or selection</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Processing an long running action.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> To select a value, use a select</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Top Level Page Actions, use a Dropdown.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/MenuAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Option</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Divider</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>SubMenu Indicator</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Organize actions in groups divided by rules. This helps users remember command locations, or find less used commands based on proximity to others. One should also group sets of mutually exclusive or multiple selectable options.</li>
<li>Use icons sparingly, for high value commands, and don’t mix icons with selection checks, as it makes parsing commands difficult.</li>
<li>Avoid submenus of submenus as they can be difficult to invoke or remember.</li>
</ul>
<h2>Behaviors</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="assets/images/MenuScrollable.png" alt="placeholder"></div>
<div class="p"><strong>Scrolling</strong></div>
<div class="p">If not all of the options can be presented within the view, then the menu
should be scrollable.  To prevent confusion with the user that the only
options available are those viewable, a persistent scrollbar should be
shown.</div>
</blockquote>
<blockquote>
<div class="p"><img src="assets/images/MenuPosition.png" alt="placeholder"></div>
<div class="p"><strong>Position</strong></div>
<div class="p">The menu should be placed differently based on the context that triggers
it.  For DropDown Menu the Menu should be placed below the button, aligned
right or left based on the alignment of the button within its layout.
ie. if the button is positioned at the end of a header (flex-end) then the
right side of the menu should align with the right side of the button.</div>
<div class="p">If there is not enough room below an button it is acceptable for the menu
to drop up instead.</div>
</blockquote>
<blockquote>
<div class="p"><img src="assets/images/MenuContext.png" alt="placeholder"></div>
<div class="p"><strong>Context Menu</strong></div>
<div class="p">A button is not required to trigger a menu. Any element can be set to trigger a menu
on click or right-click.  Context Menus can provide addition data to be used when
displaying the menu. eg. Menu items can be hidden/shown based on the values within
that context and context can be passed to the click actions.</div>
</blockquote>
<blockquote>
<div class="p"><img src="assets/images/MenuOverview.png" alt="placeholder"></div>
<div class="p"><strong>Cascading Menu</strong></div>
<div class="p"><em>Beta</em>  When the large variety of options are available to the user, categorize these
options to create multiple levels of hierarchy.</div>
<div class="p">SubMenus are just menus triggered of a menu-item of parent. SubMenus shoudld appear to
the right or left of parent list items, depending on available space.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class MenuDesignPage {
  public params: any = {};
}


@Component({
  selector: 'menu-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoMenuModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Define a menu with a set of menuItems --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-menu</span> #<span class="hljs-attr">menu</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> *<span class="hljs-attr">menuItem</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;handleViewDetails($event)&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>preview<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>View Details<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-divider</span> *<span class="hljs-attr">menuItem</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-divider</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;handleDelete($event)&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>delete-o<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Delete Record<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-menu</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Add menu attribute to link the menu to an element --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span> [<span class="hljs-attr">menu</span>]=<span class="hljs-string">&quot;menu&quot;</span>&gt;</span>Actions<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Consolidate with <code>novo-dropdown</code></li>
</ul>
<h1>Components</h1>
<h2>NovoLoadingElement <code>novo-menu</code></h2>
<p>The <code>novo-menu</code> component is a hidden wrapper that holds the templates for a menu. When a menu is triggered by the element with the matching <code>[menu]</code> attribute, a new instance of the menuItems will be created and the context will be passed to</p>
<h3>Properties</h3>
<p><props-table component="MenuComponent"></props-table></p>
<h2>MenuDirective <code>[menu]</code></h2>
<p>This will define an element as a trigger for the menu. Use the <code>#</code> notation to make a reference to the <code>novo-menu</code> container, then pass the reference as the value of the attribute to link them together. A menu can be shared between multiple triggers, use the <code>menuContext</code> attribute to perform actions based on that context. The context can be reference in the structural directive <code>menuItem</code> as the implicit value, ie <code>*menuItem=&quot;let item&quot;</code>, <code>item</code> will be equal to <code>menuContext</code>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-menu</span> #<span class="hljs-attr">menu</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> *<span class="hljs-attr">menuItem</span>=<span class="hljs-string">&quot;let item&quot;</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;alert(item)&quot;</span>&gt;</span>Speak<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-menu</span>&gt;</span>
<span class="hljs-comment">&lt;!-- The speak action will display moooo! --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span> [<span class="hljs-attr">menu</span>]=<span class="hljs-string">&quot;menu&quot;</span> <span class="hljs-attr">menuContext</span>=<span class="hljs-string">&quot;mooooo!&quot;</span>&gt;</span>Cow<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
<span class="hljs-comment">&lt;!-- The speak action will display bark! --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span> [<span class="hljs-attr">menu</span>]=<span class="hljs-string">&quot;menu&quot;</span> <span class="hljs-attr">menuContext</span>=<span class="hljs-string">&quot;bark!&quot;</span>&gt;</span>Dog<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
</code></pre>
<h3>Properties</h3>
<p><props-table component="MenuDirective"></props-table></p>
<h2>MenuItemDirective <code>*menuItem</code></h2>
<p>A structural directive to be used with <code>novo-option</code> to create menu items. The <code>menuContext</code> set on the trigger will be passed to the implicit value, ie <code>*menuItem=&quot;let item&quot;</code>, <code>item</code> will be equal to <code>menuContext</code>.</p>
<h3>Properties</h3>
<p><props-table component="MenuItemDirective"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class MenuDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'menu-examples-page',
  template: `<h2>Basic Menu</h2>
<p>This is a simple menu.</p>
<p><code-example example="basic-menu"></code-example></p>
<h2>Nested Menu</h2>
<p>This is an example of how you can have sub-menus for each menu item.</p>
<p><code-example example="nested-menu"></code-example></p>
<h2>Menu Context</h2>
<p>TBW of an example when you can define a context to pass to the context menu to control visibility or to use on the callback action.</p>
<p><code-example example="menu-context"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class MenuExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'modal-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>A modal is a pop-up dialog that appears on top of the main content, requiring the user to focus only on the content that the modal presents.</p>
<p>Modals are used to inform the user of something critical, force a decision, or extend a series of tasks. There are two categories of modals in the system: confirmation and workflow.</p>
</div>
<img src="https://via.placeholder.com/350x250"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Do use to confirm irreversible actions:</novo-text></p>
<p>Use a notification modal to ask the user to confirm when performing an irreversible action such as deleting a record, navigating away from something unsaved, or converting a file.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Do use to confirm actions that will affect other records:</novo-text></p>
<p>Use notification modals to make the user aware that their action will affect other records. The modal should ask them to confirm this action and explicitly say what the changes to other records will be. (find an example for this - deleting shifts could work, sending out bulk emails)</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Do use for a task related to the main content:</novo-text></p>
<p>Workflow modals should always be related to the main content of the screen they are on top of. For example, when assigning candidates to shifts in the Scheduler.</p>
</li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use to confirm an action that has already happened:</novo-text></p>
<p>Don’t use a notification modal to confirm an action that has already been completed. Conveying information that does not require action is not critical enough to fully obscure the main content of the page. Use a <a href="/components/toast">toast</a> instead.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use for a task unrelated to the main content:</novo-text></p>
<p>Don’t obscure the main content of the screen for a task that is not directly related to the subject matter of that screen. Open a new page or use a <a href="/components/aside">slideout</a> instead.</p>
</li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Description and purpose of this element</p>
</li>
<li>
<p><strong>Header</strong><br>
Description and purpose of this element</p>
</li>
<li>
<p><strong>Icon (Optional)</strong><br>
Description and purpose of this element</p>
</li>
<li>
<p><strong>Title (Optional)</strong><br>
Description and purpose of this element</p>
</li>
<li>
<p><strong>Content</strong><br>
Description and purpose of this element</p>
</li>
<li>
<p><strong>Footer</strong><br>
Description and purpose of this element</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Do Use Multiple Columns to make content digestible:</novo-text></p>
<p>If a Modal contains a lot of data, multiple columns help to make sure the user doesn’t miss any aspects of the task at hand. (Example - Make Offer modal from shifts, conflict management from shifts)</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t Use a lot of scrolling in a narrow space:</novo-text></p>
<p>Too much scrolling makes content hard to digest, and can cause the user to miss important information or steps in a task.</p>
<p>Consider using a full page or a slideout if the modal can’t display the full content without significant scrolling.</p>
</li>
</ul>
<h3>Footer Usage</h3>
<ul>
<li>The footer will usually be comprised of Primary button and a ‘Standard’ button</li>
<li>If there’s more than one action available from the modal, use a Secondary button for the less important of those actions.</li>
<li>If the primary action off of the modal is DESTRUCTIVE, use a red Primary button. RED ($grapefruit, $negative)</li>
</ul>
<h2>Color</h2>
<blockquote class="two-columns">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Do use color to relate modals in a multi-step workflow:</novo-text></li>
</ul>
<div class="p">Carry over the Entity color from the main content of the screen if the task in the modal is directly related to that Entity. (Ex: adding a shift)</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use an Entity Color for something unrelated:</novo-text></li>
</ul>
<div class="p">Don’t use an Entity color in the header of a modal if the task is not directly related to that Entity. Instead, make reference to the entity elsewhere in the modal if necessary.</div>
</blockquote>
</blockquote>
<h2>Accessibility</h2>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Do use multiple avenues to convey meaning</novo-text></p>
<p>Using color, iconography, and text together to convey a warning makes it clearer for people to understand. (show delete modal that is right)</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t rely on just color to convey meaning</novo-text></p>
<p>Using color alone to indicate a destructive action may not be clear to everyone. (show a modal with red yes button but no ‘delete’ in the text or trashcan)</p>
</li>
</ul>
<h3>Keyboard Behaviors</h3>
<p>When a dialog opens, focus moves to an element inside the dialog. See notes below regarding initial focus placement.</p>
<ul>
<li>Tab:
<ul>
<li>Moves focus to the next tabbable element inside the dialog.</li>
<li>If focus is on the last tabbable element inside the dialog, moves focus to the first tabbable element inside the dialog.</li>
</ul>
</li>
<li>Shift + Tab:
<ul>
<li>Moves focus to the previous tabbable element inside the dialog.</li>
<li>If focus is on the first tabbable element inside the dialog, moves focus to the last tabbable element inside the dialog.</li>
</ul>
</li>
<li>Escape: Closes the dialog.</li>
</ul>
<h3>Roles, States, and Properties</h3>
<p>The element that contains all elements of the dialog, including the alert message and any dialog buttons, has role <code>alertdialog</code>.</p>
<ul>
<li>The element with role alertdialog has either:
<ul>
<li>A value for aria-labelledby that refers to the element containing the title of the dialog if the dialog has a visible label.</li>
<li>A value for aria-label if the dialog does not have a visible label.</li>
</ul>
</li>
<li>The element with role alertdialog has a value set for aria-describedby that refers to the element containing the alert message.</li>
</ul>
<h2>Behaviors</h2>
<p><strong>Workflow modals</strong> should be triggered either from a button or link on the main content of the screen to initiate a workflow (add shift, add certification)</p>
<p><strong>Confirmation Modals</strong> should be triggered immediately as the action they are confirming is triggered. (example: after ‘delete record’ is clicked from action dropdown)</p>
<h3>Expansion</h3>
<p>If the content in the modal gets bigger, the modal should expand before adding scrolling.</p>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
`,
  host: { class: 'markdown-page' }
})
export class ModalDesignPage {
  public params: any = {};
}


@Component({
  selector: 'modal-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/modal">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoModal &#125; form 'novo-elements/modal';</code></li>
<li><strong>service:</strong> <code>import &#123; NovoModalService &#125; form 'novo-elements/modal';</code></li>
</ul>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Remove <code>NovoModalParams</code> support in v6.0.0</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>
<p><code>NovoModalParams</code> should no longer be used, instead use <code>NovoModalRef.params</code>. This is because <code>NovoModalRef</code> accepts a generic for the params property.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">MyParams</span> &#123;
  <span class="hljs-attr">isDefault</span>: <span class="hljs-built_in">boolean</span>;
&#125;
...
<span class="hljs-title function_">constructor</span>(<span class="hljs-params">ref:NovoModalRef&lt;MyParams&gt;</span>) &#123;
  <span class="hljs-keyword">if</span>(ref.<span class="hljs-property">params</span>.<span class="hljs-property">isDefault</span>) &#123;
    <span class="hljs-comment">/* ^ Will not need to by type cast */</span>
  &#125;
&#125;
</code></pre>
</li>
</ul>
<h2>Properties</h2>
<p><em>No Properties</em></p>
<h1>Services</h1>
<h2>NovoModalService</h2>
<p>Modals should be invoked via <code>NovoModalService</code> and therefore all properties should be private or internal. Any values that need to be passed to the your <code>Modal</code> instance should be passed by the service and available in your modal.</p>
<pre><code class="language-typescript"><span class="hljs-meta">@Component</span>(&#123;...&#125;)
<span class="hljs-keyword">class</span> <span class="hljs-title class_">RandomComponent</span> &#123;
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> modal:NovoModalService</span>) &#123;&#125;
  <span class="hljs-title function_">handleAction</span>(<span class="hljs-params"></span>) &#123;
    <span class="hljs-keyword">const</span> ref = <span class="hljs-variable language_">this</span>.<span class="hljs-property">modal</span>.<span class="hljs-title function_">open</span>(<span class="hljs-title class_">ConfirmDeleteModal</span>, &#123; <span class="hljs-attr">record</span>: <span class="hljs-number">123</span> &#125;);
    <span class="hljs-comment">/* you can listen to the close event */</span>
    ref.<span class="hljs-property">onClosed</span>.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> &#123;
      <span class="hljs-comment">/* result is the argument sent via the ref */</span>
      <span class="hljs-keyword">if</span> (res === <span class="hljs-string">&#x27;success&#x27;</span>) &#123;
        <span class="hljs-comment">/* perfom some action */</span>
      &#125;
    &#125;);
    <span class="hljs-comment">/* close the modal from the parent */</span>
    ref.<span class="hljs-title function_">close</span>(<span class="hljs-string">&#x27;success&#x27;</span>)
  &#125;
&#125;
</code></pre>
<h3>Methods</h3>
<h4><strong>open(component, params)</strong></h4>
<p>Used to open all modals via the service. Use <code>params</code> to pass values to you component.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">component</td>
<td style="text-align:left"><em>Class</em><br>The angular component which represents the Modal to be opened.</td>
</tr>
<tr>
<td style="text-align:left">params</td>
<td style="text-align:left"><em>Object</em><br><strong>Optional</strong> arguments that will be injected into <code>NovoModalRef.params</code></td>
</tr>
</tbody>
</table>
<p><em>Note:</em> All modal components should be declared as <code>entryComponents</code> in the module.</p>
<h2>NovoModalRef&lt;T&gt;</h2>
<p><code>NovoModalRef</code> should be injected into your modal component and all pass params can be accessed in the <code>params</code> property.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DeleteModalParams</span> &#123;
  <span class="hljs-attr">record</span>: <span class="hljs-built_in">number</span>;
&#125;
<span class="hljs-meta">@Component</span>(&#123;&#125;)
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ConfirmDeleteModal</span> &#123;
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">ref:NovoModalRef&lt;DeleteModalParams&gt;</span>) &#123;
    <span class="hljs-comment">/**
     * All passed values are available
     * via ref.params
     **/</span>
  &#125;

  <span class="hljs-title function_">handleClose</span>(<span class="hljs-params"></span>) &#123;
    <span class="hljs-comment">/* To close the modal use the close method */</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ref</span>.<span class="hljs-title function_">close</span>(<span class="hljs-comment">/* Return a value */</span>)
  &#125;

&#125;
</code></pre>
<h3>Methods</h3>
<h4><strong>close(response)</strong></h4>
<p>Will close the modal will emit events to both the <code>beforeClose</code> and <code>afterClosed</code> observables, as well as the .</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">response</td>
<td style="text-align:left"><em>any</em><br>Any value you wish to return to calling components, will be resovled in the <code>onClosed</code> promise.</td>
</tr>
</tbody>
</table>
`,
  host: { class: 'markdown-page' }
})
export class ModalDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'modal-examples-page',
  template: `<h2>Notification Modals</h2>
<h3>Success</h3>
<p>This modal uses only a primary action button. It is a confirmation that an action has been completed when the result is not immediately apparent. A workflow modal often transitions into a success modal.</p>
<p><code-example example="success-modal"></code-example></p>
<h3>Warning</h3>
<p>Warning modals ask for additional confirmation to complete an action because the action is either irreversible or there is an exception. The first line should always clarify the action or eventual result.</p>
<p><code-example example="warning-modal"></code-example></p>
<h3>Error</h3>
<p>Error modals indicate that an attempted action has failed. The first line should apologize and state the what happened. The second line should quickly attempt to explain to the user why this has happened, and instruct the user on the best course of action.</p>
<p><code-example example="error-modal"></code-example></p>
<h3>Custom</h3>
<p>In the case where &quot;Success&quot;, &quot;Warning&quot;, and &quot;Error&quot; notifications aren't enough, use the custom notification. Custom notifications allow any of the Bullhorn Icons to be used in the notification.</p>
<p><code-example example="custom-modal"></code-example></p>
<h2>Workflow Modals</h2>
<h3>Add</h3>
<p>Add modals have a colored title bar based on the record type being created. Additionally, due to a greater than average amount of content, they have fixed footers.</p>
<p><code-example example="modal-add-form"></code-example></p>
<h3>Edit &amp; Send</h3>
<p>Edit, Send, and non-Add workflow modals possess a plain header to remind the user of the action they are taking. They generally have a neutralizing button, and a primary button.</p>
<p><code-example example="modal-edit-form"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ModalExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'non-ideal-state-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Non-ideal UI states inform the user that some content is unavailable. There are several types of non-ideal states, including:</p>
<ul>
<li><strong>Empty state</strong>: when a list has no data in it yet, or a container's contents have been intentionally removed.</li>
<li><strong>Loading state</strong>: when waiting for data to load, Best practice is to show a spinner for this state, with optional explanatory text below the spinner.</li>
<li><strong>Error state</strong>: its broken (for instance, 404 and 500 HTTP errors). In this case, best practice is to add a call to action directing the user what to do next.</li>
</ul>
</div>
<img src="https://via.placeholder.com/350x250"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Content is missing from a page and you need to communicate why.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> A user is starting a new workflow and hasn’t created any content yet.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> A user has nothing more to do. For example, when they have completed all tasks, read all messages, or seen all notifications</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> tbw</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Title</strong><br>
Briefly summarizes what went wrong (or right).</p>
</li>
<li>
<p><strong>Message</strong><br>
Provides additional context and offers guidance on next steps.</p>
</li>
<li>
<p><strong>Icon (Optional)</strong><br>
Should be avoided unless absolutely necessary, primarily used for mobile or responsive design</p>
</li>
<li>
<p><strong>List (Optional)</strong><br>
Lists out criteria or additional options.</p>
</li>
<li>
<p><strong>Action (Optional)</strong><br>
Displays interactive content (eg. Button) that allow a user to take an action as a result of the non ideal state.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>
<p>Center non-ideal states horizontally and vertically within their container.</p>
</li>
<li>
<p>When including an action, use the corresponding size variation. For example, a large empty state should use a large button.</p>
</li>
<li>
<p>Non-ideal states include a maximum width to ensure optimal typographic line lengths and will scale down fluidly on smaller viewports.</p>
</li>
</ul>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Data Table Empty States</strong></div>
<div class="p">Data Tables inherently have an non-ideal states when no records currently exist. It is a good pattern to provide this context to the user but also to provide them with an action to &quot;Add your first record&quot;.</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Picker no search results</strong></div>
<div class="p">Whenever a component or view has a search feature you will always create a non-ideal state when the search returns no matching records. Best practice would be to provide a list of alternative search options.</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<ul>
<li>Never rely on an empty state’s icon alone to communicate meaning. Craft your empty state’s text content to provide a user with everything they need to know, even if they are unable to see the page.</li>
<li>Reference the accessibility guidelines for buttons when including an action in the empty state.</li>
<li>Add role=&quot;presentation&quot; to purely decorational empty state icons to ensure they are ignored by screen readers.</li>
</ul>
`,
  host: { class: 'markdown-page' }
})
export class NonIdealStateDesignPage {
  public params: any = {};
}


@Component({
  selector: 'non-ideal-state-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/non-ideal-state">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoNonIdealStateModule &#125; form 'novo-elements/modal';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-non-ideal-state</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;This folder is empty&quot;</span> <span class="hljs-attr">description</span>=<span class="hljs-string">&quot;Upload a new file to populate the folder.&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;upload&quot;</span>&gt;</span>Upload<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-non-ideal-state</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p><em>Added in this version</em></p>
<h1>Components</h1>
<h2>NovoNavElement <code>novo-non-ideal-state</code></h2>
<p>Used as a placeholder template when every components or views are in a non-ideal state suchas empty, error, loading, etc...</p>
<h3>Properties</h3>
<p><props-table component="NonIdealStateElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class NonIdealStateDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'non-ideal-state-examples-page',
  template: `<h2>Basic Usage</h2>
<p>Basic use-case is to display an icon, message, and reason for this state to occur. And provide a call to action for the user.</p>
<p><code-example example="non-ideal-state-usage"></code-example></p>
<p>The call to action doesn't necessarily need to be a button, for example:</p>
<p><code-example example="non-ideal-state-search-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class NonIdealStateExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'popover-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Popovers are layered containers that hold additional information or controls. Popovers are containers used to display transient content such as menus, options, additional actions, and more. They visually stand out through stroke and drop shadow and float on top of the interface.</p>
</div>
<img src="assets/images/PopoverOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Displaying supplementary content or actions, without obscuring the page.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Creating a menu by placing a list group inside of a popover.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> When content is 10 words or fewer. Instead, use a tooltip.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Requiring a user to complete a complex task. Instead, use a modal or a separate page.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/PopoverAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Content</strong><br>
The pop-overs contents, defined based on the application needs and business use-cases.</p>
</li>
<li>
<p><strong>Trigger</strong><br>
The element that anchors the popover and controls how the popover will be trigger (click, hover).</p>
</li>
<li>
<p><strong>Container</strong><br>
The popover container will be positioned based on the alignment to the trigger element.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Guidelines</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="assets/images/PopoverPointer.png" alt="placeholder"></div>
<div class="p"><strong>With Pointer</strong></div>
<div class="p">By default, popovers have a pointers. Popovers without a pointer should be used when the trigger has a visually distinctive selected state, in order to show the connection between the popover and its trigger.</div>
<div class="p">Most Popovers should have a pointer which should be used to help show the connection to the trigger, in cases where the trigger is not easily identifiable.</div>
</blockquote>
<blockquote>
<div class="p"><img src="assets/images/PopoverPosition.png" alt="placeholder"></div>
<div class="p"><strong>Placement</strong></div>
<div class="p">A popover is positioned in relation to its source. The placement property values are the following: top, top left, top right, top start, top end, bottom, bottom left, bottom right, bottom start, bottom end, left, left top, left bottom, start, start top, start bottom, right, right top, right bottom, end, end top, end bottom. The default placement value is at the top.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>the popover should follow the Aria <code>complementary</code> role <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role">guidelines</a>.</p>
`,
  host: { class: 'markdown-page' }
})
export class PopoverDesignPage {
  public params: any = {};
}


@Component({
  selector: 'popover-develop-page',
  template: `<h1>Technical Details</h1>
<p>Tooltips are used as system notifications. They can contain custom text titles and messages, as well as any icons from bh-icons and any color from our color palletes.</p>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tooltips">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoFieldModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Amount<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-right-align&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">novoPrefix</span>&gt;</span>$<span class="hljs-symbol">&amp;nbsp;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">novoSuffix</span>&gt;</span>.00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-hint</span>&gt;</span>Enter some money<span class="hljs-tag">&lt;/<span class="hljs-name">novo-hint</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>You should no longer use <code>list</code> and <code>item</code> components, these are non-standard components and have been replaced with <code>novo-option</code> as used in the usage above.</li>
</ul>
<h1>Components</h1>
<h2>NovoFieldElement <code>novo-field</code></h2>
<p>The <code>novo-field</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoFieldElement"></props-table></p>
<h1>Directive</h1>
<h2>NovoInput <code>[novoInput]</code></h2>
<p>The <code>novoInput</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoInput"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class PopoverDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'popover-examples-page',
  template: `<h2>Placement</h2>
<p><code-example example="pop-over-placement"></code-example></p>
<h2>Horizontal Alignment</h2>
<p><code-example example="pop-over-horizontal"></code-example></p>
<h2>Vertical Alignment</h2>
<p><code-example example="pop-over-vertical"></code-example></p>
<h2>Behavior</h2>
<p><code-example example="pop-over-behaviors"></code-example></p>
<h2>Dynamic HTML in PopOver</h2>
<p><code-example example="pop-over-dynamic"></code-example></p>
<h2>Automatic Placement of PopOver</h2>
<p><code-example example="pop-over-auto-placement"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class PopoverExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'progress-design-page',
  template: `<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Input Prefix (Optional element)</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Label</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Input Control</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
<li>
<p><strong>Input Suffix (Optional element)</strong><br>
The element/icon displayed after the input. eg. calendar icon for date picker.</p>
</li>
<li>
<p><strong>Helper/Error text (Optional element)</strong><br>
Caption text to display helpful information, warnings, or errors.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>How to configure</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Always do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Never do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
</novo-grid>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class ProgressDesignPage {
  public params: any = {};
}


@Component({
  selector: 'progress-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoProgressModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-progress</span> <span class="hljs-attr">total</span>=<span class="hljs-string">&quot;300&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-progress-bar</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;120&quot;</span> <span class="hljs-attr">color</span>=<span class="hljs-string">&quot;success&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-progress-bar</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-progress-bar</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;40&quot;</span> <span class="hljs-attr">color</span>=<span class="hljs-string">&quot;negative&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-progress-bar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-progress</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Components</h1>
<h2>NovoProgressElement <code>novo-progress</code></h2>
<p>The <code>novo-progress</code> component displays the loading bar in a linear or radial line. This commonly used for showing the state of a long running process, like a file upload. The progress bar can also be used for reporting on progress made towards a goal, eg. 5 of 10 shifts filled.</p>
<h3>Properties</h3>
<p><props-table component="NovoProgressElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class ProgressDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'progress-examples-page',
  template: `<h2>Progress Bar</h2>
<p>Progress bars are generally linear and can show the percent complete of a task. Progress can also be indeterminate.</p>
<p><code-example example="progress-bar-usage"></code-example></p>
<h2>Radial Progress Bars</h2>
<p>Radial Progress can be used to show a percent complete or multiple statuses in a circle.</p>
<p><code-example example="progress-bar-radial-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ProgressExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'progress-usage-page',
  template: `<novo-grid columns="2" align="start" gap="2rem">
<div>
<h3>Why?</h3>
<p>Progress bars are used to show how much of a task is complete, like loading data.</p>
</div>
<img src="https://via.placeholder.com/350x250"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Processing an long running action.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Displaying metrics data that can be represents as a bar.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Loading content.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> To show page loading state, use (loading)[../loading].</novo-text></li>
</ul>
</div>
</novo-grid>
`,
  host: { class: 'markdown-page' }
})
export class ProgressUsagePage {
  public params: any = {};
}


@Component({
  selector: 'quick-note-page',
  template: `<h1>Quick Note <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/quick-note">(source)</a></h1>
<h5>Basic Examples</h5>
<p><code-example example="basic-quick-note"></code-example></p>
<h5>Custom Triggers</h5>
<p><code-example example="custom-quick-note"></code-example></p>
<h5>Custom Results Template</h5>
<p><code-example example="custom-quick-note-results"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class QuickNotePage {
  public params: any = {};
}


@Component({
  selector: 'search-page',
  template: `<h1>Search Input <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/switch">(source)</a></h1>
<p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>
<h2>Types</h2>
<h5>Searches</h5>
<p>Searches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>
<p><code-example example="search-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class SearchPage {
  public params: any = {};
}


@Component({
  selector: 'slides-page',
  template: `<h1>slides</h1>
<h1>Slides <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/slides">(source)</a></h1>
<p>Slide element to toggle some information</p>
<h5>Basic</h5>
<p><code-example example="basic-slide"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class SlidesPage {
  public params: any = {};
}


@Component({
  selector: 'switch-page',
  template: `<h1>Switches &amp; Toggles <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/switch">(source)</a></h1>
<p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>
<h2>Types</h2>
<h5>Tiles</h5>
<p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p>
<h5>Switches</h5>
<p>Switches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>
<p><code-example example="switch-usage"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class SwitchPage {
  public params: any = {};
}


@Component({
  selector: 'tabbed-group-picker-page',
  template: `<h1>Tabbed Group Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tabbed-group-picker">(source)</a></h1>
<p>Tabbed Group Picker allows for nested selection of groups and members via a tabbed interface.</p>
<h2>Basic</h2>
<p>In its most basic usage, Tabbed Group Picker allows for selection of arbitrary sets of data that have no group/member relationship. Each data set appears on its own tab. The values returned must be javascript primitives (typically string or number).</p>
<p><code-example example="tabbed-group-picker-basic"></code-example></p>
<h2>Quick Select</h2>
<p>Tabbed Group Picker provides a configurable quick select interface. For each quick select item, the developer provides the data type, values (or the 'all' flag), and a label. Tabbed Group Picker builds the quick select menu and synchronizes the quick select checkboxes with the data checkboxes (in both directions).</p>
<p><code-example example="tabbed-group-picker-quick-select"></code-example></p>
<h2>Groups</h2>
<p><code-example example="tabbed-group-picker-groups"></code-example></p>
<h2>Big Groups</h2>
<p><code-example example="tabbed-group-picker-big-groups"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TabbedGroupPickerPage {
  public params: any = {};
}


@Component({
  selector: 'table-page',
  template: `<h1>Table <a href="https://bullhorn.github.io/novo-elements/tree/master/projects/novo-examples/src/elements/table">(source)</a></h1>
<p>Tables allow users to view date in a tabular format and perform actions such as Sorting and Filtering. Different configuration are possible for pagination or infinite scroll. Feature to be added include: Custom Item Renderers, etc...</p>
<h2>Types</h2>
<h5>Basic Table</h5>
<p>This is the most basic table.</p>
<p><code-example example="table"></code-example></p>
<h5>Details Table</h5>
<p>This has a row renderer to show a new details row that is expanded when you click on the action column.</p>
<p><code-example example="details-table"></code-example></p>
<h5>Select All Table w/ Custom Actions</h5>
<p>This has checkboxes for selection with custom actions.</p>
<p><code-example example="select-all-table"></code-example></p>
<h5>Editable Table</h5>
<p>Can be put into edit mode and use editors that are set on the column to modify the data.</p>
<p><code-example example="editable-table"></code-example></p>
<h5>Total/Average Footer</h5>
<p>Easily configure a footer to sum or average up columns.</p>
<p><code-example example="total-footer-table"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TablePage {
  public params: any = {};
}


@Component({
  selector: 'tip-well-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>The TipWell is a small container for displaying help text.  It is meant to be shown only once and dismissable to the user.  Typical usage is to provide additional detail on data being displayed or explain how a feature works to the user for their first time using it.</p>
</div>
<img src="assets/images/TipWellOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> The help text is no longer needed after the user has read the contents.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> To provide additional context and links related to the data to educate the user on how the a feature works.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use it show error states, use novo-error or a banner.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use it to display tutorials.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use it to explain text fields, use novo-hint.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ToastBanners.png" width="450">
<div>
<ol>
<li>
<p><strong>Icon</strong><br>
Use an Icon to quickly convey context of the action. ie. If a file is ready to download, show a download or file icon.</p>
</li>
<li>
<p><strong>Container</strong><br>
Used to quickly describe the action that occurred. eg. File Uploaded!</p>
</li>
<li>
<p><strong>Dismiss Action</strong><br>
A longer description of the outcome of the related action.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class TipWellDesignPage {
  public params: any = {};
}


@Component({
  selector: 'tip-well-develop-page',
  template: `<h1>Technical Details</h1>
<p>Tip Wells are used as ephemeral containers of helpful text. The importance of the content is usually short-lived and no longer needed once disseminated.</p>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tip-well">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoTipWellModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-tip-well</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Demo&quot;</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;info&quot;</span>&gt;</span>
  Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-tip-well</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Create a Provider for TipWell states</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>You should no longer use <code>tip</code> property and instead add the contents as children with the template.</li>
</ul>
<h1>Components</h1>
<h2>NovoTipWellElement <code>novo-tip-well</code></h2>
<p>The <code>novo-tip-well</code> component expects a <code>name</code> property, which will be used to store the state of the tipwell in local-storage.</p>
<h3>Properties</h3>
<p><props-table component="NovoTipWellElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class TipWellDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'tip-well-examples-page',
  template: `<h2>Basic Usage</h2>
<p><code-example example="basic-tip-well"></code-example></p>
<h2>No Button Demo</h2>
<p><code-example example="buttonless-tip-well"></code-example></p>
<h2>Icon Demo</h2>
<p><code-example example="icon-tip-well"></code-example></p>
<h2>HTML Demo</h2>
<p><code-example example="html-tip-well"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TipWellExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'toaster-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>A toast provides feedback about an operation while maintaining visibility and interaction with the current activity. It conveys information to the user that is not critical and does not require specific attention. A toast does not prevent the user from continuing their activity.</p>
<p>When the user is not presented with some form of confirmation about the completion of the action.</p>
<p><strong>Works with following input types</strong></p>
<ul>
<li>Default input, select, textarea</li>
<li>novo-select</li>
<li>novo-datepicker</li>
</ul>
</div>
<img src="assets/images/ToastBanners.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Use a Banner when a form cannot be saved to show an error occurred.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Use a Banner when an action can’t be completed due to an error or failure.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Use a Growl when an action is successfully performed and the context, i.e. modal, is no longer available.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When an action happens asynchronously, e.g. file upload.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use it to confirm an action, a toast should be reactive not pro-active.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ToastBanners.png" width="450">
<div>
<ol>
<li>
<p><strong>Icon</strong><br>
Use an Icon to quickly convey context of the action. ie. If a file is ready to download, show a download or file icon.</p>
</li>
<li>
<p><strong>Title (Optional)</strong><br>
Used to quickly describe the action that occurred. eg. File Uploaded!</p>
</li>
<li>
<p><strong>Message</strong><br>
A longer description of the outcome of the related action.</p>
</li>
<li>
<p><strong>Follow-up Action (Optional)</strong><br>
By default the a toast will always have a dismiss action, but can also have a follow up action related to the previous action, eg. Undo, Open, View....</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use a banner when a form can’t be saved, banner appears, should be dismissed manually</li>
<li>Use a growl when something is successfully saved, growl should disappears after X seconds</li>
<li>A toast should only have 1 follow-up action.</li>
<li>If the toast has an follow-up action, i.e. Undo, View, etc, then dismiss the Toast manually…</li>
<li>If a growl has no follow-up action, the toast should dismiss automatically after X seconds</li>
<li>If the growl has under 30 characters, dismiss automatically after 3 seconds</li>
<li>If the growl has between 30 and 100 characters, dismiss automatically after 10 seconds</li>
<li>If the growl has over 100 characters, dismiss manually</li>
<li>If the growl has over X characters or X lines of text, add a View More action</li>
</ul>
<h2>Color</h2>
<p><strong>How to use color</strong></p>
<p>Background utilises color to indicate status of the message. Icon is often synonymous with the status of the color, <em>e.g. warning icon goes with yellow background</em></p>
<h2>Behaviors</h2>
<p><strong>Movement</strong></p>
<p>A toast appears through an animated movement to draw the users attention. A banner slides in from the top of the page. A growl slides in from the side of the screen on which it is located. Multiple growls will stack by moving to the background when a new one appears.</p>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Embedded</strong></div>
<div class="p">Banners should be used as static notifications, usually shown at the top of content.</div>
</blockquote>
<p><img src="assets/images/ToastEmbedded.png" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Position</strong></div>
<div class="p">Growl notifications can be displayed at the top, left, right, bottom or corner of the page. Notification will also stack on top of each other until dismissed.  In general that an application use the same location for all growl notications, so the user will know where to look for them.</div>
</blockquote>
<p><img src="assets/images/ToastLayout.png" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Actions</strong></div>
<div class="p">Growls and Banners can have actions that can be invoked before being dismissed.  This action should be contextual to the action that triggered the toast in the first place.  eg. Actions like &quot;Undo&quot; or &quot;See more&quot; are common use-case, this helps create a workflow that is streamlined for the user but provides optional actions when needed.</div>
</blockquote>
<p><img src="assets/images/ToastGrowlAction.png" alt="placeholder"></p>
</novo-grid>
<h2>How to configure</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Always do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Never do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class ToasterDesignPage {
  public params: any = {};
}


@Component({
  selector: 'toaster-develop-page',
  template: `<h1>Technical Details</h1>
<p>Toasts are used as system notifications. They can contain custom text titles and messages, as well as any icons from bh-icons and any color from our color palletes.</p>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/field">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoFieldModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Amount<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-right-align&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">novoPrefix</span>&gt;</span>$<span class="hljs-symbol">&amp;nbsp;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">novoSuffix</span>&gt;</span>.00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-hint</span>&gt;</span>Enter some money<span class="hljs-tag">&lt;/<span class="hljs-name">novo-hint</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>You should no longer use <code>list</code> and <code>item</code> components, these are non-standard components and have been replaced with <code>novo-option</code> as used in the usage above.</li>
</ul>
<h1>Components</h1>
<h2>NovoFieldElement <code>novo-field</code></h2>
<p>The <code>novo-field</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoFieldElement"></props-table></p>
<h1>Directive</h1>
<h2>NovoInput <code>[novoInput]</code></h2>
<p>The <code>novoInput</code> component expects 1 <code>button</code> or <code>novo-button</code> as the trigger for the menu list which is comprised of all the <code>novo-option</code> or <code>novo-optgroup</code> child components.</p>
<h3>Properties</h3>
<p><props-table component="NovoInput"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class ToasterDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'toaster-examples-page',
  template: `<h2>Alert</h2>
<p>This type of toast notification takes a template, a style, and a location.</p>
<h2>Toast Options</h2>
<p><code-example example="toast-options"></code-example></p>
<h2>Embedded Toast</h2>
<p><code-example example="toast-usage"></code-example></p>
<h2>Toaster Service</h2>
<p><code-example example="toast-service"></code-example></p>
<h2>Toaster Actions</h2>
<p><code-example example="toast-actions"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ToasterExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'toolbar-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Toolbars are containers attached to the top or bottom of a page that contain actions and/or navigation.  Toolbars can stack on-top of each providing varying levels of content.  Toolbars usually act as headers or footers of the page.</p>
</div>
<img src="assets/images/ToolbarOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> The page needs navigation to its various sections.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> The page needs to set the context of the page (ie. header with title)</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Global Actions, preferences, setting, filters need to be displayed.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use to divide/separate content.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don’t use it to display multi-line text content.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use it for background color only.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-flex justify="center">
  <img src="assets/images/ToolbarAnatomy.png">
</novo-flex>
<h2>Options</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x200" alt="placeholder"></div>
<div class="p"><strong>Sizes</strong></div>
<div class="p">A toolbar container can be <code>sm</code>, <code>md</code>, or <code>lg</code>, which can be set by the <code>size</code> property. This will affect the height and horizontal padding of the container. Toolbars should all be the same size or stacked in descending sizes.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x200" alt="placeholder"></div>
<div class="p"><strong>Dividers</strong></div>
<div class="p">Use <code>&lt;novo-divider vertical&gt;</code> to separate section in a toolbar row. Divider can be used to separate stacked toolbars but only when the toolbars are the same color.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x200" alt="placeholder"></div>
<div class="p"><strong>Branding/Title</strong></div>
<div class="p">Branding in general should be setup on the left side of the toolbar. Your toolbar should either have a title or branding but not both.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x200" alt="placeholder"></div>
<div class="p"><strong>Menu or Icon</strong></div>
<div class="p">If you page has side navigation or a menu, than a menu icon can appear before the title or branding. If the toolbar doesn't need the <code>menu</code> icon, you may use and static icon to help add context to your title, but you should never have both.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x200" alt="placeholder"></div>
<div class="p"><strong>Tabs</strong></div>
<div class="p">Whether or not your toolbar needs top level nav, tabs should always be positioned to the right of the icon or branding.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x200" alt="placeholder"></div>
<div class="p"><strong>Search</strong></div>
<div class="p">You can include search functionality in your toolbar.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class ToolbarDesignPage {
  public params: any = {};
}


@Component({
  selector: 'toolbar-develop-page',
  template: `<h1>Technical Details</h1>
<p>Toolbars are used as ephemeral containers of helpful text. The importance of the content is usually short-lived and no longer needed once disseminated.</p>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/toolbar">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoToolbarModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-toolbar</span> <span class="hljs-attr">color</span>=<span class="hljs-string">&quot;company&quot;</span> <span class="hljs-attr">gap</span>=<span class="hljs-string">&quot;1rem&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>company<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-title</span>&gt;</span>Taurus Industries<span class="hljs-tag">&lt;/<span class="hljs-name">novo-title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-spacer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-action</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;share&quot;</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;Share&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-action</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-action</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;print&quot;</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;Print&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-action</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-action</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;times&quot;</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;Close&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-action</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-toolbar</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<ul>
<li>Added in this version</li>
</ul>
<h1>Components</h1>
<h2>NovoToolbarElement <code>novo-toolbar</code></h2>
<p>The <code>novo-toolbar</code> component is just a container, look at patterns to determine correct usage.</p>
<h3>Properties</h3>
<p><props-table component="NovoToolbar"></props-table></p>
<h2>NovoToolbarRowElement <code>novo-toolbar-row</code></h2>
<p>The <code>novo-toolbar-row</code> component is also just a container to help create multi-row toolbars, look at examples to determine correct usage.</p>
<h3>Properties</h3>
<p><props-table component="NovoToolbarRow"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class ToolbarDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'toolbar-examples-page',
  template: `<h2>Basic Usage</h2>
<p><code-example example="basic-toolbar"></code-example></p>
<h2>MultiRow Demo</h2>
<p><code-example example="multi-row-toolbar"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ToolbarExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'tooltip-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Tooltips are layered containers that provide basic identifying information about an elment.  The are usually triggered by hovering over the buttons and icons. Tooltips are meant to stand out visually through their contrasting container color to draw immediate attention to their contents.</p>
</div>
<img src="assets/images/TooltipOverview.png"/>
<div>
<p><img src="assets/images/TooltipGoodUsage.png" alt="Good Usage"></p>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Providing a short description of a page element or control.</novo-text></p>
<p>Page elements or contorls such as buttons and form fields can use tooltips for context.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Describing the action of an icon-only button.</novo-text></p>
<p>In case icon images are hard to view or do not load, tooltips are used to describe their actions.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Revealing the full text of truncated data.</novo-text></p>
<p>In a table view, a tooltip can help reveal header names which maybe truncated.</p>
</li>
</ul>
</div>
<div>
<p><img src="assets/images/TooltipBadUsage.png" alt="Bad Usage"></p>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use for describing supplemental information.</novo-text></p>
<p>Consider using a <a href="#components/pop%20over/design">popover</a> instead.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use when interactions are needed from the user.</novo-text></p>
<p>If the information inside is used to exend a workflow or user interaction, consider using a <a href="#components/modal/design">modal</a> or <a href="#components/pop%20over/design">popover</a> instead.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use tooltips to communicate crucial information</novo-text></p>
<p>If you have help text that must be read, consider using a <a href="#components/tip%20well/design">tip well</a> instead.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Don't use to display a message based on incorrect action.</novo-text></p>
<p>Consider using a <a href="#components/toaster/design">toast</a> instead.</p>
</li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/TooltipAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Contains the entire body of the tooltip. This container will be positioned based on the aligment of the trigger element. The container should appear elevated with a shadow to separate it form the page.  The height depends on the number of lines and the width is decided contextually based on when it looks best for the tooltip to split into another line.</p>
</li>
<li>
<p><strong>Trigger</strong><br>
The triangular element that anchors the tooltip and controls how the tooltip wil be triggered via hover.</p>
</li>
<li>
<p><strong>Content</strong><br>
The tooltip contents are defined based upon the application needs and business use-case.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Depending on usage a maximum of three lines in a tooltip is a good guideline, the tip is supposed to be quick and concise.</li>
<li>When choosing which tooltip position to use, try not to block important content, and make sure that the tooltip is still on the screen and readable.</li>
<li>For longer tooltips, choose an approriate width based on a readable line-length.</li>
</ul>
<h2>Options</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Colors</strong></div>
<div class="p">Tooltips also come in semantic variants: informative (blue), positive (green), and negative (red). These use semantic colors to communicate the meaning.</div>
</blockquote>
<p><img src="assets/images/TooltipColor.png" alt="Tooltip Colors"></p>
<blockquote>
<div class="p"><strong>Sizing</strong></div>
<div class="p">When the label is too long for the available horizontal space, it wraps to form another line. To control the visually display text-length you can set the size of the tooltip with the <code>tooltip-size</code> property.</div>
</blockquote>
<p><img src="assets/images/TooltipSize.png" alt="Tooltip Size"></p>
<blockquote>
<div class="p"><strong>Placement</strong></div>
<div class="p">A tooltip is positioned in relation to its source. The placement property values are at the: <code>top</code>, <code>top left</code>, <code>top right</code>, <code>bottom</code>, <code>bottom left</code>, <code>bottom right</code>, <code>left</code>, <code>right</code>. The default placement value is at the right.</div>
</blockquote>
<p><img src="assets/images/TooltipPosition.png" alt="Tooltip Placement"></p>
</novo-grid>
`,
  host: { class: 'markdown-page' }
})
export class TooltipDesignPage {
  public params: any = {};
}


@Component({
  selector: 'tooltip-develop-page',
  template: `<h1>Technical Details</h1>
<p>Tooltips are used as system notifications. They can contain custom text titles and messages, as well as any icons from bh-icons and any color from our color palletes.</p>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tooltip">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoTooltipModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;This Field is REQUIRED&quot;</span> <span class="hljs-attr">tooltipPosition</span>=<span class="hljs-string">&quot;top-left&quot;</span>&gt;</span>Amount<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-right-align&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p><em>none</em></p>
<h1>Components</h1>
<h2>TooltipDirective <code>[tooltip]</code></h2>
<p>Adds a tooltip to the element the directive is attached too. Use the input option to align and control how the tooltip displays.</p>
<h3>Properties</h3>
<p><props-table component="TooltipDirective"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class TooltipDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'tooltip-examples-page',
  template: `<h2>Placement</h2>
<p><code-example example="tooltip-placement"></code-example></p>
<h2>Alignment</h2>
<p><code-example example="tooltip-align"></code-example></p>
<h2>Types</h2>
<p><code-example example="tooltip-types"></code-example></p>
<h2>Sizes</h2>
<p><code-example example="tooltip-sizes"></code-example></p>
<h2>Options</h2>
<p><code-example example="tooltip-options"></code-example></p>
<h2>Toggle Trigger</h2>
<p><code-example example="tooltip-toggle"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TooltipExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'colors-page',
  template: `<h1>Color</h1>
<h2>Efficient and expressive</h2>
<p>Our colors are bold, fresh, and approachable. They are expressive and delightful, but selected with usability and accessibility in mind.</p>
<h2>Primary Colors</h2>
<p>These are the base colors of the application.</p>
<p><primary-colors-example></primary-colors-example></p>
<h2>Entity Colors</h2>
<p>This bold palette uses carefully balanced colors to distinguish entities from one another.</p>
<p><entity-colors-example></entity-colors-example></p>
<h2>Analyltics Colors</h2>
<p>This palette features vibrant, bold colors for use in data visualization.</p>
<p><analytics-colors-example></analytics-colors-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ColorsPage {
  public params: any = {};
}


@Component({
  selector: 'composition-page',
  template: `<h1>Composition</h1>
<h2>A universal language</h2>
<p>Comprehensive design principles and language helps maintain usability and a sense of harmony across a large family of products. Consistency and common elements greatly reduce the user effort requred to learn a new interface.</p>
<h2>Mainframe</h2>
<p>The Mainframe refers to the permanently fixed portions of the application that never change. It contains the primary navigation and core functions.</p>
<blockquote>
<h6>Design Principles: Hierarchy &amp; Unity</h6>
<div class="p">Unity implies relation through proximity, size, and color. Making elements clearly distinct or unified helps create a strong visual hierarchy. This is important because it helps to easily differentiate the level of importance between different elements, and controls a user's cognitive flow.</div>
</blockquote>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Top Frame</strong></div>
<div class="p">The top frame contains key functions (Find, Add) and navigation to the Resource Center and to User Profile options.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeTopFrame.svg" alt="mainframe"></p>
<blockquote>
<div class="p"><strong>Bowling Alley</strong></div>
<div class="p">The bowling alley is where all active items are displayed, allowing users to easily shift between them.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeBowlingAlley.svg" alt="bowling alley"></p>
<blockquote>
<div class="p"><strong>Menu</strong></div>
<div class="p">The menu functions as the primary navigation for the application. It contains links to every list, the dashboard, admin functions, tools, and third-party applications. The items on the menu can be toggled, grouped, and organized however the user wishes.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeMenu.svg" alt="menu"></p>
</novo-grid>
<h2>Headers</h2>
<p>Headers hold key information and controls for a page. They serve as a wayfinding marker to help the user understand context and easily access important actions.</p>
<h6>Design Principles: Navigation &amp; Consistency</h6>
<p>A consistent navigation structure allows users to master an interface much more quickly, as they know that certain functions are always in the same place. We use headers to provide quick access to key functions and aid findability of data in a complex system.</p>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Overviews &amp; Slideouts</strong></div>
<div class="p">Overview and Slideout headers are dominant features which focus the user's attention to the context of a particular record and contains key information on the left, and actions on the right. These headers inherit the color of the entity type.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeHeaderOverview.svg" alt="overview header"></p>
<blockquote>
<div class="p"><strong>List Headers</strong></div>
<div class="p">List headers contain the filter and column controls for the list and the primary actions. They are fixed so that results can eaily be modified and actioned regardless of scrolling position.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeHeaderList.svg" alt="list header"></p>
<blockquote>
<div class="p"><strong>Add &amp; Edit Pages</strong></div>
<div class="p">The headers of Add and Edit pages generally serve as a simple visual element to help provide context.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeHeaderEditPage.svg" alt="add page header"></p>
</novo-grid>
<h2>Cards</h2>
<p>Essential to our design paradigm, cards are independent blocks of information. They can contain text, tables, and data visualizations. They offer a curated view of data. Bringing the most pertinent information to the forefont, they allow users to scan large amounts of data quickly.</p>
<blockquote>
<div class="p"><strong>Design Principle: Cards</strong></div>
<div class="p">The card system scales easily, both in individual size and in groups. Because of this, cards are essential to our design language. Cards balance and align very easily, promoting findability. These handy little containers also provide a contextually relevant home for all content.</div>
</blockquote>
<blockquote>
<div class="p"><strong>Hint:</strong> This is a great place for third-party developers to fit into the Bullhorn system. <strong>Are you a developer?</strong> Check out card markup and documentation here</div>
</blockquote>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Basic Structure</strong></div>
<div class="p">Cards have a header which contains the card title and the card controls. The controls can vary depending on card type, gut generally include move, refresh, configure, and remove. The content area has padding by default but can also run edge-to-edge. Pulse cards have a special icon next to the title.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeCardsNPSCard.svg" alt="card"></p>
<blockquote>
<div class="p"><strong>Dashboard &amp; Overviews</strong></div>
<div class="p">Dashboards and Records Overviews are the primary home for our cards. They offer a customizable workspace to arrange and configure to most appropriately fit the user's needs. Cards have a fixed height, but mildly flexible width. They can also be expanded to full-screen. The &quot;add card&quot; control is always located in the top right, to be consistent with the placement of action buttons on tables and lists.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMainframeCardsDashboard.svg" alt="dashboard cards"></p>
<blockquote>
<div class="p"><strong>Slideouts and Mobile</strong></div>
<div class="p">Cards are so flexible, they also work well in a mobile setting. They help users to easily scan chunks of information and find what they need.</div>
</blockquote>
<p class="markdown-img"><img src="assets/images/LayoutMobileCard.svg" alt="mobile cards"></p>
</novo-grid>`,
  host: { class: 'markdown-page' }
})
export class CompositionPage {
  public params: any = {};
}


@Component({
  selector: 'design-page',
  template: `<h1>Design</h1>
<p>This is a landing page</p>
`,
  host: { class: 'markdown-page' }
})
export class DesignPage {
  public params: any = {};
}


@Component({
  selector: 'iconography-page',
  template: `<h1>Iconography</h1>
<h2>Certified Pixel-Perfect</h2>
<novo-grid columns="1fr 200px" gap="2rem">
  <novo-text>Icons are used to represent an action or concept through the most simplistic imagery possible. Icons give additional context to written material, allowing the user to quickly comprehend any given concept. The icons are designed on a highly specific grid to ensure maximum clarity even at a small size. Their design is friendly, human, and bold.</novo-text>
  <img src="assets/images/IconographyPageIcon.svg" width="64px">
</novo-grid>
<p><a href="http://bullhorn.github.io/bullhorn-icons/">Bullhorn's Icon Set</a></p>
<p><iconset-example></iconset-example></p>
<h2>Visual Guidelines</h2>
<p>An icon will always have slightly larger dimensions than text when they are paired together. This ensures that the icon is visually the same size as the text and that it scales proportionally.</p>
<h5>Base sizing</h5>
<p>Icons placed next to typography should alays follow this convention.</p>
<p>Bullhorn Glyphicons <strong>Size:</strong> 1.29em <strong>Padding:</strong> .25em <strong>Border Radius:</strong> .625em</p>
<h5>Scaling</h5>
<p>Make sure to scale the corner radius appropriately when enlarging or decreasing the size of the icon.</p>
<novo-grid columns="2">
  <figure-example>
    <img src="assets/images/IconographyScalingDo.svg">
    <novo-text color="grass">
      <novo-icon mr="1rem">check</novo-icon>
      <strong>Always maintain the proportions</strong>
    </novo-text>
    <novo-text>The border radius should scale as the icon does in order to keep the same aspect ratio.</novo-text>
  </figure-example>
  <figure-example>
    <img src="assets/images/IconographyScalingDont.svg">
    <novo-text color="grapefruit">
      <novo-icon mr="1rem">times</novo-icon>
      <strong>That doesn't look like a rectangle</strong>
    </novo-text>
    <novo-text>If the border radius isn't relative to the size of the icon, you will create inconsistent patterns within the application.</novo-text>
  </figure-example>
</novo-grid>
<h5>Padding</h5>
<p>To preserve readability, icons should have sufficient padding from the edges of their containers. Additionally, the icons should be visually centered in their containers.</p>
<novo-grid columns="2">
  <figure-example>
    <img src="assets/images/IconographyPaddingDo.svg">
    <novo-text color="grass">
      <novo-icon mr="1rem">check</novo-icon>
      <strong>It's good to have some breathing room</strong>
    </novo-text>
    <novo-text>Consistent spacing will create a more concise and fluid layout that will allow the user to parse information on the page easier.</novo-text>
  </figure-example>
  <figure-example>
    <img src="assets/images/IconographyPaddingDont.svg">
    <novo-text color="grapefruit">
      <novo-icon mr="1rem">times</novo-icon>
      <strong>It's getting crowded in here</strong>
    </novo-text>
    <novo-text>Give icons the space they need, the color and background color can convey additional meaning. That meaning can be obscured if the layout seems to crowded. </novo-text>
  </figure-example>
</novo-grid>
`,
  host: { class: 'markdown-page' }
})
export class IconographyPage {
  public params: any = {};
}


@Component({
  selector: 'spacing-page',
  template: `<h1>Spacing</h1>
<h2>Consistency at Scale</h2>
<p>Novo Elements makes use of spacing variables to create consistency across all of the components in our system. This consistency contributes to a subconscious feeling of order and harmony, while also eliminating guesswork for designers and developers.</p>
<p>We use a base-10px grid for consistent and easy to use sizing. Since units use ten pixels as the base, 1(rem) equals 10px, 2 equals 20px, .5 equals 5px (and so on).</p>
<h2>Usage</h2>
<novo-grid columns="2">
<novo-box padding="xl">
  <novo-text>
    When building layouts and components, our spacing directives hook into a Theme file for returning values. This allows us to constrain the possibilities available to a component to only what's defined in our spacing system and thus reduce drift.
  </novo-text>
</novo-box>
<figure-example theme="">
<img src="assets/images/SpacingSizeUnits.png" width="250">
<novo-text>
  <novo-icon color="neutral">board</novo-icon>
  <strong>Spacing Variables</strong>
</novo-text>
<novo-text>Use Spacing Variables not pixels</novo-text>
</figure-example>
</novo-grid>
<novo-grid columns="2">
<figure-example theme="">
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-box</span> <span class="hljs-attr">margin</span>=<span class="hljs-string">&quot;xs&quot;</span> <span class="hljs-attr">padding</span>=<span class="hljs-string">&quot;xl&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-box</span>&gt;</span>
</code></pre>
<novo-text color="grass"><novo-icon mr="1rem">check</novo-icon><strong>Always use theme variables</strong></novo-text>
<novo-text><p>Explain this</p>
</novo-text>
</figure-example>
<figure-example theme="">
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-box</span> <span class="hljs-attr">margin</span>=<span class="hljs-string">&quot;10px&quot;</span> <span class="hljs-attr">padding</span>=<span class="hljs-string">&quot;10px&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-box</span>&gt;</span>
</code></pre>
<novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon><strong>Never set explicit pixels for spacing</strong></novo-text>
<novo-text><p>Explain this</p>
</novo-text>
</figure-example>
</novo-grid>
<h2>Our Variables (&amp; Mix-ins?)</h2>
<p>Apply spacing constants to components to set element's padding and margins.</p>
<typedef-example>
  <typedef-content>
    <novo-flex gap="1rem">
      <novo-box bg="ocean"><novo-box margin="xs" padding="xl" bg="grass">xs/xl</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="sm" padding="lg" bg="grass">sm/lg</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="md" padding="md" bg="grass">md/md</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="lg" padding="sm" bg="grass">lg/sm</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="xl" padding="xs" bg="grass">xl/xs</novo-box></novo-box>
    </novo-flex>
  </typedef-content>
  <typedef-specs>
    <novo-label color="grass">Padding</novo-label><br/>
    <novo-label color="ocean">Margin</novo-label>
    <dl>
      <dt>xs </dt><dd>0.4rem</dd>
      <dt>sm </dt><dd>0.8rem</dd>
      <dt>md </dt><dd>1.2rem</dd>
      <dt>lg </dt><dd>1.6rem</dd>
      <dt>xl </dt><dd>2rem</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <novo-label>html</novo-label>
    <pre><code txc="ocean">&lt;novo-box margin="xs" padding="xl"&gt;...&lt;/novo-box&gt;</code><br/></pre>
  </typedef-snippet>
  <typedef-snippet>
    <novo-label>scss</novo-label>
    <pre><code>.box &#123;\n  @include novo-padding-medium(); // use mixin \n  margin: $spacing-xs; // or use scss variables\n  padding: $spacing-xl;\n&#125; &#125;&#125;</code></pre>
  </typedef-snippet>
</typedef-example>
<!-- 
<typedef-example>
  <typedef-content>
    <novo-flex gap="1rem">
      <novo-box bg="ocean"><novo-box margin="xs" padding="xl" bg="white">xs</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="sm" padding="lg" bg="white">sm</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="md" padding="md" bg="white">md</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="lg" padding="sm" bg="white">lg</novo-box></novo-box>
      <novo-box bg="ocean"><novo-box margin="xl" padding="xs" bg="white">xl</novo-box></novo-box>
    </novo-flex>
  </typedef-content>
  <typedef-specs>
    <novo-label>Margin</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-box margin="sm"&gt;...&lt;/novo-box&gt;</code> or <code class="tc-negative">@include novo-margin-medium()</code>
  </typedef-snippet>
</typedef-example> -->
`,
  host: { class: 'markdown-page' }
})
export class SpacingPage {
  public params: any = {};
}


@Component({
  selector: 'typography-page',
  template: `<h1>Typography</h1>
<novo-grid columns="200px 1fr" align="start" gap="2rem">
<p><img src="assets/images/TypographyPageIcon.svg" alt=""></p>
<blockquote>
<h2>Gotham, Montserrat.</h2>
<div class="p">Bullhorn's Branding uses the Gotham font family, this is not a free font. With that in mind we build novo-elements to work with both the Gotham font and Monteserrat which is a very similar font face available on Google Fonts.  Both fonts provide a characters that are clean and easy to read with good weight when the font-size is small.</div>
<div class="p"><a href="https://www.typography.com/fonts/gotham/overview">Gotham Font Overview</a></div>
<div class="p"><a href="https://fonts.google.com/specimen/Montserrat">Montserrat Typeface on Google Fonts</a></div>
</blockquote>
</novo-grid>
<h2>Best Practices</h2>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Limit line length to 70–80 characters.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Paragraph text should be a minimum of 14pt.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Small fonts need more spacing.</novo-text></li>
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Check your line spacing when you change font or font size.</novo-text></li>
</ul>
<h3>Design Principle: Clarity</h3>
<p>Proper line length, adequate white space, and appropriate line breaks are necessary to preserve readability, rhythm, and overall clarity.</p>
<h5>Line Height</h5>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p>
<p>These lines are too close for comfort</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p>
<p>Thumbs up for great readability</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.</p>
<p>I'm losing focus with all this space</p>
<h3>Design Principle: Balance</h3>
<p>Typographic balance is critical to readability and understanding information hierarchy. The weight and size of the font helps determine which element on a page receives a user’s attention first.</p>
<h5>Line Length</h5>
<hr>
<p>In general when determinining readability we try to stay within the optimal line length of <strong>55-75</strong> characters, this varies based on the layout the text is contained within as well as the size of the font. Becauase of the condensed nature of the data we generally present most common is for the text to fill its container but when necessary we apply these principles.</p>
<ul>
<li>🚫 <strong>30</strong> Short lines interrupt the reader's rhythm</li>
<li>✅ <strong>55-75</strong> Optimal line length for readability</li>
<li>🚫 <strong>100</strong> Difficult to jump to the next line</li>
</ul>
<typedef-example>
  <typedef-content>
    <novo-text [lineLength]="lineLength.value">
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Line Length</novo-label>
    <novo-radio-group #lineLength appearance="vertical">
      <novo-radio name="length" value="small">small (40)</novo-radio>
      <novo-radio checked name="length" value="medium">medium (55)</novo-radio>
      <novo-radio name="length" value="large">large (70)</novo-radio>
    </novo-radio-group>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text()</code>
  </typedef-snippet>
</typedef-example>
<h5>How does this work with responsive design?</h5>
<p>Line length is always relative to its font-size. This means that if a font scales up or down in sizing (relative to its device's screen size) the line length will automatically scale with it. Line length is about maintaining a comfortable reading flow and rhythm from line to line.</p>
<p><strong>When implementing</strong>, native line length will always be secondary to the width of the text's container. This means that if a screen's width is smaller than the text's native line length, the text will wrap early.</p>
<h2>Styles</h2>
<p>There a number of general styles that are present throughout the application. To maintain consistency, these styles should be adhered to as much as possible. Most text components can be adjusted by setting the <code>size</code>, <code>length</code>, <code>weight</code>, or <code>color</code> attributes, these values are all theme aware based on novo design tokens.</p>
<h2>Body Text</h2>
<p>Body text is available in three different sizes. Use body text to present the bulk of a page’s content. All body text uses a line height of 1.375 relative to the font size.</p>
<typedef-example>
  <typedef-content>
    <novo-text>
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Body Text</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375</dd>
      <dt>Font Weight     </dt><dd>400</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text-medium()</code>
  </typedef-snippet>
</typedef-example>
<typedef-example>
  <typedef-content>
    <novo-text larger>
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Body Larger</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.4rem</dd>
      <dt>Line Height     </dt><dd>1.375</dd>
      <dt>Font Weight     </dt><dd>400</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text larger&gt;...&lt;/novo-text&gt;</code>
  </typedef-snippet>
</typedef-example>
<typedef-example>
  <typedef-content>
    <novo-text smaller>
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Body Smaller</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.1rem</dd>
      <dt>Line Height     </dt><dd>1.375</dd>
      <dt>Font Weight     </dt><dd>400</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text size="small"&gt;...&lt;/novo-text&gt;</code>
  </typedef-snippet>
</typedef-example>
<h2>Title Text</h2>
<p>Titles are available in six different sizes. To create an optical balance between the six levels, titles are set in two weights: Condensed Thin and Condensed Light. All titles use a line height of 1.375 relative to the font size.</p>
<p>Title mixins and constants can be applied to any HTML element, but we recommend using &lt;h1&gt; through &lt;h6&gt; elements for titles to ensure markup is semantic and accessible.</p>
<typedef-example>
  <typedef-content>
    <novo-title>
      Creating an incredible customer experience
    </novo-title>
  </typedef-content>
  <typedef-specs>
    <novo-label>Title</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.8rem</dd>
      <dt>Line Height     </dt><dd>1.375</dd>
      <dt>Font Weight     </dt><dd>500</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-title&gt;...&lt;/novo-title&gt;</code> or <code class="tc-negative">@include novo-title-text()</code>
  </typedef-snippet>
</typedef-example>
<typedef-example>
  <typedef-content>
    <novo-title [size]="size.value">
      Creating an incredible customer experience
    </novo-title>
  </typedef-content>
  <typedef-specs>
     <novo-label>Size</novo-label>
    <novo-radio-group #size appearance="vertical" value="xl">
      <novo-radio value="xs">xs</novo-radio>
      <novo-radio value="sm">sm</novo-radio>
      <novo-radio value="md">md</novo-radio>
      <novo-radio value="lg">lg</novo-radio>
      <novo-radio value="xl">xl</novo-radio>
      <novo-radio value="2xl">2xl</novo-radio>
    </novo-radio-group>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-title&gt;...&lt;/novo-title&gt;</code> or <code class="tc-negative">@include novo-title-text()</code>
  </typedef-snippet>
</typedef-example>
<h2>Label Text</h2>
<p>These are the base colors of the application.</p>
<p><code-example example="label"></code-example></p>
<h2>Caption Text</h2>
<p>These are the base colors of the application.</p>
<p><code-example example="caption"></code-example></p>
<h2>Link Text</h2>
<p>These are the base colors of the application.</p>
<p><code-example example="link"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TypographyPage {
  public params: any = {};
}


@Component({
  selector: 'chips-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Chips show the user that a view or component represents data from multiple contexts. They can present as keywords, people or selected values, whether as an form input or filter criteria.</p>
</div>
<img src="assets/images/ChipsOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When you can select multiple items in a picker and you have selected the item.</novo-text></li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> When the user is only allowed to make a single selection from a picker input.</novo-text></li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ChipsAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
This defines the boundaries of the chip.</p>
</li>
<li>
<p><strong>Remove Button (Optional)</strong><br>
Chips that can be removed should include the ‘close’ icon.</p>
</li>
<li>
<p><strong>Text</strong><br>
This will contain the display value of the chip.</p>
</li>
<li>
<p><strong>Indicator/Avatar/Icon</strong><br>
To convey additional context to the user about the type of content, use the Chip Indicator. ie, This should be set to the contact icon and color when displaying contact data vs the candidate icon and color when the Chip represents a selected candidate</p>
</li>
<li>
<p><strong>Preview (optional)</strong><br>
Additional details can be displayed in a Chip Preview PopOver, see [New Component]</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Behaviors</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Text Overflow</strong></div>
<div class="p">When the chip text is too long for the available horizontal space, it truncates. The full text should be revealed with a tooltip on hover.</div>
</blockquote>
<blockquote>
<div class="p"><strong>Chip List Overflow</strong></div>
<div class="p">When horizontal space is limited in a chip list, the individual chips wrap to form another line.</div>
</blockquote>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>KeyBoard Controls</strong></p>
<p>The user should be able to use the <code>up</code> and <code>own</code> arrows to navigate between options and press <code>enter</code> to select the active option.</p>
<p><strong>Implementation</strong></p>
<p>The component should follow the <a href="https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html">ARIA combobox interaction</a> pattern and have a role of <code>combobox</code>.</p>
`,
  host: { class: 'markdown-page' }
})
export class ChipsDesignPage {
  public params: any = {};
}


@Component({
  selector: 'chips-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/chips">(github)</a></li>
<li><strong>module:</strong> <strong>part of</strong> <code>NovoChipsModule</code></li>
</ul>
<p><strong>Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-chip-list</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-chip</span>&gt;</span>Celtics<span class="hljs-tag">&lt;/<span class="hljs-name">novo-chips</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-chip</span>&gt;</span>Bulls<span class="hljs-tag">&lt;/<span class="hljs-name">novo-chips</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-chip-list</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Chip List</li>
</ul>
<h1>Changelog</h1>
<h3>6.0.0</h3>
<p>Chips are now separated into their atomic parts: <code>novo-chip</code>, <code>novo-chip-list</code>, <code>novo-chip-input</code>.</p>
<h1>Components</h1>
<h2>NovoChipElement <code>novo-chip</code></h2>
<p>The <code>novo-chip</code> component is the lowest level component for the chips module.  Contains all the styles contained with a single chip.  This component can start being used for more use-cases other than the multi-select picker.</p>
<h3>Properties</h3>
<p><props-table component="NovoChipElement"></props-table></p>
<h2>NovoChipListElement <code>novo-chip-list</code></h2>
<p>The <code>novo-chip-list</code> is just a container to wrap many chips within.  This should control basic flow and layout of the contained chips.</p>
<h3>Properties</h3>
<p><props-table component="NovoChipListElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class ChipsDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'chips-examples-page',
  template: `<h2>Chip Usage</h2>
<p>The <code>chip</code> element can be used for several purposes, such as tags, badges, filters, or declare multi-inputs.</p>
<p><code-example example="chip-usage"></code-example></p>
<h2>Basic Examples</h2>
<p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p>
<p><code-example example="basic-chips"></code-example></p>
<h2>Async Examples</h2>
<p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p>
<p><code-example example="async-chips"></code-example></p>
<h2>Formatted Examples</h2>
<p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p>
<p><code-example example="formatted-chips"></code-example></p>
<h2>Options Closing Example</h2>
<p>By clicking on the <code>chips</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values and the options list will be removed.</p>
<p><code-example example="close-on-select-chips"></code-example></p>
<h2>Grouped Multi Picker (categories) with Chips</h2>
<p>Having custom templates makes it easy to customize the functionality of the picker, here is an example of a category selector</p>
<p><code-example example="grouped-multi-picker"></code-example></p>
<h2>Row Chips Example</h2>
<p>By clicking on the <code>row-chips</code> element, the options list will be displayed.  Select any of the options by clicking on the item in the list.  The value selected will be added to the list of selected values as a new row. By clicking the delete icon at the end of the row, the row will be removed from the list of selected values.</p>
<p><code-example example="row-chips"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ChipsExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'color-picker-page',
  template: `<h1>Color Pickers</h1>
<p>These allow users to easily select a color swatch. It comes in a handful of varieties based on the content of the field.</p>
<h2>Color Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/date-picker">(source)</a></h2>
<p>The color picker is used to select a color. It appears in all date picker fields.</p>
<h5>Basic Usage</h5>
<p><code-example example="color-picker"></code-example></p>
<h5>Color Input Example</h5>
<p><code-example example="color-input"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ColorPickerPage {
  public params: any = {};
}


@Component({
  selector: 'date-picker-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Date Pickers allow users to easily select a date. It comes in a handful of varieties based on the content of the field.</p>
</div>
<p><img src="assets/images/DatePickerOverview.png" alt="DatePicker"></p>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use when a single date selection is required from the user, especially when additional context is around the date selection is needed. e.g. selecting a date within a specific date range.</li>
<li>Always use <code>novo-date-picker-input</code> when part of a larger form.</li>
<li>Only use standalone <code>date-picker</code> as filter for content displayed on the page.</li>
</ul>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<p><img src="assets/images/DatePickerOverview.png" alt="DatePicker Anatomy" width="450"></p>
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Input Prefix (Optional element)</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Label</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Input Control</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
<li>
<p><strong>Input Suffix (Optional element)</strong><br>
The element/icon displayed after the input. eg. calendar icon for date picker.</p>
</li>
<li>
<p><strong>Helper/Error text (Optional element)</strong><br>
Caption text to display helpful information, warnings, or errors.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class DatePickerDesignPage {
  public params: any = {};
}


@Component({
  selector: 'date-picker-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/date-picker">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoDatePickerModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<p>A <code>date-picker</code> can be used standalone, but typically it is displayed in an overlay triggered by an input. As of <code>v5</code> we have abstracted the functionality of the date picker it to 3 separate parts, the <code>date-picker</code> component to allow the selection of dates, the <code>dateFormat</code> directive to format dates to the correct format to display in the input, and the <code>novo-picker-toggle</code> which is used by various components to add an overlay to any <code>novo-field</code>.</p>
<p>The <code>date-picker</code> is built using the <code>novo-calendar</code> component examples of which can be seen <a href="/components/calendar">here</a>.</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Deprecated Usage --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-date-picker-input</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">&quot;date&quot;</span> <span class="hljs-attr">format</span>=<span class="hljs-string">&quot;mm/dd/yyyy&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-date-picker-input</span>&gt;</span>
</code></pre>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Preferred Usage --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Date of Birth<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">dateFormat</span>=<span class="hljs-string">&quot;iso8601&quot;</span> [<span class="hljs-attr">picker</span>]=<span class="hljs-string">&quot;datepicker&quot;</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">&quot;date&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-picker-toggle</span> <span class="hljs-attr">novoSuffix</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;calendar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-date-picker</span> #<span class="hljs-attr">datepicker</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-date-picker</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-picker-toggle</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Remove <code>DatePickerInputElement</code></li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li><code>novo-date-picker-input</code> should no longer be used, instead use a <code>novo-field</code> with a date-picker toggle shown in the preferred usage example above.</li>
</ul>
<h1>Directives</h1>
<h2>NovoDateFormatDirective <code>[dateFormat]</code></h2>
<p>The <code>[dateFormat]</code> directive is used to specify the format the input should display &quot;date&quot; values in. Currently we are using <code>imask</code> and <code>angular-imask</code> library to provide these formats and create the auto-correction/completion when typing into the input field.</p>
<h1>Components</h1>
<h2>NovoDatePickerInputElement <code>novo-date-picker-input</code></h2>
<p>The <code>novo-date-picker-input</code> is deprecated, but it still used with the dynamic form containers. It is a convienent wrapper componet for an input with a date picker trigger. Most inputs are just pass throughs to the <code>novo-date-picker</code> instance.</p>
<h3>Properties</h3>
<p><props-table component="NovoDatePickerInputElement"></props-table></p>
<h2>NovoDatePickerElement <code>novo-date-picker</code></h2>
<p>The <code>novo-spinner</code> component displays the circular loading visual, usually used within the button to indicate the action is performing but not complete yet.</p>
<h3>Properties</h3>
<p><props-table component="NovoDatePickerElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class DatePickerDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'date-picker-examples-page',
  template: `<h2>Date Picker Standalone</h2>
<p><code-example example="date-picker"></code-example></p>
<h2>Date Picker Input</h2>
<p><code-example example="date-picker-input"></code-example></p>
<h2>Range Picker</h2>
<p><code-example example="date-range-input"></code-example></p>
<h2>Customizing Week Start</h2>
<p><code-example example="week-start"></code-example></p>
<h5>Date Picker Limits</h5>
<p><code-example example="date-picker-limits"></code-example></p>
<h2>Different Locale</h2>
<p>TBD</p>
`,
  host: { class: 'markdown-page' }
})
export class DatePickerExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'date-time-picker-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Date Time Pickers allow users to easily select a time and date. It comes in a handful of varieties based on the content of the field.</p>
</div>
<p><img src="assets/images/DateTimePickerOverview.png" alt="DateTimePicker"></p>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use when a single date selection is required from the user, especially when additional context is around the date selection is needed. e.g. selecting a date within a specific date range.</li>
<li>Always use <code>novo-date-picker-input</code> when part of a larger form.</li>
<li>Only use standalone <code>date-picker</code> as filter for content displayed on the page.</li>
</ul>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<p><img src="assets/images/DateTimePickerOverview.png" alt="DateTimePicker Anatomy" width="450"></p>
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Input Prefix (Optional element)</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Label</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Input Control</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
<li>
<p><strong>Input Suffix (Optional element)</strong><br>
The element/icon displayed after the input. eg. calendar icon for date picker.</p>
</li>
<li>
<p><strong>Helper/Error text (Optional element)</strong><br>
Caption text to display helpful information, warnings, or errors.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class DateTimePickerDesignPage {
  public params: any = {};
}


@Component({
  selector: 'date-time-picker-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/date-time-picker">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoDateTimePickerModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<p>A <code>novo-date-time-picker</code> can be used standalone, but typically it is displayed in an overlay triggered by an input. This component is merely are wrapper around the <code>novo-date-picker</code> and the <code>novo-time-picker</code> components with a transition between them.</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Deprecated Usage --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-date-time-picker-input</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">&quot;dateTimeInput&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-date-time-picker-input</span>&gt;</span>
</code></pre>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Preferred Usage --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Date of Birth<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">dateTimeFormat</span>=<span class="hljs-string">&quot;iso8601&quot;</span> [<span class="hljs-attr">picker</span>]=<span class="hljs-string">&quot;datetimepicker&quot;</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">&quot;date&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-picker-toggle</span> <span class="hljs-attr">novoSuffix</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;calendar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-date-time-picker</span> #<span class="hljs-attr">datetimepicker</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-date-time-picker</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-picker-toggle</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Remove <code>DateTimePickerInputElement</code></li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li><code>novo-date-time-picker-input</code> should no longer be used, instead use a <code>novo-field</code> with a picker toggle shown in the preferred usage example above.</li>
</ul>
<h1>Directives</h1>
<h2>NovoDateTimeFormatDirective <code>[dateTimeFormat]</code></h2>
<p>The <code>[dateTimeFormat]</code> directive is used to specify the format the input should display &quot;date&quot; values in. Currently we are using <code>imask</code> and <code>angular-imask</code> library to provide these formats and create the auto-correction/completion when typing into the input field.</p>
<h1>Components</h1>
<h2>NovoDateTimePickerInputElement <code>novo-date-picker-input</code></h2>
<p>The <code>novo-date-time-picker-input</code> is deprecated, but it still used with the dynamic form containers. It is a convienent wrapper componet for an input with a date picker trigger. Most inputs are just pass throughs to the <code>novo-date-picker</code> or <code>novo-time-picker</code> instance.</p>
<h3>Properties</h3>
<p><props-table component="NovoDatePickerInputElement"></props-table></p>
<h2>NovoDateTimePickerElement <code>novo-date-time-picker</code></h2>
<p>The <code>novo-spinner</code> component displays the circular loading visual, usually used within the button to indicate the action is performing but not complete yet.</p>
<h3>Properties</h3>
<p><props-table component="NovoDatePickerElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class DateTimePickerDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'date-time-picker-examples-page',
  template: `<h2>Date Time Picker</h2>
<p><code-example example="date-time"></code-example></p>
<h2>Date Time Input Picker</h2>
<p><code-example example="date-time-input"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class DateTimePickerExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'editor-page',
  template: `<h1>CK Editor <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/ckeditor">(source)</a></h1>
<p>Basic HTML editor using CK Editor.</p>
<h5>Basic Example</h5>
<p><code-example example="basic-editor"></code-example></p>
<h5>Minimal Example</h5>
<p><code-example example="minimal-editor"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class EditorPage {
  public params: any = {};
}


@Component({
  selector: 'form-controls-page',
  template: `<h1>Form Controls</h1>
<p>This is a landing page</p>
`,
  host: { class: 'markdown-page' }
})
export class FormControlsPage {
  public params: any = {};
}


@Component({
  selector: 'form-groups-page',
  template: `<h1>Grouped Forms / Form Controls <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/form">(source)</a></h1>
<p>Useful when needing to group smaller sections of forms, can be used in the larger form. Static or Dynamic too!</p>
<h5>Horizontal</h5>
<p><code-example example="horizontal"></code-example></p>
<h5>Horizontal (options)</h5>
<p><code-example example="horizontal-options"></code-example></p>
<h5>Vertical</h5>
<p><code-example example="vertical"></code-example></p>
<h5>Horizontal (options)</h5>
<p><code-example example="vertical-options"></code-example></p>
<h5>Custom Template (you control everything!)</h5>
<p><code-example example="custom-template"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class FormGroupsPage {
  public params: any = {};
}


@Component({
  selector: 'form-page',
  template: `<h1>Forms <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/form">(source)</a></h1>
<p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'</p>
<h2>Static Form</h2>
<p>Static forms <code>&lt;novo-form /&gt;</code>.</p>
<h5>Textbox Based Controls</h5>
<p><code-example example="text-based-controls"></code-example></p>
<h5>Checkbox Controls</h5>
<p><code-example example="check-box-controls"></code-example></p>
<h5>File Input Controls</h5>
<p><code-example example="file-input-controls"></code-example></p>
<h5>Calendar Controls</h5>
<p><code-example example="calendar-input-controls"></code-example></p>
<h5>Picker Controls</h5>
<p><code-example example="picker-controls"></code-example></p>
<h5>Address Controls</h5>
<p><code-example example="address-control"></code-example></p>
<h2>Dynamic Form</h2>
<p>Dynamic forms are composed of one element, <code>&lt;novo-dynamic-form [controls]=&quot;controls&quot;/&gt;</code> and allow you to pass in the controls and form and it will create the form for you.</p>
<h5>Basic</h5>
<p><code-example example="dynamic-form"></code-example></p>
<h5>Vertical</h5>
<p><code-example example="vertical-dynamic-form"></code-example></p>
<h5>Fieldsets</h5>
<p><code-example example="dynamic-form-field-sets"></code-example></p>
<h5>Updating Fields/Status</h5>
<p><code-example example="updating-form"></code-example></p>
<h5>Disabled Field States</h5>
<p><code-example example="disabled-form"></code-example></p>
<h5>Enable/Disable All Fields in Form</h5>
<p><code-example example="enable-disable-all-fields-in-form"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class FormPage {
  public params: any = {};
}


@Component({
  selector: 'multi-picker-page',
  template: `<h1>MultiPicker <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/multi-picker">(source)</a></h1>
<p>The multipicker element (<code>multipicker</code>) represents a control that presents a menu of options of multiple types. The options within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code> attribute. Multipicker is the multi-category version of <code>chips</code></p>
<p>.</p>
<h5>Basic Example</h5>
<p>By clicking on the <code>multi-picker</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.</p>
<p><code-example example="basic-multi-picker"></code-example></p>
<h5>Nested Example</h5>
<p>The multipicker can also support a parent-child relationship between the types, such as the relationship between a state with many cities or a department with users.</p>
<p><code-example example="nested-multi-picker"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class MultiPickerPage {
  public params: any = {};
}


@Component({
  selector: 'picker-page',
  template: `<h1>Picker <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/picker">(source)</a></h1>
<p>The picker element (<code>input[picker]</code>) represents a control that presents a menu of options. The options within are set by the <code>items</code> attribute. Options can be pre-pickered for the user using the <code>value</code> attribute.</p>
<h5>Basic Examples</h5>
<p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p>
<p><code-example example="basic-picker"></code-example></p>
<h5>Async Examples (With Infinite Scroll)</h5>
<p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p>
<p><code-example example="async-picker"></code-example></p>
<h5>Formatted Picker Examples</h5>
<p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p>
<p><code-example example="formatted-picker"></code-example></p>
<h5>Custom Picker Examples</h5>
<p>By clicking on the <code>input</code> element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.</p>
<p><code-example example="custom-picker-results"></code-example></p>
<h5>Overriding the Result Template</h5>
<p>You can provide a string to override the base result template. You have access to <code>match</code> which is the data to be displayed.</p>
<p><code-example example="override-template"></code-example></p>
<h5>Default Options</h5>
<p>You can set a function or array for the default options on the config, for these options to appear when the user clicks in and doesn't have enough keys entered to perform a search</p>
<p><code-example example="default-options-picker"></code-example></p>
<h5>Entity Single Picker</h5>
<p>You can provide custom config to style the picker to select entities too!</p>
<p><code-example example="entity-picker"></code-example></p>
<h5>Grouped Multi Picker (categories) with Picker</h5>
<p>Having custom templates makes it easy to customize the functionality of the picker, here is an example of a category selector</p>
<p><code-example example="grouped-picker"></code-example></p>
<h5>Mixed Multi Picker (primary and secondary) with Picker</h5>
<p>It is possible to mix regular options with options with static or dynamic nested options</p>
<p><code-example example="mixed-picker"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class PickerPage {
  public params: any = {};
}


@Component({
  selector: 'radio-buttons-page',
  template: `<h1>Radio <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/radio">(source)</a></h1>
<p>A radio group</p>
<h5>Basic</h5>
<p><code-example example="basic-radio"></code-example></p>
<h5>Vertical</h5>
<p><code-example example="vertical-radio"></code-example></p>
<h5>Button Radio</h5>
<p><code-example example="button-radio"></code-example></p>
<h5>Icon Radio</h5>
<p><code-example example="icon-radio"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class RadioButtonsPage {
  public params: any = {};
}


@Component({
  selector: 'select-page',
  template: `<h1>Select <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/select">(source)</a></h1>
<p>The select element (<code>novo-select</code>) represents a control that presents a menu of options. The options within are set by the <code>items</code> attribute. Options can be pre-selected for the user using the <code>value</code> attribute.</p>
<h5>Basic Examples</h5>
<p>By clicking on the <code>novo-select</code> element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be displayed and the options list will be removed.</p>
<p><code-example example="basic-select"></code-example></p>
<h5>Basic Selections With Search</h5>
<p>Use the <code>novo-select-search</code> to provide searching functionality to the select component. Can be used to support remote options.</p>
<p><code-example example="basic-select-with-search"></code-example></p>
<h5>Lots of Options</h5>
<p>The most common need for the <code>select</code> component is when there are too many options that would fit on on the screen. The options list will display appropriately and scroll as needed.</p>
<p><code-example example="long-select"></code-example></p>
<h5>Multiple Selections</h5>
<p>When many option can be selected, use the <code>multiple</code> attribute which allows for a simple iterface to select multiple options.</p>
<p><code-example example="multiple-select"></code-example></p>
<h5>Multiple Selections With Search</h5>
<p>The <code>novo-select-search</code> is compatible with the <code>multiple</code> option as well.</p>
<p><code-example example="multiple-select-with-search"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class SelectPage {
  public params: any = {};
}


@Component({
  selector: 'tiles-page',
  template: `<h1>Tiles <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tiles">(source)</a></h1>
<p>This component is intended to behave akin to the radio button component.</p>
<h4>Demo</h4>
<p><code-example example="tiles-usage"></code-example></p>
<h4>Code</h4>
`,
  host: { class: 'markdown-page' }
})
export class TilesPage {
  public params: any = {};
}


@Component({
  selector: 'time-picker-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Time Pickers allow users to easily select a time. It comes in a handful of varieties based on the content of the field.</p>
</div>
<p><img src="assets/images/TimePickerOverview.png" alt="TimePicker"></p>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use when a single date selection is required from the user, especially when additional context is around the date selection is needed. e.g. selecting a date within a specific date range.</li>
<li>Always use <code>novo-time-picker-input</code> when part of a larger form.</li>
<li>Only use standalone <code>time-picker</code> as filter for content displayed on the page.</li>
</ul>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<p><img src="assets/images/TimePickerOverview.png" alt="TimePicker Anatomy" width="450"></p>
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Defines the layout for the form field (horizontal vs vertical)</p>
</li>
<li>
<p><strong>Input Prefix (Optional element)</strong><br>
An element/icon displayed before the input. eg. $</p>
</li>
<li>
<p><strong>Label</strong><br>
A label for a group of menu actions.</p>
</li>
<li>
<p><strong>Input Control</strong><br>
The element representing the input control: <code>input</code>, <code>select</code>, etc...</p>
</li>
<li>
<p><strong>Input Suffix (Optional element)</strong><br>
The element/icon displayed after the input. eg. calendar icon for date picker.</p>
</li>
<li>
<p><strong>Helper/Error text (Optional element)</strong><br>
Caption text to display helpful information, warnings, or errors.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Use spinner to display that an action invoked by the user is performing but not complete.</li>
<li>Use loading when loading data from the server to intialize content.</li>
<li>If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.</li>
<li>If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.</li>
<li>There should only be a single loading element on a page at one time.</li>
</ul>
<h2>How to configure</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Always do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Never do this</novo-text></li>
</ul>
<div class="p">Explain this</div>
</blockquote>
</novo-grid>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>Pattern</strong></div>
<div class="p">Why is it configured like this</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<p><strong>Implementation</strong></p>
<p>Always include an <code>alt</code> attribute describing the information that is visually displayed in the image.</p>
`,
  host: { class: 'markdown-page' }
})
export class TimePickerDesignPage {
  public params: any = {};
}


@Component({
  selector: 'time-picker-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/time-picker">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoTimePickerModule &#125; from 'novo-elements';</code></li>
</ul>
<p><strong>Usage</strong></p>
<p>A <code>novo-date-time-picker</code> can be used standalone, but typically it is displayed in an overlay triggered by an input. This component is merely are wrapper around the <code>novo-date-picker</code> and the <code>novo-time-picker</code> components with a transition between them.</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Deprecated Usage --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-time-picker-input</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">&quot;time&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-time-picker-input</span>&gt;</span>
</code></pre>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Preferred Usage --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Set an Alarm<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">&quot;time&quot;</span> <span class="hljs-attr">timeFormat</span>=<span class="hljs-string">&quot;iso8601&quot;</span> [<span class="hljs-attr">picker</span>]=<span class="hljs-string">&quot;timepicker&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-picker-toggle</span> <span class="hljs-attr">novoSuffix</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;clock&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-time-picker</span> #<span class="hljs-attr">timepicker</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-time-picker</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-picker-toggle</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Remove <code>NovoTimePickerInputElement</code></li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li><code>novo-time-picker-input</code> should no longer be used, instead use a <code>novo-field</code> with a picker toggle shown in the preferred usage example above.</li>
</ul>
<h1>Directives</h1>
<h2>NovoTimeFormatDirective <code>[timeFormat]</code></h2>
<p>The <code>[timeFormat]</code> directive is used to specify the format the input should display &quot;date&quot; values in. Currently we are using <code>imask</code> and <code>angular-imask</code> library to provide these formats and create the auto-correction/completion when typing into the input field.</p>
<h1>Components</h1>
<h2>NovoTimePickerInputElement <code>novo-time-picker-input</code></h2>
<p>The <code>novo-time-picker-input</code> is deprecated, but it still used with the dynamic form containers. It is a convienent wrapper componet for an input with a time picker trigger. Most inputs are just pass throughs to the <code>novo-time-picker</code> instance.</p>
<h3>Properties</h3>
<p><props-table component="NovoTimePickerInputElement"></props-table></p>
<h2>NovoTimePickerElement <code>novo-time-picker</code></h2>
<p>The <code>novo-time-picker</code> component is used to allow the user to select the time of the day similar to the browsers native time picker. The main benefit is that we can control timezones and formatting based on user and agency configuration rather than using the computers default settings.</p>
<h3>Properties</h3>
<p><props-table component="NovoTimePickerElement"></props-table></p>
`,
  host: { class: 'markdown-page' }
})
export class TimePickerDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'time-picker-examples-page',
  template: `<h2>Standalone Time Picker</h2>
<p>Time pickers come in 12 hour or 24 hour style.</p>
<p><code-example example="time-picker"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TimePickerExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'value-page',
  template: `<h1>Value/Details/Summary <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/value">(source)</a></h1>
<p>Used to render data based on its field type provided in meta. It has two themes, DEFAULT - horizontal view and MOBILE - vertical view</p>
<h2>Mobile Theme</h2>
<h5>Value/Details/Summary</h5>
<p>Render SCALAR fields</p>
<p><code-example example="basic-value"></code-example></p>
<h5>Category Value</h5>
<p>Render TO_ONE fields</p>
<p><code-example example="category-value"></code-example></p>
<h5>Using Icons w/Values</h5>
<p>Render fields with one or multiple icons on the right with an onclick event that calls a function on the meta object</p>
<p><code-example example="icon-value"></code-example></p>
<h5>CorporateUser</h5>
<p>Render TO_ONE fields with CorporateUser as an Associated Entity</p>
<p><code-example example="corporate-user-value"></code-example></p>
<h5>Custom Formatter</h5>
<p>Render Entity TO_ONE fields as links</p>
<p><code-example example="formatter-value"></code-example></p>
<h5>External Links</h5>
<p>Render external links</p>
<p><code-example example="external-link-value"></code-example></p>
<h5>DateTime</h5>
<p>Render DateTime and Timestamp fields in the localized Date format</p>
<p><code-example example="date-time-value"></code-example></p>
<h5>Address</h5>
<p>Render Address fields</p>
<p><code-example example="address-value"></code-example></p>
<h5>Associated Entities</h5>
<p>Render associated fields</p>
<p><code-example example="associated-value"></code-example></p>
<h5>Entity Lists</h5>
<p>Render entity lists</p>
<p><code-example example="entity-list-value"></code-example></p>
<h5>Multi Options</h5>
<p>Render multi option fields (Checkbox, radio, etc.)</p>
<p><code-example example="multi-option-value"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ValuePage {
  public params: any = {};
}


@Component({
  selector: 'home-page',
  template: `<h1>Novo Elements, Bullhorn's design system</h1>
<blockquote>
<div class="p">Version 6.0 is now available! Read about the new features and fixes <a href="#/updates/v6">here</a>.</div>
</blockquote>
<h2>Crafted amid Complexity</h2>
<p>Enterprise software is highly complex and demands a high level of flexibility. Design offers clarity and enables us to make deep, powerful connections.</p>
<img class="cover-img" src="assets/images/DesignSystem.png" width="100%"/>
<novo-grid columns="3" align="start" gap="2rem">
<blockquote>
<h5>A NEW STANDARD</h5>
<div class="p">Elegance in utility helps to create a system for humans, not robots. We strive not just to empower users but to delight them in the process.</div>
</blockquote>
<blockquote>
<h5>INSIGHTS AT SCALE</h5>
<div class="p">Vast data reservoirs need a finely tuned system to surface the critical information right when it is needed, no matter the scale or setting.</div>
</blockquote>
<blockquote>
<h5>POWER IN FLEXIBILITY</h5>
<div class="p">Users have vastly differing needs and goals. By identifying key commonalities and themes, we provide a strong experience for all.</div>
</blockquote>
</novo-grid>
<h2>Quick Start</h2>
<p>Use the Angular CLI's installation schematic to set up your project by running the following command:</p>
<pre><code class="language-bash">
<span class="hljs-comment"># Install</span>
ng add novo-elements

</code></pre>
<p>The ng add command will install Novo-Element and Novo Design Tokens library, it will additionally perform the following actions:</p>
<ul>
<li>Add project dependencies to package.json</li>
<li>Add the Gotham and Montserrat font to your index.html</li>
<li>Add the Bullhorn Glyphicon font to your index.html</li>
<li>Add a few global CSS styles to:</li>
</ul>
<p>You did it! Your application is now configured to use Novo Elements.</p>
<h2>Using a component</h2>
<p>Let's add a <strong>button</strong> component to our app and verify that everything works.</p>
<p>You need to import the <code>NovoButtonModule</code> for the component to display, add the following lines to your <code>app.module.ts</code> file.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> &#123; <span class="hljs-title class_">NovoButtonModule</span> &#125; <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;novo-elements&#x27;</span>;

<span class="hljs-meta">@NgModule</span> (&#123;
  <span class="hljs-attr">imports</span>: [
    <span class="hljs-title class_">NovoButtonModule</span>,
  ]
&#125;)
<span class="hljs-keyword">class</span> <span class="hljs-title class_">AppModule</span> &#123;&#125;
</code></pre>
<p>Add the <code>&lt;novo-button&gt;</code> tag to the <code>app.component.html</code> like so:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>Default<span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
</code></pre>
<p>Run your local dev server:</p>
<pre><code class="language-bash">ng serve
</code></pre>
<p>Open your browser to (http://localhost:4200)[http://localhost:4200] to see the results!</p>
<h2>References</h2>
<p>Looking for the Bullhorn corporate brand guidelines?<br>
<a href="https://brandfolder.com/bullhorn">Bullhorn Brand Folder</a></p>
`,
  host: { class: 'markdown-page' }
})
export class HomePage {
  public params: any = {};
}


@Component({
  selector: 'card-description-page',
  template: `<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>A card is a container that organizes a related grouping of information. Cards can sometimes be configured and reordered on a page allowing for optimal user customization. A card is content container for the presentation information with a shared singular context, usually related in some way to the main content.</p>
</div>
<img src="https://via.placeholder.com/350x250"/>
<div>
`,
  host: { class: 'markdown-page' }
})
export class CardDescriptionPage {
  public params: any = {};
}


@Component({
  selector: 'card-design-page',
  template: `<h2>Usage Guidelines</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When information can be grouped and the user might need access to multiple groups of information at once.</novo-text></p>
<p>TBW</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When providing a summary of content as an entry point to a larger grouping of information</novo-text></p>
<p>TBW</p>
</li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> When a lot of information on the card makes it too large. Instead consider using a modal or showing the information on a new page.</novo-text></p>
<p>TBW</p>
</li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Header</strong><br>
Cards can have a header row that always contains a title. If the card can be reordered on the page, a handle is placed left of the title that allows dragging of the card. Between the handle and the title an icon can be added. On the far right of the header row, actions can be added.</p>
</li>
<li>
<p><strong>Shadow</strong><br>
Novo-elements has 5 elevation layers by default; cards should float just above the content they are contained within.</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>Card dimensions are based on its content and the container in which it resides.</li>
<li>Apply custom heights and width to meet product requirements.</li>
<li>Avoid the appearance of nested cards, and therefore don’t use cards within a modal or another card.</li>
<li>When creating a group of cards, use consistently sized content within a grid or flex layout.</li>
</ul>
<h2>Color</h2>
<blockquote class="two-columns">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<div class="p"><strong>Theme - background</strong></div>
<div class="p">Any theme color can be applied to tabs which will make the background color match the color.
Any theme color can be applied to tabs with the <code>color</code> attribute to change the text color</div>
</blockquote>
</blockquote>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Details Card</strong></div>
<div class="p">Cards can use a list to display information. In this case the label and content are ordered left to right. Every other row has a darker background to improve readability.</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<ul>
<li>If using an illustrative image for the supplement content, it’s generally safe to use an empty or null alternative text for example alt=&quot;&quot;</li>
</ul>
`,
  host: { class: 'markdown-page' }
})
export class CardDesignPage {
  public params: any = {};
}


@Component({
  selector: 'card-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/card">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoCardModule &#125; form 'novo-elements';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-card</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-title</span>&gt;</span>Ferdinand the Bull<span class="hljs-tag">&lt;/<span class="hljs-name">novo-title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-action</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;times&quot;</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;Close Card&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-action</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-card-header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-content</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-content</span> <span class="hljs-attr">condensed</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-list</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bgc-off-white-striped&quot;</span> <span class="hljs-attr">direction</span>=<span class="hljs-string">&quot;vertical&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-value</span> <span class="hljs-attr">row</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Author&quot;</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;Munro Leaf&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-value</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-value</span> <span class="hljs-attr">row</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Cover artist&quot;</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;Robert Lawson&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-value</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-value</span> <span class="hljs-attr">row</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Language&quot;</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;English&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-value</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-value</span> <span class="hljs-attr">row</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Published&quot;</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;1936&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-value</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-value</span> <span class="hljs-attr">row</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Genre&quot;</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;Childrens&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-value</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">novo-list</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-card-content</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span>&gt;</span> PIN <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>pin<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span>&gt;</span> SHARE <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>share<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-card-footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-card</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><strong>Deprecation</strong></p>
<ul>
<li>Switch to declarative component design vs old imperative design. Using the input attributes to set header values should be replaced by adding <code>novo-card-header</code> component following appropriate patterns per design system. This approach might seem like more code but it enables a more flexible component when creating new patterns.</li>
</ul>
<novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon><strong>Stop using imperative propeties</strong></novo-text>
<novo-text><p>Explain this</p>
</novo-text>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-card</span>
  [<span class="hljs-attr">title</span>]=<span class="hljs-string">&quot;&#x27;All Attributes&#x27;&quot;</span>
  <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;activity&quot;</span>
  [<span class="hljs-attr">loading</span>]=<span class="hljs-string">&quot;loading&quot;</span>
  [<span class="hljs-attr">message</span>]=<span class="hljs-string">&quot;message&quot;</span>
  [<span class="hljs-attr">messageIcon</span>]=<span class="hljs-string">&quot;messageIcon&quot;</span>
  [<span class="hljs-attr">refresh</span>]=<span class="hljs-string">&quot;refresh&quot;</span>
  [<span class="hljs-attr">move</span>]=<span class="hljs-string">&quot;move&quot;</span>
  [<span class="hljs-attr">close</span>]=<span class="hljs-string">&quot;close&quot;</span>
  (<span class="hljs-attr">onRefresh</span>)=<span class="hljs-string">&quot;onRefresh()&quot;</span>
  (<span class="hljs-attr">onClose</span>)=<span class="hljs-string">&quot;onClose()&quot;</span>
  [<span class="hljs-attr">padding</span>]=<span class="hljs-string">&quot;padding&quot;</span>
&gt;</span>
  Stop using this pattern
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-card</span>&gt;</span>
</code></pre>
<novo-text color="grass"><novo-icon mr="1rem">check</novo-icon><strong>Add structured content to create your layout</strong></novo-text>
<novo-text><p>Explain this</p>
</novo-text>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-card</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">novo-title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-action</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;times&quot;</span> <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;Close Card&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-action</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-card-header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-content</span>&gt;</span> Any Content Can Go Here <span class="hljs-tag">&lt;/<span class="hljs-name">novo-card-content</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-card-footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-button</span>&gt;</span> Action <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>arrow-right<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">novo-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-card-footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-card</span>&gt;</span>
</code></pre>
<h1>Components</h1>
<h2>NovoCardElement <code>novo-card</code></h2>
<p>Container Element for the card. Can optionally contain <code>novo-card-header</code>, <code>novo-card-footer</code>, and <code>novo-card-content</code> to provide a better layout to the card when displaying more structured data.</p>
<h3>Properties</h3>
<p>| Name | Type | Default | Description |
| :---------- | :-------- | :------ | :------------------------------------------------------------------------------- | |
| padding | <em>Boolean</em> | true | <strong>deprecated</strong> whether the card has padding by default. |
| config | <em>Object</em> | &#123;&#125; | <strong>deprecated</strong> |
| title | <em>String</em> | -- ' | <strong>deprecated</strong> Text to display in header |
| message | <em>String</em> | -- | <strong>deprecated</strong> Displays a warning message when the card has an error or warning. |
| messageIcon | <em>String</em> | -- | <strong>deprecated</strong> Icon to display in the banner with <code>message</code>. |
| icon | <em>String</em> | -- | <strong>deprecated</strong> Icon to display in header with the title. |
| iconTooltip | <em>String</em> | -- | <strong>deprecated</strong> Tooltip for the icon in the header. |
| refresh | <em>Boolean</em> | -- | <strong>deprecated</strong> Show refresh button in header. |
| close | <em>Boolean</em> | -- | <strong>deprecated</strong> Show close button in header. |
| inline | <em>Boolean</em> | -- | <strong>wip</strong> Whether the card is render as display: <code>block</code> or <code>inline-block</code>. |
| inset | <em>String</em> | -- | <strong>wip</strong> Inset padding to add to the card |</p>
<h2>NovoCardHeader <code>novo-card-header</code></h2>
<p>Container row for the card header</p>
<h2>NovoCardContent <code>novo-card-content</code></h2>
<p>Container row for the card content</p>
<h2>NovoCardFooter <code>novo-card-footer</code></h2>
<p>Container row for the card footer</p>
`,
  host: { class: 'markdown-page' }
})
export class CardDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'card-examples-page',
  template: `<h2>Basic Card (using attributes)</h2>
<p><code-example example="basic-card"></code-example></p>
<h2>Card (using config object and card-actions)</h2>
<p><code-example example="card-config"></code-example></p>
<h2>Card with Image</h2>
<p><code-example example="card-with-image"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class CardExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'expansion-page',
  template: `<h1>Expandable Containers<a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/expansion">(source)</a></h1>
<p>Expansion Panel provides an expandable details-summary view. Each expansion-panel must include a header and may optionally include an action bar.</p>
<p>By default, the expansion-panel header includes a toggle icon at the end of the header to indicate the expansion state. This icon can be hidden via the hideToggle property.</p>
<h2>Basic Usage</h2>
<h5>Standard Expansion Panel</h5>
<p>This is an example of a standard list.</p>
<p><code-example example="basic-expansion"></code-example></p>
<h5>Accordion Expansion Panel</h5>
<p>This is an example of a Accordion.</p>
<p><code-example example="accordion"></code-example></p>
<h5>Lazy Expansion Panel</h5>
<p>This is an example of a Lazy loaded list.</p>
<p><code-example example="lazy-expansion"></code-example></p>
<h5>Patterns</h5>
<p>Check out the <a routerLink="/patterns">Activity Section</a> pattern</p>
`,
  host: { class: 'markdown-page' }
})
export class ExpansionPage {
  public params: any = {};
}


@Component({
  selector: 'header-page',
  template: `<h1>Headers <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/header">(source)</a></h1>
<p>Headers are used in Mainframe Record pages and some modals.</p>
<h2>Types</h2>
<h5>Record Header</h5>
<p>Record headers have details about the entity record and tabbed navigation.</p>
<p><code-example example="basic-header"></code-example></p>
<h5>Condensed</h5>
<p><code-example example="condensed-header"></code-example></p>
<h2>Options</h2>
<h5>SubTitle</h5>
<p><code-example example="header-subtitle"></code-example></p>
<h5>With Search</h5>
<p><code-example example="header-searchbar"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class HeaderPage {
  public params: any = {};
}


@Component({
  selector: 'layouts-page',
  template: `<h1>Layouts</h1>
<p>This is a landing page</p>
`,
  host: { class: 'markdown-page' }
})
export class LayoutsPage {
  public params: any = {};
}


@Component({
  selector: 'list-page',
  template: `<h1>List / Item <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/list">(source)</a></h1>
<p>Lists are used to display rows of information like entities or entity data and appear on cards, our mobile app, and several other places across the Bullhorn platform.</p>
<h2>Basic Usage</h2>
<h5>Standard List</h5>
<p>This is an example of a standard list.</p>
<p><code-example example="basic-list"></code-example></p>
<h5>Themed List</h5>
<p>This is an example of a themed list.</p>
<p><code-example example="themed-list"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class ListPage {
  public params: any = {};
}


@Component({
  selector: 'sidenav-page',
  template: `<h1>SideNav <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/layout">(source)</a></h1>
<p>Components and elements for cards to make sure the loading/empty/layout views are all consistent.</p>
<h5>Examples</h5>
<h2>Basic SideNav (using attributes)</h2>
<p><code-example example="basic-sidenav"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class SidenavPage {
  public params: any = {};
}


@Component({
  selector: 'stepper-page',
  template: `<h1>Steppers <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/stepper">(source)</a></h1>
<p>Stepper component provides a wizard-like workflow by dividing content into logical steps.</p>
<p>Material stepper builds on the foundation of the CDK stepper that is responsible for the logic that drives a stepped workflow. Material stepper extends the CDK stepper and has Material Design styling.</p>
<h2>Stepper variants</h2>
<p>There are two stepper components: novo-horizontal-stepper and novo-vertical-stepper. They can be used the same way. The only difference is the orientation of stepper.</p>
<h5>Horizontal Stepper</h5>
<p>This is the default stepper great for many reasons.</p>
<p><code-example example="stepper-horizontal"></code-example></p>
<h5>Linear stepper</h5>
<p>The linear attribute can be set on novo-horizontal-stepper and novo-vertical-stepper to create a linear stepper that requires the user to complete previous steps before proceeding to following steps. For each novo-step, the stepControl attribute can be set to the top level AbstractControl that is used to check the validity of the step.</p>
<p>There are two possible approaches. One is using a single form for stepper, and the other is using a different form for each step.</p>
<p>Alternatively, if you don't want to use the Angular forms, you can pass in the completed property to each of the steps which won't allow the user to continue until it becomes true. Note that if both completed and stepControl are set, the stepControl will take precedence.</p>
<h5>Vertical Stepper</h5>
<p>This is an alternative stepper great for many other reasons.</p>
<p><code-example example="stepper-vertical"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class StepperPage {
  public params: any = {};
}


@Component({
  selector: 'tabs-design-page',
  template: `<h2>Usage</h2>
<novo-grid columns="2" align="start" gap="2rem">
<div>
<p>Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs are used to section information over multiple pages within the same context. Only a single tab can be open at a time, allowing the user to focus on the information that the tab contains.</p>
</div>
<img src="assets/images/ButtonOverview.png"/>
<div>
<h3>Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> When a page contains a lot of information that can be clearly grouped and named.</novo-text></p>
<p>E.g. A Candidate record page can be split up into Work History, Credentials, Education, etc.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> For top level page navigation</novo-text></p>
<p>For example: Vertical tabs can be used in a side navigation to switch between pages or bottom tabs can be used in mobile.</p>
</li>
</ul>
</div>
<div>
<h3>Don′t Use When</h3>
<ul class="contains-do-list">
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Do not use to separate related content into multiple parts or break up (inter)actions that are important to continue with the user’s workflow.</novo-text></p>
<p>A user should be able to start and finish an action within a single tab. Instead consider using a Stepper component. Within a form, to organize and grouping fields together use a section divider.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Do not use when the users needs to see the information on each tab at the same time.</novo-text></p>
<p>If users need to see correlated content that is not on the tab they are viewing, consider using a Slideout. Or when data needs to be grouped further, use Cards.</p>
</li>
<li class="bullhorn-do-item">
<p><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Do not use to control the view of a single component, instead use radio buttons or tiles (button bar / segmented button).</novo-text></p>
<p>Don’t use tab to switch table data between states (past, present) (original, adjusted).</p>
</li>
</ul>
</div>
</novo-grid>
<h2>Anatomy</h2>
<novo-grid columns="2" align="start" gap="2rem">
<img src="assets/images/ModalAnatomy.png" width="450">
<div>
<ol>
<li>
<p><strong>Container</strong><br>
Tabs consist of a title that is descriptive of the information it holds. The currently selected tab is indicated by a colored bar that sits either below or left of the title (depending on the configuration). When the amount of tabs doesn't fit in the given space, a dropdown labeled More is added to the far right side of the tab bar. This dropdown contains all the overflowing tabs.</p>
</li>
<li>
<p><strong>Active Indicator</strong><br>
This is the visual symbol that represents which tab is currently active or being viewed.</p>
</li>
<li>
<p><strong>Leading Icon (Optional)</strong><br>
Should be avoided unless absolutely necessary, primarily used for mobile or responsive design</p>
</li>
<li>
<p><strong>Trailing Icon (Optional)</strong><br>
Should be avoided unless absolutely necessary, primarily used to display status to user</p>
</li>
</ol>
</div>
</novo-grid>
<h2>Best Practices</h2>
<ul>
<li>
<p>Tab labels should provide clear and concise descriptions of the content within
Avoid having more than 2 words unless the name of a product or entity prevents this.</p>
</li>
<li>
<p>Tab contents should be categorically independent from the content of other tabs, so the user is not confused by where information might be.</p>
</li>
</ul>
<h2>Color</h2>
<blockquote class="two-columns">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<div class="p"><strong>Theme - background</strong></div>
<div class="p">Any theme color can be applied to tabs which will make the background color match the color.
Any theme color can be applied to tabs with the <code>color</code> attribute to change the text color</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<div class="p"><strong>Regular tabs</strong></div>
<div class="p">The currently selected tab is indicated by the blue title and the blue bar that sits below or left of the title. The other tabs are using a grey font.</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<div class="p"><strong>White tabs</strong></div>
<div class="p">When tabs are used on a colored background, e.g. on a slide out, the currently selected tab is indicated by the white title and the white bar that sits below or left of the title. The other tabs are using a white font with a 70% opacity, leaving the background color to shine through.</div>
</blockquote>
</blockquote>
<h2>How to configure</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass"> Horizontal Tabs</novo-text></li>
</ul>
<div class="p">This is the default behavior</div>
</blockquote>
<blockquote>
<div class="p"><img src="https://via.placeholder.com/350x250" alt="placeholder"></div>
<ul class="contains-do-list">
<li class="bullhorn-do-item"><novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit"> Vertical Tabs</novo-text></li>
</ul>
<div class="p">TBW...</div>
</blockquote>
</novo-grid>
<h2>Patterns</h2>
<novo-grid columns="2" align="start" gap="2rem">
<blockquote>
<div class="p"><strong>Tab with Status</strong></div>
<div class="p">When displaying a status for tab to the user add a trailing icon to that tab. eg. if the tab has an error state use a trailing icon[color=negative] for that tab.</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
<blockquote>
<div class="p"><strong>White tabs</strong></div>
<div class="p">When tabs are used on a colored background, e.g. on a slide out, the currently selected tab is indicated by the white title and the white bar that sits below or left of the title. The other tabs are using a white font with a 70% opacity, leaving the background color to shine through.</div>
</blockquote>
<p><img src="https://via.placeholder.com/350x250" alt="placeholder"></p>
</novo-grid>
<h2>Accessibility</h2>
<ul>
<li>When implementing logic to update which tab item is active be sure to account for triggering the state on click, touch, and keyboard interactions.</li>
<li><code>&lt;novo-tabs&gt;</code> should include the aria <code>tablist</code> role and novo-tab should include the aria tab role.</li>
<li>If used for page navigation then novo-tabs should include the aria <code>nav</code> role</li>
</ul>
`,
  host: { class: 'markdown-page' }
})
export class TabsDesignPage {
  public params: any = {};
}


@Component({
  selector: 'tabs-develop-page',
  template: `<h1>Technical Details</h1>
<ul>
<li><strong>source:</strong> <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tabs">(github)</a></li>
<li><strong>module:</strong> <code>import &#123; NovoTabModule &#125; form 'novo-elements/modal';</code></li>
</ul>
<p><strong>Basic Usage</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-nav</span> [<span class="hljs-attr">outlet</span>]=<span class="hljs-string">&quot;ref&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-tab</span>&gt;</span>Overview<span class="hljs-tag">&lt;/<span class="hljs-name">novo-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-tab</span>&gt;</span>Activity<span class="hljs-tag">&lt;/<span class="hljs-name">novo-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-nav</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">novo-nav-outlet</span> #<span class="hljs-attr">ref</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-nav-content</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Overview<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-nav-content</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-nav-content</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-nav-content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-nav-outlet</span>&gt;</span>
</code></pre>
<h1>Roadmap</h1>
<ul class="contains-task-list">
<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Improve Typing Support</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Deprecate <code>condensed</code> in favor of <code>size</code></li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Deprecate <code>novo-tab-link</code> and make router navigation easier...</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Make color and theming consistent</li>
<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Dark Mode</li>
</ul>
<h1>Changelog</h1>
<h3>5.0.0</h3>
<p><em>Should be backwards compatible</em></p>
<h1>Components</h1>
<h2>NovoNavElement <code>novo-nav</code></h2>
<p>All tabs must be incapsulated in a <code>novo-nav</code> container. The nav will control the context and active tab.</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">theme</td>
<td style="text-align:left"><em>String</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">Color theme used to display tab color.</td>
</tr>
<tr>
<td style="text-align:left">direction</td>
<td style="text-align:left"><em>String</em></td>
<td style="text-align:left">horizontal</td>
<td style="text-align:left">The layout direction of the tabs. (<code>horizontal</code> or <code>vertical</code>)</td>
</tr>
<tr>
<td style="text-align:left">outlet</td>
<td style="text-align:left"><em>Ref</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">refs to the <code>novo-tab-outlet</code> these navigation controls.</td>
</tr>
<tr>
<td style="text-align:left">router</td>
<td style="text-align:left"><em>NgRouter</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">an instance of an angular router. Used when tabs are used for page nav.</td>
</tr>
<tr>
<td style="text-align:left">condensed</td>
<td style="text-align:left"><em>Boolean</em></td>
<td style="text-align:left">false</td>
<td style="text-align:left"><strong>Deprecated</strong> used to show a more compact view.</td>
</tr>
</tbody>
</table>
<h2>NovoTabElement <code>novo-tab</code></h2>
<p>The core element for displaying tabs.</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">active</td>
<td style="text-align:left"><em>Boolean</em></td>
<td style="text-align:left">false</td>
<td style="text-align:left">Whether this tab is current active tab. Can be set manually but value is controlled by <code>novo-nav</code>.</td>
</tr>
<tr>
<td style="text-align:left">color</td>
<td style="text-align:left"><em>String</em></td>
<td style="text-align:left">--</td>
<td style="text-align:left">highlight color to use when this tab is active.</td>
</tr>
<tr>
<td style="text-align:left">disabled</td>
<td style="text-align:left"><em>Object</em></td>
<td style="text-align:left">false</td>
<td style="text-align:left">Whether the tab will accept user interactions.</td>
</tr>
</tbody>
</table>
<h2>NovoTabLinkElement <code>novo-tab-link</code></h2>
<p>Used instead of <code>novo-tab</code> when using router navigation.</p>
<h3>Properties</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Default</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">active</td>
<td style="text-align:left"><em>Boolean</em></td>
<td style="text-align:left">false</td>
<td style="text-align:left">Whether this tab is current active tab. Can be set manually but value is controlled by <code>novo-nav</code></td>
</tr>
<tr>
<td style="text-align:left">disabled</td>
<td style="text-align:left"><em>Object</em></td>
<td style="text-align:left">false</td>
<td style="text-align:left">Whether the tab will accept user interactions.</td>
</tr>
</tbody>
</table>
<h2>NovoNavOutletElement <code>novo-nav-outlet</code></h2>
<p>The Container for all the <code>novo-nav-content</code>. A <code>#</code> reference should be added an passed to the <code>novo-nav</code> component to link the content to the tab view. The order of the content should be the same as the tabs that control them.</p>
<h2>NovoNavContentElement <code>novo-nav-content</code></h2>
<p>Used to incapsulate the navigation content. This wrapper will ensure on the active content is displayed.</p>
`,
  host: { class: 'markdown-page' }
})
export class TabsDevelopPage {
  public params: any = {};
}


@Component({
  selector: 'tabs-examples-page',
  template: `<h2>Themes</h2>
<h3>Color</h3>
<p>Colored background tab navigation gets the theme <code>theme=&quot;color&quot;</code></p>
<p><code-example example="tabs-color"></code-example></p>
<h3>White</h3>
<p>White background tab navigation gets the theme <code>theme=&quot;white&quot;</code></p>
<p><code-example example="tabs-basic"></code-example></p>
<h2>Styles</h2>
<p>Condensed tabs to help utilize more space with <code>condensed=&quot;true&quot;</code></p>
<p><code-example example="tabs-condensed"></code-example></p>
<h2>Types</h2>
<h3>Vertical</h3>
<p>Vertical tabs get a direction attribute <code>direction=&quot;vertical&quot;</code></p>
<p><code-example example="tabs-vertical"></code-example></p>
<h3>Button Tab Bars</h3>
<p>Tabbed Button Bars get a similar style treatment to the <code>&quot;header&quot;</code> theme button.</p>
<!-- <code-example example="tabs-condensed"></code-example> -->
<h2>As Application Routing Mechanism</h2>
<p>Follows the same color/white theme as above, but doesn't use the &quot;novo-tabs&quot; tag and you have to add the classes and html accordingly. The header will now control and route your application and put the content in the &quot;router-outlet&quot; and look/feel like our tabs component.</p>
<p><code-example example="tabs-router"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class TabsExamplesPage {
  public params: any = {};
}


@Component({
  selector: 'patterns-native-forms-page',
  template: `<h1>Native Form Styles</h1>
<form action="/form/submit" method="post">
  <fieldset>
    <legend>Personal information</legend>
    <label for="name"> First name: </label>
    <input id="name" type="text" name="firstname" placeholder="First name" required>
    <label for="last">Last name:</label>
    <input id="last" type="text" name="lastname" placeholder="Last name" required>
    <br>
    <br>
    <label for="age">Age:</label>
    <input id="age" type="number" min="10" max="100" step="1" name="number-of-colors">
    <label for="website">Website:</label>
    <input id="website" type="url" multiple>
    <br>
    <br>
    <label for="address">Email address:</label>
    <input id="address" type="email" name="email" placeholder="YourEmail@example.com" required>
    <label for="tel">Tel.:</label>
    <input id="tel" type="tel" placeholder="123-456-7890" pattern="[0-9]&#123;3&#125;-[0-9]&#123;3&#125;-[0-9]&#123;4&#125;">
    <br>
    <br>
  </fieldset>
  <fieldset>
    <legend>Getting to know YOU</legend>
    <label for="color">Favourite color:</label>
    <input id="color" type="color" name="color" value="#1c87c9" />
    <br>
    <p>Motivation level:</p>
    <input type="range" min="0" max="10" value="4">
    <br>
    <p>Favourite season:</p>
    <input type="radio" name="season" value="winter"> Winter
    <br>
    <input type="radio" name="season" value="autumn"> Autumn
    <br>
    <input type="radio" name="season" value="summer"> Summer
    <br>
    <input type="radio" name="season" value="spring"> Spring
    <br>
    <p>Favourite music:</p>
    <input type="radio" name="music" value="jazz"> Jazz
    <br>
    <input type="radio" name="music" value="blues"> Blues
    <br>
    <input type="radio" name="music" value="pop"> Pop
    <br>
    <input type="radio" name="music" value="rock"> Rock
    <br>
  </fieldset>
  <fieldset>
    <legend>Availability</legend>
    <label for="project">When you will be ready to start the Project?</label>
    <input id="project" type="date" name="date" value="2018-01-01" min="2018-01-01" max="2018-04-01">
    <br>
    <label for="hours">Mention your preferred working hours:</label>
    <input id="hours" type="time" name="time" value="09:00" />
    <label for="time">To </label>
    <input id="time" type="time" name="time" value="18:00" />
    <br>
    <label for="password"> Enter your password:</label>
    <input id="password" type="password" name="password" minlength="6" required placeholder="6 characters minimum" />
    <br>
    <br>
    <input type="submit" value="Send">
    <input type="reset" value="Reset">
  </fieldset>
</form>
`,
  host: { class: 'markdown-page' }
})
export class PatternsNativeFormsPage {
  public params: any = {};
}


@Component({
  selector: 'patterns-test-page',
  template: `<h2 id="demo">Element demos</h2>
<p>This is supposed to be a demo page so we need more elements!</p>
<h3 id="form-elements">Form elements</h3>
<form>
  <label for="email">Email</label>
  <input type="email" name="email" id="email" placeholder="john.doe@gmail.com" />
<p><label for="id">User id (read only)</label>
<input readonly name="id" id="id" value="04D6H89Z" /></p>
<p><label for="disabled">Random disabled input</label>
<input disabled name="disabled" id="disabled" placeholder="Because why not?" /></p>
<p><label for="about">About me</label></p>
<textarea name="about" id="about" placeholder="I am a textarea..."></textarea>
<p><label>Choose a Doe:</label></p>
  <div>
    <input type="radio" id="john" name="drone" value="john" checked />
    <label for="john">John Doe</label>
  </div>
  <div>
    <input type="radio" id="jane" name="drone" value="jane" checked />
    <label for="jane">Jane Doe</label>
  </div>
  <div>
    <input type="radio" id="johnny" name="drone" value="johnny" checked />
    <label for="johnny">Johnny Doe</label>
  </div>
  <br />
  <input type="checkbox" name="remember" id="remember" checked />
  <label for="remember">Remember me</label>
  <input type="submit" value="Submit" />
  <input type="reset" value="Reset" />
</form>
<h3 id="code">Code</h3>
<p>
  Below is some code, you can copy it with <kbd>Ctrl-C</kbd>. Did you know,
  <code>alert(1)</code> can show an alert in JavaScript!
</p>
<pre><code>// This logs a message to the console and check out the scrollbar.<br>console.log('Hello, world!')</code></pre>
<h3 id="other">Other</h3>
<p>Here's a horizontal rule and image because I don't know where else to put them.</p>
<img src="https://placekitten.com/408/287" alt="Example kitten" />
<hr />
<p>And here's a nicely marked up table!</p>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Godzilla</td>
      <td>2</td>
      <td>$299.99</td>
    </tr>
    <tr>
      <td>Mozilla</td>
      <td>10</td>
      <td>$100,000.00</td>
    </tr>
    <tr>
      <td>Quesadilla</td>
      <td>1</td>
      <td>$2.22</td>
    </tr>
  </tbody>
</table>
<details>
  <summary>Some summary/details can't hurt!</summary>
  <p>Lorem ipsum dolor sit blah blah.</p>
</details>
<p>The dialog (form, and menu) tag</p>
<div>
  <button type="button" id="dialog-trigger">
    Show me the dialog!
  </button>
  <span id="dialog-result"></span>
</div>
<dialog id="dialog">
  <header>This is a sample dialog</header>
  <form method="dialog">
    <p>What is your favorite pet animal?</p>
    <menu>
      <button value="feline">Cats</button>
      <button value="canine">Dogs</button>
      <button value="other">Others</button>
    </menu>
  </form>
</dialog>
<h3 id="typography">Typography</h3>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum hendrerit velit, quis
  ullamcorper sem congue ac. Quisque id magna rhoncus, sodales massa vel, vestibulum elit. Duis
  ornare accumsan egestas. Proin maximus lacus interdum leo molestie convallis. Orci varius
  natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut iaculis risus eu
  felis feugiat, eu mollis neque elementum. Donec interdum, nisl id dignissim iaculis, felis dui
  aliquet dui, non fermentum velit lectus ac quam. Class aptent taciti sociosqu ad litora
  torquent per conubia nostra, per inceptos himenaeos.
  <strong>This is strong,</strong> this is normal, <b>this is just bold,</b>
  <em>and this is emphasized!</em> And heck, <a href="/">here</a>'s a link.
</p>
<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  "The HTML blockquote Element (or HTML Block Quotation Element) indicates that the enclosed
  text is an extended quotation. Usually, this is rendered visually by indentation (see
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote#Usage_notes"
    >Notes</a
  >
  for how to change it). A URL for the source of the quotation may be given using the
  <code>cite</code> attribute, while a text representation of the source can be given using the
  <code>&lt;cite&gt;</code> cite element."
  <footer>
    <cite>MDN, "The Block Quotation element"</cite>
  </footer>
</blockquote>
<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
  <li>Unordered list item 3</li>
</ul>
<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
  <li>Ordered list item 3</li>
</ol>
<p>Addresses are also styled to be <strong>awesome</strong>!</p>
<address>
  <a href="mailto:john.doe@example.com">john.doe@example.com</a><br />
  <a href="tel:778-330-2389">778-330-2389</a><br />
  <a href="sms:666-666-6666">666-666-6666</a><br />
</address>
<br />
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<footer>
  <a href="#">Back to top ⬆</a>
</footer>
`,
  host: { class: 'markdown-page' }
})
export class PatternsTestPage {
  public params: any = {};
}


@Component({
  selector: 'patterns-page',
  template: `<h1>Design Patterns</h1>
<p>The following are examples of know composition patterns to create a common user experience. The component library is design to be used in these patterns.</p>
<h2>Activity Sections</h2>
<p>Displaying a series of lists in expandable sections, like in the activity tab.</p>
<p><code-example example="activity-section"></code-example></p>
<h2>Record Headers</h2>
<p>Entity Record Headers Patterns.</p>
<p><code-example example="record-header"></code-example></p>
<h2>Details Card</h2>
<p>When Displaying list of fields &amp; values in a card, follow this pattern.</p>
<p><code-example example="details-card"></code-example></p>
<h2>Card Form</h2>
<p>Displaying a form inside a cards, used for email &amp; sms messages</p>
<p><code-example example="card-form"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class PatternsPage {
  public params: any = {};
}


@Component({
  selector: 'templates-page',
  template: `<h2>Bullhorn Application Templates</h2>
<p>Bullhorn provides customization of the user experience with custom tabs, custom cards, custom actions and more.</p>
<p>The <a href="https://github.com/bullhorn/extension-samples">Bullhorn Extension Samples</a> repo
provides several examples for getting started building custom apps using Novo Elements.</p>
`,
  host: { class: 'markdown-page' }
})
export class TemplatesPage {
  public params: any = {};
}


@Component({
  selector: 'february-2022-page',
  template: `<h1>🚀 February 2022 (version 6 - Golden)</h1>
<p><strong>Release v6.0.0</strong>: This release contains several component updates and additional new components. Initial refactoring of component architecture to support future efforts to improve the design systems consistency along with improvements to the developer experience.</p>
<p>Note: This update is a major release which includes changes that require updates to your code. When updating to Novo Elements V6 from prior versions, the following commands are required:</p>
<p>First follow the steps to update your angular app to <a href="https://update.angular.io/?v=9.0-10.0">Version 10</a></p>
<pre><code><span class="hljs-attribute">npm</span> install --save timezone-support@<span class="hljs-number">2</span> novo-design-tokens@<span class="hljs-number">0</span> angular-imask@<span class="hljs-number">6</span> imask@<span class="hljs-number">6</span>
<span class="hljs-attribute">npm</span> install --save novo-elements@<span class="hljs-number">6</span>
<span class="hljs-attribute">ng</span> update novo-elements --migrate-only --from=<span class="hljs-number">0</span>.<span class="hljs-number">0</span>.<span class="hljs-number">0</span> --to=<span class="hljs-number">6</span>.<span class="hljs-number">0</span>.<span class="hljs-number">0</span> --force --<span class="hljs-literal">allow</span>-dirty  
</code></pre>
<p>For any issues that are not corrected with the above command, please ask questions in the <a href="https://github.com/bullhorn/novo-elements/discussions/categories/q-a">Q&amp;A Page</a> in github.</p>
<p>Welcome to the February 2022 release of Novo Elements. There are many updates in this version that we hope you will like, some of the key highlights include:</p>
<ul>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#dev-principle">Development Principle</a> - Philosophy on why we are making these changes.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#improved-docs">Improved Documentation</a> - Check out the new Design &amp; Developer Guideline.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#design-tokens">Design Token &amp; Themes</a> - The Bullhorn brand has evolved and the design system.</li>
<li><strong>New Components</strong>
<ul>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#aside">Aside</a> - A replacement implementation for Preview slideouts, that is easy to use and works like modals.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#autocomplete">Autocomplete</a> - Low-level feature to help composability of custom pickers.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#avatar">Avatar</a> - Display user and entity images with fallback display.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#breadcrumbs">Breadcrumbs</a> - Show nested navigation hierarchy.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#menu">Menu</a> - Coalesce options into floating overlay with a myriad of trigger functionality.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#layouts">Layout</a> - Easy to setup layouts with side navigation.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#color-picker">Color Picker</a> - Pick a color, works with form inputs.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#toolbar">Toolbar</a> - More flexible toolbar control, to use for page headers or navigation.</li>
</ul>
</li>
<li><strong>Updated Components</strong>
<ul>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#calendar">Calendar</a> - Support for multi-day selection, multi-month view, and can now be used independant of the data picker.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#modals">Modal</a> - New animation and more events to better control Modals.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#chips">Chips</a> - Still a WIP, but Chip, ChipList and ChipInput are now independant components that can be composed together separately.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#select">Select &amp; Dropdown</a> - Overhaul of these component to consolidate functionality into the new <code>novo-option</code> component, to create a more declarative design.</li>
</ul>
</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#preview-features">Preview Features</a> - Check some new features that are still in development.</li>
<li><a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#notable-changes">Notable Changes</a> - We changed some things, we fixed some things, hopefully left everything better than before!</li>
</ul>
<blockquote>
<div class="p">If you'd like to read these release notes online, go to <a href="https://bullhorn.github.io/novo-elements/updates">Updates</a> on <a href="https://bullhorn.github.io/novo-elements">bullhorn.github.io/novo-elements</a>.</div>
</blockquote>
<p><strong>Notice</strong>: Want to try new features as soon as possible? You can always view the <code>upcoming</code> relase documentation for the <a href="https://bullhorn.github.io/novo-elements">Next Branch</a>. The code is available on <a href="https://github.com/bullhorn/novo-elements/tree/next">Github</a> follow the guides to build and try the latest updates as soon as they are available.</p>
<h2 id="dev-principle">Development Principles <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#dev-principle">#</a></h2>
<p>The overall philosophy for the changes and improvement for the design system stems from the core principle of making each component more declarative vs imperative. To illustrate this with an example:</p>
<p><strong>Source Options</strong></p>
<pre><code class="language-ts"><span class="hljs-keyword">public</span> <span class="hljs-attr">options</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">any</span>&gt; = [
  &#123; <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;One&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-number">1</span> &#125;,
  &#123; <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Two&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-number">2</span> &#125;,
  &#123; <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Zero&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-number">0</span> &#125;,
  &#123; <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Four&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">readOnly</span>: <span class="hljs-literal">true</span> &#125;,
];
</code></pre>
<p><strong>Old Way (Imperative)</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-select</span> <span class="hljs-attr">formControlName</span>=<span class="hljs-string">&quot;example&quot;</span> [<span class="hljs-attr">options</span>]=<span class="hljs-string">&quot;options&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-select</span>&gt;</span>
</code></pre>
<p><strong>New and Shiny Way (Declarative)</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-select</span> <span class="hljs-attr">formControlName</span>=<span class="hljs-string">&quot;example&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">&quot;let option of options&quot;</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">&quot;option.value&quot;</span> [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">&quot;option.readonly&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>calculator<span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-symbol">&amp;#123;</span><span class="hljs-symbol">&amp;#123;</span>option.label<span class="hljs-symbol">&amp;#125;</span><span class="hljs-symbol">&amp;#125;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-select</span>&gt;</span>
</code></pre>
<p>While the <strong>New and Shiny Way</strong> might seem verbose, it actually creates infinite flexibility within the implementation.  When the developer is composing features within their application, the component will support things like adding icons on the left and right, displaying two rows of info in the options, alternatively before in our imperative design the design system would have to have be augmented to support subtle new variants.</p>
<h2 id="improved-documentation">Improved Documentation <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#improved-documentation">#</a></h2>
<p>The number one complaint we heard about the design system was that the documentation was sparse and not helpful. With the help of the UX teams we have Audited more than half of the components in the design system and added guidelines on the appropiate usage.  Developer docs with implementation and api details as well as an improvement to the Examples.</p>
<p><img src="assets/images/updates/v6/v6-improved-docs.gif" alt="Design Guideline &amp; Best Practices" width="640px"></p>
<h2 id="design-tokens">Design Token &amp; Themes <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#design-tokens">#</a></h2>
<p>A significant milestone was reached in v6 which is to create a <a href="https://github.com/amzn/style-dictionary">Style Dictionary</a> to isolate our variables into a <a href="https://github.com/bullhorn/novo-design-tokens">design tokens library</a>.  A Style Dictionary uses design tokens to define styles once and use those styles on any platform or language. This will allow the novo design system to help us create a coheosive look and feel across all our product suites regardless of the technologies being used. It also helps create better structure of our variables and tokens to ensure ease of use.</p>
<p>Future Plans are to:</p>
<ul>
<li>Create a base Bullhorn css stylesheet.</li>
<li>Migrate all web tokens from sass variable to css variables</li>
</ul>
<h2 id="new-components">New Components<a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#new-components">#</a></h2>
<h3 id="aside">Aside <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#aside">#</a></h3>
<p>Asides are slideouts designed to provide a view into related content within the page without navigating away. Asides work similar to Modal but the content is meant to be correlated and the workflow should be non-blocking.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/aside/design">read more</a>.</p>
<p><img src="assets/images/updates/v6/v6-aside.gif" alt="New Aside Component" width="640px"></p>
<hr>
<h3 id="auto-complete">Autocomplete <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#auto-complete">#</a></h3>
<p>The autocomplete component is designed to provide a list of options as the user types that can be used to set the field value. The component can be used to set more complex data to the form. Usually the input does not require a valid option to be selected.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/autocomplete/design">read more</a>.</p>
<p><img src="assets/images/AutocompleteOverview.png" alt="New Autocomplete Component" width="640px"></p>
<hr>
<h3 id="avatar">Avatar <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#avatar">#</a></h3>
<p>Avatars are images used to represent users and organizations. They typically are squares with rounded edges.</p>
<p>An avatar acts as a proxy for a user or entity (such as a company) in a product. They're often combined with status or presence indicators to give more context. Users generally upload their own image, otherwise, a default image is displayed</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/avatar/design">read more</a>.</p>
<p><img src="assets/images/AvatarOverview.png" alt="New Avatar Component" width="640px"></p>
<hr>
<h3 id="breadcrumbs">Breadcrumbs <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#breadcrumbs">#</a></h3>
<p>A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/breadcrumbs/design">read more</a>.</p>
<hr>
<h3 id="menu">Menu <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#menu">#</a></h3>
<p>Menu allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>
<p>Menus are contextual and all for actions to be performed based upon the context of the trigger or selection. Menus are great for consolidating many actions available to the user and can be used in a variety of different ways. Menus can be triggered from any element but usually limited to links, button, and icons.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/menu/design">read more</a>.</p>
<p><img src="assets/images/MenuOverview.png" alt="New Menu Component" width="640px"></p>
<hr>
<h3 id="layout">Layout <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#layout">#</a></h3>
<p>This is a series of components that introduce the ability to configure your application layout, we introduce the a new side navigation panel that can dock on the left or right or hide and collapse to make a more responsive application.</p>
<p>Check out the <a href="https://bullhorn.github.io/novo-elements/docs/#/layouts/sidenav">example</a> to learn more.</p>
<p><img src="assets/images/updates/v6/v6-sidenav.gif" alt="New Layout Components" width="640px"></p>
<hr>
<h3 id="color-picker">Color Picker <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#color-picker">#</a></h3>
<p>Color Picker allow users to easily select a color swatch. It comes in a handful of varieties based on the content of the field.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/form-controls/color-picker">read more</a>.</p>
<hr>
<h3 id="toolbar">Toolbar <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#toolbar">#</a></h3>
<p>Toolbars are containers attached to the top or bottom of a page that contain actions and/or navigation. Toolbars can stack on-top of each providing varying levels of content. Toolbars usually act as headers or footers of the page.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/toolbar/design">read more</a>.</p>
<p><img src="assets/images/ToolbarOverview.png" alt="New Toolbar Component" width="640px"></p>
<h2 id="updated-components">Updated Components <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#updated-components">#</a></h2>
<h3 id="calendar">Calendar <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#calendar">#</a></h3>
<p>The calendar has been refactored into smaller components to allow for a cleaner implementation when composing for the datepicker. Support for multi-day selection and multi-month view have been added. see new props below:</p>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mode</code></td>
<td><code>string</code></td>
<td>The selection mode. Possible values are <code>single</code>, <code>multiple</code>, <code>range</code>, <code>week</code></td>
</tr>
<tr>
<td><code>numberOfMonths</code></td>
<td><code>number</code></td>
<td>Defaults to <code>1</code>, the calendar should flex and wrap within the view.</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="modal">Modal <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#modal">#</a></h3>
<p>There are two objects injected into the Modal <code>NovoModalRef</code> and <code>NovoModalParams</code>.  Typing support for the NovoModalParams is difficult.  You no longer need to do this you only need the single reference to <code>NovoModalRef</code> which now accepts a generic. <code>ref:NovoModalRef&lt;DeleteModalParams&gt;</code> will now type the <code>ref.params</code>.</p>
<p><code>NovoModalRef</code> used to only have the <code>onClosed</code> which returns a promise with and value returned from the Modal to the calling component.  We have added two new observables for <code>beforeClose</code> and <code>afterClosed</code> in order to</p>
<p>Modals now have a smooth animation when opened and closed.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/modals/design">read more</a>.</p>
<hr>
<h3 id="chips">Chips <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#chips">#</a></h3>
<p>This milestone, we introduce the Side Panel, a new surface in the workbench opposite the Side Bar, where you can house views from the Side Bar or the bottom Panel. Unlike moving the bottom Panel to the left or the right of the editor, the new Side Panel works in addition to the bottom Panel so you can see more sets of views at once.</p>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/form-controls/chips/design">read more</a>.</p>
<hr>
<h3 id="option">Select &amp; DropDowns <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#option">#</a></h3>
<p>We already talked about the change from imperative to declarative. We have consolidated all of our display of option/menu-items used by many components into a single implmenation of <code>novo-option</code> and groupings with <code>novo-optgroup</code>.  Several new patterns for searching within optgroups are works in progress, but coming soon.  The major change is how to migrate <code>novo-dropdown</code> contents to the new implementation.</p>
<p><strong>Old Way</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-dropdown</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>trigger<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dropdown-item-header</span>&gt;</span>Cats<span class="hljs-tag">&lt;/<span class="hljs-name">dropdown-item-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">item</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;1&#x27;)&quot;</span>&gt;</span>Persian<span class="hljs-tag">&lt;/<span class="hljs-name">item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">item</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;2&#x27;)&quot;</span>&gt;</span>Maine Coon<span class="hljs-tag">&lt;/<span class="hljs-name">item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dropdown-item-header</span>&gt;</span>Dogs<span class="hljs-tag">&lt;/<span class="hljs-name">dropdown-item-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">item</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;3&#x27;)&quot;</span>&gt;</span>Cocker Spaniel<span class="hljs-tag">&lt;/<span class="hljs-name">item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">item</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;4&#x27;)&quot;</span>&gt;</span>Poodle<span class="hljs-tag">&lt;/<span class="hljs-name">item</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-dropdown</span>&gt;</span>
</code></pre>
<p><strong>New and Shiny Way</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">novo-dropdown</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>trigger<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-optgroup</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Cats&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;1&#x27;)&quot;</span>&gt;</span>Persian<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;2&#x27;)&quot;</span>&gt;</span>Maine Coon<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-optgroup</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-optgroup</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Dogs&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;3&#x27;)&quot;</span>&gt;</span>Cocker Spaniel<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-option</span> (<span class="hljs-attr">action</span>)=<span class="hljs-string">&quot;action(&#x27;4&#x27;)&quot;</span>&gt;</span>Poodle<span class="hljs-tag">&lt;/<span class="hljs-name">novo-option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-optgroup</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-dropdown</span>&gt;</span>
</code></pre>
<h2 id="preview-features">Preview Features <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#preview-features">#</a></h2>
<h3 id="utility-directives">Utility Directives <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#utility-directives">#</a></h3>
<p>Composing layouts is difficult especially when you need to create css classes for all your container.  It gets very repetitive add <code>display: flex</code> and <code>flex-direction: row</code>.  Now we have new utility components and directive to compose the general layout of a page without writing any css.  The goal is reduce application specific css to zero.  Here are the new features we have added to support this.</p>
<ul>
<li><code>&lt;novo-box&gt;</code></li>
<li><code>&lt;novo-flex&gt;</code> or <code>&lt;novo-row&gt;</code></li>
<li><code>&lt;novo-stack&gt;</code> or <code>&lt;novo-col&gt;</code></li>
</ul>
<table>
<thead>
<tr>
<th>prop</th>
<th>CSS Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>direction</code></td>
<td><code>flex-direction</code></td>
<td><code>Use flex or stack, but you can overried if needed</code></td>
</tr>
<tr>
<td><code>align</code></td>
<td><code>align-items</code></td>
<td><code>Aligns the content along the primary axis</code></td>
</tr>
<tr>
<td><code>justify</code></td>
<td><code>justify-content</code></td>
<td><code>Aligns the content along the secondary axis</code></td>
</tr>
</tbody>
</table>
<p>In addition to these layout components you can add directives (attributes) to any element on your page. All of these elements are <strong>theme aware</strong> as in they will look up the value from the design token library and use that value.</p>
<table>
<thead>
<tr>
<th>Prop</th>
<th>CSS Property</th>
<th>Design Token</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>margin</code></td>
<td><code>margin</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>mt</code>, <code>marginTop</code></td>
<td><code>margin-top</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>mr</code>, <code>marginRight</code></td>
<td><code>margin-right</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>mb</code>, <code>marginBottom</code></td>
<td><code>margin-bottom</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>ml</code>, <code>marginLeft</code></td>
<td><code>margin-left</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>mx</code></td>
<td><code>margin-left</code> and <code>margin-right</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>my</code></td>
<td><code>margin-top</code> and <code>margin-bottom</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>padding</code></td>
<td><code>padding</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>pt</code>, <code>paddingTop</code></td>
<td><code>padding-top</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>pr</code>, <code>paddingRight</code></td>
<td><code>padding-right</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>pb</code>, <code>paddingBottom</code></td>
<td><code>padding-bottom</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>pl</code>, <code>paddingLeft</code></td>
<td><code>padding-left</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>px</code></td>
<td><code>padding-left</code> and <code>padding-right</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>py</code></td>
<td><code>padding-top</code> and <code>padding-bottom</code></td>
<td><code>spacing</code></td>
</tr>
<tr>
<td><code>bg</code></td>
<td><code>background-color</code></td>
<td><code>color</code></td>
</tr>
<tr>
<td><code>color</code></td>
<td><code>color</code></td>
<td><code>color</code></td>
</tr>
<tr>
<td><code>accent</code></td>
<td><code>class</code></td>
<td><code>color</code></td>
</tr>
<tr>
<td><code>theme</code></td>
<td><code>class</code></td>
<td><code>color</code></td>
</tr>
</tbody>
</table>
<p>For Example:</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- This will create a row with three columns each containing a stacked icon over text --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">novo-flex</span> <span class="hljs-attr">gap</span>=<span class="hljs-string">&quot;lg&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-stack</span> <span class="hljs-attr">padding</span>=<span class="hljs-string">&quot;md&quot;</span> <span class="hljs-attr">bg</span>=<span class="hljs-string">&quot;candidate&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>candidate<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-text</span>&gt;</span>Ferdinand del Toro<span class="hljs-tag">&lt;/<span class="hljs-name">novo-text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-stack</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-stack</span> <span class="hljs-attr">padding</span>=<span class="hljs-string">&quot;md&quot;</span> <span class="hljs-attr">bg</span>=<span class="hljs-string">&quot;candidate&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span>&gt;</span>contact<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-text</span>&gt;</span>Ferdinand del Toro<span class="hljs-tag">&lt;/<span class="hljs-name">novo-text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-stack</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-stack</span> <span class="hljs-attr">padding</span>=<span class="hljs-string">&quot;md&quot;</span> <span class="hljs-attr">bg</span>=<span class="hljs-string">&quot;company&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-icon</span> <span class="hljs-attr">mb</span>=<span class="hljs-string">&quot;sm&quot;</span>&gt;</span>company<span class="hljs-tag">&lt;/<span class="hljs-name">novo-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-text</span>&gt;</span>Bullhorn<span class="hljs-tag">&lt;/<span class="hljs-name">novo-text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-stack</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">novo-flex</span>&gt;</span>
</code></pre>
<h3 id="field">New Field Component <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#field">#</a></h3>
<p>A new experimental <code>novo-field</code> component has been added to help improve the future of <code>novo-form</code> (which it is not currently using).  The <code>novo-field</code> and its supporting cast of components and directives makes it really easy to compose static forms.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">&quot;data&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">novo-fields</span> <span class="hljs-attr">appearance</span>=<span class="hljs-string">&quot;filled&quot;</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">&quot;vertical&quot;</span> [<span class="hljs-attr">fullWidth</span>]=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Notice the novoInput directive --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Pick a Number?<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Ex. 12&quot;</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">&quot;numberControl&quot;</span> <span class="hljs-attr">min</span>=<span class="hljs-string">&quot;10&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-error</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">&quot;numberControl.invalid&quot;</span>&gt;</span>Minimum: 10<span class="hljs-tag">&lt;/<span class="hljs-name">novo-error</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Easily attach pickers or custom autocompletes to a novoInput --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">novo-field</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-label</span>&gt;</span>Date of Birth<span class="hljs-tag">&lt;/<span class="hljs-name">novo-label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">novoInput</span> <span class="hljs-attr">dateFormat</span> [<span class="hljs-attr">picker</span>]=<span class="hljs-string">&quot;datepicker&quot;</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">&quot;dateControl&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">novo-picker-toggle</span> <span class="hljs-attr">novoSuffix</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;calendar&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">novo-date-picker</span> #<span class="hljs-attr">datepicker</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">novo-date-picker</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">novo-picker-toggle</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">novo-field</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">novo-fields</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<p>View the docs to <a href="https://bullhorn.github.io/novo-elements/docs/#/components/field/design">read more</a>.</p>
<h2 id="notable-changes">Notable changes <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#notable-changes">#</a></h2>
<ul>
<li><code>novo-table</code> is now deprecated use <code>novo-data-table</code> instead</li>
<li><code>appendToBody</code> on dropdowns and pickers is deprecated</li>
<li><code>list</code> and <code>item</code> are not valid web-component or angular standard tags.  use <code>novo-list</code> and <code>novo-list-item</code>, but use <code>novo-option</code> and <code>novo-optgroup</code> inside of a dropdown.</li>
<li><code>list</code> and <code>item</code> are not valid web-component or angular standard tags.  use <code>novo-list</code> and <code>novo-list-item</code>, but use <code>novo-option</code> and <code>novo-optgroup</code> inside of a dropdown.</li>
<li><code>range</code> input on <code>date-picker</code> is deprecated please use <code>mode=&quot;range&quot;</code></li>
<li><code>week</code> input on <code>date-picker</code> is deprecated please use <code>mode=&quot;week&quot;</code></li>
</ul>
<h2 id="thanks">Thank you <a href="https://bullhorn.github.io/novo-elements/docs/#/updates/v6#thanks">#</a></h2>
<p>Last but certainly not least, a big <em>Thank You</em> to the contributors of Novo Elements throughout the years. For this release a special shout out to our developers Dan Voegelin and Charles Barnes, the automation team for helping us test the changes: Jon Eman, Tiffany Bertolozzi, Tony Phu and Ashley Schroeder, and our UX Team include but not limited to: Jon Braun, Madeliene Valcour, Katie Todd, Daniel Long, Angela Wang and Gloria Nam.</p>
`,
  host: { class: 'markdown-page' }
})
export class February2022Page {
  public params: any = {};
}


@Component({
  selector: 'field-interactions-page',
  template: `<h1>Field Interactions</h1>
<p>Field Interactions is a simple API that allows you to modify NovoForms based on field changes.</p>
<p>The Field Interaction API gives you a simple to use API object when writing your field interaction functions.</p>
<p>Look below for samples of what you can do with this API...</p>
<h2>Configuration</h2>
<p>Inspect Form Configuration on Field Getting Current Context Write Field Interaction</p>
<h5>Inspect Form</h5>
<p>There is a special <code>data-control-key</code> property added to the <code>novo-control</code> element.</p>
<p>You can inspec the DOM at the input and see the property to know what 'key' to use in the API</p>
<p>By default, if you are writing a Field Interaction for the active field you can use <code>API.getActiveKey()</code></p>
<h5>Configuration on Field</h5>
<pre><code>event: 'change|focus|blur|init', script: Function, invokeOnInit?: boolean
</code></pre>
<p>The Field Interactions are configured on a per control basis. There are three scenarios in which they will be fired: 'change', 'focus' and 'blur'.</p>
<p>init -- gets fired only when the form is initialized</p>
<p>change -- gets fired when the value of the form control changes</p>
<p>focus -- gets fired when the field gets focused</p>
<p>blur -- gets fired when the field loses focus</p>
<p>The script function represents the function that will be fired for the event, you can see examples of these below.</p>
<p>Lastly, 'invokeOnInit' will also trigger the Field Interaction when the form is created as well. A script can check <code>API.isInvokedOnInit</code> to determine if the current call is due to initialization or due to a user change.</p>
<h5>Getting Current Context</h5>
<p>If you need to write Field Interaction based on if you are on an add or edit page, or you need to know the current entity type and ID then you can get those via:</p>
<p>edit: 'API.isEdit'</p>
<p>entity: 'API.currentEntity'</p>
<p>id: 'API.currentEntityId'</p>
<h5>Write Field Interaction</h5>
<p>Writing Field Interactions is very simple. You can refer to all the examples below. If you ever get stuck, you can always open a <a href="https://github.com/bullhorn/novo-elements/issues">Github Issue</a> as well!</p>
<p><strong>IMPORTANT</strong></p>
<p>When writing field interactions, you will be writing everything only the contents of the function. <strong>You do not</strong> write the surrounding function.</p>
<p><strong>All field interactions must be written in vanilla ES5 as well!</strong></p>
<h2>Basic API</h2>
<p>Validation Mark Fields as Required Field Calculations &amp; Modification Hide / Show Fields Enable / Disable Fields Messaging / Notifications Modifying Config on Static Pickers / Selects Using Globals Async Interactions Confirm Changes Adding / Removing Fields Add Tooltip</p>
<h5>Validation</h5>
<p>If you need to perform some custom validation on a field, you can use the API to quickly mark a field as invalid</p>
<p><code-example example="fi-validation"></code-example></p>
<h5>Mark Fields as Required</h5>
<p>If you need to mark fields as required or not based on some changes in the form, you can use the API to do that!</p>
<p><code-example example="fi-required"></code-example></p>
<h5>Field Calculations &amp; Modification</h5>
<p>If you need to do some custom calculations based off other form data, you can do that easily with the API</p>
<p><code-example example="fi-calculation"></code-example></p>
<h5>Hide / Show Fields</h5>
<p>You can also hide or show certain fields based on interaction with the form. Note that the value is still present in the form's value</p>
<p><code-example example="fi-hide-show"></code-example></p>
<h5>Enable / Disable Fields</h5>
<p>You can also enable or disable certain fields based on interaction with the form. Note that the value is still present in the form's value but does not respond to any interactions</p>
<p><code-example example="fi-enable-disable"></code-example></p>
<h5>Messaging / Notifications</h5>
<p>You can trigger messages to users in a few different ways using the API</p>
<p><code-example example="fi-messaging"></code-example></p>
<h5>Modifying Config on Static Pickers / Selects</h5>
<p>You have full control over the control, you can modify the options array of static pickers and select controls!</p>
<p><code-example example="fi-modify-options"></code-example></p>
<h5>Modifying Config on Static Pickers / Selects to mimic an Entity Picker</h5>
<p>You can modify a picker added to a form via field interactions to look like an entity picker!</p>
<p><code-example example="fi-modify-added-picker"></code-example></p>
<h5>Using Globals</h5>
<p>Using the config from above, you can figure the API to have a set of global variables that you can key off of inside your field interactions</p>
<p><code-example example="fi-globals"></code-example></p>
<h5>Async Interactions</h5>
<p>You can perform async interactions and keep the form from saving by setting a loading state</p>
<p><code-example example="fi-async"></code-example></p>
<h5>Confirm Changes</h5>
<p>You can prompt the user if they want to update the field or not too!</p>
<p><code-example example="fi-confirm"></code-example></p>
<h5>Adding / Removing Fields</h5>
<p>With the API you can quickly add and remove fields on the form.</p>
<p><strong>ONLY WORKS WITH DYNAMIC FORMS</strong></p>
<p><code-example example="fi-adding-removing"></code-example></p>
<h5>Add Tooltip</h5>
<p>You are able to dynamically change a field's tooltip.</p>
<p><code-example example="fi-tooltip"></code-example></p>
<h5>Interacting with Nested Forms</h5>
<p>Field Interactions can navigate nested forms to interact with parent and child forms. This example uses the Form Group component which contains an array of nested forms that are kept in sync by field interactions.</p>
<p><code-example example="fi-nested"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class FieldInteractionsPage {
  public params: any = {};
}


@Component({
  selector: 'pipes-page',
  template: `<h1>Pipes</h1>
<p>Utility and helpful pipes.</p>
<h5>Pluralize <a href="https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/pipes/plural">(source)</a></h5>
<p>Makes works plural or vice-versa</p>
<p><code-example example="pluralize"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class PipesPage {
  public params: any = {};
}


@Component({
  selector: 'security-page',
  template: `<h1>Security</h1>
<p>The security component for this library a simple wrapper to implement ngIf functionality with a Security service.</p>
<h4>Configuration</h4>
<p>blah blah blah</p>
<p><code-example example="security"></code-example></p>
`,
  host: { class: 'markdown-page' }
})
export class SecurityPage {
  public params: any = {};
}

const routes: Routes = [
  //{ path: '', component: Home, data: {} },
  { path: 'utils/ace editor', component: AceEditorPage, data: { title: 'Ace Editor', section: 'utils' } },
  { path: 'utils/quick note', component: QuickNotePage, data: { title: 'Quick Note', section: 'utils' } },
  { path: 'utils/field-interactions', component: FieldInteractionsPage, data: { title: 'Field Interactions', section: 'utils' } },
  { path: 'utils/pipes', component: PipesPage, data: { title: 'Pipes', section: 'utils' } },
  { path: 'utils/security', component: SecurityPage, data: { title: 'Security', section: 'utils' } },
  {
    path: 'components/agenda',
    component: TabsLayout,
    data: { title: 'Agenda', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: AgendaDesignPage },
      { path: 'develop', component: AgendaDevelopPage },
      { path: 'examples', component: AgendaExamplesPage },
      { path: '', redirectTo: '/components/agenda/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/aside',
    component: TabsLayout,
    data: { title: 'Aside', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null, tag: 'new' },
    children: [
      { path: 'design', component: AsideDesignPage },
      { path: 'develop', component: AsideDevelopPage },
      { path: 'examples', component: AsideExamplesPage },
      { path: '', redirectTo: '/components/aside/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/autocomplete',
    component: TabsLayout,
    data: { title: 'Autocomplete', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null, tag: 'new' },
    children: [
      { path: 'design', component: AutocompleteDesignPage },
      { path: 'develop', component: AutocompleteDevelopPage },
      { path: 'examples', component: AutocompleteExamplesPage },
      { path: '', redirectTo: '/components/autocomplete/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/avatar',
    component: TabsLayout,
    data: { title: 'Avatar', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null, tag: 'new' },
    children: [
      { path: 'design', component: AvatarDesignPage },
      { path: 'develop', component: AvatarDevelopPage },
      { path: 'examples', component: AvatarExamplesPage },
      { path: '', redirectTo: '/components/avatar/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/breadcrumbs',
    component: TabsLayout,
    data: { title: 'Breadcrumbs', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null, tag: 'new' },
    children: [
      { path: 'design', component: BreadcrumbDesignPage },
      { path: 'develop', component: BreadcrumbDevelopPage },
      { path: 'examples', component: BreadcrumbExamplesPage },
      { path: '', redirectTo: '/components/breadcrumbs/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/button',
    component: TabsLayout,
    data: { title: 'Button', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: ButtonDesignPage },
      { path: 'develop', component: ButtonDevelopPage },
      { path: 'examples', component: ButtonExamplesPage },
      { path: '', redirectTo: '/components/button/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/calendar',
    component: TabsLayout,
    data: { title: 'Calendar', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: CalendarDesignPage },
      { path: 'develop', component: CalendarDevelopPage },
      { path: 'examples', component: CalendarExamplesPage },
      { path: '', redirectTo: '/components/calendar/design', pathMatch: 'full' },
    ]
  },
  { path: 'components/data-table', component: DataTablePage, data: { title: 'Data Table', section: 'components' } },
  {
    path: 'components/dropdown',
    component: TabsLayout,
    data: { title: 'Dropdown', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: DropdownDesignPage },
      { path: 'develop', component: DropdownDevelopPage },
      { path: 'examples', component: DropdownExamplesPage },
      { path: '', redirectTo: '/components/dropdown/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/field',
    component: TabsLayout,
    data: { title: 'Field', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null, tag: 'experiment' },
    children: [
      { path: 'design', component: FieldDesignPage },
      { path: 'develop', component: FieldDevelopPage },
      { path: 'examples', component: FieldExamplesPage },
      { path: '', redirectTo: '/components/field/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/icon',
    component: TabsLayout,
    data: { title: 'Icon', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: IconDesignPage },
      { path: 'develop', component: IconDevelopPage },
      { path: 'examples', component: IconExamplesPage },
      { path: '', redirectTo: '/components/icon/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/loading',
    component: TabsLayout,
    data: { title: 'Loading', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: LoadingDesignPage },
      { path: 'develop', component: LoadingDevelopPage },
      { path: 'examples', component: LoadingExamplesPage },
      { path: '', redirectTo: '/components/loading/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/menu',
    component: TabsLayout,
    data: { title: 'Menu', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: MenuDesignPage },
      { path: 'develop', component: MenuDevelopPage },
      { path: 'examples', component: MenuExamplesPage },
      { path: '', redirectTo: '/components/menu/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/modals',
    component: TabsLayout,
    data: { title: 'Modals', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: ModalDesignPage },
      { path: 'develop', component: ModalDevelopPage },
      { path: 'examples', component: ModalExamplesPage },
      { path: '', redirectTo: '/components/modals/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/non ideal state',
    component: TabsLayout,
    data: { title: 'Non Ideal State', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: NonIdealStateDesignPage },
      { path: 'develop', component: NonIdealStateDevelopPage },
      { path: 'examples', component: NonIdealStateExamplesPage },
      { path: '', redirectTo: '/components/non ideal state/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/pop over',
    component: TabsLayout,
    data: { title: 'Pop Over', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: PopoverDesignPage },
      { path: 'develop', component: PopoverDevelopPage },
      { path: 'examples', component: PopoverExamplesPage },
      { path: '', redirectTo: '/components/pop over/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/progress',
    component: TabsLayout,
    data: { title: 'Progress', section: 'components', pages: [{ title: 'Usage', route: './usage'},{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'usage', component: ProgressUsagePage },
      { path: 'design', component: ProgressDesignPage },
      { path: 'develop', component: ProgressDevelopPage },
      { path: 'examples', component: ProgressExamplesPage },
      { path: '', redirectTo: '/components/progress/usage', pathMatch: 'full' },
    ]
  },
  { path: 'components/search', component: SearchPage, data: { title: 'Search', section: 'components' } },
  { path: 'components/slides', component: SlidesPage, data: { title: 'Slides', section: 'components' } },
  { path: 'components/switch', component: SwitchPage, data: { title: 'Switch', section: 'components' } },
  { path: 'components/tabbed-group-picker', component: TabbedGroupPickerPage, data: { title: 'Tabbed Group Picker', section: 'components' } },
  { path: 'components/table', component: TablePage, data: { title: 'Table', section: 'components', tag: 'deprecated' } },
  {
    path: 'components/tip well',
    component: TabsLayout,
    data: { title: 'Tip Well', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: TipWellDesignPage },
      { path: 'develop', component: TipWellDevelopPage },
      { path: 'examples', component: TipWellExamplesPage },
      { path: '', redirectTo: '/components/tip well/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/toaster',
    component: TabsLayout,
    data: { title: 'Toaster', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: ToasterDesignPage },
      { path: 'develop', component: ToasterDevelopPage },
      { path: 'examples', component: ToasterExamplesPage },
      { path: '', redirectTo: '/components/toaster/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/toolbar',
    component: TabsLayout,
    data: { title: 'Toolbar', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null, tag: 'new' },
    children: [
      { path: 'design', component: ToolbarDesignPage },
      { path: 'develop', component: ToolbarDevelopPage },
      { path: 'examples', component: ToolbarExamplesPage },
      { path: '', redirectTo: '/components/toolbar/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'components/tooltip',
    component: TabsLayout,
    data: { title: 'Tooltip', section: 'components', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: TooltipDesignPage },
      { path: 'develop', component: TooltipDevelopPage },
      { path: 'examples', component: TooltipExamplesPage },
      { path: '', redirectTo: '/components/tooltip/design', pathMatch: 'full' },
    ]
  },
  { path: 'components', component: ComponentsPage, data: { title: 'Components', section: 'src' } },
  { path: 'design', component: DesignPage, data: { title: 'Design', section: 'src' } },
  { path: 'form-controls', component: FormControlsPage, data: { title: 'Form Controls', section: 'src' } },
  { path: 'home', component: HomePage, data: { title: 'Introduction', section: 'src' } },
  { path: 'layouts', component: LayoutsPage, data: { title: 'Layouts', section: 'src' } },
  { path: 'patterns', component: PatternsPage, data: { title: 'Patterns', section: 'src' } },
  { path: 'templates', component: TemplatesPage, data: { title: 'Templates', section: 'src' } },
  { path: 'design/colors', component: ColorsPage, data: { title: 'Colors', section: 'design' } },
  { path: 'design/composition', component: CompositionPage, data: { title: 'Composition', section: 'design' } },
  { path: 'design/iconography', component: IconographyPage, data: { title: 'Iconography', section: 'design' } },
  { path: 'design/spacing', component: SpacingPage, data: { title: 'Spacing', section: 'design' } },
  { path: 'design/typography', component: TypographyPage, data: { title: 'Typography', section: 'design' } },
  {
    path: 'form-controls/chips',
    component: TabsLayout,
    data: { title: 'Chips', section: 'form-controls', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: ChipsDesignPage },
      { path: 'develop', component: ChipsDevelopPage },
      { path: 'examples', component: ChipsExamplesPage },
      { path: '', redirectTo: '/form-controls/chips/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'form-controls/date picker',
    component: TabsLayout,
    data: { title: 'Date Picker', section: 'form-controls', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: DatePickerDesignPage },
      { path: 'develop', component: DatePickerDevelopPage },
      { path: 'examples', component: DatePickerExamplesPage },
      { path: '', redirectTo: '/form-controls/date picker/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'form-controls/date time picker',
    component: TabsLayout,
    data: { title: 'Date Time Picker', section: 'form-controls', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: DateTimePickerDesignPage },
      { path: 'develop', component: DateTimePickerDevelopPage },
      { path: 'examples', component: DateTimePickerExamplesPage },
      { path: '', redirectTo: '/form-controls/date time picker/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'form-controls/time picker',
    component: TabsLayout,
    data: { title: 'Time Picker', section: 'form-controls', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: TimePickerDesignPage },
      { path: 'develop', component: TimePickerDevelopPage },
      { path: 'examples', component: TimePickerExamplesPage },
      { path: '', redirectTo: '/form-controls/time picker/design', pathMatch: 'full' },
    ]
  },
  { path: 'form-controls/color-picker', component: ColorPickerPage, data: { title: 'Color Picker', section: 'form-controls' } },
  { path: 'form-controls/editor', component: EditorPage, data: { title: 'Editor', section: 'form-controls' } },
  { path: 'form-controls/form-groups', component: FormGroupsPage, data: { title: 'Form Groups', section: 'form-controls' } },
  { path: 'form-controls/form', component: FormPage, data: { title: 'Form', section: 'form-controls' } },
  { path: 'form-controls/multi-picker', component: MultiPickerPage, data: { title: 'Multi Picker', section: 'form-controls' } },
  { path: 'form-controls/picker', component: PickerPage, data: { title: 'Picker', section: 'form-controls' } },
  { path: 'form-controls/radio-buttons', component: RadioButtonsPage, data: { title: 'Radio Buttons', section: 'form-controls' } },
  { path: 'form-controls/select', component: SelectPage, data: { title: 'Select', section: 'form-controls' } },
  { path: 'form-controls/tiles', component: TilesPage, data: { title: 'Tiles', section: 'form-controls' } },
  { path: 'form-controls/value', component: ValuePage, data: { title: 'Value', section: 'form-controls' } },
  {
    path: 'layouts/card',
    component: TabsLayout,
    data: { title: 'Card', section: 'layouts', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: CardDescriptionPage },
    children: [
      { path: 'design', component: CardDesignPage },
      { path: 'develop', component: CardDevelopPage },
      { path: 'examples', component: CardExamplesPage },
      { path: '', redirectTo: '/layouts/card/design', pathMatch: 'full' },
    ]
  },
  { path: 'layouts/expansion', component: ExpansionPage, data: { title: 'Expansion', section: 'layouts' } },
  { path: 'layouts/header', component: HeaderPage, data: { title: 'Header', section: 'layouts' } },
  { path: 'layouts/list', component: ListPage, data: { title: 'List', section: 'layouts' } },
  { path: 'layouts/sidenav', component: SidenavPage, data: { title: 'Sidenav', section: 'layouts', tag: 'new' } },
  { path: 'layouts/stepper', component: StepperPage, data: { title: 'Stepper', section: 'layouts' } },
  {
    path: 'layouts/tabs',
    component: TabsLayout,
    data: { title: 'Tabs', section: 'layouts', pages: [{ title: 'Design', route: './design'},{ title: 'Develop', route: './develop'},{ title: 'Examples', route: './examples'}], description: null },
    children: [
      { path: 'design', component: TabsDesignPage },
      { path: 'develop', component: TabsDevelopPage },
      { path: 'examples', component: TabsExamplesPage },
      { path: '', redirectTo: '/layouts/tabs/design', pathMatch: 'full' },
    ]
  },
  {
    path: 'patterns/patterns',
    component: TabsLayout,
    data: { title: 'Patterns', section: 'patterns', pages: [{ title: 'Test', route: './test'},{ title: 'Native Forms', route: './native-forms'}], description: null },
    children: [
      { path: 'test', component: PatternsTestPage },
      { path: 'native-forms', component: PatternsNativeFormsPage },
      { path: '', redirectTo: '/patterns/patterns/test', pathMatch: 'full' },
    ]
  },
  { path: 'updates/v6', component: February2022Page, data: { title: 'February 2022', section: 'updates', tag: 'new' } },
  // Catch All
  { path: '**', redirectTo: '/home', data: {} },
];

export const PAGE_LIST = [
  AceEditorPage,AgendaDesignPage,AgendaDevelopPage,AgendaExamplesPage,AsideDesignPage,AsideDevelopPage,AsideExamplesPage,AutocompleteDesignPage,AutocompleteDevelopPage,AutocompleteExamplesPage,AvatarDesignPage,AvatarDevelopPage,AvatarExamplesPage,BreadcrumbDesignPage,BreadcrumbDevelopPage,BreadcrumbExamplesPage,ButtonDesignPage,ButtonDevelopPage,ButtonExamplesPage,CalendarDesignPage,CalendarDevelopPage,CalendarExamplesPage,ComponentsPage,DataTablePage,DropdownDesignPage,DropdownDevelopPage,DropdownExamplesPage,FieldDesignPage,FieldDevelopPage,FieldExamplesPage,IconDesignPage,IconDevelopPage,IconExamplesPage,LoadingDesignPage,LoadingDevelopPage,LoadingExamplesPage,MenuDesignPage,MenuDevelopPage,MenuExamplesPage,ModalDesignPage,ModalDevelopPage,ModalExamplesPage,NonIdealStateDesignPage,NonIdealStateDevelopPage,NonIdealStateExamplesPage,PopoverDesignPage,PopoverDevelopPage,PopoverExamplesPage,ProgressDesignPage,ProgressDevelopPage,ProgressExamplesPage,ProgressUsagePage,QuickNotePage,SearchPage,SlidesPage,SwitchPage,TabbedGroupPickerPage,TablePage,TipWellDesignPage,TipWellDevelopPage,TipWellExamplesPage,ToasterDesignPage,ToasterDevelopPage,ToasterExamplesPage,ToolbarDesignPage,ToolbarDevelopPage,ToolbarExamplesPage,TooltipDesignPage,TooltipDevelopPage,TooltipExamplesPage,ColorsPage,CompositionPage,DesignPage,IconographyPage,SpacingPage,TypographyPage,ChipsDesignPage,ChipsDevelopPage,ChipsExamplesPage,ColorPickerPage,DatePickerDesignPage,DatePickerDevelopPage,DatePickerExamplesPage,DateTimePickerDesignPage,DateTimePickerDevelopPage,DateTimePickerExamplesPage,EditorPage,FormControlsPage,FormGroupsPage,FormPage,MultiPickerPage,PickerPage,RadioButtonsPage,SelectPage,TilesPage,TimePickerDesignPage,TimePickerDevelopPage,TimePickerExamplesPage,ValuePage,HomePage,CardDescriptionPage,CardDesignPage,CardDevelopPage,CardExamplesPage,ExpansionPage,HeaderPage,LayoutsPage,ListPage,SidenavPage,StepperPage,TabsDesignPage,TabsDevelopPage,TabsExamplesPage,PatternsNativeFormsPage,PatternsTestPage,PatternsPage,TemplatesPage,February2022Page,FieldInteractionsPage,PipesPage,SecurityPage
];

@NgModule({
  declarations: PAGE_LIST,
  entryComponents: PAGE_LIST,
  imports: [RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled' }), NovoElementsModule, NovoExamplesModule, NovoExamplesSharedModule],
  exports: [RouterModule],
})
export class NovoExamplesRoutesModule {}
