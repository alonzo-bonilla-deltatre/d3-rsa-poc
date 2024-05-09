import { LinkRuleResponse } from '@/models/types/linkRule';

const linkRules: LinkRuleResponse = {
data: [
  {
    id: 'test-id',
    url: 'https://test.url.com/test-path',
    success: false,
  },
],
  meta: {
    version: '1.0',
  },
};

export { linkRules };
