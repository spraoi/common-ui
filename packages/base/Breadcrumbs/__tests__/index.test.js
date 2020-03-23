import React from 'react';
import Breadcrumbs from '../index';
import { render } from '../../../../__utilities__/testing-library';

describe('Breadcrumbs component', () => {
  it('renders breadcrumbs with correct names and paths', () => {
    const breadcrumbFoo = { link: '/foo', name: 'foo' };
    const breadcrumbBar = { link: '/bar', name: 'bar' };

    const { getByText } = render(
      <Breadcrumbs crumbs={[breadcrumbFoo, breadcrumbBar]} />
    );

    const fooBreadcrumbLink = getByText(breadcrumbFoo.name);
    const barBreadcrumbLink = getByText(breadcrumbBar.name);

    expect(fooBreadcrumbLink.href).toContain(breadcrumbFoo.link);
    expect(barBreadcrumbLink.href).toContain(breadcrumbBar.link);
  });
});
