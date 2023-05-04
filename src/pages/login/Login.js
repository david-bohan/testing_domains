import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom'

import React from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isPending, error } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>User Email</p>
                    <input
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label> 
                <label>
                    <p>Password</p>
                    <input
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!isPending && <button type="submit">Login</button>}
                {isPending && <button disabled>Loading...</button>}
                {error && <p>{error}</p>}
            </form>     
        </div>
    )
    }

export default Login
