Typography
==========

Roboto, not robotic.
--------------------

Roboto's refined letterforms combine geometry with open, rounded features to create a structured, yet friendly typeface. It maintains a human\-like quality while expressing a clean and modern aesthetic.

[Roboto Typeface on Google Fonts](https://www.google.com/fonts/specimen/Roboto)

![](assets/images/TypographyPageIcon.svg)

###### Design Principle: Clarity

Proper line length, adequate white space, and appropriate line breaks are necessary to preserve readability, rhythm, and overall clarity.

##### Line Height

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

These lines are too close for comfort

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

Thumbs up for great readability

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

I'm losing focus with all this space

###### Design Principle: Balance

Typographic balance is critical to readability and understanding information hierarchy. The weight and size of the font helps determine which element on a page receives a user’s attention first.

##### Line Length

* * *

30

Short lines interrupt the reader's rhythm

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

* * *

55\-75

Optimal line length for readability

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

* * *

100

Difficult to jump to the next line

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor.

###### How does this work with responsive design?

Line length is always relative to its font\-size. This means that if a font scales up or down in sizing (relative to its device's screen size) the line length will automatically scale with it. Line length is about maintaining a comfortable reading flow and rhythm from line to line.  
  
**When implementing**, native line length will always be secondary to the width of the text's container. This means that if a screen's width is smaller than the text's native line length, the text will wrap early.

Styles
------

There a number of general styles that are present throughout the application. To maintain consistency, these styles should be adhered to as much as possible.

Header 1
========

Roboto **Size:** 2.5em (35px) **Weight:** 400 **Margin:** 0 **Padding:** 0.45em 0 0.35em

Header 2
--------

Roboto **Size:** 2em (28px) **Weight:** 500 **Margin:** 0 **Padding:** 0.75em 0 0.3em

### Header 3

Roboto **Size:** 1.75em (24px) **Weight:** 300 **Margin:** 0 **Padding:** 0.6em 0 0.4em

#### Header 4

Roboto **Size:** 1.375em (19.25px) **Weight:** 400 **Margin:** 0 **Padding:** 0.75em 0 0.5em

##### Header 5

Roboto **Size:** 1.125em (15.75px) **Weight:** 700 **Margin:** 0 **Padding:** 0.75em 0 0.25em **Transform:** UPPERCASE

###### Header 6

Roboto **Size:** 1.125em (15.75px) **Weight:** 500 **Margin:** 0 **Padding:** 0.75em 0 0.25em

Caption

#### Section Header

Large Section Header with Icon
------------------------------

###### Small Section Header with Icon

    
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p>
            Body
            </p>
            <hr>
            <span class="caption">Caption</span>
            <h4 class="novo-section-header">Section Header</h4>
            <h2 class="novo-section-header">
              <i class="bhi-section">
              Large Section Header with Icon
            </h2>
            <h6 class="novo-section-header">
              <i class="bhi-idea">
              Small Section Header with Icon
            </h6>