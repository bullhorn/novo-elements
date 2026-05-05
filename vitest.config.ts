import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig, Plugin } from 'vitest/config';

/**
 * Angular's JIT compiler cannot statically reflect signal initializers like
 * `val = input.required<T>()` at runtime. This plugin prepends the equivalent
 * decorator so Angular's JIT recognizes them.
 */
function fixSignalInitializerDecorators(): Plugin {
  const SIGNAL_RE =
    /^(\s*)(?:(?:public|private|protected|readonly|override|abstract|static)\s+)*(\w+)(?:\s*:\s*[^=]+)?\s*=\s*(input|model|output|viewChild|viewChildren|contentChild|contentChildren)(\.required)?\s*[<(]/;

  function extractSelector(line: string, kindStart: number): string | null {
    const rest = line.slice(kindStart);
    const parenStart = rest.indexOf('(');
    if (parenStart < 0) return null;
    let depth = 0;
    let i = parenStart;
    const argStart = parenStart + 1;
    for (; i < rest.length; i++) {
      const ch = rest[i];
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0) break;
      } else if (ch === ',' && depth === 1) return rest.slice(argStart, i).trim();
    }
    if (i === rest.length) return null;
    return rest.slice(argStart, i).trim();
  }

  return {
    name: 'fix-signal-initializer-decorators',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts') || id.includes('node_modules')) return null;
      if (!/\b(input|model|output|viewChild|viewChildren|contentChild|contentChildren)\s*[.(<]/.test(code)) return null;
      if (!/@(Component|Directive)\s*\(/.test(code)) return null;

      const lines = code.split('\n');
      const decoratorsUsed = new Set<string>();
      let modified = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/@(Input|Output|ViewChild|ViewChildren|ContentChild|ContentChildren)\s*\(/.test(line)) continue;
        const match = SIGNAL_RE.exec(line);
        if (!match) continue;
        const [, indent, , kind, required] = match;
        const isRequired = !!required;

        if (kind === 'output') {
          lines[i] = `${indent}@Output() ${line.trimStart()}`;
          decoratorsUsed.add('Output');
        } else if (kind === 'model') {
          const opts = `{ isSignal: true${isRequired ? ', required: true' : ''} }`;
          lines[i] = `${indent}@Input(${opts} as any) @Output() ${line.trimStart()}`;
          decoratorsUsed.add('Input');
          decoratorsUsed.add('Output');
        } else if (kind === 'input') {
          const opts = `{ isSignal: true${isRequired ? ', required: true' : ''} }`;
          lines[i] = `${indent}@Input(${opts} as any) ${line.trimStart()}`;
          decoratorsUsed.add('Input');
        } else if (kind === 'viewChild' || kind === 'viewChildren' || kind === 'contentChild' || kind === 'contentChildren') {
          const decoratorName = kind.charAt(0).toUpperCase() + kind.slice(1);
          const kindIdx = line.indexOf(kind + (required ? '.required' : ''));
          const selector = extractSelector(line, kindIdx) ?? "'_unknown_'";
          lines[i] =
            `${indent}@${decoratorName}(${selector}, { isSignal: true${isRequired ? ', required: true' : ''} } as any) ${line.trimStart()}`;
          decoratorsUsed.add(decoratorName);
        }
        modified = true;
      }

      if (!modified) return null;

      let updated = lines.join('\n');
      const coreImportRe = /import\s+\{([^}]*)\}\s+from\s+['"]@angular\/core['"]/;
      const m = coreImportRe.exec(updated);
      if (m) {
        const existing = new Set(
          m[1]
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        );
        let added = false;
        for (const d of decoratorsUsed) {
          if (!existing.has(d)) {
            existing.add(d);
            added = true;
          }
        }
        if (added) {
          updated = updated.replace(coreImportRe, `import { ${[...existing].join(', ')} } from '@angular/core'`);
        }
      }

      return { code: updated, map: null };
    },
  };
}

/**
 * Normalizes SWC's synthetic delegate constructor to the shape Angular's
 * isDelegateCtor expects, restoring inheritance of DI metadata.
 */
function fixSwcDelegateCtor(): Plugin {
  const DELEGATE_CTOR = /constructor\s*\(\s*\.\.\.(\w+)\s*\)\s*\{\s*super\s*\(\s*\.\.\.\1\s*\)\s*,\s*([^}]*)\}/g;

  return {
    name: 'fix-swc-delegate-ctor',
    enforce: 'post',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts') && !id.endsWith('.js')) return null;
      if (id.includes('node_modules')) return null;
      if (!code.includes('super(...')) return null;

      const fixed = code.replace(DELEGATE_CTOR, (_m, _argName, body) => {
        const trimmedBody = body.trim();
        if (!trimmedBody) return 'constructor(){ super(...arguments); }';
        // If the body contains a line comment (//), the closing } must be on a new line
        // to avoid being swallowed by the comment.
        if (trimmedBody.includes('//')) {
          return `constructor(){ super(...arguments); ${trimmedBody}\n}`;
        }
        return `constructor(){ super(...arguments); ${trimmedBody} }`;
      });

      return fixed !== code ? { code: fixed, map: null } : null;
    },
  };
}

/**
 * Strips SWC's typeof guards from decorator metadata to prevent DI token
 * resolution failures under isolate:false.
 */
function fixSwcDecoratorMetadata(): Plugin {
  const TYPEOF_GUARD = /typeof\s+(\w+)\s*===?\s*["']undefined["']\s*\?\s*Object\s*:\s*\1/g;
  const IMPORT_REGEX = /import\s+\{([^}]+)\}\s+from/g;

  return {
    name: 'fix-swc-decorator-metadata',
    enforce: 'post',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts') && !id.endsWith('.js')) return null;
      if (id.includes('node_modules')) return null;
      if (!code.includes('_ts_decorate')) return null;

      const importedNames = new Set<string>();
      let m: RegExpExecArray | null;
      while ((m = IMPORT_REGEX.exec(code)) !== null) {
        m[1].split(',').forEach((name) => {
          const trimmed = name
            .trim()
            .split(/\s+as\s+/)
            .pop()
            ?.trim();
          if (trimmed) importedNames.add(trimmed);
        });
      }

      const fixed = code.replace(TYPEOF_GUARD, (match, name) => (importedNames.has(name) ? name : match));
      return fixed !== code ? { code: fixed, map: null } : null;
    },
  };
}

/**
 * Resolves Angular templateUrl references by inlining HTML content and
 * stripping styleUrls (not needed for unit tests).
 */
function angularTemplateInliner(): Plugin {
  return {
    name: 'angular-template-inliner',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts') || id.includes('node_modules')) return null;

      const templateUrlRegex = /templateUrl\s*:\s*['"]([^'"]+)['"]/g;
      let match;
      let modified = false;
      let result = code;

      while ((match = templateUrlRegex.exec(code)) !== null) {
        const templatePath = match[1];
        const fullPath = resolve(dirname(id), templatePath);
        try {
          const html = readFileSync(fullPath, 'utf-8');
          const escaped = html.replace(/`/g, '\\`').replace(/\$/g, '\\$');
          result = result.replace(match[0], `template: \`${escaped}\``);
        } catch {
          result = result.replace(match[0], 'template: ``');
        }
        modified = true;
      }

      const styleUrlsRegex = /styleUrls\s*:\s*\[([^\]]*)\]/g;
      while ((match = styleUrlsRegex.exec(code)) !== null) {
        result = result.replace(match[0], 'styles: []');
        modified = true;
      }

      const styleUrlRegex = /styleUrl\s*:\s*['"][^'"]+['"]/g;
      while ((match = styleUrlRegex.exec(code)) !== null) {
        result = result.replace(match[0], 'styles: []');
        modified = true;
      }

      return modified ? { code: result, map: null } : null;
    },
  };
}

const isCI = process.env.CI === 'true' || process.env.GITLAB_CI === 'true';

export default defineConfig({
  cacheDir: isCI ? '.vitest-cache' : (false as any),
  resolve: {
    alias: [
      { find: /^novo-elements\/(.+)$/, replacement: resolve(__dirname, 'projects/novo-elements/src/$1') },
      { find: /^novo-elements$/, replacement: resolve(__dirname, 'projects/novo-elements/src/index') },
      { find: /^novo-examples\/(.+)$/, replacement: resolve(__dirname, 'projects/novo-examples/src/$1') },
      { find: /^novo-examples$/, replacement: resolve(__dirname, 'projects/novo-examples/src/index') },
    ],
  },
  plugins: [
    angularTemplateInliner(),
    fixSignalInitializerDecorators(),
    fixSwcDecoratorMetadata(),
    fixSwcDelegateCtor(),
    swc.vite({
      tsconfigFile: resolve(__dirname, 'tsconfig.vitest.json'),
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
    }),
  ],
  test: {
    globals: true,
    isolate: process.env.VITEST_ISOLATE === 'true' ? true : false,
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        url: 'http://localhost',
      },
    },
    setupFiles: ['./vitest.setup.ts'],
    include: ['projects/novo-elements/**/*.spec.ts'],
    exclude: [
      'node_modules',
      'dist',
      'coverage',
      // Signal input initialization causes infinite loop under JIT+SWC — needs dedicated fix
      '**/condition-builder/condition-builder.component.spec.ts',
    ],
    maxWorkers: process.env.VITEST_MAX_WORKERS ? parseInt(process.env.VITEST_MAX_WORKERS, 10) : '80%',
    clearMocks: true,
    testTimeout: isCI ? 30000 : 10000,
    hookTimeout: isCI ? 30000 : 10000,
    retry: isCI ? 2 : 0,
    passWithNoTests: true,
  },
});
