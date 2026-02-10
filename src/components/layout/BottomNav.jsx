import React from 'react';
import { Home, Map, BookOpen, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Map, label: 'Roadmap', path: '/roadmap' },
        { icon: BookOpen, label: 'Resources', path: '/resources' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4 shrink-0 absolute bottom-0 w-full z-10">
            {navItems.map(({ icon: Icon, label, path }) => (
                <NavLink
                    key={label}
                    to={path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 text-xs font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <Icon size={20} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default BottomNav;
