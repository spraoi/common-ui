import formatTimeSince from '../format-time-since';

describe('formatTimeSince helper', () => {
  it('should work', () =>
    expect(formatTimeSince(new Date())).toEqual('a few seconds'));
});
