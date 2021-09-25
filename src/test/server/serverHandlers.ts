import { rest } from 'msw';
import { mockRepositories } from '../mocks/github/repositories';

const handlers = [
  rest.get('https://api.github.com/search/repositories', (_, res, ctx) => {
    const mockApiResponse = {
      items: mockRepositories,
    };

    return res(ctx.json(mockApiResponse));
  }),
];

export { handlers };
