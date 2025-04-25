import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';  // Change this from MarketplacePage.css to NotFoundPage.css

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-page">
            <div className="container">
                <div className="not-found-content">
                    <h1 className="error-code">404</h1>
                    <h2 className="error-message">Page Not Found</h2>
                    <p className="error-description">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/" className="btn btn-primary home-btn">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;