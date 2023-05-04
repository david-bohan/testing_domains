import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import Website from './pages/website/Website';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route exact="true" path="/" element={user ? (<Dashboard />) : (<Navigate replace to="/login" />)}/>
            <Route path="/create" element={user ? (<Create />) : (<Navigate replace to="/login" />)} />
            <Route path="/websites/:id" element={<Website />} />
            <Route path="/login" element={!user ? (<Login />) : (<Navigate replace to="/" />)} />
            <Route path="/signup" element={!user ? (<Signup />) : (<Navigate replace to="/" />)} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
