import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [message, setMessage] = useState(`Welcome back`)

    return <h1>{message}</h1>
}

export default Dashboard;