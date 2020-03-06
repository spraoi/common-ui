import testUserId from '../test-user-id';

describe('userIdValueFunction function', () => {
  test('should return true if the userId pattern is correct', () => {
    expect(
      testUserId('spr:user::xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ).toEqual(true);
  });
  test('should return false if the userId pattern is wrong', () => {
    expect(testUserId('xyz')).toEqual(false);
  });
});
