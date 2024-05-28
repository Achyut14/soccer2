import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css'; // Import the CSS file

const Settings = ({ setIsAuthenticated }) => {
    const [user, setUser] = useState({ username: '', email: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            {error && <p className="error">{error}</p>}
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Settings;
