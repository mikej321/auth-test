import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/auth/register', {
                username,
                password
            });
            // If registration is successful, redirect to login
            navigate('/login');
        } catch(err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="login-header">Registration</h1>
            <div className="form-container">
                <div className="username-container">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        className="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <div className="password-container">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        className="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit" className="submit">Register</button>
                <p className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default Registration;
