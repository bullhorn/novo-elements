# Iconography

## Certified Pixel\-Perfect

<novo-grid columns="1fr 200px" gap="2rem">
  <novo-text>Icons are used to represent an action or concept through the most simplistic imagery possible. Icons give additional context to written material, allowing the user to quickly comprehend any given concept. The icons are designed on a highly specific grid to ensure maximum clarity even at a small size. Their design is friendly, human, and bold.</novo-text>
  <img src="assets/images/IconographyPageIcon.svg" width="64px">
</novo-grid>

[Bullhorn's Icon Set](http://bullhorn.github.io/bullhorn-icons/)

<iconset-example></iconset-example>

## Visual Guidelines

An icon will always have slightly larger dimensions than text when they are paired together. This ensures that the icon is visually the same size as the text and that it scales proportionally.

##### Base sizing

Icons placed next to typography should alays follow this convention.

Bullhorn Glyphicons **Size:** 1.29em **Padding:** .25em **Border Radius:** .625em

##### Scaling

Make sure to scale the corner radius appropriately when enlarging or decreasing the size of the icon.

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

##### Padding

To preserve readability, icons should have sufficient padding from the edges of their containers. Additionally, the icons should be visually centered in their containers.

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
