import React, { useState } from 'react';
import signup_wallpaper from '/src/assets/signup-wallpaper.png';

export const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    console.log(form);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image covering the entire screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${signup_wallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Signup form container */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-white/30 backdrop-blur-lg border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                placeholder="Confirm your password"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm font-semibold">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-bold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;