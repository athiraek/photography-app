// Services.jsx
import React from 'react';
import { Camera, MonitorSmartphone, Megaphone, Globe2, Map, Layers3 } from 'lucide-react';
import './service.css';
const service = () => {
  const services = [
    {
      icon: <Camera size={48} />,
      title: 'Photographic Activities',
      description: 'Capturing moments with creativity, precision, and a professional eye.',
    },
    {
      icon: <MonitorSmartphone size={48} />,
      title: 'Digital Marketing',
      description: 'Boost your online presence with effective digital strategies.',
    },
    {
      icon: <Megaphone size={48} />,
      title: 'Advertising',
      description: 'Creative ad campaigns that make your brand stand out.',
    },
    {
      icon: <Map size={48} />,
      title: 'Tour Packages',
      description: 'Explore curated travel experiences with our custom tour plans.',
    },

  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">We offer a wide range of services to elevate your brand and experience.</p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default service;
