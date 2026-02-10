import React from 'react';

const MobileContainer = ({ children }) => {
    return (
        <div className="w-full max-w-md mx-auto h-screen bg-white flex flex-col relative overflow-hidden shadow-2xl">
            {children}
        </div>
    );
};

export default MobileContainer;
