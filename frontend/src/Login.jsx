import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    return (
        <form>
            <h1 className="login-header">Fake Login Form</h1>
            <div className="form-container">
                <div className="username-container">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="username" />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="password"  />
                </div>
                <button type="submit" className="submit">Login</button>
            </div>

        </form>
    )
}

export default Login;