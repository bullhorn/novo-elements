/**
 * Swallows an event to stop further execution
 * @param event
 */
export function swallowEvent(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
}
