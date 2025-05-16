<?php

// Database configuration
$db_config = [
    'host' => 'localhost',      // Database host
    'dbname' => 'b130127_freelchain', // Database name
    'username' => 'b130127_freelcha',  // Database username
    'password' => 'j3gpc4yGAz$itOXk',           // Database password (set this securely)
    'charset' => 'utf8mb4',     // Character set
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];

// Solana blockchain configuration
$solana_config = [
    'mainnet' => 'https://api.mainnet-beta.solana.com',
    'testnet' => 'https://api.testnet.solana.com',
    'devnet' => 'https://api.devnet.solana.com',
    'current_network' => 'devnet', // For development, use devnet
    'escrow_program_id' => '', // Your deployed escrow program ID
    'platform_fee_percentage' => 5, // 5% platform fee
    'platform_wallet' => '', // Platform wallet for collecting fees
];

// Application configuration
$app_config = [
    'app_name' => 'ChainWork',
    'app_url' => 'https://chainwork.example.com',
    'app_version' => '1.0.0',
    'debug_mode' => true, // Set to false in production
    'session_lifetime' => 86400, // 24 hours in seconds
    'timezone' => 'UTC',
];

// Establish database connection
try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $db = new PDO($dsn, $db_config['username'], $db_config['password'], $db_config['options']);
} catch (PDOException $e) {
    // In debug mode, show error details
    if ($app_config['debug_mode']) {
        die("Connection failed: " . $e->getMessage());
    } else {
        // In production, show a user-friendly message
        die("Sorry, the system is currently unavailable. Please try again later.");
    }
}

// Set timezone
date_default_timezone_set($app_config['timezone']);

/**
 * Helper function to get Solana connection
 *
 * @param string $network The network to connect to (mainnet, testnet, devnet)
 * @return Attestto\SolanaPhpSdk\Connection
 */
function getSolanaConnection($network = null) {
    global $solana_config;

    if ($network === null) {
        $network = $solana_config['current_network'];
    }

    if (!isset($solana_config[$network])) {
        throw new Exception("Invalid Solana network specified");
    }

    try {
        return new Attestto\SolanaPhpSdk\Connection($solana_config[$network]);
    } catch (Exception $e) {
        if ($GLOBALS['app_config']['debug_mode']) {
            throw $e;
        } else {
            // Log the error and return null or a default connection
            error_log("Solana connection error: " . $e->getMessage());
            return null;
        }
    }
}

/**
 * Helper function to log blockchain transactions
 *
 * @param string $type Transaction type
 * @param array $data Transaction data
 * @return bool Success status
 */
function logBlockchainTransaction($type, array $data) {
    global $db;

    try {
        $stmt = $db->prepare("
            INSERT INTO blockchain_logs (transaction_type, transaction_data, created_at, user_id)
            VALUES (:type, :data, :created_at, :user_id)
        ");

        return $stmt->execute([
            'type' => $type,
            'data' => json_encode($data),
            'created_at' => date('Y-m-d H:i:s'),
            'user_id' => $_SESSION['user_id'] ?? null
        ]);
    } catch (PDOException $e) {
        error_log("Failed to log blockchain transaction: " . $e->getMessage());
        return false;
    }
}

// Security measures
// Prevent direct access to this file
if (count(get_included_files()) <= 1) {
    die("Direct access to this file is not allowed.");
}

/**
 * Get configuration value
 *
 * @param string $section Config section (db_config, solana_config, app_config)
 * @param string $key Configuration key
 * @param mixed $default Default value if key not found
 * @return mixed Configuration value
 */
function getConfig($section, $key, $default = null) {
    global ${$section};

    if (isset(${$section}[$key])) {
        return ${$section}[$key];
    }

    return $default;
}
?>