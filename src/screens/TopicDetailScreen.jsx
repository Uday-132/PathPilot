import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, PlayCircle, FileText, Youtube } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TopicDetailScreen = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { token, userGoal } = useApp();

    // Topic title passed via state or URL param (we'll use location state or decode param)
    // For now assuming topicId is the title slug or we pass title in state
    const topicTitle = location.state?.title || topicId;

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/roadmap/topic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    },
                    body: JSON.stringify({
                        topic: topicTitle,
                        courseLevel: userGoal.skillLevel
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    setDetails(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [topicTitle, token, userGoal.skillLevel]);

    return (
        <div className="flex flex-col h-full bg-white font-sans animate-fade-in-up">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-slate-50 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-slate-900" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-900 line-clamp-1">{topicTitle}</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24 scrollbar-hide">
                {loading ? (
                    <div className="space-y-6">
                        <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                        <div className="h-40 bg-slate-50 rounded-xl animate-pulse mt-8"></div>
                    </div>
                ) : details ? (
                    <div className="space-y-8">

                        {/* Explanation Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="text-blue-600" size={20} />
                                <h3 className="font-bold text-slate-900">Concept Overview</h3>
                            </div>
                            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-700 leading-relaxed text-sm">
                                {details.explanation}
                            </div>
                        </section>

                        {/* Video Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Youtube className="text-red-600" size={20} />
                                <h3 className="font-bold text-slate-900">Suggested Videos</h3>
                            </div>

                            <div className="space-y-3">
                                {details.videos && details.videos.length > 0 ? (
                                    details.videos.map((video, idx) => (
                                        <a
                                            key={idx}
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                                <PlayCircle size={24} className="text-red-500" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{video.title}</h4>
                                                <p className="text-xs text-slate-400 mt-1">Watch on YouTube</p>
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-slate-500 font-medium">Video not existed</p>
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>
                ) : (
                    <div className="text-center text-slate-400 mt-10">Failed to load details.</div>
                )}
            </div>
        </div>
    );
};

export default TopicDetailScreen;
