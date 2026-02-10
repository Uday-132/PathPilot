import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
    Settings, ChevronLeft, Edit2, Zap, Globe, Bell,
    HelpCircle, RotateCcw, ChevronRight, AlertTriangle
} from 'lucide-react';

const ProfileScreen = () => {
    const { user, userGoal, roadmap, completedMilestones, setUserGoal, setRoadmap, logout, resetRoadmap, updateProfile } = useApp();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Dynamic Progress Calculation
    let totalTopics = 0;
    let completedTopicsCount = 0;

    if (roadmap && roadmap.months) {
        roadmap.months.forEach(month => {
            if (month.topics) {
                totalTopics += month.topics.length;
                completedTopicsCount += month.topics.filter(t => t.completed).length;
            }
        });
    }

    const percentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

    const handleReset = async () => {
        if (window.confirm("Are you sure you want to reset your roadmap? This action cannot be undone.")) {
            const success = await resetRoadmap();
            if (success) {
                navigate('/goal');
            }
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (e.g., if > 2MB, definitely compress more)
            const reader = new FileReader();
            reader.onloadend = async () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400; // Profile pic doesn't need to be huge
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.7 quality
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    console.log('Original size:', reader.result.length);
                    console.log('Compressed size:', compressedBase64.length);

                    updateProfile({ avatar: compressedBase64 });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFBFF] font-sans">

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

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
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Explorer'}`}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <button
                            onClick={handleImageClick}
                            className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full border-2 border-white shadow-md text-white hover:bg-blue-600 transition-colors"
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-0.5">{user?.name || "User Name"}</h2>
                    <p className="text-blue-500 font-medium">{userGoal.careerGoal || "Aspiring Explorer"}</p>
                </div>

                {/* Overall Progress Card */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-slate-900">Overall Progress</h3>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">{currentMonthName}</span>
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
                        <span>You've completed {completedTopicsCount} out of {totalTopics} topics!</span>
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
