import formatDuration from '../format-duration';

describe('formatDuration', () => {
  it('should format duration', () =>
    expect(formatDuration(62000)).toEqual('1 minute, 2 seconds'));

  it('it should round to the nearest second', () =>
    expect(formatDuration(62500)).toEqual('1 minute, 3 seconds'));
});
