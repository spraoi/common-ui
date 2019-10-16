import React from 'react';
import ReactTooltip from 'react-tooltip';
import Tooltip from '..';
import { render } from '../../../../../__utilities__/testing-library';

describe('Modal component', () => {
  it('renders a tooltip with internal toggle', () => {
    const { getByText } = render(
      <Tooltip data-tip="foo" id="tooltip">
        toggle
      </Tooltip>
    );

    expect(getByText('toggle')).toHaveAttribute('data-tip', 'foo');
  });

  it('rebuilds the tooltip on update', () => {
    const { container } = render(
      <Tooltip data-tip="foo" id="tooltip">
        toggle
      </Tooltip>
    );

    render(
      <Tooltip data-tip="bar" id="tooltip">
        toggle
      </Tooltip>,
      { container }
    );

    expect(ReactTooltip.rebuild).toHaveBeenCalled();
  });
});
