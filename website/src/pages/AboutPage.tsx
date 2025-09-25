import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Award, Users, Utensils } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* About Hero */}
      <section className="section" style={{ 
        background: 'var(--background-light)', 
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="section-container">
          <h1 className="section-title">{t('aboutTitle')}</h1>
          <p className="section-subtitle">
            Discover the story behind our authentic Chinese cuisine
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="section about">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2 style={{ 
                fontSize: '2rem', 
                marginBottom: '1.5rem',
                color: 'var(--text-dark)'
              }}>
                Our Story
              </h2>
              <p style={{ marginBottom: '1.5rem' }}>
                {t('aboutText')}
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Founded in 2015, Lulu's Chinese Kitchen started as a small family restaurant 
                with a big dream: to share the authentic flavors of China with our local community. 
                What began as a humble establishment has grown into a beloved culinary destination, 
                known for our commitment to quality, authenticity, and exceptional service.
              </p>
              <p>
                Our head chef, Master Chen, brings over 25 years of experience from renowned 
                restaurants across Beijing and Shanghai. Every dish is prepared using traditional 
                techniques and the finest ingredients, ensuring an authentic taste experience 
                that transports you straight to the heart of China.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"
                alt="Restaurant interior"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">Our Values</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div style={{
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
                <Heart color="white" size={30} />
              </div>
              <h3 style={{ 
                marginBottom: '1rem',
                color: 'var(--text-dark)'
              }}>
                Made with Love
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                Every dish is prepared with care and passion, 
                treating each meal as a gift to our customers.
              </p>
            </div>

            <div style={{
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
                <Award color="var(--text-dark)" size={30} />
              </div>
              <h3 style={{ 
                marginBottom: '1rem',
                color: 'var(--text-dark)'
              }}>
                Quality First
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                We source only the finest ingredients and maintain 
                the highest standards in food preparation and service.
              </p>
            </div>

            <div style={{
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
              <h3 style={{ 
                marginBottom: '1rem',
                color: 'var(--text-dark)'
              }}>
                Community Focused
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                We're more than a restaurant - we're part of the community, 
                bringing people together through great food.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--primary-dark)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Utensils color="white" size={30} />
              </div>
              <h3 style={{ 
                marginBottom: '1rem',
                color: 'var(--text-dark)'
              }}>
                Authentic Tradition
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                We honor traditional Chinese culinary methods while 
                embracing modern techniques and dietary preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" style={{ background: 'var(--background-light)' }}>
        <div className="section-container">
          <h2 className="section-title">Meet Our Team</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=300&fit=crop"
                alt="Master Chen - Head Chef"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)'
                }}>
                  Master Chen
                </h3>
                <p style={{ 
                  color: 'var(--primary-color)',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  Head Chef
                </p>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                  With over 25 years of experience in fine Chinese cuisine, 
                  Master Chen brings authentic flavors and traditional techniques 
                  from Beijing and Shanghai to every dish.
                </p>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=300&fit=crop"
                alt="Lulu Wang - Owner"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)'
                }}>
                  Lulu Wang
                </h3>
                <p style={{ 
                  color: 'var(--primary-color)',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  Owner & Manager
                </p>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                  Lulu founded the restaurant with a vision to share her family's 
                  recipes and create a warm, welcoming space where everyone feels at home.
                </p>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop"
                alt="Service Team"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)'
                }}>
                  Our Service Team
                </h3>
                <p style={{ 
                  color: 'var(--primary-color)',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  Hospitality Experts
                </p>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                  Our friendly and knowledgeable staff are dedicated to providing 
                  exceptional service and ensuring every guest has a memorable dining experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;