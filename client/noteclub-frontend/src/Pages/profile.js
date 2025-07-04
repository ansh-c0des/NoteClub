import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesCard from '../Components/NotesCard';
import './Profile.css';

export default function Profile() {
    const [username, setUsername] = useState('Ansh Gala');
    const [bio, setBio] = useState(
        'Hi there! I’m Ansh, a notes‑sharing enthusiast. Welcome to my profile!'
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('Not logged in.');
            setLoading(false);
            return;
        }

        axios
            .get('http://localhost:8080/api/greet', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUsername(payload.sub || 'User');
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load profile.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="profile-container">Loading…</div>;
    }
    if (error) {
        return <div className="profile-container error">{error}</div>;
    }

    // dummy notes data
    const notes = [
        {
            id: 1,
            title: 'Calculus I Notes',
            description: 'Limits, derivatives, integrals, and applications.',
            previewUrl: 'https://via.placeholder.com/300x150',
        },
        {
            id: 2,
            title: 'Physics — Chapter 3',
            description: 'Kinematics and motion in one dimension.',
            previewUrl: 'https://via.placeholder.com/300x150',
        },
        {
            id: 3,
            title: 'History of Art',
            description: 'Renaissance to Modernism overview.',
            previewUrl: 'https://via.placeholder.com/300x150',
        },
        {
            id: 4,
            title: 'Data Structures',
            description: 'Arrays, linked lists, trees, and graphs.',
            previewUrl: 'https://via.placeholder.com/300x150',
        },
        {
            id: 5,
            title: 'Organic Chemistry',
            description: 'Hydrocarbons, functional groups, and reactions.',
            previewUrl: 'https://via.placeholder.com/300x150',
        },
    ];

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    className="profile-pic"
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                />
                <div className="profile-info">
                    <h2 className="profile-username">{username}</h2>
                    <p className="profile-bio">{bio}</p>
                </div>
            </div>
            <NotesCard notes={notes} />
        </div>
    );
}
