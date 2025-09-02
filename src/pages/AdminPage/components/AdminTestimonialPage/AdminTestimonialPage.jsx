import React from 'react'
import TestimonialView from './TestimonialView/TestimonialView'
import TestimonialUpload from './TestimonialUpload/TestimonialUpload'
import AdminNavbar from '../AdminNavbar/AdminNavbar'

const AdminTestimonialPage = () => {
  return (
    <div>
          <AdminNavbar />
        <TestimonialView />
        <TestimonialUpload />
    </div>
  )
}

export default AdminTestimonialPage