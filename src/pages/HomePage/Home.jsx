import React from 'react'
import Menu from './Components/Menu/Menu'
import Hero from './Components/Hero/Hero'
import Service from './Components/service/Service'
import HomeAbout from './Components/About/HomeAbout'
import HomeGallery from './Components/Gallery/HomeGallery'
import HomeContact from './Components/Contact/HomeContact'
import Footer from './Components/Footer/Footer'
import Testimonial from './Components/Testimonial/Testimonial'


const Home = () => {

  return (
    
  <>
  <Menu />
  <Hero />
  <HomeAbout />
  <Service />
  <HomeGallery />
  <HomeContact />
  <Testimonial />
  <Footer />
  
  </>
  )
}

export default Home