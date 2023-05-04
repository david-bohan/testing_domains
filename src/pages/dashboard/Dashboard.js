import React from 'react'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom'

function Dashboard() {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();
    return (
        <div>
            {!isPending && <button onClick={logout}>Logout</button>}
            {isPending && <button disabled>Logging out...</button>}
            <Link to="/create">Create Page</Link>
        </div>
    )
    }

export default Dashboard
