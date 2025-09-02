import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabaseClient';
import './Gallery.css'; // Assuming the CSS file path remains the same

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  return (
    <div>


      <div className="gallerypage">
        <h3>Gallery</h3>

        <div className="gallery-category-filters">
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

        <div className="gallery-image-grid">
          {currentImages.map((img) => (
            <div key={img.id} className="gallery-image-card">
              <img
                src={img.image_url}
                onClick={() => setPreviewImage(img)}
              />
              <p>{img.category}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}

        {previewImage && (
          <div className="modal" onClick={() => setPreviewImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={previewImage.image_url} alt={previewImage.title} />
              <p>Category: {previewImage.category}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
