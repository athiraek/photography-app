import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabaseClient'; // adjust path if needed
import './Testimonial.css';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error.message);
    } else {
      setTestimonials(data);
    }
    setLoading(false);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Clients Say</h2>

        {loading ? (
          <p>Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p>No testimonials yet.</p>
        ) : (
          <div className="testimonials-list">
            {testimonials.map((item) => (
              <div className="testimonial-card" key={item.id}>
                <p className="testimonial-message">"{item.message}"</p>
                <h4 className="testimonial-name">- {item.name}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;