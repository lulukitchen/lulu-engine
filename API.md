# API Reference - @lulu/engine

Complete API documentation for the Lulu Engine restaurant ordering system.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Provider](#provider)
- [Hooks](#hooks)
- [Components](#components)
- [Services](#services)
- [Utilities](#utilities)
- [Types](#types)

## Installation

```bash
npm install @lulu/engine
```

### Peer Dependencies
```bash
npm install react@>=18 react-dom@>=18 react-router-dom@>=6 i18next@>=23 react-i18next@>=13
```

## Configuration

### EngineConfig
Main configuration object for the LuluEngineProvider.

```typescript
interface EngineConfig {
  menuCsvUrl: string;                    // Google Sheets CSV export URL
  whatsappNumberIntl: string;            // International format: "972525201978"
  orderEmails: string[];                 // Email addresses for order notifications
  businessHours: BusinessHours;          // Operating schedule
  paymentProviders: PaymentProviders;    // Payment integration settings
}
```

#### Example Configuration
```tsx
const config: EngineConfig = {
  menuCsvUrl: "https://docs.google.com/spreadsheets/d/ABC123/export?format=csv",
  whatsappNumberIntl: "972525201978",
  orderEmails: ["orders@restaurant.com", "manager@restaurant.com"],
  businessHours: {
    sunday: [{ open: "10:00", close: "22:00" }],
    monday: [{ open: "10:00", close: "22:00" }],
    tuesday: [{ open: "10:00", close: "22:00" }],
    wednesday: [{ open: "10:00", close: "22:00" }],
    thursday: [{ open: "10:00", close: "22:00" }],
    friday: [{ open: "09:00", close: "15:00" }],
    saturday: [] // Closed
  },
  paymentProviders: {
    bitUrl: "https://bit.ly/restaurant-payment",
    payboxUrl: "https://paybox.co.il/restaurant",
    cash: true
  }
};
```

## Provider

### LuluEngineProvider
Main React context provider that wraps your application.

```tsx
import { LuluEngineProvider } from '@lulu/engine';

<LuluEngineProvider config={config}>
  {/* Your app components */}
</LuluEngineProvider>
```

#### Props
- `config: EngineConfig` - Configuration object
- `children: ReactNode` - Child components

### useEngineConfig
Hook to access the current configuration.

```tsx
import { useEngineConfig } from '@lulu/engine';

function MyComponent() {
  const config = useEngineConfig();
  return <div>Restaurant WhatsApp: {config.whatsappNumberIntl}</div>;
}
```

#### Returns
- `EngineConfig` - Current configuration object

## Hooks

### useCart
Manages shopping cart state with localStorage persistence.

```tsx
import { useCart } from '@lulu/engine';

function CartComponent() {
  const {
    items,        // Current cart items
    subtotal,     // Total before discounts
    add,          // Add item function
    remove,       // Remove item function
    clear,        // Clear cart function
    setItems      // Replace all items
  } = useCart();
  
  return (
    <div>
      <p>Items: {items.length}</p>
      <p>Subtotal: ₪{subtotal}</p>
    </div>
  );
}
```

#### API
```typescript
interface UseCartReturn {
  items: CartItem[];                         // Current cart contents
  subtotal: number;                          // Sum of all item totals
  add: (item: CartItem) => void;            // Add item to cart
  remove: (id: string) => void;             // Remove item by ID
  clear: () => void;                        // Empty the cart
  setItems: (items: CartItem[]) => void;    // Replace entire cart
}
```

### useLanguage
Handles internationalization and language switching.

```tsx
import { useLanguage } from '@lulu/engine';

function LanguageToggle() {
  const { lang, setLang, isRTL } = useLanguage();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}>
        Switch to {lang === 'he' ? 'English' : 'עברית'}
      </button>
    </div>
  );
}
```

#### API
```typescript
interface UseLanguageReturn {
  lang: Lang;                         // Current language ('he' | 'en')
  setLang: (lang: Lang) => void;     // Change language
  t: (key: string) => string;        // Translation function (placeholder)
  isRTL: boolean;                    // True for Hebrew (right-to-left)
}
```

## Components

### PaymentOptions
Payment method selection component.

```tsx
import { PaymentOptions } from '@lulu/engine';

<PaymentOptions onSelect={(method) => console.log('Selected:', method)} />
```

#### Props
```typescript
interface PaymentOptionsProps {
  onSelect: (method: 'bit' | 'paybox' | 'cash') => void;
}
```

### WhatsAppButton
Button that opens WhatsApp with the restaurant's number.

```tsx
import { WhatsAppButton } from '@lulu/engine';

<WhatsAppButton />
```

### MenuItemModal
Modal for displaying menu item details.

```tsx
import { MenuItemModal } from '@lulu/engine';

<MenuItemModal 
  item={menuItem} 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onAddToCart={(cartItem) => cart.add(cartItem)}
/>
```

### TimePicker
Time selection component for delivery scheduling.

```tsx
import { TimePicker } from '@lulu/engine';

<TimePicker 
  onTimeSelect={(time) => setDeliveryTime(time)}
  businessHours={config.businessHours}
/>
```

## Services

### menuService
Handles CSV menu fetching and parsing.

```typescript
import { fetchMenu } from '@lulu/engine';

// Fetch menu from CSV URL
const menuItems = await fetchMenu(config.menuCsvUrl);
```

#### CSV Format
Expected CSV columns:
- `id` - Unique identifier
- `category` - Menu section
- `name_he` - Hebrew name  
- `name_en` - English name
- `description_he` - Hebrew description (optional)
- `description_en` - English description (optional)
- `price` - Base price
- `image_url` - Product image URL (optional)
- `tags` - Comma-separated tags (optional)
- `addons` - JSON string of addon groups (optional)
- `available` - "1" for available, "0" for unavailable

#### Example CSV
```csv
id,category,name_he,name_en,price,available
pizza-margherita,פיצה,מרגריטה,Margherita,45,1
salad-caesar,סלטים,סלט קיסר,Caesar Salad,32,1
```

### emailService
Handles order email notifications.

```typescript
import { sendOrderEmail } from '@lulu/engine';

await sendOrderEmail(config.orderEmails, order);
```

#### API
```typescript
function sendOrderEmail(emails: string[], order: Order): Promise<void>
```

### whatsappService
Formats WhatsApp messages for orders.

```typescript
import { formatWhatsAppMessage } from '@lulu/engine';

const message = formatWhatsAppMessage(order);
const whatsappUrl = `https://wa.me/${config.whatsappNumberIntl}?text=${encodeURIComponent(message)}`;
```

#### API
```typescript
function formatWhatsAppMessage(order: Order): string
```

## Utilities

### businessHours
Operating hours calculations and validation.

```typescript
import { isBusinessOpen, getNextOpenTime } from '@lulu/engine';

// Check if restaurant is currently open
if (isBusinessOpen(config.businessHours)) {
  console.log('Restaurant is open!');
}

// Get next opening time
const nextOpen = getNextOpenTime(config.businessHours);
```

### coupons
Discount and coupon management.

```typescript
import { applyCoupon, validateCoupon } from '@lulu/engine';

// Validate coupon code
const isValid = validateCoupon('SAVE10');

// Apply discount to order
const discountedTotal = applyCoupon(order, 'SAVE10');
```

### recommendations
Product recommendation engine.

```typescript
import { getRecommendations } from '@lulu/engine';

// Get recommended items based on cart contents
const recommendations = getRecommendations(cartItems, allMenuItems);
```

## Types

### Core Types

```typescript
// Language options
type Lang = "he" | "en";

// Menu item definition
interface MenuItem {
  id: string;
  category: string;
  name_he: string;
  name_en: string;
  description_he?: string;
  description_en?: string;
  price: number;
  image_url?: string;
  tags?: string[];
  addons?: AddonGroup[];
  available?: boolean;
}

// Cart item with selections
interface CartItem {
  id: string;                    // Unique cart item ID
  qty: number;                   // Quantity
  note?: string;                 // Special instructions
  addons?: AddonSelection[];     // Selected addons
  unitPrice: number;             // Price per unit
  total: number;                 // Total price (qty * unitPrice + addons)
}

// Complete order
interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount?: number;
  delivery?: number;
  total: number;
  paymentMethod: "bit" | "paybox" | "cash";
  scheduledAt?: string;          // ISO date string
  customer?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

// Business operating hours
type BusinessHours = Record<string, { open: string; close: string }[]>;

// Payment providers configuration
interface PaymentProviders {
  bitUrl?: string;      // Bit payment URL
  payboxUrl?: string;   // PayBox payment URL  
  cash?: boolean;       // Accept cash payments
}
```

### Addon Types

```typescript
// Addon option (e.g., "Extra cheese", "No onions")
interface AddonOption {
  label: string;
  price?: number;       // Additional cost
}

// Addon group (e.g., "Toppings", "Size")
interface AddonGroup {
  id: string;
  label: string;
  type: "single" | "multi";     // Single or multiple selection
  required?: boolean;           // Must select at least one
  options: AddonOption[];
}

// Selected addons in cart
interface AddonSelection {
  groupId: string;
  options: string[];            // Selected option labels
}
```

## Error Handling

### Provider Errors
```typescript
// Throws if useEngineConfig used outside provider
try {
  const config = useEngineConfig();
} catch (error) {
  console.error('useEngineConfig must be used within LuluEngineProvider');
}
```

### Service Errors
```typescript
// Handle CSV parsing errors
try {
  const menu = await fetchMenu(csvUrl);
} catch (error) {
  console.error('Failed to fetch menu:', error);
  // Show fallback menu or error message
}
```

### Validation Patterns
```typescript
// Validate menu items
const validMenuItems = menuItems.filter(item => 
  item.id && 
  item.price > 0 && 
  item.name_he && 
  item.name_en &&
  item.available !== false
);

// Validate cart items
const validCartItems = cartItems.filter(item =>
  item.id &&
  item.qty > 0 &&
  item.total > 0
);
```

## Usage Examples

### Complete Integration
```tsx
import React from 'react';
import {
  LuluEngineProvider,
  useCart,
  useLanguage,
  PaymentOptions,
  WhatsAppButton,
  fetchMenu
} from '@lulu/engine';

const config = {
  menuCsvUrl: process.env.REACT_APP_MENU_CSV_URL!,
  whatsappNumberIntl: process.env.REACT_APP_WHATSAPP_NUMBER!,
  orderEmails: [process.env.REACT_APP_ORDER_EMAIL!],
  businessHours: { /* ... */ },
  paymentProviders: {
    bitUrl: process.env.REACT_APP_BIT_URL,
    cash: true
  }
};

function App() {
  return (
    <LuluEngineProvider config={config}>
      <RestaurantApp />
    </LuluEngineProvider>
  );
}

function RestaurantApp() {
  const { items, subtotal, add, clear } = useCart();
  const { lang, setLang } = useLanguage();
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenu(config.menuCsvUrl).then(setMenu);
  }, []);

  const handlePayment = (method: string) => {
    // Process order
    clear();
  };

  return (
    <div>
      <h1>Restaurant Menu</h1>
      <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}>
        Language: {lang}
      </button>
      
      {/* Menu items */}
      {menu.map(item => (
        <div key={item.id}>
          <h3>{lang === 'he' ? item.name_he : item.name_en}</h3>
          <p>₪{item.price}</p>
          <button onClick={() => add({
            id: `${item.id}-${Date.now()}`,
            qty: 1,
            unitPrice: item.price,
            total: item.price
          })}>
            Add to Cart
          </button>
        </div>
      ))}
      
      {/* Cart summary */}
      <div>
        <h3>Cart ({items.length} items)</h3>
        <p>Total: ₪{subtotal}</p>
        {items.length > 0 && (
          <>
            <PaymentOptions onSelect={handlePayment} />
            <WhatsAppButton />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
```

This comprehensive API reference provides everything needed to integrate and extend the Lulu Engine restaurant ordering system.