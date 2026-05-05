// TODO(Angular 21): Remove this custom builder once Angular 21's native
// @angular/build:unit-test builder is available. Angular 21 ships with
// built-in Vitest support, making this delegation unnecessary.

let createBuilder;
try {
  createBuilder = require('@angular-devkit/architect').createBuilder;
} catch {
  createBuilder = require(
    require.resolve('@angular-devkit/architect', {
      paths: [require.resolve('@angular/cli')],
    }),
  ).createBuilder;
}
const { spawn } = require('child_process');
const path = require('path');

module.exports.default = createBuilder((options, context) => {
  return new Promise((resolve) => {
    const vitestBin = path.join(context.workspaceRoot, 'node_modules', '.bin', 'vitest');
    const args = ['run'];

    if (options.include) {
      args.push(options.include);
    }

    if (options.reporters) {
      args.push('--reporter', options.reporters);
    }

    if (options.coverage) {
      args.push('--coverage');
    }

    context.logger.info(`Running: vitest ${args.join(' ')}`);

    const child = spawn(vitestBin, args, {
      cwd: context.workspaceRoot,
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      resolve({ success: code === 0 });
    });
  });
});
