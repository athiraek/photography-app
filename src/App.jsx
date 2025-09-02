import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import Contact from "./pages/ContactPage/Contact";
import AboutPage from "./pages/AboutPage/AboutPage";
import Gallery from "./pages/GalleryPage/GalleryPage";
import ServicePage from "./pages/ServicePage/ServicePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminTestimonialPage from "./pages/AdminPage/components/AdminTestimonialPage/AdminTestimonialPage";
import AdminGalleryPage from "./pages/AdminPage/components/AdminGalleryPage/AdminGalleryPage";
import AdminHero from "./pages/AdminPage/components/AdminHero/AdminHero";
import ProtectedRoute from "./utils/ProtectedRoute";
import IntroVideo from "./pages/IntroVideo/IntroVideo";

import "./assets/css/themify-icons.css";
import "./assets/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import AdminAboutPage from "./pages/AdminPage/components/AdminAbout/AdminAboutPage";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Intro video overlay */}
      {showIntro && <IntroVideo onEnd={() => setShowIntro(false)} />}

      {/* Main app content */}
      {!showIntro && (
        <BrowserRouter basename="/delivery-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/voraAdmin" element={<AdminPage />} />
            
            {/* Protected admin routes */}
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGalleryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/testimonial"
              element={
                <ProtectedRoute>
                  <AdminTestimonialPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hero"
              element={
                <ProtectedRoute>
                  <AdminHero />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <AdminAboutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
