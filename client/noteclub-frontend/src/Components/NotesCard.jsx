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

    const {
        title,
        description,
        previewUrl,
        viewUrl,
        subject,
        topic,
        date,
        liked_by
    } = note;

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
                    style={{ backgroundImage: `url(${previewUrl})` }}
                />

                {!expanded ? (
                    <>
                        <div className="note-meta">
                            <h3 className="note-title">{title}</h3>
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
                        <p className="note-desc">{description}</p>
                    </>
                ) : (
                    <div className="expanded-content">
                        <h2 className="expanded-title">{title}</h2>
                        <div className="expanded-fields">
                            <p><strong>Subject:</strong> {subject}</p>
                            <p><strong>Topic:</strong> {topic}</p>
                            <p><strong>Uploaded:</strong> {date}</p>
                            {liked_by && <p><strong>Liked by:</strong> {liked_by}</p>}
                        </div>
                        <div className="description-box">
                            {description}
                        </div>
                        <button
                            className="view-btn"
                            onClick={() => window.open(viewUrl || '#', '_blank')}
                        >
                            View Note
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
