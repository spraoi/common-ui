import formatDateTimeConcise from '../format-date-time-concise';

describe('formatDateTimeConcise helper', () => {
  it('should work', () =>
    expect(formatDateTimeConcise(1000000000000)).toEqual('09/08/01 18:46'));
});
