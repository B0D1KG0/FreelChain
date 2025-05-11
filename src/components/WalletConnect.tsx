import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '../styles/WalletConnect.css';

const WalletConnect: React.FC = () => {
    const { publicKey, connected } = useWallet();

    return (
        <div className="wallet-connect">
            {connected && publicKey ? (
                <div className="wallet-info">
                    <div className="wallet-address">
            <span className="address-text">
              {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
            </span>
                        <span className="connection-indicator"></span>
                    </div>
                </div>
            ) : null}

            <WalletMultiButton className="wallet-button" />
        </div>
    );
};

export default WalletConnect;