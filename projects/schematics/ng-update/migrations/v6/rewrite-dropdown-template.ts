import { DevkitMigration, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

const DROPDOWN_REGEXP = /<novo-dropdown.*>(.|\n)*?<\/novo-dropdown>/gim;

/**
 * Migration that walks through every string literal, template and stylesheet in order
 * to migrate outdated element selectors to the new one.
 */
export class RewriteDropdownMigration extends DevkitMigration<null> {
  enabled = this.targetVersion === TargetVersion.V6;

  visitNode(node: ts.Node): void {
    if (ts.isStringLiteralLike(node)) {
      this._visitStringLiteralLike(node);
    }
  }

  visitTemplate(template: ResolvedResource): void {
    const content = template.content;
    // const fileContents: string = this.fileSystem.read(filePath)!;
    const matches = content.match(DROPDOWN_REGEXP) || [];
    const migratedContent = matches.reduce((a, b) => a.replace(b, this._rewriteDropDown(b)), content);

    if (migratedContent && migratedContent !== content) {
      this.fileSystem.edit(template.filePath).remove(template.start, content.length).insertRight(template.start, migratedContent);
    }
  }

  private _visitStringLiteralLike(node: ts.StringLiteralLike) {
    if (node.parent && node.parent.kind !== ts.SyntaxKind.CallExpression) {
      return;
    }

    const textContent = node.getText();
    const filePath = this.fileSystem.resolve(node.getSourceFile().fileName);

    // const fileContents: string = this.fileSystem.read(filePath)!;
    const matches = textContent.match(DROPDOWN_REGEXP) || [];
    const migratedContent = matches.reduce((a, b) => a.replace(b, this._rewriteDropDown(b)), textContent);

    if (migratedContent && migratedContent !== textContent) {
      this.fileSystem.edit(filePath).remove(node.getStart(), textContent.length).insertRight(node.getStart(), migratedContent);
    }
  }

  private _rewriteDropDown(contents: string) {
    const replacer = new ReplaceChain(contents);
    return replacer
      .replace(/<(\/?)list(?:(?!-))/gi, '<$1novo-optgroup')
      .replace(/<(\/?)item(?:(?!-))/gi, '<$1novo-option')
      .replace(/\(action\)=/gi, '(click)=')
      .value();
  }
}

class ReplaceChain {
  constructor(private source: string) {}
  replace(searchValue: string | RegExp, replaceValue: string) {
    this.source = this.source.replace(searchValue, replaceValue);
    return this;
  }
  value() {
    return this.source;
  }
}
