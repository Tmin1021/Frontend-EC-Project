import React, {useState} from 'react'
import login_wallpaper from '/src/assets/login-wallpaper.png'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

export const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        login(form.email, form.password, navigate)
    };

  return (
    <div className="relative min-h-screen">
      {/* Background image covering the entire screen */}
      <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${login_wallpaper})` }}>
        <div className="absolute inset-0 bg-black/20 "></div>
      </div>

      {/* Login form container */}
      <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0}}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="relative z-10 flex flex-col justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-white/40 backdrop-blur-xs border-1 border-white/20 hover:shadow-gray-50 hover:shadow-lg transition-all">
          <p className="text-3xl font-bold mb-6 text-gray-700">Login</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e)=>{setForm({...form, email: e.target.value})}}
                className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/30 backdrop-blur-sm "
                placeholder="Enter your email"
                required/>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={(e)=>{setForm({...form, password: e.target.value})}}
                className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/30 backdrop-blur-sm"
                placeholder="Enter your password"
                required/>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-bold rounded-lg backdrop-blur-xs bg-blue-500/40 hover:bg-blue-700/80 transition-all duration-200">
              Login
            </button>

          </form>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline"> Sign up</a>
          </p>

        </div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
};

export default Login;