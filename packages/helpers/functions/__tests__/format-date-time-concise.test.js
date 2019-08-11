import formatDateTimeConcise from '../format-date-time-concise';

describe('formatDateTimeConcise', () => {
  it('should format a date correctly', () =>
    expect(formatDateTimeConcise('2019-04-23T18:03:48')).toEqual(
      '04/23/19 18:03'
    ));
});
