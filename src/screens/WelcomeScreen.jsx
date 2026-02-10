import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Globe, Sprout, Share2 } from 'lucide-react';

const WelcomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-white p-6 relative overflow-hidden font-sans">

            {/* Background Decor */}
            <div className="absolute top-[-5%] left-[-10%] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-60 h-60 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            {/* Header */}
            <header className="flex justify-between items-center mb-6 animate-fade-in-down">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-full text-white">
                        <Rocket size={18} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">PathPilot</span>
                </div>
                <Globe size={24} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center text-center z-10 animate-fade-in-up">

                {/* Badge */}
                <div className="px-4 py-1.5 bg-blue-50 rounded-full mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                        AI-Powered Growth
                    </span>
                </div>

                {/* Headlines */}
                <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                    Ready to shape <br />
                    <span className="relative">
                        your future?
                        {/* Underline Style */}
                        <svg className="absolute -bottom-1 left-0 w-full h-2 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                    </span>
                </h1>
                <p className="text-slate-500 text-sm max-w-[260px] mx-auto leading-relaxed mb-8">
                    Your AI-powered journey to the perfect career starts here.
                </p>

                {/* Feature Cards Visual */}
                <div className="flex gap-4 w-full max-w-sm justify-center mb-4">

                    {/* Card 1: Discover */}
                    <div className="w-1/2 aspect-[3/4] bg-[#EAE8E4] rounded-3xl p-4 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 flex items-center justify-center opacity-40">
                            <Sprout size={64} className="text-[#AFA89D] font-light" strokeWidth={1} />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm">
                            <span className="text-xs font-bold text-blue-600">Discover</span>
                        </div>
                    </div>

                    {/* Card 2: Connect */}
                    <div className="w-1/2 aspect-[3/4] bg-[#1E4E54] rounded-3xl p-4 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 mt-6">
                        <div className="absolute inset-0 flex items-center justify-center opacity-60">
                            <Share2 size={64} className="text-[#4FD1C5] font-light" strokeWidth={1} />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm">
                            <span className="text-xs font-bold text-[#1E4E54]">Connect</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-4 w-full z-20 animate-fade-in-up delay-200">
                <button
                    onClick={() => navigate('/auth')}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-full shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
                >
                    Get Started
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                    Already have an account? <span onClick={() => navigate('/auth')} className="text-blue-600 font-bold cursor-pointer hover:underline">Sign in</span>
                </p>
            </div>

        </div>
    );
};

export default WelcomeScreen;
