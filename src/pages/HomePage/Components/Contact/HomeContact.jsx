// Contact.jsx
import React, { useState } from "react";
import "./HomeContact.css";

const HomeContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    const whatsappNumber = "+97588591328"; // Include country code without "+" sign
    const whatsappMessage = `Hello, I would like to get in touch.\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get in Touch</h2>
          <p>
            We'd love to hear from you! Reach out for collaborations, bookings,
            or just to say hello.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Your Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Contact Info</h3>
            <p>
              <i className="ti-location-pin"></i> Building 33, Al Khaleej Street
              Al Murar, Deira Dubai United Arab Emirates
            </p>
            <p>
              <i className="ti-email"></i> hellocreativeuae@gmail.com
            </p>
            <p>
              <i className="ti-mobile"></i> +971 588591328 ,+971 568195839
            </p>

            <div className="contact-social">
              <a
                href="https://www.facebook.com/share/1AharxyFkc/?mibextid=wwXIfr"
                target="_blank"
              >
                <i className="ti-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/vora_creative?igsh=ZmVsbWVmcmxrcnFq&utm_source=qr"
                target="_blank"
              >
                <i className="ti-instagram"></i>
              </a>
              <a
                href="https://youtube.com/@voracreative?si=mYgSPJ3Mg7DjTH12"
                target="_blank"
              >
                <i className="ti-youtube"></i>
              </a>
            </div>

            <div className="contact-map">
              <iframe
                title="Vora Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.000000000!2d55.318000!3d25.276987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43e123456789%3A0xabcdef123456789!2sBuilding%2033%2C%20Al%20Khaleej%20St%2C%20Al%20Murar%2C%20Deira%2C%20Dubai%20-%20UAE!5e0!3m2!1sen!2sae!4v1691234567890!5m2!1sen!2sae"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
