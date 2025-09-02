import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../../utils/supabaseClient';
import './TestimonialView.css'; // optional styles

const TestimonialView = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch testimonials on mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    setDeletingId(id);
    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error.message);
    } else {
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
    }

    setDeletingId(null);
  };

  return (
    <div className="testimonial-view">
      <h3>All Testimonials</h3>

      {loading ? (
        <p>Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p>No testimonials found.</p>
      ) : (
        <ul className="testimonial-list">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="testimonial-item">
              <div>
                <strong>{testimonial.name}</strong>
                <p>{testimonial.message}</p>
                <small>{new Date(testimonial.created_at).toLocaleString()}</small>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(testimonial.id)}
                disabled={deletingId === testimonial.id}
              >
                {deletingId === testimonial.id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestimonialView;
