import React from 'react'
import ContactForm from './contact_form'

const shop_info = () => {
  return (
    <div className='py-10 px-90'>
      <h1 className='font-extrabold text-9xl pb-20'>Shop Information</h1>
      <div className='mb-10'>
        <ContactForm />
      </div>
      <div className='flex gap-10'>
        <div className='w-1/2'>
          <h2 className='text-3xl font-bold'>Contact Us</h2>
          <p className='mt-4'>Email: hoa123@gmail.com</p>
          <p className='mt-2'>Phone: +123456789</p>
        </div>
        <div className='w-1/2'>
          <h2 className='text-3xl font-bold'>Location</h2>
          <p className='mt-4'>123 Flower Street, Bloom City, FL 12345</p>
          <p className='mt-2'>Open Hours: Mon-Fri, 9 AM - 6 PM</p>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-3xl font-bold'>About Us</h2>
        <p className='mt-4'>We are dedicated to providing the freshest and most beautiful flowers for all occasions. Our team is passionate about floral design and customer service.</p>
        <p className='mt-2'>Thank you for choosing us for your floral needs!</p>
      </div>
    </div>
  )
}

export default shop_info