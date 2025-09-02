import React, { useState, useRef } from "react";
import { supabase } from "../../../../../utils/supabaseClient";
import "./AdminUpload.css";

export default function AdminUpload() {
  const [category, setCategory] = useState("Event");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);

    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setLoading(false);
      return;
    }

    const { publicUrl } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName).data;

    const { error: insertError } = await supabase
      .from("gallery_images")
      .insert([{ category, image_url: publicUrl }]);

    setLoading(false);

    if (insertError) {
      alert("Database insert failed: " + insertError.message);
      return;
    }

    alert("Image uploaded successfully!");
    setFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="admin-upload">
      <h3>Upload New Image</h3>

      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="Event">Event</option>
        <option value="Product">Product</option>
        <option value="Lifestyle ">Lifestyle & Fashion</option>
        <option value="Portrait">Portrait</option>
        <option value="Travel">Travel</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
