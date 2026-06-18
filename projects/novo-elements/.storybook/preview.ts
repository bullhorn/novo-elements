import type { Preview } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { _VIEW_REPEATER_STRATEGY, _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { BrowserGlobalRef, ComponentUtils, DateFormatService, GlobalRef, NOVO_ELEMENTS_LABELS_PROVIDERS, OptionsService } from 'novo-elements/services';
import { FieldInteractionApi, FormUtils } from 'novo-elements/elements/form';
import { NovoToastService } from 'novo-elements/elements/toast';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        // `FieldInteractionApi` depends on `HttpClient` (presumably for
        // dynamic-form remote validation hooks). Provide it the standard
        // Angular way so the form/dynamic-form stories instantiate.
        provideHttpClient(),
        // Several novo-elements services are `@Injectable()` without
        // `providedIn: 'root'`; the library expects consumers to register
        // them at the root injector. Add them here as stories surface
        // demand.
        //
        //   NovoLabelService — used by sliders, date pickers, form error
        //     copy. Bundled as NOVO_ELEMENTS_LABELS_PROVIDERS.
        //   DateFormatService — injected directly by NovoDatePickerInput,
        //     NovoDateTimePickerInput, etc.
        //   FieldInteractionApi — injected by NovoControlElement (form
        //     controls). Without it, form/dynamic-form stories crash.
        //   NovoToastService — transitively required by FieldInteractionApi.
        //   ComponentUtils — transitively required by NovoToastService.
        //   FormUtils — also required by FieldInteractionApi.
        //   OptionsService — transitively required by FormUtils.
        //   GlobalRef → BrowserGlobalRef — injected by `<novo-file-input>`
        //     (and presumably other window-aware components). Without it
        //     the FileControl renders blank in the form story.
        ...NOVO_ELEMENTS_LABELS_PROVIDERS,
        DateFormatService,
        FieldInteractionApi,
        NovoToastService,
        ComponentUtils,
        FormUtils,
        OptionsService,
        { provide: GlobalRef, useClass: BrowserGlobalRef },
        // CDK Table strategy — required at the root injector for `<novo-data-table>`
        // and any other CdkTable consumer. BrowserModule provides this transitively,
        // but Storybook's applicationConfig only uses standalone providers, so the
        // token is missing. Without it, Tier 4 data-table stories throw NG0201 at
        // the StorybookWrapperComponent and rows render empty.
        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
      ],
    }),
    moduleMetadata({
      // Forms modules are available globally — form-control stories
      // (Checkbox / Radio / Switch / Chips / Select / Date pickers / …)
      // can use `[(ngModel)]` and reactive bindings without per-story
      // module imports.
      imports: [FormsModule, ReactiveFormsModule],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // Enable the built-in Code panel in the bottom dock so each story's
      // rendered source is viewable in Canvas mode (not just inside Docs).
      codePanel: true,
    },
    options: {
      // Sort top-level categories and components alphabetically by their
      // `title` (e.g. `Elements/Avatar` < `Elements/Button` < `Form Controls/…`).
      // Stories within the same component keep their export order so the
      // curated UsageGuide → Default → … → Playground sequence is preserved.
      storySort: (a, b) => {
        if (a.title === b.title) return 0;
        return a.title.localeCompare(b.title);
      },
    },
  },
};

export default preview;
