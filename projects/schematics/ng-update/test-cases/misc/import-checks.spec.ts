import path from 'path';
import { MIGRATION_PATH } from '../../../paths';
import { createTestCaseSetup } from '../../../testing';

xdescribe('v6 import misc checks', () => {
  it('should report imports for deleted animation constants', async () => {
    const { runFixers } = await createTestCaseSetup('migration-v6', MIGRATION_PATH, [path.join(__dirname, './import-checks_input.ts')]);

    const { logOutput } = await runFixers();

    expect(logOutput).toMatch(/Found deprecated symbol "SHOW_ANIMATION"/);
    expect(logOutput).toMatch(/Found deprecated symbol "HIDE_ANIMATION"/);
  });
});
