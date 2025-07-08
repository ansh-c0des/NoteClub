import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './NotesCard.css';
import { getLikedNotes, postLike, deleteLike } from '../services/api';

export default function NotesCard({ notes }) {
    // keep a set of liked note IDs
    const [likedSet, setLikedSet] = useState(new Set());

    useEffect(() => {
        // fetch the list of liked notes once
        getLikedNotes()
            .then(fetched => {
                const ids = fetched.map(n => n.notes_id);
                setLikedSet(new Set(ids));
            })
            .catch(err => {
                console.error('Failed to load liked notes:', err);
            });
    }, []);

    return (
        <div className="notes-grid">
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    liked={likedSet.has(note.id)}
                    onLikeToggle={isNowLiked => {
                        setLikedSet(prev => {
                            const copy = new Set(prev);
                            if (isNowLiked) copy.add(note.id);
                            else copy.delete(note.id);
                            return copy;
                        });
                    }}
                />
            ))}
        </div>
    );
}

function NoteCard({ note, liked: initialLiked, onLikeToggle }) {
    const [liked, setLiked] = useState(initialLiked);
    const [expanded, setExpanded] = useState(false);

    // keep liked state in sync if parent updates
    useEffect(() => {
        setLiked(initialLiked);
    }, [initialLiked]);

    const toggleLike = e => {
        e.stopPropagation();
        const next = !liked;
        setLiked(next);
        onLikeToggle(next);

        // call the API
        if (next) {
            postLike(note.id).catch(err => {
                console.error('PostLike failed', err);
                // rollback UI
                setLiked(false);
                onLikeToggle(false);
            });
        } else {
            deleteLike(note.id).catch(err => {
                console.error('DeleteLike failed', err);
                // rollback UI
                setLiked(true);
                onLikeToggle(true);
            });
        }
    };

    const open = () => setExpanded(true);
    const close = () => setExpanded(false);

    return (
        <>
            {expanded && <div className="note-overlay" onClick={close} />}
            <div
                className={`note-card${expanded ? ' expanded' : ''}`}
                onClick={e => {
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
                                onClick={toggleLike}
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
                            <p><strong>Subject:</strong> {note.subject}</p>
                            <p><strong>Topic:</strong> {note.topic}</p>
                            <p><strong>Uploaded:</strong> {note.date}</p>
                        </div>
                        <div className="description-box">{note.description}</div>
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
