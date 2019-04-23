import formatDateTimeConcise from '../format-date-time-concise';

describe('formatDateTimeConcise helper', () => {
  it('should work', () =>
    expect(formatDateTimeConcise('2019-04-23T18:03:48Z')).toEqual(
      '04/23/19 11:03'
    ));
});
