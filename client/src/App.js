import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletContextProvider from './wallet/WalletContextProvider';
import HomePage from './pages/HomePage';

// Додаємо заглушки для сторінок, які будуть розроблені пізніше
const Dashboard = () => <div className="p-8">Dashboard Page (Coming Soon)</div>;
const Projects = () => <div className="p-8">Projects Page (Coming Soon)</div>;
const Profile = () => <div className="p-8">Profile Page (Coming Soon)</div>;

function App() {
    return (
        <WalletContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </WalletContextProvider>
    );
}

export default App;