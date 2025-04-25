import React, { useState } from 'react';
import './styles/App.css';
// Import logo image
// Alternatively, you can use a URL if needed
import logo from './assets/freelchain-logo.jpg'; // Create this file in src/assets folder

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const username = "B0D1KG0";
  const currentDate = "2025-04-25 12:59:51";

  // Mock function to simulate wallet connection
  const connectWallet = () => {
    setIsWalletConnected(true);
  };

  // Mock function to simulate wallet disconnection
  const disconnectWallet = () => {
    setIsWalletConnected(false);
  };

  return (
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="logo">
              <img src={logo} alt="FreelChain Logo" className="logo-image" />
              <span className="logo-text">FreelChain</span>
            </div>
            <div className="header-right">
              {isWalletConnected ? (
                  <div className="wallet-connect">
                    <div className="wallet-info">
                      <div className="wallet-address">
                    <span className="address-text">
                      8xzt...j29P
                    </span>
                        <span className="connection-indicator"></span>
                      </div>
                    </div>
                    <button
                        className="wallet-button"
                        onClick={disconnectWallet}
                    >
                      Disconnect
                    </button>
                  </div>
              ) : (
                  <button
                      className="wallet-button"
                      onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
              )}
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <section className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">
                  Freelance Work <span className="gradient-text">Revolutionized</span>
                </h1>
                <p className="hero-subtitle">
                  Secure, transparent, and efficient freelance marketplace powered by Solana blockchain
                </p>

                <div className="hero-cta">
                  <button className="btn btn-primary">
                    Explore Marketplace
                  </button>

                  <button className="btn btn-secondary">
                    Learn About FRL Token
                  </button>
                </div>
              </div>

              <div className="hero-image">
                <div className="blockchain-illustration">
                  <div className="blockchain-node node1"></div>
                  <div className="blockchain-node node2"></div>
                  <div className="blockchain-node node3"></div>
                  <div className="blockchain-node node4"></div>
                  <div className="blockchain-link link1"></div>
                  <div className="blockchain-link link2"></div>
                  <div className="blockchain-link link3"></div>
                </div>
              </div>
            </section>

            <section className="features-section">
              <h2 className="section-title">Why Choose FreelChain</h2>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🔒</div>
                  <h3 className="feature-title">Secure Payments</h3>
                  <p className="feature-description">
                    Smart contracts ensure funds are only released when work is completed to satisfaction
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">💰</div>
                  <h3 className="feature-title">Low Fees</h3>
                  <p className="feature-description">
                    Save on transaction costs with Solana's high-performance blockchain
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">🌎</div>
                  <h3 className="feature-title">Global Marketplace</h3>
                  <p className="feature-description">
                    Connect with clients and freelancers from around the world with no intermediaries
                  </p>
                </div>
              </div>
            </section>

            <section className="token-info-section">
              <div className="token-info-content">
                <h2 className="token-title">FRL Token</h2>
                <p className="token-description">
                  FreelChain's native token powers our ecosystem, providing benefits like reduced fees,
                  staking rewards, and governance rights
                </p>

                <button className="btn btn-primary token-btn">
                  Explore Token Utility
                </button>
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
            </section>

            <section className="how-it-works-section">
              <h2 className="section-title">How It Works</h2>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">1</div>
                  <h3 className="step-title">Connect Wallet</h3>
                  <p className="step-description">
                    Link your Solana wallet to access the FreelChain platform
                  </p>
                </div>

                <div className="step-arrow">→</div>

                <div className="step">
                  <div className="step-number">2</div>
                  <h3 className="step-title">Post or Find Work</h3>
                  <p className="step-description">
                    Create a new project or browse available opportunities
                  </p>
                </div>

                <div className="step-arrow">→</div>

                <div className="step">
                  <div className="step-number">3</div>
                  <h3 className="step-title">Secure Escrow</h3>
                  <p className="step-description">
                    Funds are held in smart contracts until work is approved
                  </p>
                </div>

                <div className="step-arrow">→</div>

                <div className="step">
                  <div className="step-number">4</div>
                  <h3 className="step-title">Get Paid Instantly</h3>
                  <p className="step-description">
                    Receive payment directly to your wallet upon work completion
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-bottom">
              <p>© 2025 FreelChain. All rights reserved. | IT Marathon Project</p>
              <p>User: {username} | {currentDate}</p>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;