// src/Components/NavBar.jsx
import React from "react";
import { MenuRounded } from "@mui/icons-material";
import "./NavBar.css";

export default function NavBar({ menuOpen, setMenuOpen }) {
    return (
        <header className="navbar">
            <button
                className="navbar-toggle"
                onClick={() => setMenuOpen(open => !open)}
                aria-label={menuOpen ? "Close sidebar" : "Open sidebar"}
            >
                <MenuRounded />
            </button>
            {/* You can add a title/logo here if you want */}
        </header>
    );
}
