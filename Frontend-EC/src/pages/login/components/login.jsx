import React, {useState} from 'react'
import login_wallpaper from '/src/assets/login-wallpaper.png'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

    // Handle input changes
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
      setError(''); // Clear error on input change
    };

  return (
    <div className="relative min-h-screen">
      {/* Background image covering the entire screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${login_wallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Login form container */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-white/30 backdrop-blur-lg border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
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
            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-bold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;