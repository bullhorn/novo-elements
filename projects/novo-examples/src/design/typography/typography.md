# Typography

## Roboto, not robotic.

Roboto's refined letterforms combine geometry with open, rounded features to create a structured, yet friendly typeface. It maintains a human\-like quality while expressing a clean and modern aesthetic.

[Roboto Typeface on Google Fonts](https://www.google.com/fonts/specimen/Roboto)

![](assets/images/TypographyPageIcon.svg)

### Design Principle: Clarity

Proper line length, adequate white space, and appropriate line breaks are necessary to preserve readability, rhythm, and overall clarity.

##### Line Height

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

These lines are too close for comfort

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

Thumbs up for great readability

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

I'm losing focus with all this space

### Design Principle: Balance

Typographic balance is critical to readability and understanding information hierarchy. The weight and size of the font helps determine which element on a page receives a user’s attention first.

##### Line Length

---

In general when determinining readability we try to stay within the optimal line length of **55-75** characters, this varies based on the layout the text is contained within as well as the size of the font. Becauase of the condensed nature of the data we generally present most common is for the text to fill its container but when necessary we apply these principles.

- 🚫 **30** Short lines interrupt the reader's rhythm
- ✅ **55\-75** Optimal line length for readability
- 🚫 **100** Difficult to jump to the next line

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
    <code class="tc-positive">&lt;novo-text&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text-medium()</code>
  </typedef-snippet>
</typedef-example>

##### How does this work with responsive design?

Line length is always relative to its font\-size. This means that if a font scales up or down in sizing (relative to its device's screen size) the line length will automatically scale with it. Line length is about maintaining a comfortable reading flow and rhythm from line to line.

**When implementing**, native line length will always be secondary to the width of the text's container. This means that if a screen's width is smaller than the text's native line length, the text will wrap early.

## Styles

There a number of general styles that are present throughout the application. To maintain consistency, these styles should be adhered to as much as possible.

## Body Text

Body text is available in three different sizes. Use body text to present the bulk of a page’s content. All body text uses a line height of 1.375 relative to the font size.

<typedef-example>
  <typedef-content>
    <novo-text>
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Body Medium</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text-medium()</code>
  </typedef-snippet>
</typedef-example>

<typedef-example>
  <typedef-content>
    <novo-text size="large">
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Body Large</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text size="large"&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text-large()</code>
  </typedef-snippet>
</typedef-example>

<typedef-example>
  <typedef-content>
    <novo-text size="small">
      The Highland (Scottish Gaelic: Bò Ghàidhealach; Scots: Hielan coo) is a Scottish breed of rustic cattle. It originated in the <novo-link>Scottish Highlands</novo-link> and the Outer Hebrides islands of Scotland and has long horns and a long shaggy coat. It is a hardy breed, bred to withstand the intemperate conditions in the region. The first herd-book dates from 1885; two different types – a smaller island type, usually black, and a larger mainland type, usually dun – were registered as a single breed. It is reared primarily for beef, and has been exported to several other countries.<sup>[1]</sup>
    </novo-text>
  </typedef-content>
  <typedef-specs>
    <novo-label>Body Large</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
      <dt>Max Line Length </dt><dd>550px</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-text size="small"&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text-small()</code>
  </typedef-snippet>
</typedef-example>

## Title Text

Titles are available in six different sizes. To create an optical balance between the six levels, titles are set in two weights: Condensed Thin and Condensed Light. All titles use a line height of 1.2 relative to the font size.

Title mixins and constants can be applied to any HTML element, but we recommend using \<h1\> through \<h6\> elements for titles to ensure markup is semantic and accessible.

<typedef-example>
  <typedef-content>
    <novo-title>
      Creating an incredible customer experience
    </novo-title>
  </typedef-content>
  <typedef-specs>
    <novo-label>Title Medium</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-title&gt;...&lt;/novo-title&gt;</code> or <code class="tc-negative">@include novo-title-text-medium()</code>
  </typedef-snippet>
</typedef-example>

<typedef-example>
  <typedef-content>
    <novo-title size="large">
      Creating an incredible customer experience
    </novo-title>
  </typedef-content>
  <typedef-specs>
    <novo-label>Title Large</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-title size="large"&gt;...&lt;/novo-title&gt;</code> or <code class="tc-negative">@include novo-title-text-large()</code>
  </typedef-snippet>
</typedef-example>

<typedef-example>
  <typedef-content>
    <novo-title size="small">
      Creating an incredible customer experience
    </novo-title>
  </typedef-content>
  <typedef-specs>
    <novo-label>Title Small</novo-label>
    <dl>
      <dt>Font Size       </dt><dd>1.2rem</dd>
      <dt>Line Height     </dt><dd>1.375 (28px)</dd>
      <dt>Font Weight     </dt><dd>300</dd>
    </dl>
  </typedef-specs>
  <typedef-snippet>
    <code class="tc-positive">&lt;novo-title size="small"&gt;...&lt;/novo-title&gt;</code> or <code class="tc-negative">@include novo-title-text-small()</code>
  </typedef-snippet>
</typedef-example>

## Label Text

These are the base colors of the application.

<code-example example="label"></code-example>

## Caption Text

These are the base colors of the application.

<code-example example="caption"></code-example>

## Link Text

These are the base colors of the application.

<code-example example="link"></code-example>
