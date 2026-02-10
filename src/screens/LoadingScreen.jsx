import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
// import { generateRoadmap } from '../data/mockRoadmaps';
import { Brain, CircuitBoard } from 'lucide-react';

const LoadingScreen = () => {
    const navigate = useNavigate();
    const { userGoal, setRoadmap, generateUserRoadmap, roadmap } = useApp();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // If we already have a roadmap (e.g. from persistence), just go there
        if (roadmap) {
            navigate('/roadmap');
            return;
        }

        const fetchRoadmap = async () => {
            const success = await generateUserRoadmap();
            if (success) {
                navigate('/roadmap');
            } else {
                // Handle error (maybe navigate back or show error)
                // For now, just go back to goal input on failure
                console.error("Failed to generate roadmap.");
                // navigate('/goal'); // consistent behavior for now is to stay or retry
            }
        };

        // Artificial delay for animation + API call
        // We can run them in parallel or just wait for API
        // Let's rely on API call speed, maybe add minimum delay for effect
        setTimeout(() => {
            fetchRoadmap();
        }, 1500);

        // Progress bar simulation (visual only)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return 90; // Stall at 90% until API returns
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">

            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 z-10">

                {/* Central Animation */}
                <div className="relative mb-12">
                    {/* Pulsing Circles */}
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-[-15px] bg-blue-50 rounded-full animate-pulse opacity-40"></div>

                    {/* Main Icon Circle */}
                    <div className="relative w-32 h-32 bg-white rounded-full shadow-xl shadow-blue-100 flex items-center justify-center z-10">
                        <div className="bg-blue-600 p-4 rounded-full">
                            <Brain size={40} className="text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm">
                            <CircuitBoard size={16} className="text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-xl font-bold text-slate-900 text-center mb-2 leading-tight">
                    Your personalized career roadmap is being created...
                </h2>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3 mt-6">
                    <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <p className="text-slate-400 text-sm font-medium">
                    Analyzing your skills and goals
                </p>

                {/* Skeleton UI at bottom (Decoration) */}
                <div className="mt-16 w-full space-y-3 opacity-30">
                    <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 bg-slate-300 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-3 w-3/4 bg-slate-300 rounded-full"></div>
                            <div className="h-2 w-1/2 bg-slate-300 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Logo */}
            <div className="pb-8 flex justify-center items-center gap-2 opacity-50">
                <CircuitBoard size={20} className="text-slate-600" />
                <span className="font-bold text-slate-600">PathPilot</span>
            </div>

        </div>
    );
};

export default LoadingScreen;
