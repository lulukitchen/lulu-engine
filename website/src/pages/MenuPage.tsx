import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { fetchMenu, useCart, MenuItem } from '@lulu/engine';
import { useEngineConfig } from '@lulu/engine';

const MenuPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const config = useEngineConfig();
  const { add } = useCart();

  const addItem = (item: MenuItem) => {
    add({
      id: item.id,
      qty: 1,
      unitPrice: item.price,
      total: item.price
    });
  };
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const menuData = await fetchMenu(config.menuCsvUrl);
        setMenu(menuData);
      } catch (err) {
        console.error('Failed to load menu:', err);
        setError('Failed to load menu');
        // Fallback to sample data
        setMenu(getSampleMenu());
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [config.menuCsvUrl]);

  const getSampleMenu = (): MenuItem[] => [
    {
      id: 'kung-pao-chicken',
      category: 'Main Dishes',
      name_he: 'קונג פאו עוף',
      name_en: 'Kung Pao Chicken',
      description_he: 'עוף רך עם בוטנים וירקות ברוטב חריף מסיצ\'ואן',
      description_en: 'Tender chicken with peanuts and vegetables in spicy Sichuan sauce',
      price: 18.99,
      image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
      available: true,
      tags: ['spicy', 'popular']
    },
    {
      id: 'sweet-sour-pork',
      category: 'Main Dishes',
      name_he: 'חזיר מתוק וחמוץ',
      name_en: 'Sweet and Sour Pork',
      description_he: 'חתיכות חזיר פריכות ברוטב מתוק וחמוץ עם פלפלים',
      description_en: 'Crispy pork pieces in tangy sweet and sour sauce with bell peppers',
      price: 16.99,
      image_url: 'https://images.unsplash.com/photo-1559847844-d11b16a0c48a?w=400&h=300&fit=crop',
      available: true,
      tags: ['sweet', 'popular']
    },
    {
      id: 'beef-lo-mein',
      category: 'Main Dishes',
      name_he: 'לו מיין בקר',
      name_en: 'Beef Lo Mein',
      description_he: 'אטריות רכות מוקפצות עם בקר רך וירקות טריים',
      description_en: 'Soft noodles stir-fried with tender beef and fresh vegetables',
      price: 17.99,
      image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&h=300&fit=crop',
      available: true,
      tags: ['noodles']
    },
    {
      id: 'spring-rolls',
      category: 'Appetizers',
      name_he: 'ספרינג רולים',
      name_en: 'Spring Rolls',
      description_he: 'רולים פריכים עם ירקות טריים וירוקי עלים',
      description_en: 'Crispy rolls filled with fresh vegetables and greens',
      price: 8.99,
      image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
      available: true,
      tags: ['vegetarian', 'crispy']
    },
    {
      id: 'dumplings',
      category: 'Appetizers',
      name_he: 'דמפלינגס',
      name_en: 'Pork Dumplings',
      description_he: 'דמפלינגס מאודים במילוי חזיר וירקות',
      description_en: 'Steamed dumplings filled with seasoned pork and vegetables',
      price: 12.99,
      image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop',
      available: true,
      tags: ['steamed', 'popular']
    },
    {
      id: 'green-tea',
      category: 'Beverages',
      name_he: 'תה ירוק',
      name_en: 'Jasmine Green Tea',
      description_he: 'תה ירוק יסמין ארומטי',
      description_en: 'Aromatic jasmine green tea',
      price: 3.99,
      available: true,
      tags: ['tea', 'healthy']
    },
    {
      id: 'sesame-balls',
      category: 'Desserts',
      name_he: 'כדורי שומשום',
      name_en: 'Sesame Balls',
      description_he: 'כדורי שומשום מטוגנים במילוי ממרח שעועית אדומה',
      description_en: 'Deep-fried sesame balls filled with sweet red bean paste',
      price: 6.99,
      image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      available: true,
      tags: ['sweet', 'traditional']
    }
  ];

  const categories = ['all', ...Array.from(new Set(menu.map(item => item.category)))];

  const filteredMenu = activeCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          {t('retry')}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Menu Hero */}
      <section className="section" style={{ 
        background: 'var(--background-light)', 
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="section-container">
          <h1 className="section-title">{t('menu')}</h1>
          <p className="section-subtitle">
            Explore our authentic Chinese dishes made with fresh ingredients
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="section">
        <div className="section-container">
          {/* Category Filter */}
          <div className="menu-categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
              >
                {category === 'all' 
                  ? 'All Items' 
                  : t(category.toLowerCase().replace(' ', ''), category)
                }
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="menu-grid">
            {filteredMenu.map((item) => (
              <div key={item.id} className="menu-item">
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={i18n.language === 'he' ? item.name_he : item.name_en}
                    className="menu-item-image"
                  />
                )}
                
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-title">
                      {i18n.language === 'he' ? item.name_he : item.name_en}
                    </h3>
                    <span className="menu-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {(item.description_he || item.description_en) && (
                    <p className="menu-item-description">
                      {i18n.language === 'he' ? item.description_he : item.description_en}
                    </p>
                  )}
                  
                  {item.tags && item.tags.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      marginBottom: '1rem',
                      flexWrap: 'wrap'
                    }}>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: 'var(--background-light)',
                            color: 'var(--text-light)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="menu-item-actions">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="add-to-cart-btn"
                      disabled={!item.available}
                    >
                      <Plus size={16} />
                      {t('addToCart')}
                    </button>
                    
                    {!item.available && (
                      <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--text-light)'
            }}>
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;