import React, { useState, useEffect } from 'react';
import signup_wallpaper from '/src/assets/signup-wallpaper.png';
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from '../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp_Item = ({title="Name", type="text", name="name", content='', placeholder="Enter your name",  handleChange=()=>{}}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">{title}</label>
      <input
        type={type}
        name={name}
        value={content}
        onChange={(e) => handleChange(e)}
        className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/30 backdrop-blur-sm"
        placeholder={placeholder}
        required
      />
    </div>
  )
}

export const Signup = () => {
  const {signup, isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/personal"

  // protect signup
  useEffect(()=> {
    if(isAuthenticated) navigate(from)
  }, [isAuthenticated])

  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    await signup(form.email, form.name, form.address, form.phone, form.password, navigate, location)
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image covering the entire screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${signup_wallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Signup form container */}
      <AnimatePresence>
      <motion.div  initial={{ opacity: 0, scale: 0}}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-white/40 backdrop-blur-xs border-1 border-white/20 hover:shadow-gray-50 hover:shadow-lg transition-all">
          <p className="text-3xl font-bold mb-6 text-gray-800">Sign Up</p>
          <form className="space-y-4" onSubmit={handleSubmit}>

            <SignUp_Item title='Email' type='email' name='email' content={form.email} placeholder='Enter your email' handleChange={handleChange}/>
            <SignUp_Item title='Name' type='text' name='name' content={form.name} placeholder='Enter your name' handleChange={handleChange}/>
            <SignUp_Item title='Address' type='text' name='address' content={form.address} placeholder='Enter your address' handleChange={handleChange}/>
            <SignUp_Item title='Phone' type='tel' name='phone' content={form.phone} placeholder='Enter your phone number' handleChange={handleChange}/>
            <SignUp_Item title='Password' type='password' name='password' content={form.password} placeholder='Enter your password' handleChange={handleChange}/>
            <SignUp_Item title='Confirm Password' type='password' name='confirmPassword' content={form.confirmPassword} placeholder='Confirm password' handleChange={handleChange}/>
            
            {error && (
              <div className="text-red-500 text-sm font-semibold">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-bold rounded-lg backdrop-blur-xs bg-blue-500/40 hover:bg-blue-700/80 transition-all duration-200"
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
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Signup;