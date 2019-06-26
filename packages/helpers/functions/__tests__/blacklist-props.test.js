import blacklistProps from '../blacklist-props';

describe('blacklistProps helper', () => {
  it('should work', () => {
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

  it('should work as a different element', () => {
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
