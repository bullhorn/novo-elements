import { DevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { novoElementsModuleSpecifier } from '../../../ng-update/typescript/module-specifiers';

const NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR =
  `Imports from Novo Elements should import ` + `specific symbols rather than importing the entire library.`;

/**
 * Migration that updates imports to root library. Submodules will be added next version
 */
export class DirectImportsMigration extends DevkitMigration<null> {
  printer = ts.createPrinter();

  // Only enable this rule if the migration targets version 6.
  enabled = this.targetVersion === TargetVersion.V6;

  visitNode(declaration: ts.Node): void {
    // Only look at import declarations.
    if (!ts.isImportDeclaration(declaration) || !ts.isStringLiteralLike(declaration.moduleSpecifier)) {
      return;
    }

    const importLocation = declaration.moduleSpecifier.text;
    // If the import module is not novo-elements, skip the check.
    if (!importLocation.startsWith(novoElementsModuleSpecifier) || importLocation === novoElementsModuleSpecifier) {
      return;
    }

    // If no import clause is found, or nothing is named as a binding in the
    // import, add failure saying to import symbols in clause.
    if (!declaration.importClause || !declaration.importClause.namedBindings) {
      this.createFailureAtNode(declaration, NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR);
      return;
    }

    // All named bindings in import clauses must be named symbols, otherwise add
    // failure saying to import symbols in clause.
    if (!ts.isNamedImports(declaration.importClause.namedBindings)) {
      this.createFailureAtNode(declaration, NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR);
      return;
    }

    // If no symbols are in the named bindings then add failure saying to
    // import symbols in clause.
    if (!declaration.importClause.namedBindings.elements.length) {
      this.createFailureAtNode(declaration, NO_IMPORT_NAMED_SYMBOLS_FAILURE_STR);
      return;
    }

    // Whether the existing import declaration is using a single quote module specifier.
    const singleQuoteImport = declaration.moduleSpecifier.getText()[0] === `'`;
    const elements = declaration.importClause.namedBindings.elements;
    const newImport = ts.createImportDeclaration(
      undefined,
      undefined,
      ts.createImportClause(undefined, ts.createNamedImports(elements)),
      createStringLiteral(`${novoElementsModuleSpecifier}`, singleQuoteImport),
    );
    const newImportStatement = this.printer.printNode(ts.EmitHint.Unspecified, newImport, declaration.getSourceFile());

    const filePath = this.fileSystem.resolve(declaration.moduleSpecifier.getSourceFile().fileName);
    const recorder = this.fileSystem.edit(filePath);

    // Perform the replacement that switches the import statement.
    recorder.remove(declaration.getStart(), declaration.getWidth());
    recorder.insertRight(declaration.getStart(), newImportStatement);
  }
}

/**
 * Creates a string literal from the specified text.
 * @param text Text of the string literal.
 * @param singleQuotes Whether single quotes should be used when printing the literal node.
 */
function createStringLiteral(text: string, singleQuotes: boolean): ts.StringLiteral {
  const literal = ts.createStringLiteral(text);
  (literal as any).singleQuote = singleQuotes;
  return literal;
}
