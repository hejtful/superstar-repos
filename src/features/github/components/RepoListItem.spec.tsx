import { render } from '@testing-library/react';
import { mockRepositories } from '../../../test/mocks/github/repositories';

import { RepoListItem } from './RepoListItem';

it('should render properly when not starred', () => {
  const { asFragment } = render(
    <RepoListItem
      repo={mockRepositories[0]}
      isStarred={false}
      onStarButtonClick={jest.fn()}
      onUnStarButtonClick={jest.fn()}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('should render properly when starred', () => {
  const { asFragment } = render(
    <RepoListItem
      repo={mockRepositories[1]}
      isStarred={true}
      onStarButtonClick={jest.fn()}
      onUnStarButtonClick={jest.fn()}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
