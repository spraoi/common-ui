import blacklistProps from '../blacklist-props';

describe('blacklistProps', () => {
  it('should blacklist props', () => {
    expect(
      blacklistProps({ blacklist: ['hide'] })({
        hide: 'foo',
        show: 'bar',
      })
    ).toMatchObject({
      props: { show: 'bar' },
      type: 'div',
    });
  });

  it('should blacklist props as a different element', () => {
    expect(
      blacklistProps({ as: 'span', blacklist: ['hide'] })({
        hide: 'foo',
        show: 'bar',
      })
    ).toMatchObject({
      props: { show: 'bar' },
      type: 'span',
    });
  });

  it('should work when no blacklist is set', () => {
    expect(blacklistProps()({ hide: 'foo', show: 'bar' })).toMatchObject({
      props: { hide: 'foo', show: 'bar' },
      type: 'div',
    });
  });
});
