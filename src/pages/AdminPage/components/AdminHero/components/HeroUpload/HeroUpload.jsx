import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../../../utils/supabaseClient';
import './HeroUpload.css';



const AdminHeroView = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all hero images
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching images:', error.message);
    } else {
      setImages(data || []);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file selection + upload
  const handleUpdate = async (imageId, file) => {
    if (!file) return;

    setLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${imageId}-${Date.now()}.${fileExt}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('hero')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: publicData } = supabase.storage
        .from('hero')
        .getPublicUrl(fileName);

      const publicUrl = publicData.publicUrl;

      // 3. Update DB
      const { error: updateError } = await supabase
        .from('hero_images')
        .update({
          image_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', imageId);

      if (updateError) throw updateError;

      // 4. Refresh images
      await fetchImages();
      alert('Image updated successfully!');
    } catch (err) {
      console.error('Error updating image:', err.message);
      alert('Failed to update image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-hero-view">
      <h2>Manage Hero Images</h2>
      <div className="hero-image-grid">
        {images.map((img) => (
          <div key={img.id} className="hero-image-card">
            <img src={img.image_url} alt={`Hero ${img.id}`} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpdate(img.id, e.target.files[0])}
              disabled={loading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeroView;