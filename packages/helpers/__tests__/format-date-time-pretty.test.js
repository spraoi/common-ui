import formatDateTimePretty from '../format-date-time-pretty';

describe('formatDateTimePretty', () => {
  it('should format a date correctly', () =>
    expect(formatDateTimePretty('2019-04-23T18:03:48')).toEqual(
      'Tuesday, Apr 23rd, 2019 06:03 PM'
    ));
});
