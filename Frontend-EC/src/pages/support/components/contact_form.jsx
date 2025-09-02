import React, { useState } from 'react'
import { motion } from "framer-motion";

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
  // Create a copy that include on the attribute, then overwrite the new changed attribute
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
    <motion.div
          className="h-screen w-screen flex items-center justify-center"
          style={{
            background: "linear-gradient(270deg, #00C9FF, #92FE9D, #ff6ec4, #7873f5)",
            backgroundSize: "800% 800%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], 
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
      {submitted && (
        <div className="fixed top-10 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg font-semibold animate-bounce">
          Contact submitted
        </div>
      )}
      <div className="w-[80%] max-w-[400px] flex flex-col items-center justify-center min-h-[400px] bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-6">
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
          <button // No need to assign handleSubmit as the form component do that
            type="submit" // Assign the submit button to the form
            className="w-full py-3 px-4 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-black-500 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default contact_form