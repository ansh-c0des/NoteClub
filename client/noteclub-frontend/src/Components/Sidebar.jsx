import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Upload, Search, Library, Settings, LogOut, Sun, Moon } from 'lucide-react';
import './Sidebar.css';

function Sidebar({   isOpen,
                     toggleOpen,
                     isDarkMode,
                     toggleDarkMode,
                     handleLogout }) {
    const location = useLocation();

    const navItems = [
        { name: 'Profile',      path: '/dashboard',               icon: User },
        { name: 'Upload Notes', path: '/dashboard/upload-notes', icon: Upload },
        { name: 'Search Notes', path: '/dashboard/search-notes', icon: Search },
        { name: 'My Library',   path: '/dashboard/my-library',    icon: Library },
        { name: 'Settings',     path: '/dashboard/settings',      icon: Settings },
    ];

    return (
        <aside className={
            `sidebar-container ${isOpen ? '' : 'sidebar-closed'}`
        }
        >
            {/* optional “X” button in the sidebar header to close it */}
            <div className="sidebar-close">
                <button onClick={toggleOpen} aria-label="Close menu">×</button>
            </div>
            <div className="sidebar-header">
                <h1>NoteClub</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map(item => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={
                                    location.pathname === item.path
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                <item.icon className="nav-icon" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button
                    type="button"
                    className="sidebar-btn"
                    onClick={toggleDarkMode}
                >
                    {isDarkMode
                        ? <Sun className="nav-icon" />
                        : <Moon className="nav-icon" />
                    }
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                    type="button"
                    className="sidebar-btn logout"
                    onClick={handleLogout}
                >
                    <LogOut className="nav-icon" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
