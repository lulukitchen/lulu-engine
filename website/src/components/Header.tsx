import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Globe, Menu, X } from 'lucide-react';
import { useCart } from '@lulu/engine';
import Cart from './Cart';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.qty, 0);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'he' : 'en');
  };

  const isActivePage = (path: string) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img 
              src="/lulu-icon.svg" 
              alt="Lulu's Kitchen" 
              className="logo-icon"
            />
            <span>Lulu's Kitchen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-menu">
            <Link 
              to="/" 
              className={`nav-link ${isActivePage('/') ? 'active' : ''}`}
            >
              {t('home')}
            </Link>
            <Link 
              to="/menu" 
              className={`nav-link ${isActivePage('/menu') ? 'active' : ''}`}
            >
              {t('menu')}
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActivePage('/about') ? 'active' : ''}`}
            >
              {t('about')}
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActivePage('/contact') ? 'active' : ''}`}
            >
              {t('contact')}
            </Link>
          </nav>

          <div className="nav-actions">
            <button 
              onClick={toggleLanguage} 
              className="language-switcher"
              aria-label="Switch Language"
            >
              <Globe size={16} />
              <span>{i18n.language === 'en' ? 'עב' : 'EN'}</span>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)} 
              className="cart-button"
              aria-label={`${t('cart')} (${itemCount} items)`}
            >
              <ShoppingCart size={20} />
              <span>{t('cart')}</span>
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-menu-btn"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu">
              <div className="mobile-menu-header">
                <Link to="/" className="logo">
                  <img 
                    src="/lulu-icon.svg" 
                    alt="Lulu's Kitchen" 
                    className="logo-icon"
                  />
                  <span>Lulu's Kitchen</span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="close-button"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="mobile-nav-menu">
                <Link 
                  to="/" 
                  className={`mobile-nav-link ${isActivePage('/') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('home')}
                </Link>
                <Link 
                  to="/menu" 
                  className={`mobile-nav-link ${isActivePage('/menu') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('menu')}
                </Link>
                <Link 
                  to="/about" 
                  className={`mobile-nav-link ${isActivePage('/about') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <Link 
                  to="/contact" 
                  className={`mobile-nav-link ${isActivePage('/contact') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Header;