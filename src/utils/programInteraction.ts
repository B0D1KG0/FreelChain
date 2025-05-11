import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
    SystemProgram,
    SYSVAR_RENT_PUBKEY
} from '@solana/web3.js';
import { BN } from 'bn.js';

// Example program ID - replace with your actual Solana program ID
const PROGRAM_ID = new PublicKey('YOUR_SOLANA_PROGRAM_ID');

/**
 * Creates a new freelance project on the blockchain
 */
export async function createProject(
    connection: Connection,
    payerPublicKey: PublicKey,
    projectTitle: string,
    projectDescription: string,
    paymentAmount: number,
    deadline: number
): Promise<Transaction> {
    const transaction = new Transaction();

    // Generate a new account for the project data
    const projectAccount = new PublicKey('...'); // In a real implementation, generate a new keypair

    // Encode the instruction data
    const dataLayout = {
        // This would be a proper serialization in a real implementation
        // For now, we'll just illustrate the concept
        encode: (title: string, description: string, amount: number, deadline: number) => {
            const buffer = Buffer.alloc(1000); // Appropriate size for your data
            let offset = 0;

            // Instruction discriminator (e.g., 0 for create_project)
            buffer.writeUInt8(0, offset);
            offset += 1;

            // Write title
            const titleBuffer = Buffer.from(title);
            buffer.writeUInt8(titleBuffer.length, offset);
            offset += 1;
            titleBuffer.copy(buffer, offset);
            offset += titleBuffer.length;

            // Write description
            const descBuffer = Buffer.from(description);
            buffer.writeUInt16LE(descBuffer.length, offset);
            offset += 2;
            descBuffer.copy(buffer, offset);
            offset += descBuffer.length;

            // Write payment amount (as BN)
            const amountBN = new BN(amount * 1e9); // Convert to lamports
            const amountBuffer = amountBN.toBuffer('le', 8);
            amountBuffer.copy(buffer, offset);
            offset += 8;

            // Write deadline (Unix timestamp)
            buffer.writeBigUInt64LE(BigInt(deadline), offset);
            offset += 8;

            return buffer.slice(0, offset);
        }
    };

    const data = dataLayout.encode(
        projectTitle,
        projectDescription,
        paymentAmount,
        deadline
    );

    // Create the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: payerPublicKey, isSigner: true, isWritable: true },
            { pubkey: projectAccount, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        ],
        programId: PROGRAM_ID,
        data,
    });

    transaction.add(instruction);

    return transaction;
}

/**
 * Bid on a freelance project
 */
export async function bidOnProject(
    connection: Connection,
    bidderPublicKey: PublicKey,
    projectAccount: PublicKey,
    bidAmount: number,
    proposedDeadline: number
): Promise<Transaction> {
    const transaction = new Transaction();

    // Encode bid data
    const dataLayout = {
        encode: (amount: number, deadline: number) => {
            const buffer = Buffer.alloc(100);
            let offset = 0;

            // Instruction discriminator (e.g., 1 for bid_on_project)
            buffer.writeUInt8(1, offset);
            offset += 1;

            // Write bid amount
            const amountBN = new BN(amount * 1e9);
            const amountBuffer = amountBN.toBuffer('le', 8);
            amountBuffer.copy(buffer, offset);
            offset += 8;

            // Write proposed deadline
            buffer.writeBigUInt64LE(BigInt(deadline), offset);
            offset += 8;

            return buffer.slice(0, offset);
        }
    };

    const data = dataLayout.encode(bidAmount, proposedDeadline);

    // Create the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: bidderPublicKey, isSigner: true, isWritable: true },
            { pubkey: projectAccount, isSigner: false, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data,
    });

    transaction.add(instruction);

    return transaction;
}

/**
 * Accept a bid on a project
 */
export async function acceptBid(
    connection: Connection,
    projectOwnerPublicKey: PublicKey,
    projectAccount: PublicKey,
    bidderPublicKey: PublicKey
): Promise<Transaction> {
    const transaction = new Transaction();

    // Encode accept bid data
    const dataLayout = {
        encode: (bidderPubkey: PublicKey) => {
            const buffer = Buffer.alloc(100);
            let offset = 0;

            // Instruction discriminator (e.g., 2 for accept_bid)
            buffer.writeUInt8(2, offset);
            offset += 1;

            // Write bidder public key
            const pubkeyBuffer = bidderPubkey.toBuffer();
            pubkeyBuffer.copy(buffer, offset);
            offset += pubkeyBuffer.length;

            return buffer.slice(0, offset);
        }
    };

    const data = dataLayout.encode(bidderPublicKey);

    // Create the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: projectOwnerPublicKey, isSigner: true, isWritable: true },
            { pubkey: projectAccount, isSigner: false, isWritable: true },
            { pubkey: bidderPublicKey, isSigner: false, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data,
    });

    transaction.add(instruction);

    return transaction;
}

/**
 * Complete a project and release payment
 */
export async function completeProject(
    connection: Connection,
    projectOwnerPublicKey: PublicKey,
    projectAccount: PublicKey,
    freelancerPublicKey: PublicKey
): Promise<Transaction> {
    const transaction = new Transaction();

    // Encode complete project data
    const dataLayout = {
        encode: () => {
            const buffer = Buffer.alloc(100);

            // Instruction discriminator (e.g., 3 for complete_project)
            buffer.writeUInt8(3, 0);

            return buffer.slice(0, 1);
        }
    };

    const data = dataLayout.encode();

    // Create the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: projectOwnerPublicKey, isSigner: true, isWritable: true },
            { pubkey: projectAccount, isSigner: false, isWritable: true },
            { pubkey: freelancerPublicKey, isSigner: false, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data,
    });

    transaction.add(instruction);

    return transaction;
}