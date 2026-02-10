import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Rocket, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AuthScreen = () => {
    const navigate = useNavigate();
    const { login, user, token } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    React.useEffect(() => {
        if (token || user) {
            navigate('/home');
        }
    }, [token, user, navigate]);

    const { name, email, password } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            // In development, we need to point to the backend port if not proxied
            // Assuming backend is on 5000 and frontend on 5173
            const url = `http://localhost:5000${endpoint}`;

            const body = isLogin ? { email, password } : { name, email, password };

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Authentication failed');
            }

            login(data.user, data.token);
            navigate('/home');

        } catch (err) {
            console.error(err);
            setError(err.message || 'Server error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white p-6 relative overflow-hidden font-sans">

            {/* Background Decor */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-200">
                        <Rocket size={24} fill="currentColor" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-500 text-sm">
                        {isLogin
                            ? 'Enter your details to access your roadmap.'
                            : 'Start your journey to a better career today.'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center font-bold">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
                            <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                <User size={20} className="text-slate-400 mr-3" />
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    placeholder="Alex Rivera"
                                    className="bg-transparent border-none outline-none text-slate-900 font-medium w-full placeholder:text-slate-400"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                            <Mail size={20} className="text-slate-400 mr-3" />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="alex@example.com"
                                className="bg-transparent border-none outline-none text-slate-900 font-medium w-full placeholder:text-slate-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
                        <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                            <Lock size={20} className="text-slate-400 mr-3" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="bg-transparent border-none outline-none text-slate-900 font-medium w-full placeholder:text-slate-400"
                                required
                                minLength="6"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} className="text-slate-400" /> : <Eye size={20} className="text-slate-400" />}
                            </button>
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex justify-end">
                            <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-600">
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-[2rem] shadow-xl shadow-blue-200 transition-all transform active:scale-[0.98] mt-6 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span>Processing...</span>
                        ) : (
                            <>
                                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>

                </form>

                {/* Footer Toggle */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setFormData({ name: '', email: '', password: '' });
                            }}
                            className="ml-1 text-blue-600 font-bold hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AuthScreen;
