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

    // Handle input changes
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        login(form.email, form.password, navigate)
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your email"
                        required
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your password"
                        required
                    />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-black font-bold rounded-lg shadow-lg bg-white-400 hover:bg-green-500 transition-all duration-200"
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
            <div className="w-1/2 h-screen">
                <img
                src={login_wallpaper}
                alt="Wallpaper"
                className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}

export default Login