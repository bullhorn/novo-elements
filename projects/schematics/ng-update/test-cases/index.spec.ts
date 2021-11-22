import * as path from 'path';
import { MIGRATION_PATH } from '../../paths';
import { defineJasmineTestCases, findVersionTestCases } from '../../testing';

describe('NovoElement upgrade test cases', () => {
  const versionNames = ['v6'];
  const testCasesMap = findVersionTestCases(path.join(__dirname));

  // Setup the test cases for each target version. The test cases will be automatically
  // detected through Bazel's runfiles manifest.
  versionNames.forEach((version) =>
    describe(`${version} update`, () => {
      defineJasmineTestCases(version, MIGRATION_PATH, testCasesMap.get(version));
    }),
  );
});
