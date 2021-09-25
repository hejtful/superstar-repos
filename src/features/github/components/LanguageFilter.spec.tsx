import { render } from '@testing-library/react';

import { LanguageFilter } from './LanguageFilter';

it('should render properly', () => {
  const { asFragment } = render(<LanguageFilter onChange={jest.fn()} />);

  expect(asFragment()).toMatchSnapshot();
});
