import { getExportDeclaration, getImportDeclaration } from '@angular/cdk/schematics';
import * as ts from 'typescript';

/** Name of the Novo Elements module specifier. */
export const novoElementsModuleSpecifier = 'novo-elements';

/** Whether the specified node is part of an Novo Elements or CDK import declaration. */
export function isNovoElementsImportDeclaration(node: ts.Node) {
  return isNovoElementsDeclaration(getImportDeclaration(node));
}

/** Whether the specified node is part of an Novo Elements or CDK import declaration. */
export function isNovoElementsExportDeclaration(node: ts.Node) {
  return isNovoElementsDeclaration(getExportDeclaration(node));
}

/** Whether the declaration is part of Novo Elements. */
function isNovoElementsDeclaration(declaration: ts.ImportDeclaration | ts.ExportDeclaration) {
  if (!declaration.moduleSpecifier) {
    return false;
  }

  const moduleSpecifier = declaration.moduleSpecifier.getText();
  return moduleSpecifier.indexOf(novoElementsModuleSpecifier) !== -1;
}
