import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

/** Create a base project used for testing. */
export async function createTestProject(
  runner: SchematicTestRunner,
  projectType: 'application' | 'library',
  appOptions = {},
  tree?: Tree,
): Promise<UnitTestTree> {
  const opts = { name: 'workspace', version: '6.0.0', newProjectRoot: 'projects', };
  const workspaceTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', opts, tree);
  return runner.runExternalSchematic('@schematics/angular', projectType, { name: 'novo', ...appOptions }, workspaceTree);
}
