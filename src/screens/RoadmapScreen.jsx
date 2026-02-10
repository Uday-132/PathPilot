import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
    ChevronDown, ChevronUp, ChevronLeft, MoreHorizontal,
    Lock, Check, PlayCircle, BookOpen, Code, Layout, Calendar, ExternalLink
} from 'lucide-react';

const RoadmapScreen = () => {
    const { roadmap, toggleTopicCompletion } = useApp();
    const navigate = useNavigate();
    // Default first month expanded
    const [expandedMonth, setExpandedMonth] = useState(1);

    useEffect(() => {
        if (!roadmap) {
            navigate('/goal');
        }
    }, [roadmap, navigate]);

    if (!roadmap) return null;

    const toggleMonth = (id) => {
        setExpandedMonth(expandedMonth === id ? null : id);
    };

    const handleTopicToggle = (topicId) => {
        if (roadmap && roadmap._id) {
            toggleTopicCompletion(roadmap._id, topicId);
        }
    };

    // Dynamic Progress Calculation
    let totalTopics = 0;
    let completedTopics = 0;

    if (roadmap && roadmap.months) {
        roadmap.months.forEach(month => {
            if (month.topics) {
                totalTopics += month.topics.length;
                completedTopics += month.topics.filter(t => t.completed).length;
            }
        });
    }

    const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return (
        <div className="flex flex-col h-full bg-[#FAFBFF] font-sans">

            {/* Header */}
            <div className="p-6 pb-2 flex items-center justify-between sticky top-0 bg-[#FAFBFF] z-10">
                <button onClick={() => navigate('/home')} className="p-2 -ml-2 bg-white shadow-sm border border-slate-100 rounded-full hover:bg-slate-50 transition-colors">
                    <ChevronLeft size={24} className="text-slate-700" />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Career Roadmap</h1>
                <button className="p-2 -mr-2 bg-white shadow-sm border border-slate-100 rounded-full hover:bg-slate-50 transition-colors">
                    <MoreHorizontal size={24} className="text-slate-700" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">

                {/* Overall Progress Card */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Path Progress</p>
                            <h2 className="text-xl font-bold text-slate-900">{overallProgress}% Completed</h2>
                        </div>
                        <span className="text-xs font-bold text-blue-500 mb-1">1 of 6 Months</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${overallProgress}%` }}></div>
                    </div>
                </div>

                {/* Month Cards */}
                <div className="space-y-4">
                    {roadmap.months.map((month) => {
                        const isExpanded = expandedMonth === month.id;
                        const isLocked = month.status === 'locked';

                        return (
                            <div
                                key={month.id}
                                className={`bg-white rounded-3xl transition-all duration-300 ${isExpanded ? 'shadow-lg border-blue-100 border' : 'shadow-sm border border-slate-100'
                                    }`}
                            >
                                {/* Card Header */}
                                <button
                                    onClick={() => !isLocked && toggleMonth(month.id)}
                                    disabled={isLocked}
                                    className="w-full flex items-center p-5 text-left"
                                >
                                    {/* Icon/Status Circle */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0 ${isLocked
                                        ? 'bg-slate-50 border border-slate-200'
                                        : 'bg-white border-2 border-blue-100' // Ring style
                                        }`}>
                                        {isLocked ? (
                                            <span className="text-[10px] font-bold text-slate-400 italic">Locked</span>
                                        ) : month.id === 1 ? ( // Mocking active state for month 1
                                            <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center text-xs font-bold text-blue-600 bg-blue-50">
                                                0/4
                                            </div>
                                        ) : (
                                            <Calendar size={20} className="text-slate-400" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className={`text-lg font-bold ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                                            {month.title}
                                        </h3>
                                        <p className={`text-sm ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {month.subtitle}
                                        </p>
                                    </div>

                                    {isLocked ? (
                                        <Lock size={20} className="text-slate-300" />
                                    ) : (
                                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                            <ChevronDown size={20} className="text-slate-400" />
                                        </div>
                                    )}
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && !isLocked && (
                                    <div className="px-5 pb-6 pt-0 animate-fade-in-down">

                                        <hr className="border-slate-50 my-4" />

                                        {/* Detailed Description */}
                                        <div className="mb-6">
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {month.description}
                                            </p>
                                        </div>

                                        {/* Skills Chips */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="bg-blue-500 p-1 rounded-full"><BrainIcon /></div>
                                                <h4 className="font-bold text-sm text-slate-900">Skills to Learn</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {month.skills.map(skill => (
                                                    <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100 flex items-center gap-1.5">
                                                        <Code size={12} />
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Topics Checklist */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="bg-blue-500 p-1 rounded-full"><ListIcon /></div>
                                                <h4 className="font-bold text-sm text-slate-900">Topics Covered</h4>
                                            </div>
                                            <div className="space-y-3">
                                                {month.topics.map(topic => {
                                                    const isChecked = topic.completed;
                                                    return (
                                                        <div
                                                            key={topic.id}
                                                            onClick={() => navigate(`/topic/${encodeURIComponent(topic.title)}`, { state: { title: topic.title } })}
                                                            className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
                                                        >
                                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isChecked ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-200 group-hover:border-blue-300'
                                                                }`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleTopicToggle(topic.id);
                                                                }}
                                                            >
                                                                {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                                                            </div>
                                                            <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-600'
                                                                }`}>
                                                                {topic.title}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Resources */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="bg-blue-500 p-1 rounded-full"><BookIcon /></div>
                                            <h4 className="font-bold text-sm text-slate-900">Learning Resources</h4>
                                        </div>
                                        <div className="space-y-2">
                                            {month.resources.map((res, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group cursor-pointer" onClick={() => window.open(res.url, '_blank')}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${res.type === 'Video' ? 'bg-red-100 text-red-500' :
                                                            res.type === 'Interactive' ? 'bg-green-100 text-green-500' :
                                                                'bg-blue-100 text-blue-500'
                                                            }`}>
                                                            {res.type === 'Video' ? <PlayCircle size={20} fill="currentColor" className="text-red-500/20" /> :
                                                                res.type === 'Interactive' ? <Code size={20} /> :
                                                                    <BookOpen size={20} />}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-sm font-bold text-slate-800 line-clamp-1">{res.title}</h5>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-white px-1.5 rounded">{res.type}</span>
                                                                <span className="text-[10px] font-medium text-slate-400">• {res.duration}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div >
    );
};

// Mini internal components for icons
const BrainIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
    </svg>
)
const ListIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
)
const BookIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
)

export default RoadmapScreen;
