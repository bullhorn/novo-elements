import { extname } from '@angular-devkit/core';
import { DevkitMigration, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';

/** Migration that changes variable file location. */
export class ImportVariableFileMigration extends DevkitMigration<null> {
  enabled = this.targetVersion === TargetVersion.V6;

  /*override*/ visitStylesheet(stylesheet: ResolvedResource): void {
    const extension = extname(stylesheet.filePath);
    if (extension === '.scss' || extension === '.sass') {
      const content = stylesheet.content;
      const migratedContent = content.replace('~novo-elements/styles/global/variables', '~novo-elements/styles/variables');

      if (migratedContent && migratedContent !== content) {
        this.fileSystem.edit(stylesheet.filePath).remove(0, stylesheet.content.length).insertLeft(0, migratedContent);
      }
    }
  }
}
