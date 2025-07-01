import React from 'react';

function UploadNotes() {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">Upload Your Notes</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">Here you can upload new notes to your collection.</p>
            {/* Add file upload form and logic here */}
        </div>
    );
}

export default UploadNotes;
