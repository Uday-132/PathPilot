
export const generateRoadmap = (goal) => {
    const role = goal.role || "Full Stack Developer";

    const months = [
        {
            id: 1,
            title: "Month 1",
            subtitle: "Fundamentals & Basics",
            status: "active",
            skills: ["Python Basics", "UX Fundamentals", "Git Workflow"],
            topics: [
                { id: "t1", title: "Data Types & Loops in Python", completed: false },
                { id: "t2", title: "Introduction to User Research", completed: true },
                { id: "t3", title: "Wireframing low-fi prototypes", completed: false },
                { id: "t4", title: "Basic Terminal Commands", completed: false }
            ],
            resources: [
                {
                    id: "r1",
                    title: "Introduction to Python Data Types",
                    type: "Video",
                    source: "YouTube",
                    duration: "15:20",
                    description: "Learn about strings, integers, floats, and booleans in this comprehensive guide.",
                    url: "https://youtube.com",
                    category: "featured",
                    image: "https://images.unsplash.com/photo-1526379922252-06b5620f980d?auto=format&fit=crop&q=80&w=600"
                },
                {
                    id: "r2",
                    title: "Mastering Loops and Logic",
                    type: "Article",
                    source: "Coursera",
                    duration: "2 Hours",
                    description: "A deep dive into for-loops, while-loops, and conditional logic patterns.",
                    url: "https://coursera.org",
                    category: "course",
                    icon: "book"
                },
                {
                    id: "r3",
                    title: "Python Syntax Documentation",
                    type: "Docs",
                    source: "Official Docs",
                    duration: "10 Mins",
                    description: "Reference guide for Python's core syntax rules and best practices.",
                    url: "https://python.org",
                    category: "docs",
                    icon: "code"
                },
                {
                    id: "r4",
                    title: "Quiz: Variable Assignment",
                    type: "Quiz",
                    source: "PathPilot",
                    duration: "5 Mins",
                    description: "Test your knowledge on variable assignment and naming conventions.",
                    url: "#",
                    category: "quiz",
                    icon: "quiz"
                }
            ]
        },
        {
            id: 2,
            title: "Month 2",
            subtitle: "Advanced Techniques & Projects",
            status: "locked",
            skills: ["React Hooks", "State Management"],
            topics: [
                { id: "t5", title: "Advanced React Patterns", completed: false },
                { id: "t6", title: "Redux & Context API", completed: false }
            ],
            resources: []
        },
        {
            id: 3,
            title: "Month 3",
            subtitle: "Networking & Portfolio Building",
            status: "active",
            skills: [],
            topics: [],
            resources: []
        },
        {
            id: 4,
            title: "Month 4",
            subtitle: "Backend Integration",
            status: "locked",
            skills: [],
            topics: [],
            resources: []
        },
        {
            id: 5,
            title: "Month 5",
            subtitle: "Database Design",
            status: "locked",
            skills: [],
            topics: [],
            resources: []
        },
        {
            id: 6,
            title: "Month 6",
            subtitle: "Final Capstone",
            status: "locked",
            skills: [],
            topics: [],
            resources: []
        }
    ];

    return {
        role: role,
        skillLevel: goal.skillLevel,
        duration: "6 Months",
        months: months
    };
};
