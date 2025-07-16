import React from 'react'

const contact_form = () => {
  return (
    <div className="contact-form flex flex-col items-center justify-center min-h-[400px] bg-white bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <form className="w-full max-w-md">
        <div className="form-group mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
          <input type="text" id="name" name="name" required className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
          <input type="email" id="email" name="email" required className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message:</label>
          <textarea id="message" name="message" rows="4" required className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">Submit</button>
      </form>
    </div>
  )
}

export default contact_form