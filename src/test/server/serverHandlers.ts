import { rest } from 'msw';
import { mockRepositories } from '../mocks/github/repositories';
import { mockRepositoriesFilteredByLanguage } from '../mocks/github/repositoriesFilteredByLanguage';

const handlers = [
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    const hasLanguageFilter = req.url.searchParams
      .get('q')
      ?.includes('language');

    const mockApiResponse = {
      items: hasLanguageFilter
        ? mockRepositoriesFilteredByLanguage
        : mockRepositories,
    };

    return res(ctx.json(mockApiResponse));
  }),
];

export { handlers };
