"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getWalletClient, crowdfundAbi } from "@/lib/contract";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function WithdrawButton({ campaignId }: { campaignId: bigint }) {
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async () => {
        try {
            setLoading(true);

            const walletClient = getWalletClient();
            if (!walletClient) {
                toast.error("No wallet client available. Connect your wallet first.");
                return;
            }

            const account = window.ethereum.selectedAddress; // or get it from thirdweb hook

            const hash = await walletClient.writeContract({
                address: CONTRACT_ADDRESS,
                abi: crowdfundAbi,
                functionName: "withdraw",
                args: [campaignId],
                account: account as `0x${string}`, // TypeScript needs the literal string type
            });


            toast.success(`Withdraw submitted! Tx: ${hash}`);
        } catch (err: any) {
            console.error(err);
            toast.error(err.shortMessage || "Withdraw failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleWithdraw}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
        >
            {loading ? "Withdrawing..." : "Withdraw"}
        </button>
    );
}
