import React from 'react';
import ReactTooltip from 'react-tooltip';
import { TooltipBox, TooltipTrigger } from '../index';
import { render } from '../../../../__utilities__/testing-library';

describe('Modal component', () => {
  it('renders a tooltip trigger with internal toggle', () => {
    const { getByText } = render(
      <TooltipTrigger data-tip="foo" id="tooltip">
        toggle
      </TooltipTrigger>
    );

    expect(getByText('toggle')).toHaveAttribute('data-tip', 'foo');
  });

  it('rebuilds the tooltip box on update', () => {
    const { container } = render(<TooltipBox id="tooltip">toggle</TooltipBox>);

    render(<TooltipBox id="tooltip">toggle</TooltipBox>, { container });

    expect(ReactTooltip.rebuild).toHaveBeenCalled();
  });
});
