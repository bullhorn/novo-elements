# Typography

<novo-grid columns="200px 1fr" align="start" gap="2rem">

![](assets/images/TypographyPageIcon.svg)

> ## Gotham, Montserrat.
>
> Bullhorn's Branding uses the Gotham font family, this is not a free font. With that in mind we build novo-elements to work with both the Gotham font and Monteserrat which is a very similar font face available on Google Fonts.  Both fonts provide a characters that are clean and easy to read with good weight when the font-size is small.
>
> [Gotham Font Overview](https://www.typography.com/fonts/gotham/overview)
>
> [Montserrat Typeface on Google Fonts](https://fonts.google.com/specimen/Montserrat)

</novo-grid>

## Best Practices

- (✓) Limit line length to 70–80 characters.
- (✓) Paragraph text should be a minimum of 14pt.
- (✓) Small fonts need more spacing.
- (✓) Check your line spacing when you change font or font size.

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
    <code class="tc-positive">&lt;novo-text&gt;...&lt;/novo-text&gt;</code> or <code class="tc-negative">@include novo-body-text()</code>
  </typedef-snippet>
</typedef-example>

##### How does this work with responsive design?

Line length is always relative to its font\-size. This means that if a font scales up or down in sizing (relative to its device's screen size) the line length will automatically scale with it. Line length is about maintaining a comfortable reading flow and rhythm from line to line.

**When implementing**, native line length will always be secondary to the width of the text's container. This means that if a screen's width is smaller than the text's native line length, the text will wrap early.

## Styles

There a number of general styles that are present throughout the application. To maintain consistency, these styles should be adhered to as much as possible. Most text components can be adjusted by setting the `size`, `length`, `weight`, or `color` attributes, these values are all theme aware based on novo design tokens.

## Body Text

Body text is available in three different sizes. Use body text to present the bulk of a page’s content. All body text uses a line height of 1.375 relative to the font size.

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

## Title Text

Titles are available in six different sizes. To create an optical balance between the six levels, titles are set in two weights: Condensed Thin and Condensed Light. All titles use a line height of 1.375 relative to the font size.

Title mixins and constants can be applied to any HTML element, but we recommend using \<h1\> through \<h6\> elements for titles to ensure markup is semantic and accessible.

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

## Label Text

These are the base colors of the application.

<code-example example="label"></code-example>

## Caption Text

These are the base colors of the application.

<code-example example="caption"></code-example>

## Link Text

These are the base colors of the application.

<code-example example="link"></code-example>
