import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import styles from '../styles/TokenBalance.module.css';

interface TokenBalanceProps {
    tokenMintAddress?: string; // Optional: If specified, shows balance for this SPL token
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ tokenMintAddress }) => {
    const { connection } = useConnection();
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!publicKey || !connected) {
                setBalance(null);
                return;
            }

            setIsLoading(true);

            try {
                if (tokenMintAddress) {
                    // Fetch SPL token balance
                    const tokenMint = new PublicKey(tokenMintAddress);
                    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                        publicKey,
                        { programId: TOKEN_PROGRAM_ID }
                    );

                    const accountInfo = tokenAccounts.value.find(
                        (account) => account.account.data.parsed.info.mint.toString() === tokenMint.toString()
                    );

                    if (accountInfo) {
                        const tokenBalance = Number(accountInfo.account.data.parsed.info.tokenAmount.amount) /
                            (10 ** accountInfo.account.data.parsed.info.tokenAmount.decimals);
                        setBalance(tokenBalance);
                    } else {
                        setBalance(0);
                    }
                } else {
                    // Fetch SOL balance
                    const solBalance = await connection.getBalance(publicKey);
                    setBalance(solBalance / LAMPORTS_PER_SOL);
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
                setBalance(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBalance();

        // Set up listener for balance changes
        const intervalId = setInterval(fetchBalance, 30000); // Update every 30 seconds

        return () => clearInterval(intervalId);
    }, [connection, publicKey, connected, tokenMintAddress]);

    if (!connected) {
        return (
            <div className={styles.balanceCard}>
                <p className={styles.connectPrompt}>Connect your wallet to view balance</p>
            </div>
        );
    }

    return (
        <div className={styles.balanceCard}>
            <h3 className={styles.balanceTitle}>
                {tokenMintAddress ? 'Token Balance' : 'SOL Balance'}
            </h3>

            {isLoading ? (
                <div className={styles.loadingSpinner}></div>
            ) : (
                <div className={styles.balanceValue}>
                    {balance !== null ? (
                        <>
                            <span className={styles.amount}>{balance.toLocaleString()}</span>
                            <span className={styles.symbol}>{tokenMintAddress ? 'FRL' : 'SOL'}</span>
                        </>
                    ) : (
                        <span className={styles.error}>Failed to load balance</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default TokenBalance;