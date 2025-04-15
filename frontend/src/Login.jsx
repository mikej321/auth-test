import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch(err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="login-header">Fake Login Form</h1>
            <div className="form-container">
                <div className="username-container">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>
                <button type="submit" className="submit">Login</button>
            </div>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Login;