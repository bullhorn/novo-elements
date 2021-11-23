import {
  ClassNameUpgradeData,
  DevkitMigration,
  getVersionUpgradeData,
  isExportSpecifierNode,
  isImportSpecifierNode,
  isNamespaceImportNode,
  UpgradeData,
} from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { isNovoElementsExportDeclaration, isNovoElementsImportDeclaration } from '../../typescript/module-specifiers';

export class ClassNamesMigration extends DevkitMigration<UpgradeData> {
  /** Change data that upgrades to the specified target version. */
  // @ts-ignore
  data: ClassNameUpgradeData[] = getVersionUpgradeData(this, 'classNames');

  /**
   * List of identifier names that have been imported from `@ng-zorro-antd`
   * in the current source file and therefore can be considered trusted.
   */
  trustedIdentifiers: Set<string> = new Set();

  /** List of namespaces that have been imported from `@ng-zorro-antd`. */
  trustedNamespaces: Set<string> = new Set();

  // Only enable the migration rule if there is upgrade data.
  enabled = this.data.length !== 0;

  visitNode(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      this.visitIdentifier(node);
    }
  }

  /** Method that is called for every identifier inside of the specified project. */
  private visitIdentifier(identifier: ts.Identifier): void {
    if (!this.data.some((data) => data.replace === identifier.text)) {
      return;
    }

    if (isNamespaceImportNode(identifier) && isNovoElementsImportDeclaration(identifier)) {
      this.trustedNamespaces.add(identifier.text);

      return this._createFailureWithReplacement(identifier);
    }

    if (isExportSpecifierNode(identifier) && isNovoElementsExportDeclaration(identifier)) {
      return this._createFailureWithReplacement(identifier);
    }

    if (isImportSpecifierNode(identifier) && isNovoElementsImportDeclaration(identifier)) {
      this.trustedIdentifiers.add(identifier.text);

      return this._createFailureWithReplacement(identifier);
    }

    if (ts.isPropertyAccessExpression(identifier.parent)) {
      const expression = identifier.parent.expression;

      if (ts.isIdentifier(expression) && this.trustedNamespaces.has(expression.text)) {
        return this._createFailureWithReplacement(identifier);
      }
    } else if (this.trustedIdentifiers.has(identifier.text)) {
      return this._createFailureWithReplacement(identifier);
    }
  }

  /** Creates a failure and replacement for the specified identifier. */
  private _createFailureWithReplacement(identifier: ts.Identifier): void {
    const classData = this.data.find((data) => data.replace === identifier.text)!;
    const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);

    this.fileSystem
      .edit(filePath)
      .remove(identifier.getStart(), identifier.getWidth())
      .insertRight(identifier.getStart(), classData.replaceWith);
  }
}
