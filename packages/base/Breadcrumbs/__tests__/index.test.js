import React from 'react';
import Breadcrumbs from '../index';
import { render } from '../../../../__utilities__/testing-library';

describe('Breadcrumbs component', () => {
  it('renders breadcrumbs with correct names and paths', () => {
    const breadcrumbFoo = { name: 'foo', path: '/foo' };
    const breadcrumbBar = { name: 'bar', path: '/bar' };

    const { getByText } = render(
      <Breadcrumbs crumbs={[breadcrumbFoo, breadcrumbBar]} />
    );

    const fooBreadcrumbLink = getByText(breadcrumbFoo.name);
    const barBreadcrumbLink = getByText(breadcrumbBar.name);

    expect(fooBreadcrumbLink.href).toContain(breadcrumbFoo.path);
    expect(barBreadcrumbLink.href).toContain(breadcrumbBar.path);
  });
});
