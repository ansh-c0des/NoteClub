// src/Pages/Edit_profile.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2 as EditIcon, Camera } from 'lucide-react';
import './Edit_profile.css';
import { getProfileDetails, updateProfile } from '../services/api';

function EditProfile() {
    const navigate = useNavigate();

    // State for form fields
    const [username,   setUsername]   = useState('');
    const [bio,        setBio]        = useState('');
    const [education,  setEducation]  = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [preview,    setPreview]    = useState(null);
    const [imageError, setImageError] = useState('');

    // Refs so we can programmatically focus
    const usernameRef  = useRef();
    const bioRef       = useRef();
    const educationRef = useRef();
    const fileRef      = useRef();

    // 1) On mount, load the existing profile
    useEffect(() => {
        getProfileDetails()
            .then(data => {
                setUsername(data.username);
                setBio(data.bio);
                setEducation(data.edu_course);

                // Build full URL for existing picture
                const serverBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
                setPreview(serverBase + data.picture_url);
            })
            .catch(err => {
                console.error('Failed to load profile:', err);
            });
    }, []);

    // 2) Handle new picture selection + preview
    const handleProfilePicChange = e => {
        const file = e.target.files[0];
        setImageError('');

        if (!file) {
            setProfilePic(null);
            return setPreview(null);
        }
        const validTypes = ['image/jpeg','image/png','image/gif'];
        if (!validTypes.includes(file.type)) {
            setImageError('Please upload JPG, PNG, or GIF.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Max image size is 5MB.');
            return;
        }

        setProfilePic(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    // 3) Submit updated profile
    const handleConfirmEdits = async e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('username',   username);
        fd.append('bio',        bio);
        fd.append('edu_course', education);
        if (profilePic) fd.append('pic_file', profilePic);

        try {
            const updated = await updateProfile(fd);

            // 4) Store the new JWT so future calls use your new username
            if (updated.token) {
                localStorage.setItem('jwtToken', updated.token);
            }

            // (Optional) refresh local state with whatever the server returns
            // setUsername(updated.username || username);
            // setBio(updated.bio);
            // setEducation(updated.edu_course);
            // const serverBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
            // setPreview(serverBase + updated.picture_url);

            // 5) Go back to your profile page under the new username
            navigate('/profile');
            return;
        } catch (err) {
            console.error('Update failed:', err);
            alert('Failed to update profile.');
        }
    };

    // Helper to open file chooser
    const triggerFileInput = () => {
        fileRef.current.click();
    };

    return (
        <div className="edit-profile-container">
            <h2 className="edit-profile-title">Edit Your Profile</h2>
            <div className="profile-content-wrapper">

                {/* Left: picture */}
                <div className="profile-section-left">
                    <div className="profile-picture-wrapper">
                        {preview
                            ? <img src={preview} alt="Profile" className="profile-picture" />
                            : <span className="profile-pic-placeholder">JP</span>
                        }
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleProfilePicChange}
                            ref={fileRef}
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
                    <span className="change-pic-label" onClick={triggerFileInput}>
            Change Picture
          </span>
                </div>

                {/* Right: form */}
                <form onSubmit={handleConfirmEdits} className="form-section-right">
                    {/* Username */}
                    <div className="form-field">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <div className="input-with-edit-icon">
                            <input
                                id="username"
                                className="form-input"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                ref={usernameRef}
                            />
                            <button
                                type="button"
                                className="edit-icon-btn"
                                onClick={() => usernameRef.current.focus()}
                                aria-label="Edit username"
                            >
                                <EditIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="form-field">
                        <label htmlFor="bio" className="form-label">Bio:</label>
                        <div className="input-with-edit-icon">
              <textarea
                  id="bio"
                  className="form-textarea"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  ref={bioRef}
              />
                            <button
                                type="button"
                                className="edit-icon-btn"
                                onClick={() => bioRef.current.focus()}
                                aria-label="Edit bio"
                            >
                                <EditIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="form-field">
                        <label htmlFor="education" className="form-label">Your Education:</label>
                        <div className="input-with-edit-icon">
                            <input
                                id="education"
                                className="form-input"
                                value={education}
                                onChange={e => setEducation(e.target.value)}
                                ref={educationRef}
                            />
                            <button
                                type="button"
                                className="edit-icon-btn"
                                onClick={() => educationRef.current.focus()}
                                aria-label="Edit education"
                            >
                                <EditIcon size={18} />
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="confirm-edits-btn">
                        Confirm Edits
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
