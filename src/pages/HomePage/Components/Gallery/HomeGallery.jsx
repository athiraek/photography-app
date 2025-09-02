import React, { useState } from "react";
import { supabase } from '../../../../utils/supabaseClient';
import "./HomeGallery.css";
import { Link } from 'react-router-dom';
import  { useEffect } from 'react';




const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('Error fetching images: ' + error.message);
    } else {
      setImages(data);
    }
  };

  const uniqueCategories = ['All', ...new Set(images.map((img) => img.category))];

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="home-gallery" className="home-gallery-section">
      <div className="home-gallery-container">
        <h2 className="home-gallery-title">OUR LATEST WORKS</h2>

        <div className="home-gallery-filters">
            {uniqueCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="home-gallery-grid">
          {currentImages.map((img)  => (
            <div className="home-gallery-item" key={img.id}>
              <img
                src={img.image_url}


                className="home-gallery-image"
              />
              <div className="home-gallery-overlay">
                <p className="home-overlay-text">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/gallery" className="home-gallery-button">
          <button>Load More</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeGallery;