import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { ClassNamesMigration } from './migrations/all/class-names';
import { ScssVariablesMigration } from './migrations/all/scss-variables';
import { DirectImportsMigration } from './migrations/v6/direct-imports';
import { ImportVariableFileMigration } from './migrations/v6/import-variable-file';
import { RewriteDropdownMigration } from './migrations/v6/rewrite-dropdown-template';
import { elementsUpgradeData } from './upgrade-data';

const novoElementMigrations: NullableDevkitMigration[] = [
  ScssVariablesMigration,
  ImportVariableFileMigration,
  RewriteDropdownMigration,
  DirectImportsMigration,
  ClassNamesMigration,
  // MiscClassInheritanceMigration,
  // MiscClassNamesMigration,
  // MiscImportsMigration,
  // MiscPropertyNamesMigration,
  // MiscTemplateMigration,
];

/** Entry point for the migration schematics with target of Novo Elements v6 */
export function updateToV6(): Rule {
  return createMigrationSchematicRule(TargetVersion.V6, novoElementMigrations, elementsUpgradeData, onMigrationComplete);
}

/** Entry point for the migration schematics with target of Novo Elements v7 */
export function updateToV7(): Rule {
  return createMigrationSchematicRule(TargetVersion.V7, novoElementMigrations, elementsUpgradeData, onMigrationComplete);
}

/** Function that will be called when the migration completed. */
function onMigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
  context.logger.info('');
  context.logger.info(`  ✓  Updated Novo Elements to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
        'output above and fix these issues manually.',
    );
  }
}
