<?php
// Initialize session
session_start();

// Database connection
require_once 'config/database.php';

// Include Solana PHP SDK
require_once 'vendor/autoload.php';
use Attestto\SolanaPhpSdk\Connection;

// Check Solana connection
$solanaConnected = false;
try {
    $connection = new Connection('https://api.mainnet-beta.solana.com');
    $solanaConnected = true;
} catch (Exception $e) {
    $solanaError = $e->getMessage();
}

// Get latest projects
$latestProjects = [];
try {
    $stmt = $db->prepare("SELECT p.*, u.username as client_name 
                         FROM projects p 
                         JOIN users u ON p.client_id = u.id 
                         WHERE p.status = 'open' 
                         ORDER BY p.created_at DESC 
                         LIMIT 6");
    $stmt->execute();
    $latestProjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Handle error
}

// Get platform statistics
$stats = [
    'users' => 0,
    'projects' => 0,
    'completed' => 0,
    'value' => 0
];

try {
    // Count users
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM users");
    $stmt->execute();
    $stats['users'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Count projects
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM projects");
    $stmt->execute();
    $stats['projects'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Count completed projects
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM projects WHERE status = 'completed'");
    $stmt->execute();
    $stats['completed'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Total transaction value
    $stmt = $db->prepare("SELECT SUM(amount) as total FROM transactions");
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats['value'] = $result['total'] ?? 0;
} catch (PDOException $e) {
    // Handle error
}

// Current date for footer
$currentDate = date('Y');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChainWork - Blockchain Freelance Platform</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<!-- Header -->
<header>
    <div class="container header-container">
        <a href="index.php" class="logo">
            <img src="assets/images/logo.png" alt="ChainWork Logo">
            <span>ChainWork</span>
        </a>

        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="projects.php">Projects</a></li>
                <li><a href="freelancers.php">Freelancers</a></li>
                <li><a href="how-it-works.php">How It Works</a></li>
            </ul>
        </nav>

        <div class="auth-buttons">
            <?php if(isset($_SESSION['user_id'])): ?>
                <a href="dashboard.php" class="btn btn-dashboard">Dashboard</a>
                <a href="logout.php" class="btn btn-logout">Logout</a>
            <?php else: ?>
                <a href="login.php" class="btn btn-login">Login</a>
                <a href="register.php" class="btn btn-signup">Sign Up</a>
            <?php endif; ?>
            <a href="wallet-connect.php" class="btn btn-wallet">
                <i class="fas fa-wallet"></i> Connect Wallet
            </a>
        </div>
    </div>
</header>

<!-- Hero Section -->
<section class="hero">
    <div class="container hero-content">
        <h1>Blockchain-Powered Freelance Marketplace</h1>
        <p>Secure, transparent, and efficient. Connect with top talent or find projects backed by Solana blockchain technology.</p>
        <div class="hero-buttons">
            <a href="post-project.php" class="btn btn-primary">Post a Project</a>
            <a href="find-work.php" class="btn btn-secondary">Find Work</a>
        </div>

        <div class="blockchain-status">
            <span class="status-indicator <?php echo $solanaConnected ? 'connected' : 'disconnected'; ?>"></span>
            <?php echo $solanaConnected ? 'Blockchain Connected' : 'Blockchain Status: Connecting...'; ?>
        </div>
    </div>
</section>

<!-- Statistics Section -->
<section class="stats">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-number"><?php echo number_format($stats['users']); ?></div>
                <div class="stat-title">Total Users</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="stat-number"><?php echo number_format($stats['projects']); ?></div>
                <div class="stat-title">Active Projects</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-number"><?php echo number_format($stats['completed']); ?></div>
                <div class="stat-title">Completed Projects</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-coins"></i>
                </div>
                <div class="stat-number">$<?php echo number_format($stats['value']); ?></div>
                <div class="stat-title">Total Value</div>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="features">
    <div class="container">
        <div class="section-title">
            <h2>Why Choose ChainWork</h2>
            <p>Our platform combines the best of freelancing with blockchain security</p>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h3>Secure Escrow</h3>
                <p>Funds are securely held in smart contracts until work is completed and approved</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Fast Payments</h3>
                <p>Receive payments instantly with Solana's high-speed blockchain technology</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-hand-holding-usd"></i>
                </div>
                <h3>Low Fees</h3>
                <p>Pay less with our blockchain-based payment system compared to traditional platforms</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-file-contract"></i>
                </div>
                <h3>Smart Contracts</h3>
                <p>Automated agreements ensure both parties fulfill their obligations</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-globe"></i>
                </div>
                <h3>Global Access</h3>
                <p>Work with clients and freelancers from anywhere in the world</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-user-shield"></i>
                </div>
                <h3>Reputation System</h3>
                <p>Verified on-chain reviews and ratings that cannot be manipulated</p>
            </div>
        </div>
    </div>
</section>

<!-- Latest Projects -->
<section class="projects">
    <div class="container">
        <div class="section-title">
            <h2>Latest Projects</h2>
            <p>Browse our most recent opportunities</p>
        </div>

        <div class="projects-grid">
            <?php if(count($latestProjects) > 0): ?>
                <?php foreach($latestProjects as $project): ?>
                    <div class="project-card">
                        <div class="project-content">
                            <h3><?php echo htmlspecialchars($project['title']); ?></h3>
                            <p class="project-excerpt"><?php echo substr(htmlspecialchars($project['description']), 0, 100) . '...'; ?></p>
                            <div class="project-meta">
                                    <span class="project-budget">
                                        <i class="fas fa-coins"></i> $<?php echo htmlspecialchars($project['budget']); ?>
                                    </span>
                                <span class="project-client">
                                        <i class="fas fa-user"></i> <?php echo htmlspecialchars($project['client_name']); ?>
                                    </span>
                            </div>
                            <a href="project.php?id=<?php echo $project['id']; ?>" class="btn btn-view">View Details</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="no-projects">
                    <p>No projects available at the moment.</p>
                </div>
            <?php endif; ?>
        </div>

        <div class="view-all-container">
            <a href="projects.php" class="btn btn-view-all">View All Projects</a>
        </div>
    </div>
</section>

<!-- How It Works -->
<section class="how-it-works">
    <div class="container">
        <div class="section-title">
            <h2>How It Works</h2>
            <p>Simple steps to get started on our blockchain-powered platform</p>
        </div>

        <div class="steps-container">
            <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                    <h3>Create an Account</h3>
                    <p>Sign up and connect your Solana wallet to our platform</p>
                </div>
            </div>

            <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                    <h3>Post or Find Projects</h3>
                    <p>Create a new project or browse available opportunities</p>
                </div>
            </div>

            <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <h3>Secure Payment</h3>
                    <p>Funds are secured in escrow until work is completed</p>
                </div>
            </div>

            <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                    <h3>Complete Work</h3>
                    <p>Collaborate and deliver quality work on time</p>
                </div>
            </div>

            <div class="step">
                <div class="step-number">5</div>
                <div class="step-content">
                    <h3>Get Paid</h3>
                    <p>Receive instant payment once work is approved</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="cta">
    <div class="container">
        <div class="cta-content">
            <h2>Ready to Start?</h2>
            <p>Join thousands of freelancers and clients already using our blockchain-powered platform</p>
            <div class="cta-buttons">
                <a href="register.php" class="btn btn-cta-primary">Create an Account</a>
                <a href="how-it-works.php" class="btn btn-cta-secondary">Learn More</a>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <a href="index.php" class="footer-logo">
                    <img src="assets/images/logo.png" alt="ChainWork Logo">
                    <span>ChainWork</span>
                </a>
                <p>The next generation blockchain-powered freelance platform. Secure, transparent, and efficient.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                    <a href="#"><i class="fab fa-discord"></i></a>
                </div>
            </div>

            <div class="footer-col">
                <h3>For Clients</h3>
                <ul>
                    <li><a href="#">Post a Project</a></li>
                    <li><a href="#">Find Freelancers</a></li>
                    <li><a href="#">Payment Methods</a></li>
                    <li><a href="#">Client FAQs</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>For Freelancers</h3>
                <ul>
                    <li><a href="#">Find Work</a></li>
                    <li><a href="#">Create Profile</a></li>
                    <li><a href="#">Getting Paid</a></li>
                    <li><a href="#">Freelancer FAQs</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Resources</h3>
                <ul>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">API</a></li>
                    <li><a href="#">Blockchain Explorer</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Legal</h3>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?php echo $currentDate; ?> ChainWork. All rights reserved.</p>
            <p>Current blockchain status:
                <span class="blockchain-status-indicator <?php echo $solanaConnected ? 'online' : 'offline'; ?>"></span>
                <?php echo $solanaConnected ? 'Connected' : 'Connecting...'; ?>
            </p>
        </div>
    </div>
</footer>

<script src="assets/js/main.js"></script>
</body>
</html>