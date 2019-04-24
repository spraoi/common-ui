import formatTimeSince from '../format-time-since';

describe('formatTimeSince helper', () => {
  it('should work', () =>
    expect(formatTimeSince(new Date().getTime() - 60000)).toEqual(
      'a minute ago'
    ));
});
