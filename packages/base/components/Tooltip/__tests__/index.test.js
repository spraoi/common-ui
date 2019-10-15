import React from 'react';
import ReactTooltip from 'react-tooltip';
import Tooltip from '..';
import { render } from '../../../../../__utilities__/testing-library';

describe('Modal component', () => {
  it('renders a tooltip with internal toggle', () => {
    const { getByText } = render(
      <Tooltip content="foo" id="tooltip">
        toggle
      </Tooltip>
    );

    expect(getByText('toggle')).toHaveAttribute('data-tip', 'foo');
  });

  it('rebuilds the tooltip on update', () => {
    const { container } = render(
      <Tooltip content="foo" id="tooltip">
        toggle
      </Tooltip>
    );

    render(
      <Tooltip content="bar" id="tooltip">
        toggle
      </Tooltip>,
      { container }
    );

    expect(ReactTooltip.rebuild).toHaveBeenCalled();
  });
});
