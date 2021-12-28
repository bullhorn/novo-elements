import { extname } from '@angular-devkit/core';
import { DevkitMigration, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';

/** Migration that changes variable file location. */
export class ImportVariableFileMigration extends DevkitMigration<null> {
  enabled = this.targetVersion === TargetVersion.V6;

  /*override*/ visitStylesheet(stylesheet: ResolvedResource): void {
    const extension = extname(stylesheet.filePath);
    if (extension === '.scss' || extension === '.sass') {
      const content = stylesheet.content;
      const replaceObj: any = {
        '~novo-elements/styles/global/variables': 'styles/variables',
        '../../../../../node_modules/novo-elements/styles/global/variables': 'styles/variables',
        'styles/global/variables': 'styles/variables',
      };
      var replaceStrings = new RegExp(Object.keys(replaceObj).join('|'), 'gi');
      const migratedContent = content.replace(replaceStrings, function (matched) {
        return replaceObj[matched];
      });

      if (migratedContent && migratedContent !== content) {
        this.fileSystem.edit(stylesheet.filePath).remove(0, stylesheet.content.length).insertLeft(0, migratedContent);
      }
    }
  }
}
