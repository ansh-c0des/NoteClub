import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import './NotesCard.css';

export default function NotesCard({ notes }) {
    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                />
            ))}
        </div>
    );
}

function NoteCard({ note }) {
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const open = () => setExpanded(true);
    const close = () => setExpanded(false);

    // dummy data:
    const subject = 'Mathematics';
    const topic   = 'Calculus I';
    const date    = '2025‑06‑30';
    const liked_by       = '345 students';

    return (
        <>
            {expanded && <div className="note-overlay" onClick={close} />}

            <div
                className={`note-card${expanded ? ' expanded' : ''}`}
                onClick={(e) => {
                    if (!expanded) open();
                    else e.stopPropagation();
                }}
            >
                <div
                    className="note-preview"
                    style={{ backgroundImage: `url(${note.previewUrl})` }}
                />

                {!expanded ? (
                    <>
                        <div className="note-meta">
                            <h3 className="note-title">{note.title}</h3>
                            <button
                                className="like-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLiked((v) => !v);
                                }}
                                aria-label={liked ? 'Unlike' : 'Like'}
                            >
                                <Heart fill={liked ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        <p className="note-desc">{note.description}</p>
                    </>
                ) : (
                    <div className="expanded-content">
                        <h2 className="expanded-title">{note.title}</h2>
                        <div className="expanded-fields">
                            <p><strong>Subject:</strong> {subject}</p>
                            <p><strong>Topic:</strong> {topic}</p>
                            <p><strong>Uploaded:</strong> {date}</p>
                            <p><strong>Liked by:</strong> {liked_by}</p>
                        </div>
                        <div className="description-box">
                            {note.description}
                        </div>
                        <button
                            className="view-btn"
                            onClick={() => window.open(note.viewUrl || '#', '_blank')}
                        >
                            View Note
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
