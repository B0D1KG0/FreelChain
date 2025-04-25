import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>FreelChain</h3>
                        <p>Revolutionizing freelance work with blockchain technology</p>
                    </div>

                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/tokens">About FRL Token</Link></li>
                            <li><a href="https://solana.com" target="_blank" rel="noopener noreferrer">Solana</a></li>
                            <li><a href="https://phantom.app" target="_blank" rel="noopener noreferrer">Phantom Wallet</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>About</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/marketplace">Marketplace</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 FreelChain. All rights reserved. | IT Marathon Project</p>
                    <p>User: {process.env.REACT_APP_USERNAME || 'B0D1KG0'} | {new Date().toISOString().slice(0, 10)}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;