# Contributing to @lulu/engine

Thanks for helping improve the engine!

## Dev setup
```bash
npm ci
npm run dev
```
This builds with **tsup** (bundles ESM + CJS) and emits type declarations.

## Coding standards
- TypeScript strict mode.
- Export named functions/components (no default exports).
- No secrets in code. Use consumers' environment variables.
- i18n strings must be props/config-driven (no hard-coded brand text).

## Pull Requests
- Describe WHAT and WHY, include screenshots/gifs for UI components.
- Ensure `npm run build` passes.
- Add or update minimal docs in `README.md` for new exports.
- Keep PRs small and focused.

## Releases
Maintainers will publish versions and tag releases. Consumers install via npm or GitHub Packages.
