import React, {useState, useEffect} from 'react'
import login_wallpaper from '/src/assets/login-wallpaper.png'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner';
import { HouseIcon } from 'lucide-react';


// route: if not authenticated => login => (1): bring to the previous state (2): bring to default personal (no previous state available) or admin
// route: if authenticated => bring to previous state (if available)
export const Login = () => {
    const {login, user, isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const from = location.state?.from?.pathname || "/personal"

    // protect login
    useEffect(()=> {
      if(isAuthenticated && user.role==='user') navigate(from)
      if(isAuthenticated && user.role==='admin') navigate(from)
    }, [isAuthenticated])


    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          await login(form.email, form.password, navigate, location)
        } 
        catch (err) {
          toast.error("Failed to log in")
        } 
        finally {
          setLoading(false)
        }
    }

    const handleDemoAdmin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          await login('master@example.com', 'bimat', navigate, location)
        } 
        catch (err) {
          toast.error("Failed to log in")
        } 
        finally {
          setLoading(false)
        }
    }

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
          
          <div className='flex justify-between items-center mb-6'>
            <p className="text-3xl font-bold text-gray-700">Login</p>
            <HouseIcon className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' onClick={()=>navigate('/')}/>
          </div>

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
            For admin demo{' '}
            <button type="button" onClick={handleDemoAdmin} className="text-blue-600 hover:underline font-medium">
              Click here
            </button>
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <button type="button" onClick={()=>navigate('/signup')} className="text-blue-600 hover:underline font-medium">
              Sign up
            </button>
          </p>

          <div className={`${loading ? 'fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm' : ''}`}>
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 font-semibold">Logging in...</span>
                  </div>
                </div>) : ('')}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
};

export default Login;