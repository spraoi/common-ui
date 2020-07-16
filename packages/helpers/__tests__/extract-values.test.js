import extractValues from '../extract-values';

describe('extractValues function', () => {
  test('should work', () => {
    expect(
      extractValues({
        keyFunction: (key) => key !== 'id',
        payload: [
          {
            1: 'foo',
            2: null,
            3: false,
            4: {},
            5: [{ 1: 'id4', id: 'id100' }],
            6: 'id1',
            7: {
              1: 'foo',
              2: null,
              3: false,
              4: {},
              5: [],
              6: 'id2',
              7: {
                1: 'foo',
                6: '{ "1": "id3" }',
              },
              8: ['id7'],
              9: ['id5', 'id6'],
              19: 'id1',
            },
            id: 'id8',
          },
        ],
        valueFunction: (value) =>
          typeof value === 'string' && /^id[0-9]$/.test(value),
      })
    ).toEqual(['id4', 'id1', 'id2', 'id3', 'id7', 'id5', 'id6']);
  });
});
