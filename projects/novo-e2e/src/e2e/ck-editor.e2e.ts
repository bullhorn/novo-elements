import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample } from '../utils/SelectorUtil';
import { verifyPresent, verifyTextIncludes } from '../utils/VerifyUtil';
import { ckEditorSelectors } from '../utils/CKEditorUtil';

describe('CKEditor Demo Page', () => {
    const url = formControlsUrl('ck-editor');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        const exampleSections = ['basic-editor', 'minimal-editor'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    const editorTypes = [
        { type: 'basic', label: 'Basic' },
        { type: 'minimal', label: 'Minimal' },
    ];
    editorTypes.forEach(({ type, label }) => {
        describe(`${label} Editor`, () => {
            before(async () => {
                await browser.refresh();
                await scrollIntoView(ckEditorSelectors.editor(type));
            });

            it('should display the editor', async () => {
                await verifyPresent(ckEditorSelectors.editor(type), `${label} editor`);
            });

            it('should display the insert button', async () => {
                await verifyPresent(ckEditorSelectors.insertButton(type), `${label} editor insert button`);
            });

            it('should display the initial pre-rendered value', async () => {
                await verifyTextIncludes(ckEditorSelectors.valueDisplay(type), 'I AM A PRE-RENDERED VALUE', `${label} editor value display`);
            });

            it('should update the HTML display after clicking insert', async () => {
                await click(ckEditorSelectors.insertButton(type));
                await verifyTextIncludes(ckEditorSelectors.htmlDisplay(type), 'Hello World', `${label} editor HTML display`);
            });
        });
    });
});
