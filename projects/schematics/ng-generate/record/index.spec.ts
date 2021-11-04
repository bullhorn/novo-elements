import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestApp, getFileContent } from '@angular/cdk/schematics/testing';
import { COLLECTION_PATH } from '../../paths';
import { Schema } from './schema';

describe('novo-record-schematic', () => {
  let runner: SchematicTestRunner;

  const baseOptions: Schema = {
    name: 'foo',
    project: 'novo',
  };

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', COLLECTION_PATH);
  });

  function expectNavigationSchematicModuleImports(tree: UnitTestTree) {
    const moduleContent = getFileContent(tree, '/projects/novo/src/app/app.module.ts');
    expect(moduleContent).toMatch(/LayoutModule,\s+/);
    expect(moduleContent).toMatch(/NovoElementsModule,\s+/);
    expect(moduleContent).toContain(`import { LayoutModule } from '@angular/cdk/layout';`);
    expect(moduleContent).toContain(`import { NovoElementsModule } from 'novo-elements';`);
  }

  it('should create record files and add them to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchematicAsync('record', baseOptions, app).toPromise();
    const files = tree.files;

    expect(files).toContain('/projects/novo/src/app/foo/foo.component.css');
    expect(files).toContain('/projects/novo/src/app/foo/foo.component.html');
    expect(files).toContain('/projects/novo/src/app/foo/foo.component.spec.ts');
    expect(files).toContain('/projects/novo/src/app/foo/foo.component.ts');

    const moduleContent = getFileContent(tree, '/projects/novo/src/app/app.module.ts');
    expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
  });

  it('should add record imports to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchematicAsync('record', baseOptions, app).toPromise();
    expectNavigationSchematicModuleImports(tree);
  });

  it('should support `nav` as schematic alias', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchematicAsync('record', baseOptions, app).toPromise();
    expectNavigationSchematicModuleImports(tree);
  });

  it('should throw if no name has been specified', async () => {
    const appTree = await createTestApp(runner);

    await expectAsync(runner.runSchematicAsync('record', { project: 'novo' }, appTree).toPromise()).toBeRejectedWithError(
      /required property 'name'/,
    );
  });

  describe('style option', () => {
    it('should respect the option value', async () => {
      const tree = await runner.runSchematicAsync('record', { style: 'scss', ...baseOptions }, await createTestApp(runner)).toPromise();

      expect(tree.files).toContain('/projects/novo/src/app/foo/foo.component.scss');
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const tree = await runner.runSchematicAsync('record', baseOptions, await createTestApp(runner, { style: 'less' })).toPromise();

      expect(tree.files).toContain('/projects/novo/src/app/foo/foo.component.less');
    });
  });

  describe('inlineStyle option', () => {
    it('should respect the option value', async () => {
      const tree = await runner.runSchematicAsync('record', { inlineStyle: true, ...baseOptions }, await createTestApp(runner)).toPromise();

      expect(tree.files).not.toContain('/projects/novo/src/app/foo/foo.component.css');
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const tree = await runner.runSchematicAsync('record', baseOptions, await createTestApp(runner, { inlineStyle: true })).toPromise();

      expect(tree.files).not.toContain('/projects/novo/src/app/foo/foo.component.css');
    });
  });

  describe('inlineTemplate option', () => {
    it('should respect the option value', async () => {
      const tree = await runner
        .runSchematicAsync('record', { inlineTemplate: true, ...baseOptions }, await createTestApp(runner))
        .toPromise();

      expect(tree.files).not.toContain('/projects/novo/src/app/foo/foo.component.html');
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const tree = await runner.runSchematicAsync('record', baseOptions, await createTestApp(runner, { inlineTemplate: true })).toPromise();

      expect(tree.files).not.toContain('/projects/novo/src/app/foo/foo.component.html');
    });
  });

  describe('skipTests option', () => {
    it('should respect the option value', async () => {
      const tree = await runner.runSchematicAsync('record', { skipTests: true, ...baseOptions }, await createTestApp(runner)).toPromise();

      expect(tree.files).not.toContain('/projects/novo/src/app/foo/foo.component.spec.ts');
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const tree = await runner.runSchematicAsync('record', baseOptions, await createTestApp(runner, { skipTests: true })).toPromise();

      expect(tree.files).not.toContain('/projects/novo/src/app/foo/foo.component.spec.ts');
    });
  });
  describe('router option', () => {
    it('should respect the option value if routing true', async () => {
      const tree = await runner.runSchematicAsync('record', { routing: true, ...baseOptions }, await createTestApp(runner)).toPromise();
      const template = tree.readContent('/projects/novo/src/app/foo/foo.component.html');
      expect(template).toContain('<a mat-list-item routerLink="/">Link 1</a>');
    });
    it('should respect the option value if routing false', async () => {
      const tree = await runner.runSchematicAsync('record', { routing: false, ...baseOptions }, await createTestApp(runner)).toPromise();
      const template = tree.readContent('/projects/novo/src/app/foo/foo.component.html');
      expect(template).toContain('<a mat-list-item href="#">Link 1</a>');
    });
  });
});
