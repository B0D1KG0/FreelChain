import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletConnect from './WalletConnect';
import '../styles/Header.css';

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { connected } = useWallet();
    const location = useLocation();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <span className="logo-text">FreelChain</span>
                </Link>

                <div className={`nav-container ${mobileMenuOpen ? 'active' : ''}`}>
                    <nav className="nav">
                        <ul className="nav-links">
                            <li>
                                <Link
                                    to="/"
                                    className={location.pathname === '/' ? 'active' : ''}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            {connected && (
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className={location.pathname === '/dashboard' ? 'active' : ''}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    to="/marketplace"
                                    className={location.pathname === '/marketplace' ? 'active' : ''}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/tokens"
                                    className={location.pathname === '/tokens' ? 'active' : ''}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    FRL Token
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="header-right">
                    <WalletConnect />
                    <button
                        className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;