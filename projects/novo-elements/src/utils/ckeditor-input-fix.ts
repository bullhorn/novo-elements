
export function fixCkEditorInputEvent(ckEditorInstance: any): () => void {
    let debounceInputTimeout: ReturnType<typeof setTimeout> | null;
    const onCkBodyInput = (event: InputEvent) => {
        if (debounceInputTimeout) {
            clearTimeout(debounceInputTimeout);
        }
        debounceInputTimeout = setTimeout(() => {
            // change event did not process this input event (first known from spellcheck menu options)
            ckEditorInstance.fire('change');
            debounceInputTimeout = null;
        }, 250);
    };
    ckEditorInstance.on('instanceReady', (event: any) => {
        ckEditorInstance.document.$.body.addEventListener('input', onCkBodyInput);
    });
    return () => {
        ckEditorInstance.document.$.body.removeEventListener('input', onCkBodyInput);
    }
}
