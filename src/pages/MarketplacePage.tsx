import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import '../styles/MarketplacePage.css';

interface Job {
    id: string;
    title: string;
    description: string;
    budget: number;
    deadline: Date;
    skills: string[];
    client: string;
    location: string;
}

const MarketplacePage: React.FC = () => {
    const { connected } = useWallet();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        'all',
        'web development',
        'mobile apps',
        'design',
        'writing',
        'marketing',
        'blockchain'
    ];

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setJobs([
                {
                    id: '1',
                    title: 'Website Development for E-commerce Store',
                    description: 'Need a full-stack developer to create a responsive e-commerce website with payment integration and user authentication.',
                    budget: 1200,
                    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    skills: ['react', 'node.js', 'mongodb', 'stripe'],
                    client: 'TechShop Inc.',
                    location: 'Remote'
                },
                {
                    id: '2',
                    title: 'Mobile App UI Design',
                    description: 'Looking for a UI/UX designer to create modern and intuitive designs for our fitness tracking mobile application.',
                    budget: 800,
                    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                    skills: ['figma', 'ui/ux', 'mobile design', 'adobe xd'],
                    client: 'FitTrack',
                    location: 'Remote'
                },
                {
                    id: '3',
                    title: 'Smart Contract Development for NFT Marketplace',
                    description: 'We need an experienced Solana developer to create smart contracts for our upcoming NFT marketplace platform.',
                    budget: 2500,
                    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                    skills: ['solana', 'rust', 'blockchain', 'smart contracts'],
                    client: 'NFT Launch',
                    location: 'Remote'
                },
                {
                    id: '4',
                    title: 'Content Writing for Technology Blog',
                    description: 'Seeking a skilled content writer with knowledge of blockchain technology to create engaging blog posts.',
                    budget: 400,
                    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                    skills: ['content writing', 'seo', 'blockchain knowledge'],
                    client: 'Tech Insights',
                    location: 'Remote'
                },
                {
                    id: '5',
                    title: 'Social Media Marketing Campaign',
                    description: 'Need a social media expert to design and implement a marketing campaign for our crypto trading platform launch.',
                    budget: 1000,
                    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
                    skills: ['social media', 'marketing', 'crypto knowledge'],
                    client: 'CryptoTrade',
                    location: 'Remote'
                }
            ]);
            setIsLoading(false);
        }, 1500);
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory =
            selectedCategory === 'all' ||
            job.skills.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="marketplace-page">
            <div className="container">
                <section className="marketplace-header">
                    <h1 className="page-title">Freelance Marketplace</h1>
                    <p className="marketplace-subtitle">
                        Find or post freelance projects powered by secure blockchain payments
                    </p>

                    <div className="search-controls">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search for projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>

                        <div className="post-job-btn">
                            <button className="btn btn-primary">
                                {connected ? 'Post a Job' : 'Connect Wallet to Post'}
                            </button>
                        </div>
                    </div>

                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="jobs-list">
                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loader"></div>
                            <p>Loading available jobs...</p>
                        </div>
                    ) : filteredJobs.length > 0 ? (
                        <div className="jobs-grid">
                            {filteredJobs.map(job => (
                                <div key={job.id} className="job-card">
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="job-description">{job.description}</p>

                                    <div className="job-meta">
                                        <div className="meta-item">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>{Math.ceil((job.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left</span>
                                        </div>

                                        <div className="meta-item">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>{job.budget} FRL</span>
                                        </div>

                                        <div className="meta-item">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>{job.location}</span>
                                        </div>
                                    </div>

                                    <div className="job-skills">
                                        {job.skills.map(skill => (
                                            <span key={skill} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>

                                    <div className="job-footer">
                                        <div className="client-info">
                                            <span className="client-label">Client:</span>
                                            <span className="client-name">{job.client}</span>
                                        </div>

                                        <button className="btn btn-primary apply-btn">
                                            {connected ? 'Apply Now' : 'Connect Wallet'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No jobs match your search criteria.</p>
                            <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;