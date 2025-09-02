import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import "./HomeAbout.css";

const HomeAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      const { data, error } = await supabase
        .from("about_image")
        .select("*")
        .single();

      if (error) {
        console.error(error);
      } else {
        setAboutData(data);
      }
    };

    fetchAboutData();

    // Detect mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!aboutData) {
    return <p>Loading...</p>;
  }

  const toggleReadMore = () => setShowFull((prev) => !prev);

  const shortDescription = aboutData.description.slice(0, 500); // first 200 chars

  return (
    <section id="home-about" className="home-about-section">
      <div className="home-about-container">
        <div className="home-about-border">
          <div className="home-about-content-wrapper">

            {/* Video */}
            <div className="home-about-image-container">
              <div className="home-about-image-border">
                <div className="home-about-image-box">
                  <video
                    src={aboutData.video_url}
                    className="home-about-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="home-about-text">
              <h2 className="home-about-title">About Us</h2>
              <p className="home-about-description">
                {isMobile && !showFull ? shortDescription + "..." : aboutData.description}
              </p>

              {/* Read More / Read Less button */}
              {isMobile && aboutData.description.length > 200 && (
                <button
                  className="home-about-button"
                  onClick={toggleReadMore}
                >
                  {showFull ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
