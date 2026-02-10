import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Bell, CheckCircle, Flag, Flame,
    Zap, Award, Users, ChevronRight, PartyPopper
} from 'lucide-react';

const ProgressScreen = () => {
    const { roadmap, completedMilestones, user } = useApp();
    const navigate = useNavigate();

    // If no roadmap exists, show a "Start Your Journey" screen
    if (!roadmap) {
        return (
            <div className="flex flex-col h-full bg-[#FAFBFF] p-6 font-sans relative overflow-hidden justify-center items-center text-center">
                {/* Background Decor */}
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                <div className="z-10 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-100 max-w-sm w-full border border-slate-50 relative">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 p-4 rounded-2xl shadow-lg border-4 border-[#FAFBFF]">
                        <Flame size={32} className="text-white" fill="currentColor" />
                    </div>

                    <h1 className="text-2xl font-extrabold text-slate-900 mt-8 mb-2">
                        Welcome, {user?.name?.split(' ')[0] || 'Explorer'}!
                    </h1>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Your personalized career roadmap is waiting. Let's define your goals and build your path to success.
                    </p>

                    <button
                        onClick={() => navigate('/goal')}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-full shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span>Start My Journey</span>
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="mt-6 text-xs text-slate-400">
                        Takes less than 2 minutes to set up.
                    </p>
                </div>
            </div>
        );
    }

    // Real Data Calculation
    let total = 0;
    let completedCount = 0;

    if (roadmap && roadmap.months) {
        roadmap.months.forEach(month => {
            if (month.topics) {
                total += month.topics.length;
                completedCount += month.topics.filter(t => t.completed).length;
            }
        });
    }

    // Avoid division by zero
    total = total || 1;

    const remaining = total - completedCount;
    const percentage = Math.round((completedCount / total) * 100);

    // Circular Progress Component
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col h-full bg-[#FAFBFF] font-sans">

            {/* Header */}
            <div className="p-6 pb-2 flex items-center justify-between sticky top-0 bg-[#FAFBFF] z-10">
                <button onClick={() => navigate('/roadmap')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                    <ChevronLeft size={24} className="text-blue-500" />
                </button>
                <h1 className="text-lg font-bold text-slate-900">My Path</h1>
                <button className="p-2 -mr-2 bg-red-50 rounded-full text-red-400">
                    <Bell size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">

                {/* Main Card */}
                <div
                    onClick={() => navigate('/roadmap')}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
                >

                    {/* Circular Progress */}
                    <div className="relative w-48 h-48 mb-6">
                        {/* Background Circle */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96" cy="96" r={radius}
                                stroke="#E2E8F0" strokeWidth="12" fill="transparent"
                            />
                            <circle
                                cx="96" cy="96" r={radius}
                                stroke="#3B82F6" strokeWidth="12" fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold text-slate-900">{percentage}%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</span>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mb-1">Roadmap Progress</h2>
                    <p className="text-sm font-medium text-blue-500">
                        You're on track! Tap to view roadmap 🚀
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle size={20} className="text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{completedCount}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Milestones Done</p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                            <Flag size={20} className="text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{remaining}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Remaining Tasks</p>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 mb-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div className="flex items-center gap-2">
                            <Flame size={24} className="text-orange-300" fill="currentColor" />
                            <h3 className="text-lg font-bold">{user?.streak || 1}-Day Streak</h3>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/10">KEEP GOING!</span>
                    </div>

                    {/* Days Row */}
                    <div className="flex justify-between items-center relative z-10">
                        {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <span className="text-[10px] font-medium opacity-60">{day}</span>
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <CheckCircle size={14} className="text-white" />
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-bold">S</span>
                            <div className="w-8 h-8 rounded-full bg-white text-blue-600 font-bold text-sm flex items-center justify-center shadow-md scale-110">
                                {user?.streak || 1}
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 opacity-50">
                            <span className="text-[10px] font-medium">S</span>
                            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs">
                                {(user?.streak || 1) + 1}
                            </div>
                        </div>
                    </div>

                    {/* Decor */}
                    <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-[-50%] left-[-10%] w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-bold text-slate-900">My Achievements</h3>
                        <span className="text-xs font-bold text-blue-500">See all</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {user?.achievements && user.achievements.length > 0 ? (
                            user.achievements.map((ach, index) => (
                                <AchievementCard
                                    key={index}
                                    icon={Award} // Default icon for now, ideally mapped
                                    color="text-blue-500"
                                    bg="bg-blue-50"
                                    title={ach}
                                />
                            ))
                        ) : (
                            <div className="text-sm text-slate-400 italic w-full text-center py-4 bg-slate-50 rounded-xl">
                                Complete topics to earn badges!
                            </div>
                        )}
                        {/* Always show one "Next" or "Locked" achievement for motivation if list is empty or short */}
                        {!user?.achievements?.length && (
                            <AchievementCard icon={Zap} color="text-yellow-500" bg="bg-yellow-50" title="First Step" />
                        )}
                    </div>
                </div>

                {/* Challenge Banner */}
                <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-blue-50 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <PartyPopper size={24} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-slate-900 mb-0.5">New Challenge Available!</h4>
                        <p className="text-xs text-slate-500 leading-tight">Complete a coffee chat this week to earn the 'Connector' badge.</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500" />
                </div>

            </div>
        </div>
    );
};

const AchievementCard = ({ icon: Icon, color, bg, title }) => (
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 min-w-[120px] flex flex-col items-center text-center gap-3">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bg}`}>
            <Icon size={24} className={color} fill="currentColor" fillOpacity={0.2} />
        </div>
        <span className="text-xs font-bold text-slate-800 w-20 leading-tight">{title}</span>
    </div>
);

export default ProgressScreen;
