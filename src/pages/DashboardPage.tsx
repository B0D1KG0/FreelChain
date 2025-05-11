import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import '../styles/DashboardPage.css';

// Token balance component
const TokenBalance: React.FC<{ isSol?: boolean }> = ({ isSol = true }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBalance = async () => {
            if (!publicKey) return;

            try {
                setIsLoading(true);
                if (isSol) {
                    const bal = await connection.getBalance(publicKey);
                    setBalance(bal / LAMPORTS_PER_SOL);
                } else {
                    // Mock FRL token balance - in a real app, get SPL token balance
                    setBalance(1250);
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
                setBalance(null);
            } finally {
                setIsLoading(false);
            }
        };

        getBalance();

        // Update every 20 seconds
        const intervalId = setInterval(getBalance, 20000);
        return () => clearInterval(intervalId);
    }, [connection, publicKey, isSol]);

    return (
        <div className="balance-card">
            <div className="balance-header">
                <h3>{isSol ? 'SOL Balance' : 'FRL Balance'}</h3>
                {isLoading && <div className="loader"></div>}
            </div>

            <div className="balance-amount">
                {balance !== null ? (
                    <>
                        <span className="amount">{balance.toLocaleString()}</span>
                        <span className="currency">{isSol ? 'SOL' : 'FRL'}</span>
                    </>
                ) : (
                    <span className="error">Failed to load</span>
                )}
            </div>

            <button className="btn btn-secondary full-width">
                {isSol ? 'Send SOL' : 'Send FRL'}
            </button>
        </div>
    );
};

// Project card component
interface Project {
    id: string;
    title: string;
    description: string;
    price: number;
    deadline: Date;
    status: 'open' | 'in-progress' | 'completed';
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className={`status-badge ${project.status}`}>
                    {project.status}
                </div>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-details">
                <div className="detail">
                    <span className="label">Price:</span>
                    <span className="value">{project.price} FRL</span>
                </div>

                <div className="detail">
                    <span className="label">Deadline:</span>
                    <span className="value">{project.deadline.toLocaleDateString()}</span>
                </div>
            </div>

            <div className="card-actions">
                <button className="btn btn-primary">View Details</button>
            </div>
        </div>
    );
};

// Main Dashboard component
const DashboardPage: React.FC = () => {
    const { connected } = useWallet();
    const navigate = useNavigate();
    const [activeProjects, setActiveProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!connected) {
            navigate('/');
            return;
        }

        // Mock data fetch
        setTimeout(() => {
            setActiveProjects([
                {
                    id: '1',
                    title: 'Web Development Project',
                    description: 'Create a responsive website for a small business',
                    price: 500,
                    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    status: 'in-progress'
                },
                {
                    id: '2',
                    title: 'Logo Design',
                    description: 'Design a modern logo for a tech startup',
                    price: 200,
                    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    status: 'open'
                },
                {
                    id: '3',
                    title: 'Mobile App Development',
                    description: 'Build a fitness tracking app for iOS and Android',
                    price: 1500,
                    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                    status: 'in-progress'
                }
            ]);
            setIsLoading(false);
        }, 1000);
    }, [connected, navigate]);

    if (!connected) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="dashboard-page">
            <div className="container">
                <h1 className="page-title">Dashboard</h1>

                <section className="balances-section">
                    <div className="balance-cards">
                        <TokenBalance isSol={true} />
                        <TokenBalance isSol={false} />
                    </div>
                </section>

                <section className="projects-section">
                    <div className="section-header">
                        <h2>Your Projects</h2>
                        <button className="btn btn-primary">Create New Project</button>
                    </div>

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loader"></div>
                            <p>Loading your projects...</p>
                        </div>
                    ) : activeProjects.length > 0 ? (
                        <div className="projects-grid">
                            {activeProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>You don't have any active projects.</p>
                            <button className="btn btn-primary">Create Your First Project</button>
                        </div>
                    )}
                </section>

                <section className="activity-section">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">💰</div>
                            <div className="activity-details">
                                <p className="activity-text">You received 200 FRL for completing "Logo Design"</p>
                                <p className="activity-time">2 days ago</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">📝</div>
                            <div className="activity-details">
                                <p className="activity-text">You submitted a proposal for "Mobile App Development"</p>
                                <p className="activity-time">5 days ago</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">🚀</div>
                            <div className="activity-details">
                                <p className="activity-text">You started work on "Web Development Project"</p>
                                <p className="activity-time">1 week ago</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;