import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { WhatsAppButton } from '@lulu/engine';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Lulu's Chinese Kitchen</h3>
          <p>
            Authentic Chinese cuisine with fresh ingredients and traditional recipes. 
            Experience the taste of China in every bite.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <WhatsAppButton onClick={() => {
              window.open('https://wa.me/972525201978', '_blank');
            }} />
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('contact')}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <MapPin size={16} />
            <span>123 Main Street, Tel Aviv, Israel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Phone size={16} />
            <a href="tel:+972525201978">+972-52-520-1978</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Mail size={16} />
            <a href="mailto:lulu@lulu-k.com">lulu@lulu-k.com</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('hours')}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Clock size={16} />
            <div>
              <div>Sun-Wed: 11:00 AM - 10:00 PM</div>
              <div>Thu-Fri: 11:00 AM - 11:00 PM</div>
              <div>Saturday: 12:00 PM - 11:00 PM</div>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a 
              href="https://facebook.com/luluskitchen" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
            >
              Facebook
            </a>
            <a 
              href="https://instagram.com/luluskitchen" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Lulu's Chinese Kitchen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;