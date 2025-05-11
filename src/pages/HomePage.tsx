import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '../styles/HomePage.css';
import '../styles/ButtonStyles.css'; // Добавьте этот импорт

const HomePage: React.FC = () => {
    const { connected } = useWallet();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Freelance Work <span className="gradient-text">Revolutionized</span>
                        </h1>
                        <p className="hero-subtitle">
                            Secure, transparent, and efficient freelance marketplace powered by Solana blockchain
                        </p>

                        <div className="hero-cta">
                            {connected ? (
                                <Link to="/marketplace" className="btn btn-modern-primary">
                                    <span className="btn-icon">🚀</span> Explore Marketplace
                                </Link>
                            ) : (
                                <WalletMultiButton className="btn btn-modern-connect" />
                            )}

                            <Link to="/tokens" className="btn btn-modern-secondary">
                                <span className="btn-icon">💎</span> FRL Token Info
                            </Link>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="image-container">
                            {/* Placeholder for hero image */}
                            <div className="placeholder-image">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Project Section - NEW */}
            <section className="about-project-section">
                <div className="container">
                    <h2 className="section-title">About FreelChain</h2>

                    <div className="about-project-content">
                        <div className="about-project-text">
                            <p className="about-paragraph">
                                FreelChain is a decentralized freelance marketplace built on the Solana blockchain,
                                designed to connect talented professionals with clients worldwide without intermediaries.
                            </p>

                            <p className="about-paragraph">
                                Our platform leverages blockchain technology to ensure secure payments, lower fees, and
                                transparent transactions. Smart contracts automatically enforce agreements between
                                freelancers and clients, eliminating payment disputes and delays.
                            </p>

                            <p className="about-paragraph highlight">
                                <strong>Mission:</strong> Empower freelancers and clients through decentralized technology,
                                creating a global ecosystem where talent meets opportunity without borders or gatekeepers.
                            </p>

                            <div className="about-stats">
                                <div className="about-stat">
                                    <h4 className="stat-number">10,000+</h4>
                                    <p className="stat-desc">Active Users</p>
                                </div>
                                <div className="about-stat">
                                    <h4 className="stat-number">5,000+</h4>
                                    <p className="stat-desc">Completed Projects</p>
                                </div>
                                <div className="about-stat">
                                    <h4 className="stat-number">95%</h4>
                                    <p className="stat-desc">Satisfaction Rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-project-image">
                            <div className="tech-stack">
                                <div className="tech-item">
                                    <span className="tech-icon">⚡</span>
                                    <span className="tech-name">Solana</span>
                                </div>
                                <div className="tech-item">
                                    <span className="tech-icon">📝</span>
                                    <span className="tech-name">Smart Contracts</span>
                                </div>
                                <div className="tech-item">
                                    <span className="tech-icon">🔒</span>
                                    <span className="tech-name">Blockchain</span>
                                </div>
                                <div className="tech-item">
                                    <span className="tech-icon">💸</span>
                                    <span className="tech-name">DeFi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose FreelChain</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 16V12" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8H12.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Secure Payments</h3>
                            <p className="feature-description">
                                Smart contracts ensure funds are only released when work is completed to satisfaction
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 7H7.01" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Low Fees</h3>
                            <p className="feature-description">
                                Save on transaction costs with Solana's high-performance blockchain
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21H21" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 21V7L13 3V21" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 21V12L13 8" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 9V9.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 12V12.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 15V15.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 18V18.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Global Marketplace</h3>
                            <p className="feature-description">
                                Connect with clients and freelancers from around the world with no intermediaries
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>

                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3 className="step-title">Connect Wallet</h3>
                            <p className="step-description">
                                Link your Solana wallet to access the FreelChain platform
                            </p>
                        </div>

                        <div className="step-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <h3 className="step-title">Post or Find Work</h3>
                            <p className="step-description">
                                Create a new project or browse available opportunities
                            </p>
                        </div>

                        <div className="step-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <h3 className="step-title">Secure Escrow</h3>
                            <p className="step-description">
                                Funds are held in smart contracts until work is approved
                            </p>
                        </div>

                        <div className="step-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className="step">
                            <div className="step-number">4</div>
                            <h3 className="step-title">Get Paid Instantly</h3>
                            <p className="step-description">
                                Receive payment directly to your wallet upon work completion
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Token Info Section */}
            <section className="token-info-section">
                <div className="container">
                    <div className="token-info-content">
                        <h2 className="token-title">FRL Token</h2>
                        <p className="token-description">
                            FreelChain's native token powers our ecosystem, providing benefits like reduced fees,
                            staking rewards, and governance rights
                        </p>

                        <Link to="/tokens" className="btn btn-modern-token">
                            <span className="btn-icon">💎</span> Explore Token Utility
                        </Link>
                    </div>

                    <div className="token-stats">
                        <div className="token-stat">
                            <h3 className="stat-value">100M</h3>
                            <p className="stat-label">Total Supply</p>
                        </div>

                        <div className="token-stat">
                            <h3 className="stat-value">5%</h3>
                            <p className="stat-label">Fee Discount</p>
                        </div>

                        <div className="token-stat">
                            <h3 className="stat-value">12%</h3>
                            <p className="stat-label">Staking APY</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-description">
                        Join thousands of freelancers and clients already using FreelChain
                    </p>

                    {connected ? (
                        <Link to="/marketplace" className="btn btn-modern-primary cta-btn">
                            <span className="btn-icon">🚀</span> Explore Marketplace
                        </Link>
                    ) : (
                        <WalletMultiButton className="btn btn-modern-connect cta-btn" />
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;