import formatDateTimePretty from '../format-date-time-pretty';

describe('formatDateTimePretty helper', () => {
  it('should work', () =>
    expect(formatDateTimePretty(1000000000000)).toEqual(
      'Saturday, Sep 8th, 2001 06:46 PM'
    ));
});
