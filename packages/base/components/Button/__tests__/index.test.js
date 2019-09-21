import React from 'react';
import Button from '..';
import theme from '../../../../../__stubs__/theme';
import { render } from '../../../../../__utilities__/testing-library';

describe('Button component', () => {
  it('renders a link correctly', () => {
    const { getByText } = render(<Button link="/foo">foo</Button>);
    expect(getByText('foo')).toHaveAttribute('href', '/foo');
  });

  it('renders a disabled link correctly', () => {
    const { getByText } = render(
      <Button disabled link="/foo">
        foo
      </Button>
    );

    expect(getByText('foo')).toHaveStyle('pointer-events: none');
  });

  it('renders a download link correctly', () => {
    const { getByText } = render(
      <Button download link="/foo">
        foo
      </Button>
    );

    expect(getByText('foo')).toHaveAttribute('download');
  });

  it('renders a button correctly', () => {
    const { getByText } = render(<Button>foo</Button>);

    expect(getByText('foo').closest('button')).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('renders a disabled button correctly', () => {
    const { getByText } = render(<Button disabled>foo</Button>);
    expect(getByText('foo').closest('button')).toBeDisabled();
  });

  it('renders a submitting button correctly', () => {
    const { getByText } = render(
      <Button renderLoading="loading..." submitting>
        foo
      </Button>
    );

    expect(getByText('loading...').closest('button')).toBeDisabled();
  });

  it('renders a submit button correctly', () => {
    const { getByText } = render(<Button type="submit">foo</Button>);

    expect(getByText('foo').closest('button')).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('renders a simple button correctly', () => {
    const { getByText } = render(<Button simple>foo</Button>);
    const fooButton = getByText('foo');
    expect(fooButton).toHaveAttribute('type', 'button');

    expect(fooButton).not.toHaveStyle(
      `background-color: ${theme.colors.primary}`
    );
  });
});
