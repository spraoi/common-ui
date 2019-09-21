import themeVariantToValue from '../theme-variant-to-value';

describe('themeVariantToValue', () => {
  it('should grab a theme value if it exists', () => {
    expect(
      themeVariantToValue(
        {
          colors: { primary: 'red' },
          variants: { button: { '&:hover': { color: 'primary' } } },
        },
        'colors',
        'button.&:hover.color'
      )
    ).toEqual('red');
  });

  it('should default to the variant value', () => {
    expect(
      themeVariantToValue(
        {
          variants: { button: { color: 'red' } },
        },
        'colors',
        'button.color'
      )
    ).toEqual('red');
  });
});
