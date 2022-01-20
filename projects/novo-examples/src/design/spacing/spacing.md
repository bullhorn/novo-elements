# Spacing

## Consistency at Scale

Novo Elements makes use of spacing variables to create consistency across all of the components in our system. This consistency contributes to a subconscious feeling of order and harmony, while also eliminating guesswork for designers and developers.

We use a base-10px grid for consistent and easy to use sizing. Since units use ten pixels as the base, 1(rem) equals 10px, 2 equals 20px, .5 equals 5px (and so on).

## Usage

::::: grid 2

<novo-box padding="xl">
  <novo-text>
    When building layouts and components, our spacing directives hook into a Theme file for returning values. This allows us to constrain the possibilities available to a component to only what's defined in our spacing system and thus reduce drift.
  </novo-text>
</novo-box>

:::: figure

<img src="assets/images/SpacingSizeUnits.png" width="250">

<novo-text>
  <novo-icon color="neutral">board</novo-icon>
  <strong>Spacing Variables</strong>
</novo-text>
<novo-text>Use Spacing Variables not pixels</novo-text>
::::
:::::

::::: grid 2
:::: figure

```html
<novo-box margin="xs" padding="xl"></novo-box>
```

::: do Always use theme variables
Explain this
:::
::::

:::: figure

```html
<novo-box margin="10px" padding="10px"></novo-box>
```

::: dont Never set explicit pixels for spacing
Explain this
:::
::::
:::::

## Our Variables (& Mix-ins?)

Apply spacing constants to components to set element's padding and margins.

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
    <pre><code>.box {\n  @include novo-padding-medium(); // use mixin \n  margin: $spacing-xs; // or use scss variables\n  padding: $spacing-xl;\n} }}</code></pre>
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
