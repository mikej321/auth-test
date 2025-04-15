import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/');

        axios.get('http://localhost:3000/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setMessage(`Hello there, ${res.data.username}`))
        .catch(() => navigate('/'))
    }, [navigate])

    return <h1>{message}</h1>
}

export default Dashboard;