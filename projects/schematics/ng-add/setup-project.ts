import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getAppModulePath,
  getProjectFromWorkspace,
  getProjectMainFile,
  getProjectStyleFile,
  hasNgModuleImport,
} from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addFontsToIndex } from './fonts/novo-fonts';
import { Schema } from './schema';

/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';

/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';

/**
 * Scaffolds the basics of a Novo Elements application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.module
 */
export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    if (project.projectType === 'application') {
      return chain([addAnimationsModule(options), addFontsToIndex(options), addNovoAppStyles(options)]);
    }
    context.logger.warn(
      'Novo Elements has been set up in your workspace. There is no additional setup ' +
        'required for consuming Novo Elements in your library project.\n\n' +
        'If you intended to run the schematic on a different project, pass the `--project` ' +
        'option.',
    );
    return;
  };
}

/**
 * Adds an animation module to the root module of the specified project. In case the "animations"
 * option is set to false, we still add the `NoopAnimationsModule` because otherwise various
 * components of Novo Elements will throw an exception.
 */
function addAnimationsModule(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (options.animations) {
      // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
      // message that makes the user aware of the fact that we won't automatically set up
      // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
      // is already configured, we would cause unexpected behavior and runtime exceptions.
      if (hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
        context.logger.error(
          `Could not set up "${browserAnimationsModuleName}" ` + `because "${noopAnimationsModuleName}" is already imported.`,
        );
        context.logger.info(`Please manually set up browser animations.`);
        return;
      }

      addModuleImportToRootModule(host, browserAnimationsModuleName, '@angular/platform-browser/animations', project);
    } else if (!hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
      // Do not add the NoopAnimationsModule module if the project already explicitly uses
      // the BrowserAnimationsModule.
      addModuleImportToRootModule(host, noopAnimationsModuleName, '@angular/platform-browser/animations', project);
    }
  };
}

/**
 * Adds custom Novo styles to the project style file. The custom CSS sets up the Montserrat font
 * and reset the default browser body margin.
 */
function addNovoAppStyles(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);
    const logger = context.logger;

    if (!styleFilePath) {
      logger.error(`Could not find the default style file for this project.`);
      logger.info(`Consider manually adding the Montserrat font to your CSS.`);
      logger.info(`More information at https://fonts.google.com/specimen/Montserrat`);
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      logger.error(`Could not read the default style file within the project ` + `(${styleFilePath})`);
      logger.info(`Please consider manually setting up the Montserrat font.`);
      return;
    }

    const htmlContent = buffer.toString();
    const insertion =
      '\n' + `html, body { height: 100%; }\n` + `body { margin: 0; font-family: Montserrat, "Helvetica Neue", sans-serif; }\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}
