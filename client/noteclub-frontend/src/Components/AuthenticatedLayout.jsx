import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import './AuthenticatedLayout.css';

function AuthenticatedLayout({ children, isDarkMode, toggleDarkMode }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.log('No token found, redirecting to login from AuthenticatedLayout');
            navigate('/');
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 < Date.now()) {
                console.log('Token expired');
                localStorage.removeItem('jwtToken');
                navigate('/');
            }
        } catch (err) {
            console.error('Token decode failed:', err);
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
    };

    return (
        <div className="auth-layout">
            <Sidebar
               isOpen={menuOpen}
               toggleOpen={() => setMenuOpen(o => !o)}
               isDarkMode={isDarkMode}
               toggleDarkMode={toggleDarkMode}
               handleLogout={handleLogout}
             />
            <div className={`content ${menuOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AuthenticatedLayout;
