import { rest } from 'msw';

const handlers = [
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    const mockApiResponse = {};

    return res(ctx.json(mockApiResponse));
  }),
];

export { handlers };
