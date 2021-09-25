import { rest } from 'msw';
import { fireEvent, within } from '@testing-library/dom';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/test-utils';
import { server } from '../../test/server';
import { mockRepositoriesFilteredByLanguage as filteredRepos } from '../../test/mocks/github/repositoriesFilteredByLanguage';
import { mockRepositories as initialRepos } from '../../test/mocks/github/repositories';
import { errorMessage, loadingMessage, Github } from './Github';
import { languages, languagesPerPage } from './constants';

it('should display loading message', async () => {
  renderWithProviders(<Github />);

  await screen.findByText(loadingMessage);
});

it('should load and display most starred repos', async () => {
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

it('should apply language filter', async () => {
  renderWithProviders(<Github />);

  await screen.findAllByTestId('repo-list-item');

  const languageFilter = await screen.findByTestId('language-filter');

  languageFilter.focus();
  fireEvent.change(languageFilter, { target: { value: languages[0] } });

  // Check that the new results are visible
  await screen.findByText(filteredRepos[languagesPerPage - 1].name);

  // Check that the old results are no longer visible
  expect(
    screen.queryByText(initialRepos[languagesPerPage - 1].name)
  ).toBeNull();
});

it('should star a repository, apply starred filter and un-star a repository', async () => {
  const itemIndex = 2;

  renderWithProviders(<Github />);

  // Click the star button of a repo
  const repoListItems = await screen.findAllByTestId('repo-list-item');
  const starButton = await within(repoListItems[itemIndex]).findByTestId(
    'star-button'
  );
  fireEvent.click(starButton);

  // Check that the clicked star button is replaced with un-star button
  await within(repoListItems[itemIndex]).findByTestId('un-star-button');

  // Activate starred filter
  const starredFilter = await screen.findByTestId('starred-filter');
  fireEvent.click(starredFilter);

  // Check that only the starred repo is displayed
  const filteredRepoListItems = await screen.findAllByTestId('repo-list-item');
  expect(filteredRepoListItems.length).toBe(1);

  // Click the un-star button of the starred repo
  const unStarButton = await within(filteredRepoListItems[0]).findByTestId(
    'un-star-button'
  );
  fireEvent.click(unStarButton);

  // Check that no repos are displayed
  await screen.findByTestId('no-starred-repos-message');
  expect(screen.queryAllByTestId('repo-list-item').length).toBe(0);

  // Deactivate starred filter
  fireEvent.click(starredFilter);

  // Check that the interacted-with repo item has a star button
  const resetListItems = await screen.findAllByTestId('repo-list-item');
  await within(resetListItems[itemIndex]).findByTestId('star-button');
});
