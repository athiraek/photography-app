import React from 'react'
import HomeAbout from './../HomePage/Components/About/HomeAbout'
import Menu from './../HomePage/Components/Menu/Menu'
import Footer from '../HomePage/Components/Footer/Footer'
import Testimonial from '../HomePage/Components/Testimonial/Testimonial'

const AboutPage = () => {
  return (
    <div>
      <HomeAbout />
      <Menu />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default AboutPage