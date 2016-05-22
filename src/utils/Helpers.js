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
/**
 * Interpolates a string with vars passed to it
 * @param  {String} str   The string to interpolate
 * @param  {Object} props The params to replace in string.
 * @return {String}
 */
export function interpolate(str, props) {
    return str.replace(/\$([\w\.]+)/g, (original, key) => {
        let keys = key.split('.');
        let value = props[keys.shift()];
        while (keys.length && value !== undefined) {
            let k = keys.shift();
            value = k ? value[k] : `${value}.`;
        }
        return value !== undefined ? value : original;
    });
}
