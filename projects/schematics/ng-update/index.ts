import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { elementsUpgradeData } from './upgrade-data';

const novoElementMigrations: NullableDevkitMigration[] = [
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
