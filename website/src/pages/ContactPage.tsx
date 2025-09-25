import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div>
      {/* Contact Hero */}
      <section className="section" style={{ 
        background: 'var(--background-light)', 
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="section-container">
          <h1 className="section-title">{t('contactTitle')}</h1>
          <p className="section-subtitle">
            Get in touch with us for reservations, catering, or any questions
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section contact">
        <div className="section-container">
          <div className="contact-content">
            {/* Contact Information */}
            <div className="contact-info">
              <h2 style={{ 
                fontSize: '1.75rem',
                marginBottom: '1.5rem',
                color: 'var(--text-dark)'
              }}>
                Get In Touch
              </h2>
              
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div className="contact-details">
                  <h3>{t('address')}</h3>
                  <p>123 Main Street</p>
                  <p>Tel Aviv, Israel 6473424</p>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="contact-icon" />
                <div className="contact-details">
                  <h3>{t('phone')}</h3>
                  <p>
                    <a href="tel:+972525201978">+972-52-520-1978</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <Mail className="contact-icon" />
                <div className="contact-details">
                  <h3>{t('email')}</h3>
                  <p>
                    <a href="mailto:lulu@lulu-k.com">lulu@lulu-k.com</a>
                  </p>
                  <p>
                    <a href="mailto:lulu.kitchen.il@gmail.com">lulu.kitchen.il@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <Clock className="contact-icon" />
                <div className="contact-details">
                  <h3>{t('hours')}</h3>
                  <div>
                    <p><strong>Sunday - Wednesday:</strong> 11:00 AM - 10:00 PM</p>
                    <p><strong>Thursday - Friday:</strong> 11:00 AM - 11:00 PM</p>
                    <p><strong>Saturday:</strong> 12:00 PM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2 style={{ 
                fontSize: '1.75rem',
                marginBottom: '1.5rem',
                color: 'var(--text-dark)'
              }}>
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section">
        <div className="section-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: 'var(--primary-color)'
              }}>
                Catering Services
              </h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Planning a special event? We offer catering services for parties, 
                corporate events, and celebrations. Contact us for custom menus 
                and pricing.
              </p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Learn More
              </button>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: 'var(--primary-color)'
              }}>
                Private Events
              </h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Host your next celebration at Lulu's Kitchen. We can accommodate 
                private dining for groups of 20-50 people with customized menus 
                and dedicated service.
              </p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Book Event
              </button>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: 'var(--primary-color)'
              }}>
                Cooking Classes
              </h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Learn to cook authentic Chinese dishes with Master Chen! 
                Join our monthly cooking classes and discover the secrets 
                behind our most popular recipes.
              </p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section" style={{ background: 'var(--background-light)' }}>
        <div className="section-container">
          <h2 className="section-title">Find Us</h2>
          <div style={{
            background: 'white',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-light)'
          }}>
            {/* Placeholder for map - in a real app you'd integrate Google Maps or similar */}
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} style={{ marginBottom: '1rem' }} />
              <p>Interactive map would be displayed here</p>
              <p style={{ marginTop: '0.5rem' }}>
                <a 
                  href="https://maps.google.com/?q=123+Main+Street,+Tel+Aviv,+Israel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  View on Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;