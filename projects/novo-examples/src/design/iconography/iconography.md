Iconography
===========

Certified Pixel\-Perfect
------------------------

Icons are used to represent an action or concept through the most simplistic imagery possible. Icons give additional context to written material, allowing the user to quickly comprehend any given concept. The icons are designed on a highly specific grid to ensure maximum clarity even at a small size. Their design is friendly, human, and bold.

[Bullhorn's Icon Set](http://bullhorn.github.io/bullhorn-icons/)

![](assets/images/IconographyPageIcon.svg)

Icons with Typography
---------------------

An icon will always have slightly larger dimensions than text when they are paired together. This ensures that the icon is visually the same size as the text and that it scales proportionally.

##### Base sizing

Icons placed next to typography should alays follow this convention.

Bullhorn Glyphicons **Size:** 1.29em **Padding:** .25em **Border Radius:** .625em

Company Name
============

##### Padding

Icons should have sufficient padding when followed by text.
<div class="padding">
    <div>
        <h4><i class="bhi-circle"></i>Alice Hughes</h4>
        <h6><i class="bhi-location"></i>Boston, MA</h6>
        <span class="not-accepted"><i class="bhi-close-o"></i>I feel squished</span>
    </div>
    <div>
        <h4><i class="bhi-circle"></i>Alice Hughes</h4>
        <h6><i class="bhi-location"></i>Boston, MA</h6>
        <span class="accepted"><i class="bhi-check"></i>Much better</span>
    </div>
</div>

#### Alice Hughes

###### Boston, MA

I feel squished

#### Alice Hughes

###### Boston, MA

Much better

Entity Icons
------------

##### Standard Entity Icons

Used with corresponding entity color.

Lead

Contact

Company

Candidate

Opportunity

Job

Placement

    
                <i theme="entity" class="bhi-lead lead"></i>
                <h6>Lead</h6>
                <i theme="entity" class="bhi-person contact"></i>
                <h6>Contact</h6>
                <i theme="entity" class="bhi-company company"></i>
                <h6>Company</h6>
                <i theme="entity" class="bhi-candidate candidate"></i>
                <h6>Candidate</h6>
                <i theme="entity" class="bhi-opportunity opportunity"></i>
                <h6>Opportunity</h6>
                <i theme="entity" class="bhi-job job"></i>
                <h6>Job</h6>
                <i theme="entity" class="bhi-star placement"></i>
                <h6>Placement</h6>
            

Contained Icons
---------------

##### Scaling

Make sure to scale the corner radius appropriately when enlarging or decreasing the size of the icon.

![](assets/images/IconographyScalingDont.svg)

That doesn't look like a rectangle

![](assets/images/IconographyScalingDo.svg)

Always maintain the proportions

##### Padding

To preserve readability, icons should have sufficient padding from the edges of their containers. Additionally, the icons should be visually centered in their containers.

![](assets/images/IconographyPaddingDont.svg)

It's getting crowded in here

![](assets/images/IconographyPaddingDo.svg)

It's good to have some breathing room

##### Examples

Heading One
===========

Heading Two
-----------

### Heading Three

#### Heading Four

##### Heading Five

###### Heading Six

    
                <h1><i theme="contained" class="bhi-lead lead"></i>Heading One</h1>
                <h2><i theme="contained" class="bhi-person contact"></i>Heading Two</h2>
                <h3><i theme="contained" class="bhi-company company"></i>Heading Three</h3>
                <h4><i theme="contained" class="bhi-candidate candidate"></i>Heading Four</h4>
                <h5><i theme="contained" class="bhi-opportunity opportunity"></i>Heading Five</h5>
                <h6><i theme="contained" class="bhi-job job"></i>Heading Six</h6>