import fonts from '@/app/fonts';

describe('fonts', () => {
  it('contains heading font with correct variable', () => {
    expect(fonts.heading.variable).toBe('--font-heading');
  });

  it('contains subtitle font with correct variable', () => {
    expect(fonts.subtitle.variable).toBe('--font-subtitle');
  });

  it('contains navigation font with correct variable', () => {
    expect(fonts.navigation.variable).toBe('--font-navigation');
  });

  it('contains body font with correct variable', () => {
    expect(fonts.body.variable).toBe('--font-body');
  });

  it('contains uber font with correct variable', () => {
    expect(fonts.uber.variable).toBe('--font-uber');
  });
});
