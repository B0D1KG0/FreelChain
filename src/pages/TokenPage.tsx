import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '../styles/TokenPage.css';

const TokenPage: React.FC = () => {
    const { connected } = useWallet();

    return (
        <div className="token-page">
            <div className="container">
                <section className="token-hero">
                    <h1 className="page-title">FRL Token</h1>
                    <p className="token-subtitle">
                        The native utility token powering the FreelChain ecosystem
                    </p>

                    {!connected && (
                        <div className="token-cta">
                            <p>Connect your wallet to interact with FRL tokens</p>
                            <WalletMultiButton className="btn wallet-btn" />
                        </div>
                    )}
                </section>

                <section className="token-metrics">
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <h3>100M</h3>
                            <p>Total Supply</p>
                        </div>
                        <div className="metric-card">
                            <h3>45M</h3>
                            <p>Circulating Supply</p>
                        </div>
                        <div className="metric-card">
                            <h3>$0.15</h3>
                            <p>Current Price</p>
                        </div>
                        <div className="metric-card">
                            <h3>$15M</h3>
                            <p>Market Cap</p>
                        </div>
                    </div>
                </section>

                <section className="token-utility">
                    <h2 className="section-title">Token Utility</h2>

                    <div className="utility-grid">
                        <div className="utility-card">
                            <div className="utility-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 9H9V15H15V9Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3>Transaction Fee Discounts</h3>
                            <p>Holding FRL tokens provides up to 50% discount on platform fees</p>
                        </div>

                        <div className="utility-card">
                            <div className="utility-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 8H5C3.93913 8 2.92172 8.42143 2.17157 9.17157C1.42143 9.92172 1 10.9391 1 12C1 13.0609 1.42143 14.0783 2.17157 14.8284C2.92172 15.5786 3.93913 16 5 16H6" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 12H18" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3>Governance Rights</h3>
                            <p>FRL holders can vote on platform upgrades and feature development</p>
                        </div>

                        <div className="utility-card">
                            <div className="utility-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 6H23V12" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3>Staking Rewards</h3>
                            <p>Earn up to 12% APY by staking your FRL tokens</p>
                        </div>

                        <div className="utility-card">
                            <div className="utility-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3>Premium Features</h3>
                            <p>Access to exclusive platform features and priority support</p>
                        </div>
                    </div>
                </section>

                <section className="token-distribution">
                    <h2 className="section-title">Token Distribution</h2>

                    <div className="distribution-chart">
                        <div className="chart-container">
                            {/* Placeholder for distribution chart - in a real app, use a chart library */}
                            <div className="chart-placeholder">
                                <div className="segment segment-1" title="Community: 40%">40%</div>
                                <div className="segment segment-2" title="Team & Advisors: 20%">20%</div>
                                <div className="segment segment-3" title="Development: 15%">15%</div>
                                <div className="segment segment-4" title="Marketing: 10%">10%</div>
                                <div className="segment segment-5" title="Reserve: 15%">15%</div>
                            </div>
                        </div>

                        <div className="distribution-legend">
                            <div className="legend-item">
                                <span className="color-box color-1"></span>
                                <span className="legend-text">Community (40%)</span>
                            </div>
                            <div className="legend-item">
                                <span className="color-box color-2"></span>
                                <span className="legend-text">Team & Advisors (20%)</span>
                            </div>
                            <div className="legend-item">
                                <span className="color-box color-3"></span>
                                <span className="legend-text">Development (15%)</span>
                            </div>
                            <div className="legend-item">
                                <span className="color-box color-4"></span>
                                <span className="legend-text">Marketing (10%)</span>
                            </div>
                            <div className="legend-item">
                                <span className="color-box color-5"></span>
                                <span className="legend-text">Reserve (15%)</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="token-roadmap">
                    <h2 className="section-title">Token Roadmap</h2>

                    <div className="roadmap-timeline">
                        <div className="roadmap-item">
                            <div className="roadmap-date">Q1 2025</div>
                            <div className="roadmap-content">
                                <h3>Token Launch</h3>
                                <p>Initial distribution and listing on decentralized exchanges</p>
                            </div>
                        </div>

                        <div className="roadmap-item">
                            <div className="roadmap-date">Q2 2025</div>
                            <div className="roadmap-content">
                                <h3>Staking Program</h3>
                                <p>Introduction of FRL staking with rewards program</p>
                            </div>
                        </div>

                        <div className="roadmap-item">
                            <div className="roadmap-date">Q3 2025</div>
                            <div className="roadmap-content">
                                <h3>Governance Launch</h3>
                                <p>Implementation of community governance system</p>
                            </div>
                        </div>

                        <div className="roadmap-item">
                            <div className="roadmap-date">Q4 2025</div>
                            <div className="roadmap-content">
                                <h3>Cross-Chain Bridge</h3>
                                <p>Support for FRL token on additional blockchain networks</p>
                            </div>
                        </div>
                    </div>
                </section>

                {connected && (
                    <section className="token-actions">
                        <h2 className="section-title">Token Operations</h2>

                        <div className="actions-grid">
                            <div className="action-card">
                                <h3>Buy FRL</h3>
                                <p>Purchase FRL tokens directly with SOL</p>
                                <button className="btn btn-primary">Buy Tokens</button>
                            </div>

                            <div className="action-card">
                                <h3>Stake FRL</h3>
                                <p>Stake your tokens and earn rewards</p>
                                <button className="btn btn-primary">Stake Tokens</button>
                            </div>

                            <div className="action-card">
                                <h3>Send FRL</h3>
                                <p>Transfer tokens to another wallet</p>
                                <button className="btn btn-primary">Send Tokens</button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default TokenPage;