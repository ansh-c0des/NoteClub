import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import NotesCard from '../Components/NotesCard';
import './Search_notes.css';
import { searchNotes,getRecommendedNotes } from '../services/api';

export default function SearchNotes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [notes, setNotes] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // New state for recommendations
    const [recommended, setRecommended] = useState([]);
    const [recLoading, setRecLoading] = useState(true);
    const [recError, setRecError] = useState('');

    // fetch recommended notes
    useEffect(() => {
        setRecLoading(true);
        getRecommendedNotes(0, 10)
            .then(res => {
                const serverBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
                const mapped = res.content.map(n => ({
                    id:         n.notes_id,
                    title:      n.note_title,
                    description:n.description,
                    previewUrl: serverBase + n.note_url,
                    viewUrl:    serverBase + n.note_url,
                    subject:    n.subject,
                    topic:      n.topic,
                    date:       new Date(n.uploadDate).toLocaleDateString(),
                    uploadedBy: n.username
                }));
                setRecommended(mapped);
            })
            .catch(err => {
                console.error('Failed to load recommendations:', err);
                setRecError('Could not load recommendations.');
            })
            .finally(() => setRecLoading(false));
    }, []);

    const handleSearch = async e => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setErrorMessage('Please enter a search query');
            return;
        }
        setErrorMessage('');
        setLoading(true);
        setSearched(false);

        try {
            const res = await searchNotes(searchTerm, 0, 10);
            const serverBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
            const mapped = res.content.map(n => ({
                id:         n.notes_id,
                title:      n.note_title,
                description:n.description,
                previewUrl: serverBase + n.note_url,
                viewUrl:    serverBase + n.note_url,
                subject:    n.subject,
                topic:      n.topic,
                date:       new Date(n.uploadDate).toLocaleDateString(),
                uploadedBy: n.username
            }));
            setNotes(mapped);
        } catch (err) {
            console.error('Search failed:', err);
            setNotes([]);
        } finally {
            setLoading(false);
            setSearched(true);
        }
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
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-button" aria-label="Search">
                    <SearchIcon size={20} />
                </button>
            </form>

            {errorMessage && (
                <div className="search-error-popup">
                    {errorMessage}
                </div>
            )}

            {loading && <p>Loading…</p>}
            {!loading && searched && notes.length === 0 && (
                <p className="no-results">No search results</p>
            )}
            {!loading && searched && notes.length > 0 && (
                <>
                    <h3 className="search-results-heading">Search results:</h3>
                    <NotesCard notes={notes} />
                </>
            )}

            <div className="recommendations-section">
                <h3 className="recommendations-title">
                    Notes Recommended for you
                </h3>
                {recLoading && <p>Loading recommendations…</p>}
                {recError && <p className="search-error-popup">{recError}</p>}
                {!recLoading && !recError && recommended.length === 0 && (
                    <p className="no-results">No recommendations found</p>
                )}
                {!recLoading && recommended.length > 0 && (
                    <NotesCard notes={recommended} />
                )}
            </div>
        </div>
    );
}
