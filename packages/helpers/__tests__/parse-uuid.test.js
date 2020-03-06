import parseUuid from '../parse-uuid';

describe('parseUuid function', () => {
  test('should work', () => {
    expect(
      parseUuid('spr:bz:ds::9f5322f2-e698-4685-a3fc-14df3485b9b6:10')
    ).toEqual({
      code: '9f5322f2-e698-4685-a3fc-14df3485b9b6',
      id: 'spr:bz:ds::9f5322f2-e698-4685-a3fc-14df3485b9b6',
      version: 10,
    });
  });
});
