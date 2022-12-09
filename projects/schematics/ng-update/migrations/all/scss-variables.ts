import { extname } from '@angular-devkit/core';
import {
  DevkitMigration,
  getVersionUpgradeData,
  ResolvedResource,
  TargetVersion,
  UpgradeData,
  WorkspacePath,
} from '@angular/cdk/schematics';
import { ScssVariableData } from '../../data';

type Match = {
  index: number;
  length: number;
};

/** Migration that replaces scss variable names that have changed. */
export class ScssVariablesMigration extends DevkitMigration<UpgradeData> {
  // @ts-ignore
  data: ScssVariableData[] = getVersionUpgradeData(this, 'scssVariables' as keyof UpgradeData);

  enabled = this.targetVersion > TargetVersion.V6;

  /*override*/ visitStylesheet(stylesheet: ResolvedResource): void {
    const extension = extname(stylesheet.filePath);
    if (extension === '.scss' || extension === '.css') {
      this.data.forEach((data) => {
        if (data.replaceIn && !data.replaceIn.stylesheet) {
          return;
        }

        const search = data.replace instanceof RegExp ? data.replace : this._escapeRegExp(data.replace);

        this._findAllStringIndices(stylesheet.content, search)
          .map(({ index, length }) => ({ index: stylesheet.start + index, length }))
          .forEach((match) => this._replaceSelector(stylesheet.filePath, match, data));
      });
    }
  }

  private _replaceSelector(filePath: WorkspacePath, match: Match, data: ScssVariableData) {
    this.fileSystem.edit(filePath).remove(match.index, match.length).insertRight(match.index, data.replaceWith);
  }

  /** Finds all start indices of the given search string in the input string. */
  private _findAllStringIndices = (input: string, pattern: RegExp): Match[] => {
    const result: Match[] = [];
    let match;
    while ((match = pattern.exec(input))) {
      result.push({ index: match.index, length: match[1].length });
    }
    return result;
  };

  private _escapeRegExp = (pattern: string) => {
    const excaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(${excaped})`, 'gmi');
  };
}
