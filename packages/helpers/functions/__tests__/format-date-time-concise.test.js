import formatDateTimeConcise from '../format-date-time-concise';

describe('formatDateTimeConcise helper', () => {
  it('should work', () =>
    expect(formatDateTimeConcise('2019-04-23T18:03:48')).toEqual(
      '04/23/19 18:03'
    ));
});
