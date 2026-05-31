import type { AxeMatchers } from 'vitest-axe/matchers'

// vitest-axe ships an `extend-expect` augmentation but exposes no types for that entry,
// so we wire the matcher types onto vitest's Assertion ourselves (matchers are applied at
// runtime via expect.extend in vitest.setup.ts).
declare module 'vitest' {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
