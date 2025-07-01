import React from 'react';

function MyLibrary() {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">My Library</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">View and manage all your uploaded notes.</p>
            {/* Display user's notes here */}
        </div>
    );
}

export default MyLibrary;
