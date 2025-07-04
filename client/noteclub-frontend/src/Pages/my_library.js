import React from 'react';
import NotesCard from '../Components/NotesCard';
import './My_Library.css';

export default function MyLibrary() {
    // dummy notes data
    const notes = [
        {
            id: 1,
            title: 'Calculus I Notes',
            description: 'Limits, derivatives, integrals, and applications.',
            previewUrl: 'https://via.placeholder.com/300x150',
            viewUrl: '#'
        },
        {
            id: 2,
            title: 'Physics — Chapter 3',
            description: 'Kinematics and motion in one dimension.',
            previewUrl: 'https://via.placeholder.com/300x150',
            viewUrl: '#'
        },
        {
            id: 3,
            title: 'History of Art',
            description: 'Renaissance to Modernism overview.',
            previewUrl: 'https://via.placeholder.com/300x150',
            viewUrl: '#'
        },
        {
            id: 4,
            title: 'Data Structures',
            description: 'Arrays, linked lists, trees, and graphs.',
            previewUrl: 'https://via.placeholder.com/300x150',
            viewUrl: '#'
        },
        {
            id: 5,
            title: 'Organic Chemistry',
            description: 'Hydrocarbons, functional groups, and reactions.',
            previewUrl: 'https://via.placeholder.com/300x150',
            viewUrl: '#'
        },
    ];

    return (
        <div className="my-library">
            <div className="my-library__header">
                <h2 className="my-library__title">My Library</h2>
                <p className="my-library__subtitle">
                    Collection of all the Notes you saved
                </p>
            </div>

            <div className="my-library__content">
                <NotesCard notes={notes} />
            </div>
        </div>
    );
}
