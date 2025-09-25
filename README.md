# @lulu/engine

A comprehensive, reusable ordering engine for restaurant websites, providing cart management, internationalization (Hebrew/English), CSV-based menu loading, payment integration, and communication services.

## 🚀 Quick Start

### Installation

```bash
npm install @lulu/engine
```

### Basic Usage

```tsx
import React from 'react';
import { 
  LuluEngineProvider, 
  useCart, 
  useLanguage,
  PaymentOptions,
  WhatsAppButton 
} from '@lulu/engine';

// 1. Wrap your app with the provider
function App() {
  return (
    <LuluEngineProvider config={{
      menuCsvUrl: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv",
      whatsappNumberIntl: "972525201978",
      orderEmails: ["orders@restaurant.com"],
      businessHours: {
        "sunday": [{ open: "10:00", close: "22:00" }],
        "monday": [{ open: "10:00", close: "22:00" }],
        // ... other days
      },
      paymentProviders: { 
        bitUrl: "https://bit.ly/your-bit-url", 
        payboxUrl: "https://paybox.co.il/your-url", 
        cash: true 
      }
    }}>
      <RestaurantApp />
    </LuluEngineProvider>
  );
}

// 2. Use hooks in your components
function RestaurantApp() {
  const { items, subtotal, add, remove, clear } = useCart();
  const { lang, setLang, t } = useLanguage();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}>
        Switch to {lang === 'he' ? 'English' : 'Hebrew'}
      </button>
      
      <div>Cart: {items.length} items, Total: ₪{subtotal}</div>
      
      <PaymentOptions onSelect={(method) => console.log('Selected:', method)} />
      <WhatsAppButton />
    </div>
  );
}
```

## 📁 Project Structure

```
src/
├── index.ts                 # Main exports
├── types.ts                 # TypeScript definitions
├── provider/
│   └── EngineProvider.tsx   # Main React context provider
├── hooks/
│   ├── useCart.ts          # Cart state management
│   └── useLanguage.tsx     # i18n functionality
├── services/
│   ├── menuService.ts      # CSV menu parsing
│   ├── emailService.ts     # Email order processing
│   └── whatsappService.ts  # WhatsApp integration
├── utils/
│   ├── businessHours.ts    # Operating hours logic
│   ├── coupons.ts          # Discount calculations
│   └── recommendations.ts  # Product suggestions
└── components/
    ├── MenuItemModal.tsx   # Item details popup
    ├── PaymentOptions.tsx  # Payment method selector
    ├── TimePicker.tsx      # Delivery time picker
    └── WhatsAppButton.tsx  # WhatsApp order button
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- TypeScript knowledge
- React 18+ (peer dependency)

### Local Development

```bash
# Clone the repository
git clone https://github.com/lulukitchen/lulu-engine.git
cd lulu-engine

# Install dependencies
npm install

# Start development build (watch mode)
npm run dev

# Build for production
npm run build

# Run CI checks
npm run lint  # Currently placeholder
npm run test  # Currently placeholder
```

### Build Output
- `dist/index.js` - ESM bundle
- `dist/index.cjs` - CommonJS bundle  
- `dist/index.d.ts` - TypeScript declarations

## 🏗️ Architecture Overview

### Core Concepts

1. **Provider Pattern**: Single `LuluEngineProvider` wraps the app
2. **Hook-based State**: React hooks for cart, language, etc.
3. **CSV-driven Menu**: Dynamic menu loading from Google Sheets
4. **Multi-language**: Hebrew/English with RTL support
5. **Payment Agnostic**: Supports multiple payment providers
6. **Communication Hub**: Email and WhatsApp integrations

### Data Flow

```
CSV Menu → menuService → MenuItem[] → Components
User Actions → Hooks → LocalStorage + State
Orders → emailService + whatsappService → External APIs
```

## 🎯 API Reference

### Main Exports

```tsx
// Provider
import { LuluEngineProvider, useEngineConfig } from '@lulu/engine';

// Hooks  
import { useCart, useLanguage } from '@lulu/engine';

// Services
import { fetchMenu, sendOrderEmail, formatWhatsAppMessage } from '@lulu/engine';

// Components
import { 
  PaymentOptions, 
  WhatsAppButton, 
  MenuItemModal, 
  TimePicker 
} from '@lulu/engine';

// Utils
import { 
  isBusinessOpen, 
  applyCoupon, 
  getRecommendations 
} from '@lulu/engine';

// Types
import type { 
  MenuItem, 
  CartItem, 
  Order, 
  EngineConfig,
  Lang,
  BusinessHours 
} from '@lulu/engine';
```

### Hook APIs

#### `useCart()`
```tsx
const {
  items: CartItem[],        // Current cart items
  subtotal: number,         // Total before discounts
  add: (item: CartItem) => void,     // Add item to cart
  remove: (id: string) => void,      // Remove item by ID
  clear: () => void,        // Empty cart
  setItems: (items: CartItem[]) => void // Replace all items
} = useCart();
```

#### `useLanguage()`
```tsx
const {
  lang: 'he' | 'en',       // Current language
  setLang: (lang: Lang) => void,     // Change language
  t: (key: string) => string,       // Translation function (placeholder)
  isRTL: boolean           // True for Hebrew
} = useLanguage();
```

### Configuration

```tsx
type EngineConfig = {
  menuCsvUrl: string;                    // Google Sheets CSV export URL
  whatsappNumberIntl: string;            // International format: "972525201978"
  orderEmails: string[];                 // Recipients for order emails
  businessHours: BusinessHours;          // Operating schedule
  paymentProviders: {                    // Payment integration URLs
    bitUrl?: string;
    payboxUrl?: string; 
    cash?: boolean;
  };
};
```

### Menu CSV Format

Expected CSV columns:
- `id` - Unique identifier
- `category` - Menu section
- `name_he` - Hebrew name
- `name_en` - English name
- `description_he` - Hebrew description (optional)
- `description_en` - English description (optional)
- `price` - Base price in local currency
- `image_url` - Product image URL (optional)
- `tags` - Comma-separated tags (optional)
- `addons` - JSON string of addon groups (optional)
- `available` - "1" for available, "0" for unavailable

Example CSV row:
```csv
id,category,name_he,name_en,price,available
"pizza-margherita","פיצה","מרגריטה","Margherita",45,1
```

## 🧪 Usage Examples

### Adding Items to Cart

```tsx
import { useCart, fetchMenu } from '@lulu/engine';

function MenuComponent() {
  const { add } = useCart();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu(config.menuCsvUrl).then(setMenu);
  }, []);

  const addToCart = (menuItem: MenuItem) => {
    const cartItem: CartItem = {
      id: `${menuItem.id}-${Date.now()}`,
      qty: 1,
      unitPrice: menuItem.price,
      total: menuItem.price,
      // addons, note can be added here
    };
    add(cartItem);
  };

  return (
    <div>
      {menu.map(item => (
        <div key={item.id}>
          <h3>{item.name_he}</h3>
          <p>₪{item.price}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
```

### Processing Orders

```tsx
import { useCart, sendOrderEmail, formatWhatsAppMessage } from '@lulu/engine';

function CheckoutComponent() {
  const { items, subtotal, clear } = useCart();
  const config = useEngineConfig();

  const processOrder = async (paymentMethod: string) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      items,
      subtotal,
      total: subtotal, // Add delivery, discounts as needed
      paymentMethod: paymentMethod as any,
    };

    // Send email notification
    await sendOrderEmail(config.orderEmails, order);
    
    // Generate WhatsApp message
    const whatsappMsg = formatWhatsAppMessage(order);
    const whatsappUrl = `https://wa.me/${config.whatsappNumberIntl}?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Clear cart and redirect
    clear();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <PaymentOptions onSelect={processOrder} />
  );
}
```

## 🔒 Security & Best Practices

### Environment Variables
Never hardcode sensitive data in the library. Consumer applications should provide:

```tsx
// ❌ Don't do this
const config = {
  orderEmails: ["secret@restaurant.com"], // Hardcoded
  bitUrl: "https://bit.ly/secret-link"    // Exposed
};

// ✅ Do this
const config = {
  orderEmails: [process.env.REACT_APP_ORDER_EMAIL],
  bitUrl: process.env.REACT_APP_BIT_URL
};
```

### Data Validation
Always validate external data:

```tsx
// The library includes basic validation, but consumers should add more:
const menu = await fetchMenu(csvUrl);
const validMenu = menu.filter(item => 
  item.id && 
  item.price > 0 && 
  item.available !== false
);
```

## 🌐 Internationalization

The engine supports Hebrew (RTL) and English (LTR) languages:

```tsx
// Components automatically handle directionality
const { lang, isRTL } = useLanguage();

return (
  <div dir={isRTL ? 'rtl' : 'ltr'} className={`lang-${lang}`}>
    {/* Content adapts to language direction */}
  </div>
);
```

## 🚀 Deployment

### As NPM Package
```bash
npm run build
npm publish  # For maintainers only
```

### As GitHub Package
```bash
npm run build
npm publish --registry=https://npm.pkg.github.com
```

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development guidelines.

### Key Points for Contributors:
- TypeScript strict mode enforced
- React 18+ peer dependency
- No default exports (named exports only)  
- Environment variables for sensitive data
- i18n strings as props/config (no hardcoded text)
- Minimal, focused pull requests

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🔗 Related Projects

This engine powers restaurant websites similar to [lulu-k.com](https://lulu-k.com), providing a complete ordering system with cart management, payment processing, and customer communication.
