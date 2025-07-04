import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import './NotesCard.css';

export default function NotesCard({ notes }) {
    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    title={note.title}
                    description={note.description}
                    previewUrl={note.previewUrl}
                />
            ))}
        </div>
    );
}

function NoteCard({ title, description, previewUrl }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="note-card">
            <div
                className="note-preview"
                style={{ backgroundImage: `url(${previewUrl})` }}
            />
            <div className="note-meta">
                <h3 className="note-title">{title}</h3>
                <button
                    className="like-btn"
                    onClick={() => setLiked((v) => !v)}
                    aria-label={liked ? 'Unlike' : 'Like'}
                >
                    <Heart fill={liked ? 'currentColor' : 'none'} />
                </button>
            </div>
            <p className="note-desc">{description}</p>
        </div>
    );
}
