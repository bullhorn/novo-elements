import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { appendHtmlElementToHead, getProjectFromWorkspace, getProjectIndexFiles } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from '../schema';

/** Adds the Material Design fonts to the index HTML file. */
export function addFontsToIndex(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const projectIndexFiles = getProjectIndexFiles(project);

    if (!projectIndexFiles.length) {
      throw new SchematicsException('No project index HTML file could be found.');
    }

    const preconnect = `<link rel="preconnect" href="https://fonts.gstatic.com">`;
    const fonts = [
      'https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900',
      'https://fonts.googleapis.com/css?family=Fira+Code:300,400,500,600,700',
      'https://cdn.jsdelivr.net/npm/@bullhorn/bullhorn-icons/fonts/Bullhorn-Glyphicons.css',
    ];

    projectIndexFiles.forEach((indexFilePath) => {
      appendHtmlElementToHead(host, indexFilePath, preconnect);

      fonts.forEach((font) => {
        appendHtmlElementToHead(host, indexFilePath, `<link href="${font}" rel="stylesheet">`);
      });
    });
  };
}
