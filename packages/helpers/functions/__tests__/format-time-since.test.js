import formatTimeSince from '../format-time-since';

describe('formatTimeSince', () => {
  it('should determine time since a date', () =>
    expect(formatTimeSince(new Date().getTime() - 60000)).toEqual(
      'a minute ago'
    ));
});
