import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() { // Renamed from Register to Profile
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true); // New state for loading
    const [error, setError] = useState(null);     // New state for errors

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/');
            return; // Exit early if no token
        }

        const extractUsernameFromToken = (token) => {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.sub || 'User';
            } catch (error) {
                console.error('Failed to decode token:', error);
                return 'User';
            }
        };

        // Call a simple protected API to confirm token validity
        axios.get('http://localhost:8080/api/greet', { // Assuming /api/greet is a protected endpoint
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log('Token valid:', res.data);
                setUsername(extractUsernameFromToken(token));
                setLoading(false); // Data loaded
            })
            .catch(err => {
                console.error('Token invalid or expired:', err);
                setError('Failed to load profile. Please log in again.'); // Set error message
                localStorage.removeItem('jwtToken');
                setLoading(false); // Loading finished, even with error
                navigate('/'); // Redirect to login on token invalidity
            });
    }, [navigate]); // Dependency array includes navigate

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full text-red-500">
                <p className="text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">Welcome, {username}!</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">This is your secure profile page. You can manage your personal information here.</p>
            {/* Add more profile-specific content here */}
        </div>
    );
}

export default Profile;
