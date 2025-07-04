import React from 'react';
import './Settings.css';

export default function Settings() {
    return (
        <div className="settings-overlay">
            <div className="settings-card">
                <h2 className="settings-title">Settings</h2>
                <div className="settings-options">
                    <button className="settings-btn">Edit Profile</button>
                    <button className="settings-btn">Contact Us</button>
                    <button className="settings-btn">Report Problem</button>
                    <button className="settings-btn delete">Delete Account</button>
                </div>
            </div>
        </div>
    );
}
