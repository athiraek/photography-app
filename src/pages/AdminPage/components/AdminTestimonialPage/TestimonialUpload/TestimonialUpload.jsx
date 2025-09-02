import React, { useState } from 'react';
import { supabase } from '../../../../../utils/supabaseClient';
import './TestimonialUpload.css'; // optional styling

const TestimonialUpload = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess('');
    setError('');

    if (!name || !message) {
      setError('Please fill out all fields');
      return;
    }

    const user = supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to submit a testimonial.');
      return;
    }

    const {  error } = await supabase.from('testimonials').insert([
      {
        name,
        message,
      },
    ]);

    if (error) {
      setError('Failed to upload testimonial');
      console.error(error);
    } else {
      setSuccess('Testimonial uploaded successfully!');
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="testimonial-upload">
      <h3>Add New Testimonial</h3>
      <form onSubmit={handleSubmit} className="testimonial-form">
        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Testimonial Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TestimonialUpload;
