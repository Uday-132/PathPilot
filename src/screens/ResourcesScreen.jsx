import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
    ArrowLeft, MoreHorizontal, Download, FileText,
    Sparkles, ChevronRight, Loader2, Calendar
} from 'lucide-react';
import { jsPDF } from "jspdf";

const ResourcesScreen = () => {
    const { roadmap, token } = useApp();
    const navigate = useNavigate();
    const [generating, setGenerating] = useState(null); // Topic ID being generated

    if (!roadmap) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <FileText size={40} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">No Roadmap Found</h2>
                <p className="text-slate-500 mb-6">Generate your career roadmap first to access study resources.</p>
                <button
                    onClick={() => navigate('/goal')}
                    className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold shadow-lg"
                >
                    Get Started
                </button>
            </div>
        );
    }

    const handleGeneratePDF = async (topicTitle) => {
        setGenerating(topicTitle);
        try {
            const res = await fetch('https://path-pilot-sand.vercel.app/api/roadmap/topic-docs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ topic: topicTitle })
            });

            const data = await res.json();
            if (res.ok) {
                const doc = new jsPDF();
                const margin = 20;
                const pageWidth = doc.internal.pageSize.getWidth();
                const maxLineWidth = pageWidth - margin * 2;

                doc.setFontSize(22);
                doc.setTextColor(30, 41, 59); // Slate-800
                doc.text(topicTitle, margin, 30);

                doc.setFontSize(12);
                doc.setTextColor(71, 85, 105); // Slate-600
                doc.text(`PathPilot Personalized Study Guide`, margin, 40);

                doc.setDrawColor(226, 232, 240); // Slate-200
                doc.line(margin, 45, pageWidth - margin, 45);

                doc.setFontSize(11);
                doc.setTextColor(30, 41, 59);

                const lines = doc.splitTextToSize(data.content, maxLineWidth);

                let cursorY = 55;
                lines.forEach((line) => {
                    if (cursorY > 280) {
                        doc.addPage();
                        cursorY = 20;
                    }
                    doc.text(line, margin, cursorY);
                    cursorY += 7;
                });

                doc.save(`PathPilot_${topicTitle.replace(/\s+/g, '_')}_Guide.pdf`);
            } else {
                alert("Failed to generate documentation. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to AI service.");
        } finally {
            setGenerating(null);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#FAFBFF] font-sans">

            {/* Header */}
            <div className="p-6 pb-4 flex items-center justify-between sticky top-0 bg-[#FAFBFF] z-10 shadow-sm border-b border-slate-50">
                <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={24} className="text-slate-900" />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-slate-900">Study Resources</h1>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">AI Documentation Hub</p>
                </div>
                <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors">
                    <MoreHorizontal size={24} className="text-slate-900" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4">

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 mb-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <Sparkles className="mb-4 text-blue-100" size={32} />
                        <h2 className="text-2xl font-bold mb-2">AI-Powered Guides</h2>
                        <p className="text-blue-100 text-sm leading-relaxed opacity-90">
                            Transform any roadmap topic into a comprehensive study guide. Export high-quality technical documentation as a PDF instantly.
                        </p>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"></div>
                </div>

                {roadmap.months.map((month) => (
                    <div key={month.id} className="mb-10">
                        <div className="flex items-center gap-3 mb-5 ml-1">
                            <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Month {month.id}</h3>
                                <h4 className="text-lg font-bold text-slate-900">{month.title}</h4>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {month.topics.map((topic) => (
                                <div key={topic.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 group hover:border-blue-200 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h5 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                                                {topic.title}
                                            </h5>
                                            <p className="text-xs text-slate-500 line-clamp-2">
                                                Deep dive into technical internals, best practices, and real-world implementations.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                                                <FileText size={12} className="text-blue-600" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Technical Documentation</span>
                                        </div>

                                        <button
                                            disabled={generating === topic.title}
                                            onClick={() => handleGeneratePDF(topic.title)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${generating === topic.title
                                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                                                }`}
                                        >
                                            {generating === topic.topicTitle ? (
                                                <Loader2 size={14} className="animate-spin" />
                                            ) : (
                                                <Download size={14} />
                                            )}
                                            {generating === topic.title ? 'Generating...' : 'Get Guide'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default ResourcesScreen;
