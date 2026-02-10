import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userGoal, setUserGoal] = useState({
        careerGoal: '',
        skillLevel: 'Beginner',
        targetOutcome: 'Job ready',
        availability: '10', // hours per week
    });

    const [roadmap, setRoadmap] = useState(null);
    const [completedMilestones, setCompletedMilestones] = useState([]);

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const fetchUserRoadmap = async (authToken = token) => {
        if (!authToken) return;
        try {
            const res = await fetch('https://path-pilot-sand.vercel.app/api/roadmap', {
                method: 'GET',
                headers: {
                    'x-auth-token': authToken
                }
            });
            const data = await res.json();
            if (res.ok && data.length > 0) {
                // Assuming we want the latest one
                console.log("Fetched User Roadmap:", data[0]);
                setRoadmap(data[0]);
            }
        } catch (err) {
            console.error("Failed to fetch roadmap:", err);
        }
    };

    // Auto-fetch on mount if token exists
    useEffect(() => {
        if (token) {
            fetchUserRoadmap(token);
        }
    }, [token]);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        // Fetch roadmap immediately on login
        fetchUserRoadmap(authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRoadmap(null); // Clear roadmap on logout
        localStorage.removeItem('token');
    };

    const resetRoadmap = async () => {
        try {
            const res = await fetch('https://path-pilot-sand.vercel.app/api/roadmap', {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token
                }
            });

            if (res.ok) {
                setRoadmap(null);
                setCompletedMilestones([]);
                // Optionally reset user goal
                setUserGoal({
                    careerGoal: '',
                    skillLevel: 'Beginner',
                    targetOutcome: 'Job ready',
                    availability: '10',
                });
                return true;
            }
        } catch (err) {
            console.error("Reset Failed:", err);
            return false;
        }
        return false;
    };

    const toggleMilestone = (id) => {
        setCompletedMilestones(prev =>
            prev.includes(id)
                ? prev.filter(m => m !== id)
                : [...prev, id]
        );
    };

    const generateUserRoadmap = async () => {
        console.log('Generating Roadmap...');
        try {
            const res = await fetch('https://path-pilot-sand.vercel.app/api/roadmap/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });
            const data = await res.json();

            if (res.ok) {
                // If the backend saves it as 'milestones' but frontend expects 'months', 
                // we might need to map it if the DB schema doesn't match perfectly.
                // Let's ensure the data structure flows correctly.
                // The backend saves: { user, goal, milestones: roadmapContent.roadmap } 
                // Wait, my prompt returned "months".
                // I need to Update backend save logic too to match.

                // The backend returns the full roadmap object with 'months'
                console.log("Roadmap Data:", data);
                setRoadmap(data);
                return true;
            } else {
                console.error('Generation Failed:', data.msg);
                return false;
            }
        } catch (err) {
            console.error('Generation Error:', err);
            return false;
        }
    };

    const updateProfile = async (goalData) => {
        console.log('Sending Profile Update:', goalData); // Debug
        try {
            const res = await fetch('https://path-pilot-sand.vercel.app/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(goalData)
            });
            const data = await res.json();
            console.log('Profile Update Response:', res.status, data); // Debug

            if (res.ok) {
                setUser(data);
                console.log('User state updated:', data);
            } else {
                console.error('Update Failed:', data.msg);
            }
        } catch (err) {
            console.error('Update Error:', err);
        }
    };

    const toggleTopicCompletion = async (roadmapId, topicId) => {
        // Optimistic UI Update
        const updatedRoadmap = { ...roadmap };
        let topicFound = false;

        updatedRoadmap.months.forEach(month => {
            const topic = month.topics.find(t => t.id === topicId);
            if (topic) {
                topic.completed = !topic.completed;
                topicFound = true;
            }
        });

        if (topicFound) {
            setRoadmap(updatedRoadmap);
        }

        try {
            const res = await fetch(`https://path-pilot-sand.vercel.app/api/roadmap/${roadmapId}/topic/${topicId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });

            if (!res.ok) {
                // Revert if failed
                console.error("Failed to save progress");
                // In a real app, I'd fetch the roadmap again or revert the change
            } else {
                const data = await res.json();
                setRoadmap(data); // Sync with server response to be sure
            }
        } catch (err) {
            console.error("Error saving progress:", err);
        }
    };

    return (
        <AppContext.Provider value={{
            userGoal, setUserGoal,
            roadmap, setRoadmap, fetchUserRoadmap,
            completedMilestones, toggleMilestone, toggleTopicCompletion,
            user, token, login, logout, updateProfile, generateUserRoadmap,
            resetRoadmap
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
