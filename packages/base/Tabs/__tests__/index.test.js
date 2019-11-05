import React from 'react';
import Tabs from '../index';
import { render } from '../../../../__utilities__/testing-library';

describe('Tabs component', () => {
  it('renders tabs with correct links & default content', () => {
    const { getByText } = render(
      <Tabs
        defaultTab="foo"
        name="tab"
        tabs={[
          {
            label: 'foo',
            render: () => <p>default content</p>,
            value: 'foo',
          },
          {
            label: 'bar',
            render: () => <p>bar content</p>,
            value: 'bar',
          },
        ]}
      />
    );

    const fooTab = getByText('foo');
    expect(fooTab.href).toContain('tab=foo');

    const barTab = getByText('bar');
    expect(barTab.href).toContain('tab=bar');

    const defaultContent = getByText('default content');
    expect(defaultContent).toBeInTheDocument();
  });

  it('renders tabs as a dropdown', () => {
    const { getByText } = render(
      <Tabs
        defaultTab="foo"
        dropdown
        name="tab"
        tabs={[
          {
            label: 'foo',
            render: () => <p>default content</p>,
            value: 'foo',
          },
          {
            label: 'bar',
            render: () => <p>bar content</p>,
            value: 'bar',
          },
        ]}
      />
    );

    const dropdown = getByText('foo');
    expect(dropdown).toBeInTheDocument();
  });
});
