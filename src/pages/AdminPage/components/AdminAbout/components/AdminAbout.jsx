import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../../../../../utils/supabaseClient";
import './AdminAbout.css';

const AdminAboutUpdate = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Fetch current About video + description
  const fetchAboutData = async () => {
    const { data, error } = await supabase
      .from("about_image")
      .select("video_url, description")
      .single();

    if (!error && data) {
      setVideoUrl(data.video_url);
      setDescription(data.description || "");
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      const fileName = `about_${Date.now()}_${file.name}`;

      // Upload video to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("about")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("about")
        .getPublicUrl(fileName);

      const newVideoUrl = publicData.publicUrl;

      // Update video in database
      const { error: updateError } = await supabase
        .from("about_image")
        .update({
          video_url: newVideoUrl,
          updated_at: new Date(),
        })
        .eq("id", 1);

      if (updateError) throw updateError;

      setVideoUrl(newVideoUrl);
    } catch (err) {
      console.error("Error updating video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = () => {
    fileInputRef.current.click();
  };

  // Handle description update
  const handleDescriptionUpdate = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("about_image")
        .update({
          description,
          updated_at: new Date(),
        })
        .eq("id", 1);

      if (error) throw error;

      alert("Description updated successfully!");
    } catch (err) {
      console.error("Error updating description:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="admin-about-update">
      
      <h2>About Section</h2>

      <div className={`video-container ${loading ? 'loading' : ''}`}>
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            muted
            style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        ) : (
          <div className="no-video">No video available</div>
        )}
      </div>

      <div className="button-container">
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button
          className="update-button"
          onClick={handleUpdateClick}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Video"}
        </button>
      </div>

      {/* Description update section */}
      <div className="description-container">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter about description..."
          rows="5"
          style={{ width: "100%", marginTop: "15px", padding: "10px", borderRadius: "8px" }}
        />
        <button
          className="update-button"
          onClick={handleDescriptionUpdate}
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          {loading ? "Updating..." : "Update Description"}
        </button>
      </div>
    </div>
  );
};

export default AdminAboutUpdate;
