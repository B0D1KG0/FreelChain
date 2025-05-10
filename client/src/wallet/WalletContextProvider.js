import React, { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolongWalletAdapter,
    TorusWalletAdapter,
    LedgerWalletAdapter,
    SlopeWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Обов'язково імпортувати стилі
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletContextProvider = ({ children }) => {
    // Вибір мережі (mainnet, testnet, devnet)
    const network = WalletAdapterNetwork.Devnet;

    // RPC-URL
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Підключаємо всі можливі гаманці
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new SolongWalletAdapter(),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SlopeWalletAdapter()
    ], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;