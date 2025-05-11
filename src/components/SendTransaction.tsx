import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createTransferInstruction,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import styles from '../styles/SendTransaction.module.css';

interface SendTransactionProps {
    tokenMintAddress?: string; // If provided, sends SPL token instead of SOL
}

const SendTransaction: React.FC<SendTransactionProps> = ({ tokenMintAddress }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [txMessage, setTxMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!publicKey) return;

        setIsLoading(true);
        setTxStatus('idle');
        setTxMessage('');

        try {
            // Validate recipient address
            let recipientPubkey: PublicKey;
            try {
                recipientPubkey = new PublicKey(recipient);
            } catch (error) {
                throw new Error('Invalid recipient address');
            }

            // Validate amount
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                throw new Error('Invalid amount');
            }

            // Create transaction
            let transaction = new Transaction();

            if (tokenMintAddress) {
                // Send SPL token
                const mintPubkey = new PublicKey(tokenMintAddress);
                const senderTokenAccount = await getAssociatedTokenAddress(
                    mintPubkey,
                    publicKey
                );

                // Get or create recipient token account
                const recipientTokenAccount = await getAssociatedTokenAddress(
                    mintPubkey,
                    recipientPubkey
                );

                // Check if recipient token account exists
                const recipientTokenAccountInfo = await connection.getAccountInfo(recipientTokenAccount);

                // If recipient token account doesn't exist, create it
                if (!recipientTokenAccountInfo) {
                    transaction.add(
                        createAssociatedTokenAccountInstruction(
                            publicKey,
                            recipientTokenAccount,
                            recipientPubkey,
                            mintPubkey
                        )
                    );
                }

                // Add token transfer instruction
                // For SPL tokens, amount is in raw units (adjusted for decimals)
                const tokenDecimals = 9; // Assuming 9 decimals for the token
                const rawAmount = Math.floor(parsedAmount * Math.pow(10, tokenDecimals));

                transaction.add(
                    createTransferInstruction(
                        senderTokenAccount,
                        recipientTokenAccount,
                        publicKey,
                        BigInt(rawAmount)
                    )
                );
            } else {
                // Send SOL
                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: publicKey,
                        toPubkey: recipientPubkey,
                        lamports: parsedAmount * LAMPORTS_PER_SOL
                    })
                );
            }

            // Send transaction
            const signature = await sendTransaction(transaction, connection);

            // Wait for confirmation
            const confirmation = await connection.confirmTransaction(signature, 'confirmed');

            if (confirmation.value.err) {
                throw new Error('Transaction failed');
            }

            setTxStatus('success');
            setTxMessage(`Transaction successful! Signature: ${signature}`);
            setAmount('');
            setRecipient('');

        } catch (error) {
            console.error('Transaction error:', error);
            setTxStatus('error');
            setTxMessage(error instanceof Error ? error.message : 'Transaction failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (!publicKey) {
        return (
            <div className={styles.sendTransactionCard}>
                <p className={styles.connectPrompt}>Connect your wallet to send transactions</p>
            </div>
        );
    }

    return (
        <div className={styles.sendTransactionCard}>
            <h3 className={styles.title}>
                Send {tokenMintAddress ? 'Token' : 'SOL'}
            </h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="recipient" className={styles.label}>Recipient Address</label>
                    <input
                        id="recipient"
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter recipient wallet address"
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="amount" className={styles.label}>Amount</label>
                    <div className={styles.amountInputWrapper}>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.000001"
                            className={styles.input}
                            required
                        />
                        <span className={styles.currency}>{tokenMintAddress ? 'FRL' : 'SOL'}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Send'}
                </button>
            </form>

            {txStatus !== 'idle' && (
                <div className={`${styles.txStatus} ${styles[txStatus]}`}>
                    <p className={styles.txMessage}>{txMessage}</p>
                    {txStatus === 'success' && (
                        <a
                            href={`https://explorer.solana.com/tx/${txMessage.split(': ')[1]}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.explorerLink}
                        >
                            View on Explorer
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default SendTransaction;