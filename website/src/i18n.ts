import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      menu: 'Menu',
      about: 'About',
      contact: 'Contact',
      cart: 'Cart',
      
      // Hero Section
      welcomeTitle: "Welcome to Lulu's Chinese Kitchen",
      welcomeSubtitle: 'Authentic Chinese cuisine with fresh ingredients and traditional recipes',
      orderNow: 'Order Now',
      exploreMenu: 'Explore Menu',
      
      // About Section
      aboutTitle: 'About Lulu\'s Kitchen',
      aboutText: 'At Lulu\'s Chinese Kitchen, we bring you the authentic flavors of China with a modern twist. Our skilled chefs use only the freshest ingredients and time-honored recipes to create dishes that will transport you to the heart of China.',
      
      // Menu
      appetizers: 'Appetizers',
      mainDishes: 'Main Dishes',
      desserts: 'Desserts',
      beverages: 'Beverages',
      addToCart: 'Add to Cart',
      
      // Contact
      contactTitle: 'Contact Us',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Hours',
      
      // Cart & Order
      viewCart: 'View Cart',
      checkout: 'Checkout',
      orderTotal: 'Order Total',
      delivery: 'Delivery',
      subtotal: 'Subtotal',
      
      // Payment
      paymentMethods: 'Payment Methods',
      cash: 'Cash',
      creditCard: 'Credit Card',
      
      // Common
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
    }
  },
  he: {
    translation: {
      // Navigation
      home: 'בית',
      menu: 'תפריט',
      about: 'אודות',
      contact: 'צור קשר',
      cart: 'עגלה',
      
      // Hero Section
      welcomeTitle: 'ברוכים הבאים למטבח הסיני של לולו',
      welcomeSubtitle: 'מטבח סיני אותנטי עם מרכיבים טריים ומתכונים מסורתיים',
      orderNow: 'הזמן עכשיו',
      exploreMenu: 'עיין בתפריט',
      
      // About Section
      aboutTitle: 'אודות המטבח של לולו',
      aboutText: 'במטבח הסיני של לולו, אנחנו מביאים לכם את הטעמים האותנטיים של סין עם טוויסט מודרני. הטבחים המיומנים שלנו משתמשים רק במרכיבים הטריים ביותר ובמתכונים מסורתיים כדי ליצור מנות שיעבירו אתכם ללב סין.',
      
      // Menu
      appetizers: 'מנות ראשונות',
      mainDishes: 'מנות עיקריות',
      desserts: 'קינוחים',
      beverages: 'משקאות',
      addToCart: 'הוסף לעגלה',
      
      // Contact
      contactTitle: 'צור קשר',
      address: 'כתובת',
      phone: 'טלפון',
      email: 'אימייל',
      hours: 'שעות פעילות',
      
      // Cart & Order
      viewCart: 'צפה בעגלה',
      checkout: 'קופה',
      orderTotal: 'סך הכל להזמנה',
      delivery: 'משלוח',
      subtotal: 'סכום ביניים',
      
      // Payment
      paymentMethods: 'אמצעי תשלום',
      cash: 'מזומן',
      creditCard: 'כרטיס אשראי',
      
      // Common
      loading: 'טוען...',
      error: 'אירעה שגיאה',
      retry: 'נסה שוב',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;