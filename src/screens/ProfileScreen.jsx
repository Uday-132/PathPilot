import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
    Settings, ChevronLeft, Edit2, Zap, Globe, Bell,
    HelpCircle, RotateCcw, ChevronRight, AlertTriangle
} from 'lucide-react';

const ProfileScreen = () => {
    const { userGoal, roadmap, completedMilestones, setUserGoal, setRoadmap, logout, resetRoadmap } = useApp();
    const navigate = useNavigate();

    // Mock calculation
    const total = roadmap?.months?.length * 4 || 24;
    const completed = completedMilestones?.length || 0;
    const percentage = Math.round((completed / total) * 100);

    const handleReset = async () => {
        if (window.confirm("Are you sure you want to reset your roadmap? This action cannot be undone.")) {
            const success = await resetRoadmap();
            if (success) {
                navigate('/goal');
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFBFF] font-sans">

            {/* Header */}
            <div className="p-6 pb-2 flex items-center justify-between sticky top-0 bg-[#FAFBFF] z-10">
                <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                    <ChevronLeft size={24} className="text-slate-900" />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Profile</h1>
                <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors">
                    <Settings size={24} className="text-slate-900" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">

                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8 mt-2">
                    <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden">
                            {/* Placeholder Avatar - using DiceBear for dynamic avatar */}
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Alex`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full border-2 border-white shadow-md text-white hover:bg-blue-600 transition-colors">
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-0.5">Alex Rivera</h2>
                    <p className="text-blue-500 font-medium">Aspiring {userGoal.role || "Data Scientist"}</p>
                </div>

                {/* Overall Progress Card */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-slate-900">Overall Progress</h3>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">October</span>
                    </div>

                    <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-500 text-sm font-medium">Career Path Completion</span>
                        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
                    </div>

                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                        <Zap size={16} className="text-blue-500 fill-current" />
                        <span>You're 5% ahead of your monthly goal!</span>
                    </div>
                </div>

                {/* App Settings */}
                <div className="mb-8">
                    <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 ml-1">App Settings</h4>

                    <div className="space-y-4">
                        <SettingItem
                            Icon={Globe}
                            iconBg="bg-blue-50 text-blue-600"
                            title="Language Preference"
                            subtitle="English (US)"
                        />
                        <SettingItem
                            Icon={Bell}
                            iconBg="bg-blue-50 text-blue-600"
                            title="Notification Settings"
                            subtitle="Push, Email, and SMS"
                        />
                        <SettingItem
                            Icon={HelpCircle}
                            iconBg="bg-blue-50 text-blue-600"
                            title="Help & Support"
                            subtitle="Contact us and FAQs"
                        />
                    </div>
                </div>

                {/* Reset Action */}
                <div className="bg-red-50 rounded-[2rem] p-4 flex items-center justify-between cursor-pointer hover:bg-red-100 transition-colors group mb-4" onClick={handleReset}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-red-200 shadow-md">
                            <RotateCcw size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-red-600 text-lg">Reset Roadmap</h4>
                            <p className="text-xs text-red-400 font-medium">Clear progress & start over</p>
                        </div>
                    </div>
                </div>

                {/* Logout Action */}
                <button
                    onClick={() => {
                        logout();
                        navigate('/auth');
                    }}
                    className="w-full p-4 rounded-[2rem] border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-700 transition-colors mb-6"
                >
                    Sign Out
                </button>

            </div>
        </div>
    );
};

const SettingItem = ({ Icon, iconBg, title, subtitle }) => (
    <div className="w-full bg-white rounded-[2rem] p-4 flex items-center justify-between shadow-sm border border-slate-100 hover:border-blue-100 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
                <Icon size={24} />
            </div>
            <div className="text-left">
                <h4 className="font-bold text-slate-900 text-base">{title}</h4>
                <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
            </div>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
    </div>
);

export default ProfileScreen;
