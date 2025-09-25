# Testing setup for @lulu/engine

## Current State
This package currently has placeholder test scripts. This document outlines the testing strategy and setup for future implementation.

## Recommended Testing Stack

### Unit Testing
- **Jest**: JavaScript testing framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers

### Setup Commands
```bash
npm install --save-dev jest @jest/types @testing-library/react @testing-library/jest-dom
npm install --save-dev ts-jest @types/jest
```

### Configuration Files

#### jest.config.js
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.ts',
    '!src/**/*.d.ts',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.(test|spec).{ts,tsx}',
  ],
};
```

### Test Structure
```
src/
├── __tests__/           # Integration tests
│   ├── providers.test.tsx
│   └── hooks.test.tsx
├── hooks/
│   ├── useCart.ts
│   └── useCart.test.ts  # Unit tests alongside source
├── services/
│   ├── menuService.ts
│   └── menuService.test.ts
└── components/
    ├── PaymentOptions.tsx
    └── PaymentOptions.test.tsx
```

## Test Examples

### Hook Testing
```typescript
// src/hooks/useCart.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.subtotal).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());
    const item = { id: 'test', qty: 1, total: 10 };
    
    act(() => {
      result.current.add(item);
    });
    
    expect(result.current.items).toContain(item);
    expect(result.current.subtotal).toBe(10);
  });
});
```

### Component Testing  
```typescript
// src/components/PaymentOptions.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentOptions } from './PaymentOptions';

describe('PaymentOptions', () => {
  it('should call onSelect with correct payment method', () => {
    const mockOnSelect = jest.fn();
    render(<PaymentOptions onSelect={mockOnSelect} />);
    
    fireEvent.click(screen.getByText('Bit'));
    expect(mockOnSelect).toHaveBeenCalledWith('bit');
    
    fireEvent.click(screen.getByText('PayBox'));  
    expect(mockOnSelect).toHaveBeenCalledWith('paybox');
  });
});
```

### Service Testing
```typescript
// src/services/menuService.test.ts
import { fetchMenu } from './menuService';

describe('menuService', () => {
  it('should parse CSV menu correctly', async () => {
    const csvData = `id,name_he,name_en,price,available
pizza-1,מרגריטה,Margherita,45,1`;
    
    global.fetch = jest.fn().mockResolvedValue({
      text: () => Promise.resolve(csvData)
    });
    
    const menu = await fetchMenu('test-url');
    
    expect(menu).toHaveLength(1);
    expect(menu[0]).toEqual({
      id: 'pizza-1',
      name_he: 'מרגריטה', 
      name_en: 'Margherita',
      price: 45,
      available: true,
      // ... other expected fields
    });
  });
});
```

## Running Tests

### Package.json Scripts
Update the scripts section:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

### CI Integration
Update `.github/workflows/ci.yml`:
```yaml
- name: Run tests
  run: npm run test:ci
```

## Testing Guidelines

### What to Test
1. **Hook Logic**: State management, side effects
2. **Component Behavior**: User interactions, prop handling
3. **Service Functions**: API calls, data transformation
4. **Utility Functions**: Business logic, calculations
5. **Integration**: Provider + hook combinations

### What NOT to Test
1. **Implementation Details**: Internal state, private methods
2. **Third-party Libraries**: React, external dependencies
3. **Styling**: CSS classes, visual appearance
4. **TypeScript Types**: Compiler handles type checking

### Test Naming
- **Describe Blocks**: Use the component/function name
- **Test Cases**: Use "should [expected behavior] when [condition]"
- **Variables**: Use descriptive names (`mockOnSelect`, not `mockFn`)

### Mocking Guidelines
- **External APIs**: Mock fetch calls, WhatsApp/email services
- **Local Storage**: Clear between tests
- **Date/Time**: Mock for consistent results
- **Random Values**: Use deterministic test data

This testing setup ensures reliable, maintainable code while supporting the restaurant ordering engine's mission.