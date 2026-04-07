import path from 'path';
import { MIGRATION_PATH } from '../../../paths';
import { createTestCaseSetup } from '../../../testing';

xdescribe('class inheritance misc checks', () => {
  describe('v6 class which extends MatFormFieldControl', () => {
    it('should report if class does not declare "shouldLabelFloat"', async () => {
      const { runFixers } = await createTestCaseSetup('migration-v6', MIGRATION_PATH, [
        path.join(__dirname, './class-inheritance_input.ts'),
      ]);

      const { logOutput } = await runFixers();

      // eslint-disable-next-line max-len
      expect(logOutput).toMatch(/Found class "WithoutLabelProp".*extends "MatFormFieldControl.*must define "shouldLabelFloat"/);
      // eslint-disable-next-line max-len
      expect(logOutput).not.toMatch(/Found class "WithLabelProp".*extends "MatFormFieldControl".*must define "shouldLabelFloat"/);
    });
  });
});
