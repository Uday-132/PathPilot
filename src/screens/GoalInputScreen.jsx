import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Search, Sprout, TreePine, Mountain, Clock, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

const GoalInputScreen = () => {
    const navigate = useNavigate();
    const { userGoal, setUserGoal, updateProfile, roadmap } = useApp();
    const [step, setStep] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // If roadmap exists, redirect to it (don't show goal input)
    React.useEffect(() => {
        if (roadmap) {
            navigate('/roadmap');
        }
    }, [roadmap, navigate]);

    const roles = [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "UI/UX Designer",
        "Digital Marketer"
    ];

    const skillLevels = [
        { label: "Beginner", icon: Sprout, value: "Beginner", color: "text-green-500", bg: "bg-green-50" },
        { label: "Intermediate", icon: TreePine, value: "Intermediate", color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Advanced", icon: Mountain, value: "Advanced", color: "text-indigo-500", bg: "bg-indigo-50" }
    ];

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            navigate('/processing');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/welcome');
        }
    };

    const handleGenerate = async () => {
        await updateProfile(userGoal);
        navigate('/processing');
    };

    const progress = (step / 4) * 100;

    return (
        <div className="flex flex-col h-full bg-white font-sans">

            {/* Header */}
            <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={handleBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-slate-900" />
                    </button>
                    <span className="font-bold text-lg text-slate-900">PathPilot</span>
                    <div className="w-8" />
                </div>

                {/* Progress Strip */}
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-slate-900">Building your profile</span>
                    <span className="text-xs font-medium text-slate-500">Step {step} of 4</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden transition-all duration-500">
                    <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">

                {/* Title Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Let's map your future</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Tell us where you want to go, and PathPilot will handle the rest.
                    </p>
                </div>

                {/* Step Content */}
                <div className="transition-all duration-300">

                    {step === 1 && (
                        <section className="animate-fade-in-up">
                            <h3 className="font-bold text-slate-900 mb-3 block">STEP 1: Choose Career Goal</h3>
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 cursor-pointer hover:border-slate-200 transition-colors"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <Search size={20} className="text-blue-500" />
                                    <span className={`flex-1 font-medium ${userGoal.careerGoal ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {userGoal.careerGoal || "Select a role"}
                                    </span>
                                    <ChevronDown size={20} className="text-slate-400" />
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-fade-in-down">
                                        {roles.map(role => (
                                            <div
                                                key={role}
                                                onClick={() => {
                                                    setUserGoal({ ...userGoal, careerGoal: role });
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="p-4 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-slate-600 font-medium transition-colors border-b border-slate-50 last:border-0"
                                            >
                                                {role}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {step === 2 && (
                        <section className="animate-fade-in-up">
                            <h3 className="font-bold text-slate-900 mb-3 block">STEP 2: Select Current Skill Level</h3>
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {skillLevels.map((level) => {
                                    const isSelected = userGoal.skillLevel === level.value;
                                    return (
                                        <button
                                            key={level.value}
                                            onClick={() => setUserGoal({ ...userGoal, skillLevel: level.value })}
                                            className={`flex-1 min-w-[100px] aspect-square rounded-full flex flex-col items-center justify-center gap-2 border-2 transition-all duration-300 ${isSelected
                                                ? 'border-blue-500 bg-white shadow-lg shadow-blue-100 scale-105'
                                                : 'border-slate-100 bg-white hover:border-blue-200'
                                                }`}
                                        >
                                            <level.icon
                                                size={28}
                                                className={isSelected ? 'text-blue-500' : 'text-slate-400'}
                                                strokeWidth={isSelected ? 2.5 : 2}
                                            />
                                            <span className={`text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-slate-500'
                                                }`}>
                                                {level.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {step === 3 && (
                        <section className="animate-fade-in-up">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-900">STEP 3: Weekly Time Availability</h3>
                                <div className="px-3 py-1 bg-blue-50 rounded-lg flex items-center gap-1.5">
                                    <Clock size={14} className="text-blue-600" />
                                    <span className="text-xs font-bold text-blue-600">{userGoal.availability} hrs</span>
                                </div>
                            </div>

                            <div className="px-2 py-4 bg-slate-50 rounded-3xl border border-slate-100">
                                <input
                                    type="range"
                                    min="2"
                                    max="40"
                                    step="1"
                                    value={userGoal.availability}
                                    onChange={(e) => setUserGoal({ ...userGoal, availability: e.target.value })}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between mt-3 px-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Casual (2h)</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Time (40h)</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {step === 4 && (
                        <section className="animate-fade-in-up">
                            <h3 className="font-bold text-slate-900 mb-3 block">STEP 4: Target Outcomes</h3>
                            <div className="space-y-3">
                                {['Internship ready', 'Job ready', 'Skill upgrade'].map((outcome) => (
                                    <div
                                        key={outcome}
                                        onClick={() => setUserGoal({ ...userGoal, targetOutcome: outcome })}
                                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${userGoal.targetOutcome === outcome
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-100 hover:border-blue-100'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${userGoal.targetOutcome === outcome
                                            ? 'border-blue-500'
                                            : 'border-slate-300'
                                            }`}>
                                            {userGoal.targetOutcome === outcome && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                            )}
                                        </div>
                                        <span className={`font-medium ${userGoal.targetOutcome === outcome ? 'text-blue-700' : 'text-slate-600'}`}>
                                            {outcome}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-white border-t border-slate-50 sticky bottom-0 z-10">
                <button
                    onClick={step < 4 ? handleNext : handleGenerate}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-full shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    {step < 4 ? (
                        <>
                            <span>Next Step</span>
                            <ArrowRight size={20} />
                        </>
                    ) : (
                        <>
                            <span>Generate My Roadmap</span>
                            <Sparkles size={20} fill="currentColor" className="text-blue-300" />
                        </>
                    )}
                </button>
            </div>

        </div>
    );
};

export default GoalInputScreen;
