---
section: Components
page: Tip Well
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

The TipWell is a small container for displaying help text.  It is meant to be shown only once and dismissable to the user.  Typical usage is to provide additional detail on data being displayed or explain how a feature works to the user for their first time using it.

</div>

<img src="assets/images/TipWellOverview.png"/>

<div>

### Use When

- (✓) The help text is no longer needed after the user has read the contents.
- (✓) To provide additional context and links related to the data to educate the user on how the a feature works.

</div>
<div>

### Don′t Use When

- (x) Don’t use it show error states, use novo-error or a banner.
- (x) Don’t use it to display tutorials.
- (x) Don’t use it to explain text fields, use novo-hint.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ToastBanners.png" width="450">

<div>

1. **Icon**<br>
   Use an Icon to quickly convey context of the action. ie. If a file is ready to download, show a download or file icon.

1. **Container**<br>
   Used to quickly describe the action that occurred. eg. File Uploaded!

1. **Dismiss Action**<br>
   A longer description of the outcome of the related action.

</div>
</novo-grid>


## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
