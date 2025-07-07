import React, { useEffect, useState } from 'react';
import NotesCard from '../Components/NotesCard';
import './Profile.css';
import { getProfileDetails } from '../services/api';


export default function Profile() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfileDetails()
            .then(data => {
                setUsername(data.username);
                setBio(data.bio);
                const serverBaseUrl = "http://localhost:8080";
                setProfilePic(serverBaseUrl + data.picture_url);
            })
            .catch(err => {
                console.error('Error fetching profile details:', err);
                setError('Failed to load profile.');
            })
            .finally(() => {
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
                    src={profilePic}
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
