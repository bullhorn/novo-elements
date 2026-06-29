import { automationId, codeExample } from './SelectorUtil';

export const avatarPage = 'avatar-examples-page';

export const avatarSelectors = {
    page: avatarPage,
    sectionHeading: `${avatarPage} h3`,
    usageExample: codeExample('avatar-usage'),
    stackExample: codeExample('avatar-stack-usage'),
    avatarsInUsage: `avatar-usage-example ${automationId('avatar')}`,
    stack: automationId('avatar-stack'),
    avatarsAll: automationId('avatar'),
};
