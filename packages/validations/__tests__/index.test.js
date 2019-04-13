import {
  alpha,
  composeValidations,
  email,
  json,
  minLength,
  required,
  versionNumber,
} from '..';

describe('composeValidations function', () => {
  it('should appropriately return first validation error', () =>
    expect(composeValidations(required, email)('')).toEqual('Required'));

  it('should appropriately return second validation error', () =>
    expect(composeValidations(required, email)('invalid@email')).toEqual(
      'Invalid email'
    ));

  it('should appropriately return undefined', () =>
    expect(
      composeValidations(required, email)('valid@email.com')
    ).toBeUndefined());
});

describe('alpha validation', () => {
  ['1', '@foo', 'BAR!', 'foo bar'].forEach(v =>
    it(`"${v}" should return an error`, () =>
      expect(alpha(v)).toEqual('Must contain only letters'))
  );

  ['foo', 'FOO'].forEach(v =>
    it(`"${v}" should return undefined`, () => expect(alpha(v)).toBeUndefined())
  );
});

describe('email validation', () => {
  ['foo@bar'].forEach(v =>
    it(`"${v}" should return an error`, () =>
      expect(email(v)).toEqual('Invalid email'))
  );

  ['foo@bar.baz'].forEach(v =>
    it(`"${v}" should return undefined`, () => expect(email(v)).toBeUndefined())
  );
});

describe('json validation', () => {
  ['foo'].forEach(v =>
    it(`"${v}" should return an error`, () =>
      expect(json(v)).toEqual('Invalid JSON'))
  );

  ['{"foo":"bar"}', ''].forEach(v =>
    it(`"${v}" should return undefined`, () => expect(json(v)).toBeUndefined())
  );
});

describe('minLength validation', () => {
  describe('when the min length is 6', () => {
    const minLength6 = minLength(6);

    ['hello'].forEach(v =>
      it(`"${v}" should return an error`, () =>
        expect(minLength6(v)).toEqual('Must be at least 6 characters'))
    );

    ['foobar'].forEach(v =>
      it(`"${v}" should return undefined`, () =>
        expect(minLength6(v)).toBeUndefined())
    );
  });
});

describe('required validation', () => {
  ['', undefined, []].forEach(v =>
    it(`"${v}" should return an error`, () =>
      expect(required(v)).toEqual('Required'))
  );

  ['foo', 0, {}, null, [1]].forEach(v =>
    it(`"${v}" should return undefined`, () =>
      expect(required(v)).toBeUndefined())
  );
});

describe('versionNumber validation', () => {
  ['foo', 'v1', '1.0.0'].forEach(v =>
    it(`"${v}" should return an error`, () =>
      expect(versionNumber('foo')).toEqual('Invalid version number'))
  );

  ['1.0', '1'].forEach(v =>
    it(`"${v}" should return undefined`, () =>
      expect(versionNumber(v)).toBeUndefined())
  );
});
