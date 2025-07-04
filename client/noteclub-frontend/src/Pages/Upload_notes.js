import React, { useState } from 'react';
import './Upload_notes.css';

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

        // Basic validation for demonstration
        if (!subject || !topic || !title || !description || !selectedFile) {
            alert('Please fill in all required fields and select a file.');
            return; // Stop form submission
        }

        console.log("Submitting notes...");
        console.log("Subject:", subject);
        console.log("Topic:", topic);
        console.log("Title:", title);
        console.log("Description:", description);
        if (selectedFile) {
            console.log("File to upload:", selectedFile);
            // In a real application, you would send this data (including selectedFile) to your backend
            // The backend would then save the file and store its path in the database.
        }
        // else case is already covered by the validation above
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
                            <label htmlFor="subject" className="form-label required">Subject:</label> {/* Added 'required' class */}
                            <input
                                type="text"
                                id="subject"
                                className="form-input"
                                placeholder="e.g., Mathematics"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required // HTML5 validation attribute
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="topic" className="form-label required">Topic:</label> {/* Added 'required' class */}
                            <input
                                type="text"
                                id="topic"
                                className="form-input"
                                placeholder="e.g., Algebra"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required // HTML5 validation attribute
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label required">Title:</label> {/* Added 'required' class */}
                            <input
                                type="text"
                                id="title"
                                className="form-input"
                                placeholder="e.g., Quadratic Equations"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required // HTML5 validation attribute
                            />
                        </div>
                    </div>

                    {/* Right Column - Description */}
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="description" className="form-label required">Description:</label> {/* Added 'required' class */}
                            <textarea
                                id="description"
                                className="form-textarea"
                                placeholder="Provide a brief description of your notes..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required // HTML5 validation attribute
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Browse Notes */}
                <div className="browse-notes-container">
                    <label htmlFor="browse-notes" className="browse-notes-label required">Browse Notes:</label> {/* Added 'required' class */}
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            id="browse-notes"
                            className="file-input"
                            onChange={handleFileChange}
                            required // HTML5 validation attribute
                        />
                        {/* Display selected file name */}
                        {selectedFile && (
                            <span className="selected-file-name">
                                {selectedFile.name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Post Button */}
                <button type="submit" className="post-button">UPLOAD</button>
            </form>
        </div>
    );
}

export default UploadNotes;