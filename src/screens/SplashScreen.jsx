import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, Laptop, User } from 'lucide-react';

const SplashScreen = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => navigate('/auth'), 500);
                    return 100;
                }
                return prev + 2; // Increment speed
            });
        }, 50); // Speed of update

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-between h-full bg-white relative overflow-hidden p-8 font-sans">

            {/* Background Blobs (Decoration) */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-48 h-48 bg-indigo-50 rounded-full blur-2xl opacity-60 z-0 pointer-events-none"></div>

            <div className="flex-1 flex flex-col items-center justify-center w-full z-10">

                {/* Central Illustration Area */}
                <div className="relative mb-12">
                    {/* Main Circle/Background for Image */}
                    <div className="w-64 h-64 bg-slate-100 rounded-3xl flex items-end justify-center overflow-hidden shadow-inner relative">
                        {/* Placeholder for the student character - Replacing with an Icon for now if image is missing, 
                 but designed to look like the avatar container. 
                 In a real scenario, use an <img> tag here. */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
                            <User size={120} className="text-slate-300" strokeWidth={1} />
                        </div>
                    </div>

                    {/* Floating Icons */}
                    {/* Top Right - Graduation Cap */}
                    <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg border border-slate-50 animate-bounce-slow">
                        <GraduationCap size={28} className="text-blue-600" fill="currentColor" fillOpacity={0.2} />
                    </div>

                    {/* Bottom Left - Laptop */}
                    <div className="absolute bottom-8 -left-8 bg-white p-3 rounded-2xl shadow-lg border border-slate-50 animate-bounce-delayed">
                        <Laptop size={24} className="text-blue-500" />
                    </div>

                    {/* Bottom Right - Sparkles */}
                    <div className="absolute -bottom-6 -right-2 bg-blue-600 p-4 rounded-full shadow-xl shadow-blue-200 animate-pulse-slow">
                        <Sparkles size={28} className="text-white" />
                    </div>
                </div>

                {/* Text Area */}
                <div className="text-center space-y-3 mt-4">
                    <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
                        PathPilot
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-[260px] leading-snug">
                        Your AI Guide to a Clear Career Path
                    </p>
                </div>
            </div>

            {/* Footer / Progress */}
            <div className="w-full max-w-xs z-10 mb-8">
                <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-slate-400 text-sm font-medium">Preparing your future...</span>
                    <span className="text-blue-600 text-sm font-bold">{progress}%</span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

        </div>
    );
};

export default SplashScreen;
