import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>{t('welcomeTitle')}</h1>
          <p>{t('welcomeSubtitle')}</p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">
              {t('orderNow')}
              <ArrowRight size={20} />
            </Link>
            <Link to="/menu" className="btn btn-secondary">
              {t('exploreMenu')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Lulu's Kitchen?</h2>
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div className="feature-card" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--primary-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Star color="white" size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Authentic Recipes
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                Traditional Chinese recipes passed down through generations, 
                prepared with authentic techniques and fresh ingredients.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--secondary-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Clock color="var(--text-dark)" size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Fast Delivery
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                Quick and reliable delivery service to bring fresh, 
                hot meals directly to your doorstep.
              </p>
            </div>

            <div className="feature-card" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--accent-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Users color="white" size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Family Owned
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                A family-owned restaurant committed to serving our community 
                with love, care, and exceptional hospitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Preview */}
      <section className="section" style={{ background: 'var(--background-light)' }}>
        <div className="section-container">
          <h2 className="section-title">Popular Dishes</h2>
          <p className="section-subtitle">
            Try our customer favorites, made with the finest ingredients
          </p>
          
          <div className="popular-dishes" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {[
              {
                name: 'Kung Pao Chicken',
                price: '$18.99',
                image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
                description: 'Classic Sichuan dish with tender chicken, peanuts, and vegetables in spicy sauce'
              },
              {
                name: 'Sweet and Sour Pork',
                price: '$16.99',
                image: 'https://images.unsplash.com/photo-1559847844-d11b16a0c48a?w=400&h=300&fit=crop',
                description: 'Crispy pork pieces in tangy sweet and sour sauce with bell peppers'
              },
              {
                name: 'Beef Lo Mein',
                price: '$17.99',
                image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&h=300&fit=crop',
                description: 'Soft noodles stir-fried with tender beef and fresh vegetables'
              }
            ].map((dish, index) => (
              <div key={index} className="dish-card" style={{
                background: 'white',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition)'
              }}>
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'var(--text-dark)'
                    }}>
                      {dish.name}
                    </h3>
                    <span style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: 'var(--primary-color)'
                    }}>
                      {dish.price}
                    </span>
                  </div>
                  <p style={{
                    color: 'var(--text-light)',
                    marginBottom: '1rem',
                    lineHeight: '1.6'
                  }}>
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/menu" className="btn btn-primary">
              View Full Menu
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="section-container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
            color: 'white',
            padding: '4rem 2rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Ready to Order?
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: '0.9' }}>
              Experience authentic Chinese flavors delivered fresh to your door
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/menu" className="btn btn-secondary">
                Browse Menu
              </Link>
              <Link to="/contact" className="btn" style={{
                background: 'var(--secondary-color)',
                color: 'var(--text-dark)'
              }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;