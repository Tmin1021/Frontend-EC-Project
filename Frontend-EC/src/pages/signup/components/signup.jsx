import React, { useState } from 'react'
import signup_wallpaper from '/src/assets/signup-wallpaper.png'

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
        // You can use 'form' to send data to backend here
        console.log(form);
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 h-screen">
                <img
                    src={signup_wallpaper}
                    alt="Wallpaper"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
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
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm font-semibold">{error}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-black font-bold rounded-lg shadow-lg bg-white-400 hover:bg-green-500 transition-all duration-200"
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
    )
}

export default Signup