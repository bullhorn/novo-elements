# Iconography

## Certified Pixel\-Perfect

<novo-grid columns="1fr 200px">
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
  <figure-example theme="success">
    <img src="assets/images/IconographyScalingDo.svg">
    <novo-label>
      <novo-icon color="success">check-circle-filled</novo-icon>
      DO
    </novo-label>
    <novo-text>Always maintain the proportions</novo-text>
  </figure-example>

  <figure-example theme="negative">
    <img src="assets/images/IconographyScalingDont.svg">
    <novo-label>
      <novo-icon color="negative">close</novo-icon>
      DON'T
    </novo-label>
    <novo-text>That doesn't look like a rectangle</novo-text>
  </figure-example>
</novo-grid>

##### Padding

To preserve readability, icons should have sufficient padding from the edges of their containers. Additionally, the icons should be visually centered in their containers.

<novo-grid columns="2">
  <figure-example theme="success">
    <img src="assets/images/IconographyPaddingDo.svg">
    <novo-label>
      <novo-icon color="success">check-circle-filled</novo-icon>
      DO
    </novo-label>
    <novo-text>It's good to have some breathing room</novo-text>
  </figure-example>

  <figure-example theme="negative">
    <img src="assets/images/IconographyPaddingDont.svg">
    <novo-label>
      <novo-icon color="negative">close</novo-icon>
      DON'T
    </novo-label>
    <novo-text>It's getting crowded in here</novo-text>
  </figure-example>
</novo-grid>
