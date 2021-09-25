import { render } from '@testing-library/react';

import { StarredFilter } from './StarredFilter';

it('should render properly', () => {
  const { asFragment } = render(
    <StarredFilter value={false} onChange={jest.fn()} />
  );

  expect(asFragment()).toMatchSnapshot();
});
