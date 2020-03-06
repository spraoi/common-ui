import generateRedirectPath from '../generate-redirect-path';

describe('generateRedirectPath', () => {
  it('should generate redirect path', () => {
    expect(
      generateRedirectPath({
        pathname: '/foo',
        queryParams: { baz: 'baz' },
        search: 'bar=bar',
      })
    ).toEqual('/foo?bar=bar&baz=baz');
  });

  it('should generate redirect path when no query params exist', () => {
    expect(generateRedirectPath({ pathname: '/foo' })).toEqual('/foo');
  });
});
