# Non Ideal State [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/non-ideal-state)

Non-ideal UI states inform the user that some content is unavailable. There are several types of non-ideal states, including:

- **Empty state**: when a list has no data in it yet, or a container's contents have been intentionally removed.
- **Loading state**: when waiting for data to load, Best practice is to show a spinner for this state, with optional explanatory text below the spinner.
- **Error state**: its broken (for instance, 404 and 500 HTTP errors). In this case, best practice is to add a call to action directing the user what to do next.

## Examples

##### Basic Usage

Basic use-case is to display an icon, message, and reason for this state to occur. And provide a call to action for the user.

<code-example example="non-ideal-state-usage"></code-example>

The call to action doesn't necessarily need to be a button, for example:

<code-example example="non-ideal-state-search-usage"></code-example>
