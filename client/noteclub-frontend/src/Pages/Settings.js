// src/Pages/Settings.js
import React, { useState } from 'react';
import EditProfile from './Edit_profile';
import './Settings.css';

export default function Settings() {
    const [showEditProfile, setShowEditProfile] = useState(false);

    const handleEditProfileClick = () => {
        setShowEditProfile(true);
    };

    if (showEditProfile) {
        return <EditProfile />;
    }

    // Otherwise, render the Settings card
    return (
        <div className="settings-overlay">
            <div className="settings-card">
                <h2 className="settings-title">Settings</h2>
                <div className="settings-options">
                    <button className="settings-btn" onClick={handleEditProfileClick}>Edit Profile</button>
                    <button className="settings-btn">Contact Us</button>
                    <button className="settings-btn">Report Problem</button>
                    <button className="settings-btn delete">Delete Account</button>
                </div>
            </div>
        </div>
    );
}