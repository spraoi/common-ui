import formatTimeSince from '../format-time-since';

describe('formatTimeSince', () => {
  it('should determine time since', () =>
    expect(formatTimeSince(new Date().getTime() - 62000)).toEqual(
      '1 minute, 2 seconds'
    ));

  it('it should round to the nearest second', () =>
    expect(formatTimeSince(new Date().getTime() - 62500)).toEqual(
      '1 minute, 3 seconds'
    ));

  it('it should work when the provided date is in the future', () =>
    expect(formatTimeSince(new Date().getTime() + 10000)).toEqual('0 seconds'));
});
