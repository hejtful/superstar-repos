import { rest } from 'msw';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/test-utils';
import { server } from '../../test/server';
import { errorMessage, loadingMessage, Github } from './Github';
import { languagesPerPage } from './constants';

it('should display loading message', async () => {
  renderWithProviders(<Github />);

  await screen.findByText(loadingMessage);
});

it('should load and display most starred repos names', async () => {
  renderWithProviders(<Github />);

  const repoListItems = await screen.findAllByTestId('repo-list-item');

  expect(repoListItems.length).toBe(languagesPerPage);
});

it('should display an error message if loading repos fails', async () => {
  server.use(
    rest.get('https://api.github.com/search/repositories', (_, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithProviders(<Github />);

  await screen.findByText(errorMessage);
});
