// src/Pages/Edit_profile.js
import React, { useState, useRef } from 'react';
import { Edit2 as EditIcon, Camera } from 'lucide-react';
import './Edit_profile.css';

function EditProfile() {
    // State for form fields
    const [username, setUsername] = useState('Current Username');
    const [bio, setBio] = useState('Write a short bio about yourself...');
    const [education, setEducation] = useState('Your Education');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('https://placehold.co/120x120/cccccc/000000?text=JP'); // Default placeholder
    const [imageError, setImageError] = useState('');

    // Refs for input fields
    const usernameInputRef = useRef(null);
    const bioInputRef = useRef(null);
    const educationInputRef = useRef(null);
    const fileInputRef = useRef(null); // Ref for the hidden file input

    // Function to handle profile picture upload
    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        setImageError(''); // Clear previous errors

        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(file.type)) {
                setImageError('Invalid file type. Please upload a JPG, PNG, or GIF image.');
                setProfilePic(null);
                setProfilePicPreview('https://placehold.co/120x120/cccccc/000000?text=JP');
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
            if (file.size > maxSize) {
                setImageError('Image size too large. Max 5MB allowed.');
                setProfilePic(null);
                setProfilePicPreview('https://placehold.co/120x120/cccccc/000000?text=JP');
                return;
            }

            setProfilePic(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePic(null);
            setProfilePicPreview('https://placehold.co/120x120/cccccc/000000?text=JP');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleConfirmEdits = (event) => {
        event.preventDefault();
        console.log("Confirming edits...");
        console.log("Username:", username);
        console.log("Bio:", bio);
        console.log("Education:", education);
        if (profilePic) {
            console.log("New Profile Pic:", profilePic.name, profilePic);
        } else {
            console.log("No new profile pic uploaded.");
        }
        alert('Profile edits confirmed!');
    };

    return (
        <div className="edit-profile-container">
            {/* Main Title - Now centered globally */}
            <h2 className="edit-profile-title">Edit Your Profile</h2>

            {/* New: Wrapper for the two-column content below the title */}
            <div className="profile-content-wrapper">
                {/* Left Section: Profile Picture and Change Picture */}
                <div className="profile-section-left">
                    <div className="profile-picture-wrapper">
                        {profilePicPreview ? (
                            <img src={profilePicPreview} alt="Profile" className="profile-picture" />
                        ) : (
                            <span className="profile-pic-placeholder">JP</span>
                        )}
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/gif"
                            onChange={handleProfilePicChange}
                            ref={fileInputRef}
                            className="file-input-hidden"
                        />
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="change-pic-btn"
                            aria-label="Change profile picture"
                        >
                            <Camera size={20} />
                        </button>
                    </div>
                    {imageError && <p className="image-error-message">{imageError}</p>}
                    <span className="change-pic-label" onClick={triggerFileInput}>Change Picture</span>
                </div>

                {/* Right Section: Form Fields and Confirm Button */}
                {/* The form itself is now the right column, as per sketch logic */}
                <form onSubmit={handleConfirmEdits} className="form-section-right">
                    {/* Username Field */}
                    <div className="form-field">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <div className="input-with-edit-icon">
                            <input
                                type="text"
                                id="username"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                ref={usernameInputRef}
                            />
                            <button
                                type="button"
                                className="edit-icon-btn"
                                onClick={() => usernameInputRef.current.focus()}
                                aria-label="Edit username"
                            >
                                <EditIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Bio Field */}
                    <div className="form-field">
                        <label htmlFor="bio" className="form-label">Bio:</label>
                        <div className="input-with-edit-icon">
                            <textarea
                                id="bio"
                                className="form-textarea"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                ref={bioInputRef}
                            ></textarea>
                            <button
                                type="button"
                                className="edit-icon-btn"
                                onClick={() => bioInputRef.current.focus()}
                                aria-label="Edit bio"
                            >
                                <EditIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Education Field */}
                    <div className="form-field">
                        <label htmlFor="education" className="form-label">Your Education:</label>
                        <div className="input-with-edit-icon">
                            <input
                                type="text"
                                id="education"
                                className="form-input"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                ref={educationInputRef}
                            />
                            <button
                                type="button"
                                className="edit-icon-btn"
                                onClick={() => educationInputRef.current.focus()}
                                aria-label="Edit education"
                            >
                                <EditIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Confirm Edits Button */}
                    <button type="submit" className="confirm-edits-btn">Confirm Edits</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;