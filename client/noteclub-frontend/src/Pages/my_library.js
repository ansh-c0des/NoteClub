// src/pages/MyLibrary.js
import React, { useEffect, useState } from 'react';
import NotesCard from '../Components/NotesCard';
import './My_Library.css';
import { getLikedNotes } from '../services/api';

export default function MyLibrary() {
    const [notes, setNotes]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        const serverBase = 'http://localhost:8080';

        getLikedNotes()
            .then(data => {
                // data is our array of liked‐notes DTOs
                const mapped = data.map(n => ({
                    id:          n.notes_id,
                    title:       n.note_title,
                    description: n.description,
                    previewUrl:  serverBase + n.note_url,
                    viewUrl:     serverBase + n.note_url,
                    subject:     n.subject,
                    topic:       n.topic,
                    date:        n.uploadDate.split('T')[0],
                    uploadedBy: n.username
                }));
                setNotes(mapped);
            })
            .catch(err => {
                console.error('Error fetching liked notes:', err);
                setError('Failed to load your library.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="my-library">Loading…</div>;
    if (error)   return <div className="my-library error">{error}</div>;

    return (
        <div className="my-library">
            <div className="my-library__header">
                <h2 className="my-library__title">My Library</h2>
                <p className="my-library__subtitle">
                    Collection of all the notes you saved
                </p>
            </div>

            <div className="my-library__content">
                <NotesCard notes={notes} />
            </div>
        </div>
    );
}
