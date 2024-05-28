import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
    const [user, setUser] = useState({ username: '', email: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:3001/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {error && <p className="error">{error}</p>}
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <div className="links">
                <Link to="/settings">Settings</Link>
                <Link to="/matches">Back to Matches</Link>
            </div>
        </div>
    );
};

export default Profile;
