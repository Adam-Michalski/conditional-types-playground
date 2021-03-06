import { expecter } from 'ts-snippet';

describe('upperCase', () => {
  const expectSnippet = expecter(
    code => `
    import { upperCase } from './src/upper-case';
    ${code}
  `,
    { strict: true }
  );

  describe('union type support', () => {
    it('should compile', () => {
      expectSnippet(
        `
        let maybe: string | null = null as any;
        const result = upperCase(maybe);
        `
      ).toSucceed();
    });

    it('should infer union type', () => {
      expectSnippet(
        `
        let maybe: string | null = null as any;
        const result = upperCase(maybe);
        `
      ).toInfer('result', 'string|null');
    });
  });

  describe('number', () => {
    it('should not allow numbers', () => {
      expectSnippet(
        `
        const zero = 0;
        const result = upperCase(zero);
        `
      ).toFail();
    });
  });
});
