import blacklistProps from '../blacklist-props';

describe('blacklistProps helper', () => {
  it('should work', () => {
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
});
