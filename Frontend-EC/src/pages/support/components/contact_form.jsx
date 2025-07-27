import React, { useState } from 'react'

const contact_form = () => {
  // State variables to store user input
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to manage form submission status
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      // .target: element that triggered the event
      //  .name: name attribute event
      //  .value: current value of the input
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can use 'form' to send data to backend here
    console.log(form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Hide notification after 3 seconds
    setForm({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <>
      {submitted && (
        <div className="fixed top-10 right-6 bg-green-500 text-white px-6 py-3 rounded shadow-lg font-semibold animate-bounce">
          Contact submitted
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              id="name" // not necessary
              name="name" // use name as the key.
              required
              value= {form.name} // Display the current value, if use defautValue, it will not update
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4" // Number of rows for the textarea (with no need to expand)
              required
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-black-500 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default contact_form