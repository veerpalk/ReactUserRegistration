import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import BabylonModel from './BabylonModel';
function Header() {
    return (
        <header className="header">
            <h1 className="logo">AD<span className="logo-highlight">sologist</span> </h1>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/all-users" className="nav-link">All Users</Link>
                <Link to="/register" className="nav-link">Register</Link>
            </nav>
        </header>

    );
}

export default Header;
