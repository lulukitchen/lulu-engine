# Contributing to @lulu/engine

Thanks for helping improve the ordering engine! This guide provides comprehensive information for developers and AI coding assistants.

## 🚀 Quick Development Setup

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/lulukitchen/lulu-engine.git
cd lulu-engine

# Install dependencies (creates package-lock.json)
npm install

# Start development mode (watch compilation)
npm run dev

# Build for production
npm run build
```

### Development Workflow
1. **Install**: `npm install` (not `npm ci` initially, as no lock file exists)
2. **Develop**: `npm run dev` for watch mode compilation
3. **Build**: `npm run build` to generate dist files
4. **Test**: Currently no tests configured (`npm run test` shows placeholder)
5. **Lint**: Currently no linting configured (`npm run lint` shows placeholder)

## 🏗️ Project Architecture

### Build System
- **Bundler**: `tsup` - Fast TypeScript bundler
- **Output**: ESM (`dist/index.js`) + CJS (`dist/index.cjs`) + TypeScript declarations
- **Target**: ES2020 for modern browser compatibility
- **Watch Mode**: `npm run dev` for active development

### Code Organization
```
src/
├── index.ts                 # Main entry point - exports all public APIs
├── types.ts                 # Central type definitions
├── provider/               
│   └── EngineProvider.tsx   # React Context provider for configuration
├── hooks/                  # Custom React hooks
│   ├── useCart.ts          # Shopping cart state management
│   └── useLanguage.tsx     # Internationalization logic
├── services/               # External integrations
│   ├── menuService.ts      # CSV menu parsing and fetching
│   ├── emailService.ts     # Order email notifications  
│   └── whatsappService.ts  # WhatsApp message formatting
├── utils/                  # Pure utility functions
│   ├── businessHours.ts    # Operating hours calculations
│   ├── coupons.ts          # Discount and coupon logic
│   └── recommendations.ts  # Product recommendation engine
└── components/             # Reusable React components
    ├── MenuItemModal.tsx   # Product details popup
    ├── PaymentOptions.tsx  # Payment method selection
    ├── TimePicker.tsx      # Delivery time selection
    └── WhatsAppButton.tsx  # WhatsApp integration button
```

### Key Design Patterns
1. **Provider Pattern**: Single `LuluEngineProvider` wraps consumer applications
2. **Hook-based State**: React hooks manage cart, language, and other state
3. **Service Layer**: Separate services for external integrations
4. **Pure Utilities**: Stateless functions for business logic
5. **Component Composition**: Reusable UI components with minimal styling

## 📝 Coding Standards

### TypeScript Guidelines
- **Strict Mode**: All TypeScript strict checks enabled
- **Type Safety**: Prefer explicit types over `any`
- **Exports**: Named exports only (no default exports)
- **Interfaces**: Use `type` for simple shapes, `interface` for extensible contracts

```tsx
// ✅ Good - Named export with explicit types
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

// ❌ Bad - Default export and implicit any
export default function calculate(items) {
  return items.reduce((sum, item) => sum + item.total, 0);
}
```

### React Guidelines
- **Function Components**: Use function components with hooks
- **PropTypes**: TypeScript types instead of PropTypes
- **Context**: Minimal context usage, hooks for state management
- **Refs**: Use `useRef` for DOM manipulation

```tsx
// ✅ Good - Function component with TypeScript
export const PaymentButton: React.FC<{ method: PaymentMethod; onSelect: (method: PaymentMethod) => void }> = 
  ({ method, onSelect }) => (
    <button onClick={() => onSelect(method)}>
      Pay with {method}
    </button>
  );

// ❌ Bad - Class component or missing types
export class PaymentButton extends React.Component { ... }
```

### Security & Privacy
- **No Hardcoded Secrets**: Environment variables only in consumer apps
- **No Personal Data**: Library doesn't store/transmit sensitive information  
- **Consumer Responsibility**: Apps using this library handle data privacy

```tsx
// ✅ Good - Configuration driven by consumer
export function sendOrderEmail(emails: string[], order: Order) {
  // emails provided by consumer app from their environment
}

// ❌ Bad - Hardcoded sensitive data
const DEFAULT_EMAILS = ["internal@restaurant.com"]; // Don't do this
```

### Internationalization
- **No Hardcoded Text**: All strings via props or configuration
- **RTL Support**: Hebrew (right-to-left) language support
- **Flexible Translation**: Consumer apps provide translation function

```tsx
// ✅ Good - Configurable text
export const WelcomeMessage: React.FC<{ text: string }> = ({ text }) => (
  <h1>{text}</h1>
);

// ❌ Bad - Hardcoded English text
export const WelcomeMessage = () => <h1>Welcome to our restaurant</h1>;
```

## 🧪 Testing Strategy

### Current State
- **Tests**: Not yet implemented (`npm run test` is placeholder)
- **Linting**: Not yet configured (`npm run lint` is placeholder)
- **CI**: Basic GitHub Actions workflow exists

### Future Testing Approach
When implementing tests, consider:
- **Unit Tests**: Jest + React Testing Library
- **Type Tests**: TypeScript compilation serves as type testing
- **Integration Tests**: Consumer app integration scenarios
- **Visual Tests**: Component rendering verification

### Manual Testing Workflow
Until automated tests are implemented:

1. **Build Verification**: `npm run build` must pass without errors
2. **Type Checking**: TypeScript compiler catches type issues
3. **Consumer Testing**: Test integration in sample restaurant app
4. **Cross-browser Testing**: Modern browser compatibility

## 🔄 Development Workflow

### Making Changes

1. **Branch Naming**: Use descriptive names (`feature/payment-integration`, `fix/cart-persistence`)

2. **Development Process**:
   ```bash
   # Create feature branch
   git checkout -b feature/new-component
   
   # Start development mode
   npm run dev
   
   # Make changes and test
   # Verify build works
   npm run build
   
   # Commit with descriptive messages
   git commit -m "feat: add TimePicker component for delivery scheduling"
   ```

3. **File Creation Guidelines**:
   - **Components**: Place in `src/components/` with `.tsx` extension
   - **Hooks**: Place in `src/hooks/` with `.ts` or `.tsx` extension  
   - **Services**: Place in `src/services/` with `.ts` extension
   - **Utils**: Place in `src/utils/` with `.ts` extension
   - **Types**: Add to `src/types.ts` or create separate type files

4. **Export Management**:
   - Add new exports to `src/index.ts`
   - Maintain consistent export patterns
   - Update documentation for new public APIs

### Code Review Checklist

Before submitting PRs, verify:
- [ ] `npm run build` completes successfully
- [ ] All new exports added to `src/index.ts`
- [ ] TypeScript types are explicit and correct
- [ ] No hardcoded strings or sensitive data
- [ ] Components accept necessary props for customization
- [ ] README.md updated if new public APIs added
- [ ] Following existing code style and patterns

## 📋 Pull Request Guidelines

### PR Description Template
```markdown
## What Changed
Brief description of the changes made.

## Why
Explanation of the motivation and context.

## How to Test
Steps for reviewers to verify the changes.

## Screenshots/GIFs
For UI components, include visual evidence.

## Breaking Changes
List any breaking changes to the API.
```

### PR Requirements
- **Small & Focused**: Single responsibility per PR
- **Descriptive Titles**: Use conventional commit format
- **Documentation**: Update README.md for new exports
- **Build Passes**: Ensure `npm run build` succeeds
- **Type Safety**: No TypeScript errors or warnings

### Review Process
1. **Automated Checks**: GitHub Actions CI must pass
2. **Code Review**: Maintainer review for architecture and style
3. **Testing**: Manual verification of functionality
4. **Documentation**: Ensure adequate documentation updates

## 🚀 Release Process

### Version Management
- **Semantic Versioning**: `MAJOR.MINOR.PATCH`
- **Breaking Changes**: Major version bump
- **New Features**: Minor version bump  
- **Bug Fixes**: Patch version bump

### Publishing Workflow (Maintainers Only)
```bash
# Update version in package.json
npm version patch|minor|major

# Build for production
npm run build

# Publish to npm
npm publish

# Create GitHub release
git push --tags
# Create release on GitHub with changelog
```

## 🔧 Troubleshooting Common Issues

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify tsconfig.json is valid
npx tsc --noEmit
```

### Development Setup Issues
```bash
# If npm ci fails (no lock file)
npm install  # Creates package-lock.json

# If types are missing
npm install @types/react @types/react-dom --save-dev
```

### Import/Export Issues
- Ensure all exports are named (no default exports)
- Add new exports to `src/index.ts`
- Check that file paths are correct in imports

## 📚 Resources for Contributors

### Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [tsup Documentation](https://tsup.egoist.dev/)

### Restaurant Industry Context
- **Reference Site**: [lulu-k.com](https://lulu-k.com) - Example of target implementation
- **Menu Management**: CSV-based approach for non-technical restaurant owners
- **Payment Methods**: Israeli market (Bit, PayBox) + international standards
- **Languages**: Hebrew (RTL) and English (LTR) support

This engine powers restaurant ordering systems with features like dynamic menu loading, cart management, payment processing, and customer communication via email and WhatsApp.
