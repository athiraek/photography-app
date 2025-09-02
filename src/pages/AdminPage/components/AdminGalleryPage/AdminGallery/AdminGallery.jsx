import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../utils/supabaseClient";
import "./AdminGallery.css";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Error fetching images: " + error.message);
    } else {
      setImages(data);
    }
  };

  const handleDelete = async (image) => {
    const confirmDelete = window.confirm("Delete this image permanently?");
    if (!confirmDelete) return;

    const fileName = image.image_url.split("/").pop();
    const { error: storageError } = await supabase.storage
      .from("gallery")
      .remove([fileName]);

    if (storageError) {
      alert("Failed to delete from storage: " + storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", image.id);

    if (dbError) {
      alert("Failed to delete from DB: " + dbError.message);
      return;
    }

    setImages(images.filter((img) => img.id !== image.id));
  };

  const uniqueCategories = [
    "All",
    ...new Set(images.map((img) => img.category)),
  ];

  // Filter based on selected category
  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = filteredImages.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  return (
    <div className="admin-gallery p-4">
      <h3>Gallery</h3>

      {/* Category Filter Buttons */}
      <div className="category-filters">
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1); // Reset to first page on category change
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Images */}
      <div className="image-grid">
        {currentImages.map((img) => (
          <div key={img.id} className="image-card">
            <img
              src={img.image_url}
              alt={img.title}
              onClick={() => setPreviewImage(img)}
            />
            <button onClick={() => handleDelete(img)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

      {/* Modal Preview */}
      {previewImage && (
        <div className="modal" onClick={() => setPreviewImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage.image_url} alt={previewImage.title} />
            <h4>{previewImage.title}</h4>
            <p>Category: {previewImage.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
