// src/Pages/Search_notes.jsx
import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import NotesCard from '../Components/NotesCard';  // ← note the plural import
import './Search_notes.css';

function SearchNotes() {
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data for recommended notes
    const dummyNotes = [
        {
            id: '1',
            title: 'Introduction to Calculus',
            description:
                'A comprehensive guide to basic calculus concepts, limits, derivatives, and integrals.',
            previewUrl: 'https://via.placeholder.com/300x200?text=Calc+Preview+1',
            viewUrl: '#',
        },
        {
            id: '2',
            title: 'Linear Algebra Fundamentals',
            description: 'Understanding vectors, matrices, and linear transformations.',
            previewUrl: 'https://via.placeholder.com/300x200?text=Linear+Algebra',
            viewUrl: '#',
        },
        {
            id: '3',
            title: 'Physics: Mechanics I',
            description: "Notes on classical mechanics, Newton's laws, and kinematics.",
            previewUrl: 'https://via.placeholder.com/300x200?text=Physics+Notes',
            viewUrl: '#',
        },
        {
            id: '4',
            title: 'Organic Chemistry Basics',
            description:
                'An overview of organic compounds, functional groups, and basic reactions.',
            previewUrl: 'https://via.placeholder.com/300x200?text=Organic+Chem',
            viewUrl: '#',
        },
        {
            id: '5',
            title: 'Web Development: React Hooks',
            description:
                'Practical examples and explanations of common React Hooks for state management and side effects.',
            previewUrl: 'https://via.placeholder.com/300x200?text=React+Hooks',
            viewUrl: '#',
        },
        {
            id: '6',
            title: 'Data Structures & Algorithms',
            description:
                'Essential data structures (arrays, lists, trees) and algorithm design techniques.',
            previewUrl: 'https://via.placeholder.com/300x200?text=DSA+Notes',
            viewUrl: '#',
        },
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
        // TODO: plug in real API call / state update
    };

    return (
        <div className="search-notes-container">
            <h2 className="search-notes-title">Search for the Notes:</h2>
            <p className="search-description">
                Find notes shared by others or your own.
            </p>

            <form className="search-bar-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-button" aria-label="Search">
                    <SearchIcon size={20} />
                </button>
            </form>

            <div className="recommendations-section">
                <h3 className="recommendations-title">
                    Notes Recommended for you
                </h3>
                {/* Pass the entire array into NotesCard */}
                <NotesCard notes={dummyNotes} />
            </div>
        </div>
    );
}

export default SearchNotes;
