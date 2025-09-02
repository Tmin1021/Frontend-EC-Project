import React from 'react'
import ContactForm from './contact_form'

const SampleText = ({text}) => {
  return (
    <p className='text-sm md:text-md font-light text-gray-500'>{text}</p>
  )
}

const shop_info = () => {
  return (
    <div className='flex flex-col gap-4 justify-center py-8 px-4 md:px-8 lg:px-16'>
      <p className='font-bold text-lg md:text-xl lg:text-2xl text-gray-500'>Shop Information</p>

      <div className='flex flex-col gap-2 md:grid md:grid-cols-3'>
        <div>
          <p className='font-bold text-lg md:text-xl lg:text-2xl text-gray-500'>Contact Us</p>
          <SampleText text={'Email: hoa123@gmail.com'}/>
          <SampleText text={'Phone: +123456789'}/>
        </div>

        <div>
          <h2 className='font-bold text-lg md:text-xl lg:text-2xl text-gray-500'>Location</h2>
          <SampleText text={'123 Flower Street, Bloom City, FL 12345'}/>
          <SampleText text={'Open Hours: Mon-Fri, 9 AM - 6 PM'}/>
        </div>

        <div>
          <p className='font-bold text-lg md:text-xl lg:text-2xl text-gray-500'>About Us</p>
          <SampleText text={'Team members: Trần Công Lâm Anh - Võ Lân - Nguyễn Ngọc Duy Tân - Dương Thanh Triều'}/>

        </div>
      </div>
    </div>
  )
}

export default shop_info

//      <p>Thank you for choosing us for your floral needs!</p>