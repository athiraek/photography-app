import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabaseClient';
import logo from '../../../../assets/img/logo_white.png';
import whatsapp from '../../../../assets/img/whatsapp.png'
import './Hero.css';

const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  async function fetchHeroImages() {
    const { data, error } = await supabase
      .from('hero_images')
      .select('id, image_url')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching hero images:', error);
    } else {
      setSlides(data.map((item) => item.image_url));
    }
  }

  return (
    <section className="hero-section">
      <div
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '10px',
          zIndex: 9999,
        }}
        
      >
      <img
        src={whatsapp}
        alt="watsapp"
        onClick={() => window.open('https://wa.me/97588591328', '_blank')} // replace with your number
        style={{
          width: '50px',
          height: '50px',
          cursor: 'pointer',

        }}
      />

      </div>
      {/* Accordion */}
      <div className="accordion-wrapper">
        {slides.map((bg, index) => (
          <div
            className="accordion-item"
            key={index}
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="pa-text">
              <div className="pa-author">
                <img src={logo} alt="Logo" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
