# Usage Examples - @lulu/engine

Comprehensive examples demonstrating how to use the Lulu Engine in real restaurant applications.

## 📁 Examples Directory

```
examples/
├── README.md              # This file - overview of all examples
├── basic-integration/     # Simple restaurant menu app
├── advanced-features/     # Complex restaurant with all features
├── csv-formats/          # Menu CSV format examples
└── configuration/        # Different configuration patterns
```

## 🚀 Quick Start Example

### Basic Restaurant Menu

```tsx
// App.tsx
import React, { useState, useEffect } from 'react';
import {
  LuluEngineProvider,
  useCart,
  useLanguage,
  PaymentOptions,
  fetchMenu,
  type MenuItem,
  type EngineConfig
} from '@lulu/engine';

const restaurantConfig: EngineConfig = {
  menuCsvUrl: "https://docs.google.com/spreadsheets/d/1ABC123/export?format=csv",
  whatsappNumberIntl: "972525201978",
  orderEmails: ["orders@restaurant.com"],
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

export default function App() {
  return (
    <LuluEngineProvider config={restaurantConfig}>
      <RestaurantApp />
    </LuluEngineProvider>
  );
}

function RestaurantApp() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { items, subtotal, add, clear } = useCart();
  const { lang, setLang, isRTL } = useLanguage();

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const menuItems = await fetchMenu(restaurantConfig.menuCsvUrl);
      setMenu(menuItems.filter(item => item.available));
    } catch (error) {
      console.error('Failed to load menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (menuItem: MenuItem) => {
    add({
      id: `${menuItem.id}-${Date.now()}`,
      qty: 1,
      unitPrice: menuItem.price,
      total: menuItem.price
    });
  };

  const handlePayment = (method: 'bit' | 'paybox' | 'cash') => {
    console.log(`Processing payment with ${method}`);
    // In real app: process order, send emails, redirect to payment
    clear();
  };

  if (loading) return <div>Loading menu...</div>;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`restaurant-app lang-${lang}`}>
      {/* Header */}
      <header>
        <h1>{lang === 'he' ? 'מסעדת לולו' : 'Lulu Restaurant'}</h1>
        <button onClick={() => setLang(lang === 'he' ? 'en' : 'he')}>
          {lang === 'he' ? 'English' : 'עברית'}
        </button>
      </header>

      {/* Menu Display */}
      <main>
        <section className="menu">
          <h2>{lang === 'he' ? 'התפריט שלנו' : 'Our Menu'}</h2>
          <div className="menu-grid">
            {menu.map(item => (
              <MenuItemCard 
                key={item.id}
                item={item}
                lang={lang}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        {/* Cart Summary */}
        {items.length > 0 && (
          <aside className="cart">
            <h3>{lang === 'he' ? 'הזמנה' : 'Order'} ({items.length})</h3>
            <p>{lang === 'he' ? 'סה"כ' : 'Total'}: ₪{subtotal}</p>
            <PaymentOptions onSelect={handlePayment} />
          </aside>
        )}
      </main>
    </div>
  );
}

function MenuItemCard({ 
  item, 
  lang, 
  onAddToCart 
}: {
  item: MenuItem;
  lang: 'he' | 'en';
  onAddToCart: (item: MenuItem) => void;
}) {
  return (
    <div className="menu-item">
      {item.image_url && (
        <img src={item.image_url} alt={lang === 'he' ? item.name_he : item.name_en} />
      )}
      <h3>{lang === 'he' ? item.name_he : item.name_en}</h3>
      {(lang === 'he' ? item.description_he : item.description_en) && (
        <p>{lang === 'he' ? item.description_he : item.description_en}</p>
      )}
      <div className="price-and-action">
        <span className="price">₪{item.price}</span>
        <button onClick={() => onAddToCart(item)}>
          {lang === 'he' ? 'הוסף לעגלה' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
```

### Basic Styling (Optional)

```css
/* styles.css */
.restaurant-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.restaurant-app.lang-he {
  font-family: 'Assistant', sans-serif; /* Hebrew font */
}

.restaurant-app.lang-en {
  font-family: 'Inter', sans-serif; /* English font */
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
}

.menu-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.price-and-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c5aa0;
}

button {
  padding: 10px 20px;
  background: #2c5aa0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #1e3d6f;
}

.cart {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 250px;
}

/* RTL support */
[dir="rtl"] .price-and-action {
  flex-direction: row-reverse;
}

[dir="rtl"] .cart {
  right: auto;
  left: 20px;
}
```

## 🍕 Menu CSV Examples

### Basic Menu Format

```csv
id,category,name_he,name_en,price,available
pizza-margherita,פיצה,מרגריטה,Margherita,45,1
pizza-pepperoni,פיצה,פפרוני,Pepperoni,52,1
salad-caesar,סלטים,סלט קיסר,Caesar Salad,32,1
pasta-carbonara,פסטה,קרבונרה,Carbonara,38,1
drink-coke,משקאות,קוקה קולה,Coca Cola,12,1
dessert-tiramisu,קינוחים,טירמיסו,Tiramisu,28,1
```

### Advanced Menu with Descriptions and Images

```csv
id,category,name_he,name_en,description_he,description_en,price,image_url,tags,available
pizza-margherita,פיצה,מרגריטה,Margherita,פיצה קלאסית עם רוטב עגבניות ומוצרלה,Classic pizza with tomato sauce and mozzarella,45,https://example.com/images/margherita.jpg,"vegetarian,classic",1
burger-beef,המבורגרים,המבורגר בקר,Beef Burger,המבורגר עסיסי עם בקר טחון ירקות טריים,Juicy burger with ground beef and fresh vegetables,38,https://example.com/images/burger.jpg,"meat,popular",1
salad-vegan,סלטים,סלט טבעוני,Vegan Salad,סלט ירוק עשיר עם ירקות העונה,Rich green salad with seasonal vegetables,29,https://example.com/images/vegan-salad.jpg,"vegan,healthy,gluten-free",1
```

### Menu with Addons

```csv
id,category,name_he,name_en,price,addons,available
pizza-custom,פיצה,פיצה מותאמת,Custom Pizza,35,"{\"toppings\":{\"id\":\"toppings\",\"label\":\"תוספות\",\"type\":\"multi\",\"options\":[{\"label\":\"גבינה נוספת\",\"price\":5},{\"label\":\"זיתים\",\"price\":3},{\"label\":\"פטריות\",\"price\":4}]}}",1
```

## ⚙️ Configuration Examples

### Development Configuration

```tsx
const devConfig: EngineConfig = {
  menuCsvUrl: "http://localhost:3000/sample-menu.csv", // Local development
  whatsappNumberIntl: "972500000000", // Test number
  orderEmails: ["dev@localhost"],
  businessHours: {
    sunday: [{ open: "00:00", close: "23:59" }], // Always open for testing
    monday: [{ open: "00:00", close: "23:59" }],
    tuesday: [{ open: "00:00", close: "23:59" }],
    wednesday: [{ open: "00:00", close: "23:59" }],
    thursday: [{ open: "00:00", close: "23:59" }],
    friday: [{ open: "00:00", close: "23:59" }],
    saturday: [{ open: "00:00", close: "23:59" }]
  },
  paymentProviders: {
    cash: true // Only cash for development
  }
};
```

### Production Configuration with Environment Variables

```tsx
const prodConfig: EngineConfig = {
  menuCsvUrl: process.env.REACT_APP_MENU_CSV_URL!,
  whatsappNumberIntl: process.env.REACT_APP_WHATSAPP_NUMBER!,
  orderEmails: process.env.REACT_APP_ORDER_EMAILS?.split(',') || [],
  businessHours: JSON.parse(process.env.REACT_APP_BUSINESS_HOURS || '{}'),
  paymentProviders: {
    bitUrl: process.env.REACT_APP_BIT_URL,
    payboxUrl: process.env.REACT_APP_PAYBOX_URL,
    cash: process.env.REACT_APP_ACCEPT_CASH === 'true'
  }
};
```

### Multi-Language Configuration

```tsx
const multiLangConfig: EngineConfig = {
  menuCsvUrl: "https://docs.google.com/spreadsheets/d/MULTI_LANG_MENU/export?format=csv",
  whatsappNumberIntl: "972525201978",
  orderEmails: ["orders@restaurant.co.il", "orders@restaurant.com"],
  businessHours: {
    sunday: [
      { open: "11:00", close: "15:00" }, // Lunch
      { open: "18:00", close: "23:00" }  // Dinner
    ],
    monday: [{ open: "11:00", close: "23:00" }],
    tuesday: [{ open: "11:00", close: "23:00" }],
    wednesday: [{ open: "11:00", close: "23:00" }],
    thursday: [{ open: "11:00", close: "23:00" }],
    friday: [{ open: "11:00", close: "16:00" }], // Early close
    saturday: [] // Closed for Shabbat
  },
  paymentProviders: {
    bitUrl: "https://bit.ly/restaurant-payment",
    payboxUrl: "https://paybox.co.il/restaurant-payment",
    cash: true
  }
};
```

## 🎣 Advanced Hook Usage

### Custom Cart with Persistence

```tsx
function useAdvancedCart() {
  const { items, add, remove, clear, setItems } = useCart();
  const [couponCode, setCouponCode] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = couponCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal - discount + deliveryFee;

  const applyCoupon = (code: string) => {
    setCouponCode(code);
    // In real app: validate with server
  };

  const updateQuantity = (itemId: string, qty: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, qty, total: item.unitPrice * qty }
        : item
    ));
  };

  return {
    items,
    subtotal,
    discount,
    total,
    deliveryFee,
    couponCode,
    add,
    remove,
    clear,
    updateQuantity,
    applyCoupon,
    setDeliveryFee
  };
}
```

### Language with Persistence

```tsx
function usePersistedLanguage() {
  const { lang, setLang, isRTL } = useLanguage();
  
  useEffect(() => {
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem('restaurant-language') as 'he' | 'en';
    if (savedLang && savedLang !== lang) {
      setLang(savedLang);
    }
  }, []);

  const switchLanguage = (newLang: 'he' | 'en') => {
    setLang(newLang);
    localStorage.setItem('restaurant-language', newLang);
    // Update document direction
    document.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  return {
    lang,
    setLang: switchLanguage,
    isRTL,
    // Add translation function
    t: (key: string) => {
      const translations = {
        'welcome': lang === 'he' ? 'ברוכים הבאים' : 'Welcome',
        'menu': lang === 'he' ? 'תפריט' : 'Menu',
        'cart': lang === 'he' ? 'עגלת קניות' : 'Cart',
        'total': lang === 'he' ? 'סה"כ' : 'Total'
        // Add more translations
      };
      return translations[key] || key;
    }
  };
}
```

## 📱 Complete Restaurant App Example

See the `examples/advanced-features/` directory for a complete restaurant application that demonstrates:

- Menu loading and display
- Cart management with quantities
- Language switching with persistence
- Payment processing
- Order confirmation
- Business hours checking
- Responsive design
- Accessibility features

## 🛠️ Integration with Popular Frameworks

### Next.js Integration

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { LuluEngineProvider, type EngineConfig } from '@lulu/engine';

const config: EngineConfig = {
  // Your configuration
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LuluEngineProvider config={config}>
      <Component {...pageProps} />
    </LuluEngineProvider>
  );
}
```

### Vite + React Integration

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LuluEngineProvider } from '@lulu/engine';
import App from './App';
import './styles.css';

const config = {
  // Your configuration from environment variables
  menuCsvUrl: import.meta.env.VITE_MENU_CSV_URL,
  // ... other config
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LuluEngineProvider config={config}>
      <App />
    </LuluEngineProvider>
  </React.StrictMode>
);
```

These examples provide a comprehensive starting point for integrating the Lulu Engine into any restaurant website, demonstrating both simple and advanced usage patterns.