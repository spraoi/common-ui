import replaceStrings from '../replace-strings';

describe('replaceStrings function', () => {
  test('should work', () => {
    expect(
      replaceStrings({
        keyFunction: (key) => key !== 'id',
        payload: [
          {
            1: 'foo',
            2: null,
            3: false,
            4: {},
            5: [{ 1: 'id4' }],
            6: 'id1',
            7: {
              1: 'foo',
              2: null,
              3: false,
              4: {},
              5: [],
              6: 'id2',
              7: { 1: 'foo', 6: '{ "id": "id3" }' },
            },
          },
        ],
        replaceFunction: ({ key, value }) => ({ [key]: `foo${value}` }),
        valueFunction: (value) => /^id[0-9]{1}$/.test(value),
      })
    ).toEqual([
      {
        1: 'foo',
        2: null,
        3: false,
        4: {},
        5: [{ 1: 'fooid4' }],
        6: 'fooid1',
        7: {
          1: 'foo',
          2: null,
          3: false,
          4: {},
          5: [],
          6: 'fooid2',
          7: { 1: 'foo', 6: '{"id":"id3"}' },
        },
      },
    ]);
  });
});
