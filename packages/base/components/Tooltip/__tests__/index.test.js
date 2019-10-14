import React from 'react';
import Tooltip from '..';
import { render } from '../../../../../__utilities__/testing-library';

describe('Modal component', () => {
  it('renders a tooltip with children', () => {
    const { getByText } = render(
      <Tooltip content="foo" id="tooltip">
        fooContent
      </Tooltip>
    );

    expect(getByText('fooContent')).toHaveAttribute('data-tip');
  });
});
