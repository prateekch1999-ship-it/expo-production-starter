/**
 * `@/*` and `@/assets/*` are declared in tsconfig.json and consumed by three separate tools:
 * Metro, TypeScript, and Jest. jest-expo derives its `moduleNameMapper` from tsconfig at runtime,
 * and moduleNameMapper is order-sensitive — `^@/(.*)$` can shadow `^@/assets/(.*)$` and silently
 * resolve asset imports into src/. This test fails if that shadowing ever starts happening.
 */
import iconManifest from '@/assets/expo.icon/icon.json';

describe('path aliases', () => {
  it('resolves @/assets/* to the top-level assets directory, not src/assets', () => {
    expect(iconManifest).toBeDefined();
  });
});
