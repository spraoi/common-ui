import formatDateTimePretty from '../format-date-time-pretty';

describe('formatDateTimePretty helper', () => {
  it('should work', () =>
    expect(formatDateTimePretty('2019-04-23T18:03:48Z')).toEqual(
      'Tuesday, Apr 23rd, 2019 11:03 AM'
    ));
});
