import React, { useEffect, useState } from 'react';
import NotesCard from '../Components/NotesCard';
import './Profile.css';
import { getProfileDetails, getUploadedNotes } from '../services/api';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const serverBase = 'http://localhost:8080';

        // 1) load profile
        const p1 = getProfileDetails()
            .then((data) => {
                setUsername(data.username);
                setBio(data.bio);
                setProfilePic(serverBase + data.picture_url);
            });

        // 2) load uploaded notes
        const p2 = getUploadedNotes()
            .then((data) => {
                // data is an array of { notes_id, note_url, note_title, Description, subject, topic, uploadDate }
                const mapped = data.map((n) => ({
                    id: n.notes_id,
                    title: n.note_title,
                    description: n.description,
                    previewUrl: serverBase + n.note_url,   // WILL BE RESOLVED LATER
                    viewUrl:    serverBase + n.note_url,
                    subject:    n.subject,
                    topic:      n.topic,
                    date:       n.uploadDate.split('T')[0], // YYYY‑MM‑DD
                }));
                setNotes(mapped);
            });

        // when both done (or any error) turn off loading
        Promise.all([p1, p2])
            .catch((err) => {
                console.error(err);
                setError('Failed to load profile or notes.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="profile-container">Loading…</div>;
    if (error)   return <div className="profile-container error">{error}</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-pic" src={profilePic} alt="Profile" />
                <div className="profile-info">
                    <h2 className="profile-username">{username}</h2>
                    <p className="profile-bio">{bio}</p>
                </div>
            </div>
            <NotesCard notes={notes} />
        </div>
    );
}
