import React from 'react'
import AdminGallery from './AdminGallery/AdminGallery'
import AdminUpload from './FileUpload/Adminupload'
import AdminNavbar from '../AdminNavbar/AdminNavbar'

const AdminGalleryPage = () => {
  return (
    <div>
        <AdminNavbar />
        <AdminGallery />
        <AdminUpload />
    </div>
  )
}

export default AdminGalleryPage