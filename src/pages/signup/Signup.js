import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom'

import React from 'react'

function Signup() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ displayName, setDisplayName ] = useState('');
    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
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
                <label>
                    <p>Display Name</p>
                    <input
                        required
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>
                {!isPending && <button type="submit">Signup</button>}
                {isPending && <button disabled>Loading...</button>}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
    }

export default Signup
