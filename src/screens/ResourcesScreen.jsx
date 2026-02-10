import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
    ArrowLeft, MoreHorizontal, Play, ExternalLink,
    FileText, Code, CheckCircle, HelpCircle, ChevronRight
} from 'lucide-react';

const ResourcesScreen = () => {
    const { roadmap } = useApp();
    const navigate = useNavigate();
    const [complete, setComplete] = useState(false);

    // For this demo, we'll hardcode to show Month 1 resources
    // In a real app, we'd use useParams() to get the specific topic/month
    const resources = roadmap?.months[0]?.resources || [];

    return (
        <div className="flex flex-col h-full bg-[#FAFBFF] font-sans">

            {/* Header */}
            <div className="p-6 pb-4 flex items-center justify-between sticky top-0 bg-[#FAFBFF] z-10">
                <button onClick={() => navigate('/roadmap')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={24} className="text-slate-900" />
                </button>
                <div className="text-center">
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Milestone</p>
                    <h1 className="text-lg font-bold text-slate-900">Basics of Python</h1>
                </div>
                <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors">
                    <MoreHorizontal size={24} className="text-slate-900" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-6">

                {/* Featured Video Card */}
                {resources.filter(r => r.category === 'featured').map(res => (
                    <div key={res.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 group cursor-pointer">
                            <img src={res.image} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Play size={20} fill="white" className="text-white ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                                {res.duration}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 rounded bg-red-500 flex items-center justify-center">
                                <Play size={8} fill="white" className="text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{res.source} • {res.type}</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2">{res.title}</h3>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            {res.description}
                        </p>

                        <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-slate-700 transition-colors">
                            <ExternalLink size={16} />
                            <span>Watch Resource</span>
                        </button>
                    </div>
                ))}

                {/* List Items */}
                {resources.filter(r => r.category === 'course' || r.category === 'docs').map(res => (
                    <div key={res.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText size={12} className={res.type === 'Docs' ? 'text-green-600' : 'text-blue-600'} />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{res.source} • {res.duration}</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">{res.title}</h3>
                            <p className="text-xs text-slate-500 mb-3 line-clamp-2">{res.description}</p>
                            <button className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:text-blue-600">
                                {res.type === 'Docs' ? 'Open Docs' : 'Read Article'} <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${res.type === 'Docs' ? 'bg-slate-900' : 'bg-blue-50'
                            }`}>
                            {res.type === 'Docs' ? (
                                <Code size={32} className="text-yellow-400" />
                            ) : (
                                <FileText size={32} className="text-blue-300" />
                            )}
                        </div>
                    </div>
                ))}

                {/* Quiz Card */}
                {resources.filter(r => r.category === 'quiz').map(res => (
                    <div key={res.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{res.source} • {res.duration}</span>
                                <h3 className="text-base font-bold text-slate-900">{res.title}</h3>
                            </div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4"></div>
                        <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-blue-600 transition-colors">
                            <Play size={16} fill="currentColor" />
                            <span>Start Practice Quiz</span>
                        </button>
                    </div>
                ))}

            </div>

            {/* Sticky Bottom Action */}
            <div className="p-6 bg-white border-t border-slate-50 sticky bottom-0 z-20">
                <button
                    onClick={() => {
                        setComplete(!complete);
                        navigate('/roadmap');
                    }}
                    className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${complete ? 'bg-green-500 text-white shadow-green-200' : 'bg-blue-500 text-white shadow-blue-200 hover:bg-blue-600'
                        }`}
                >
                    <CheckCircle size={20} />
                    <span>{complete ? 'Completed' : 'Mark as Completed'}</span>
                </button>
            </div>

        </div>
    );
};

export default ResourcesScreen;
