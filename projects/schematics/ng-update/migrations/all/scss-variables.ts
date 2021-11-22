import { extname } from '@angular-devkit/core';
import {
  DevkitMigration,
  findAllSubstringIndices,
  getVersionUpgradeData,
  ResolvedResource,
  TargetVersion,
  UpgradeData,
  WorkspacePath,
} from '@angular/cdk/schematics';
import { ScssVariableData } from '../../data';

/** Migration that replaces scss variable names that have changed. */
export class ScssVariablesMigration extends DevkitMigration<UpgradeData> {
  // @ts-ignore
  data: ScssVariableData[] = getVersionUpgradeData(this, 'scssVariables' as keyof UpgradeData);

  enabled = this.targetVersion === TargetVersion.V6;

  /*override*/ visitStylesheet(stylesheet: ResolvedResource): void {
    const extension = extname(stylesheet.filePath);
    if (extension === '.scss' || extension === '.css') {
      this.data.forEach((data) => {
        if (data.replaceIn && !data.replaceIn.stylesheet) {
          return;
        }
        findAllSubstringIndices(stylesheet.content, data.replace)
          .map((offset) => stylesheet.start + offset)
          .forEach((start) => this._replaceSelector(stylesheet.filePath, start, data));
      });
    }
  }

  private _replaceSelector(filePath: WorkspacePath, start: number, data: ScssVariableData) {
    this.fileSystem.edit(filePath).remove(start, data.replace.length).insertRight(start, data.replaceWith);
  }
}
