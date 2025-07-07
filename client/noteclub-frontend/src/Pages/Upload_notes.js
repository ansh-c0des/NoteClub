import React, { useState } from 'react';
import './Upload_notes.css';
import { uploadNotes } from '../services/api';

function UploadNotes() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file name:", file.name);
        } else {
            setSelectedFile(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!subject || !topic || !title || !description || !selectedFile) {
            alert('Please fill in all required fields and select a file.');
            return;
        }

        // Build FormData for multipart upload
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('subject', subject);
        formData.append('topic', topic);
        formData.append('title', title);
        formData.append('description', description);

        // Call the API
        uploadNotes(formData)
            .then((resp) => {
                console.log('Upload successful:', resp);
                alert('Notes uploaded successfully!');
                // Clear the form
                setSubject('');
                setTopic('');
                setTitle('');
                setDescription('');
                setSelectedFile(null);
            })
            .catch((err) => {
                console.error('Upload failed:', err);
                alert('Failed to upload notes. Please try again.');
            });
    };

    return (
        <div className="upload-notes-container">
            <h2 className="upload-notes-title">Upload Your Notes</h2>
            <p className="upload-notes-description">Here you can upload new notes to your collection.</p>

            <form onSubmit={handleSubmit}>
                <div className="upload-form-grid">
                    {/* Left Column - Subject, Topic, Title */}
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="subject" className="form-label required">Subject:</label>
                            <input
                                type="text"
                                id="subject"
                                className="form-input"
                                placeholder="e.g., Mathematics"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="topic" className="form-label required">Topic:</label>
                            <input
                                type="text"
                                id="topic"
                                className="form-input"
                                placeholder="e.g., Algebra"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label required">Title:</label>
                            <input
                                type="text"
                                id="title"
                                className="form-input"
                                placeholder="e.g., Quadratic Equations"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Right Column - Description */}
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="description" className="form-label required">Description:</label>
                            <textarea
                                id="description"
                                className="form-textarea"
                                placeholder="Provide a brief description of your notes..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Browse Notes File Input */}
                <div className="browse-notes-container">
                    <label htmlFor="browse-notes" className="browse-notes-label required">Browse Notes:</label>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            id="browse-notes"
                            className="file-input"
                            onChange={handleFileChange}
                            required
                        />
                        {selectedFile && (
                            <span className="selected-file-name">{selectedFile.name}</span>
                        )}
                    </div>
                </div>

                {/* Upload Button */}
                <button type="submit" className="post-button">UPLOAD</button>
            </form>
        </div>
    );

}

export default UploadNotes;
