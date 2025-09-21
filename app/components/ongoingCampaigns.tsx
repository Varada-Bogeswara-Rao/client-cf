"use client";

import { useEffect, useState } from "react";
import { crowdfundContract } from "@/lib/contract";
import { readContract } from "thirdweb";
import { formatEther } from "viem";
import { resolveIpfs } from "@/lib/utils";
import { toast } from "sonner";

type Campaign = {
    id: number;
    owner: string;
    goal: string;
    pledged: string;
    deadline: number;
    withdrawn: boolean;
    metadata: {
        name?: string;
        title?: string;
        description?: string;
        image?: string;
    };
};

export default function OngoingCampaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        toast("OngoingCampaigns mounted");
        async function fetchCampaigns() {
            try {
                const count = (await readContract({
                    contract: crowdfundContract,
                    method: "function campaignCount() view returns (uint256)",
                })) as bigint;

                const now = Math.floor(Date.now() / 1000);
                const all: Campaign[] = [];

                for (let i = 0; i < Number(count); i++) {
                    const c = (await readContract({
                        contract: crowdfundContract,
                        method: "function campaigns(uint256) view returns (address owner,string metadataURI,uint256 goal,uint256 pledged,uint256 deadline,bool withdrawn)",
                        params: [BigInt(i)],
                    })) as any;

                    const [owner, metadataURI, goal, pledged, deadline, withdrawn] = c;

                    // Resolve IPFS URI
                    let metadata: any = {};
                    try {
                        if (metadataURI) {
                            // If it's a proper URL, just fetch directly
                            const res = await fetch(metadataURI);

                            if (!res.ok) {
                                throw new Error(`HTTP error ${res.status}`);
                            }

                            metadata = await res.json();

                            // Resolve image only if it’s ipfs://
                            if (metadata.image && metadata.image.startsWith("ipfs://")) {
                                metadata.image = resolveIpfs(metadata.image);
                            }
                        } else {
                            toast.warning("Campaign metadataURI is empty");
                        }
                    } catch (err: any) {
                        toast.error("Failed to load metadata", {
                            description: `${metadataURI || "undefined"}: ${err.message}`,
                        });
                    }


                    // Only ongoing campaigns
                    if (!withdrawn && Number(deadline) > now) {
                        all.push({
                            id: i,
                            owner,
                            goal: formatEther(goal),
                            pledged: formatEther(pledged),
                            deadline: Number(deadline),
                            withdrawn,
                            metadata,
                        });
                    }
                }

                setCampaigns(all);
            } catch (err: any) {
                toast.error("Error fetching campaigns", { description: err?.message || "Unknown error" });
            } finally {
                setLoading(false);
            }
        }

        fetchCampaigns();
    }, []);

    if (loading) return <p>Loading campaigns...</p>;
    if (campaigns.length === 0) return <p>No ongoing campaigns</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((c) => (
                <div key={c.id} className="border p-4 rounded-lg shadow bg-white/10">
                    {c.metadata.image && (
                        <img src={c.metadata.image} alt={c.metadata.title} className="rounded-lg mb-3" />
                    )}
                    <h2 className="text-xl font-bold">{c.metadata.title || `Campaign #${c.id}`}</h2>
                    <p className="text-sm text-gray-400 mb-2">{c.metadata.description}</p>
                    <p><strong>Goal:</strong> {c.goal} ETH</p>
                    <p><strong>Pledged:</strong> {c.pledged} ETH</p>
                    <p className="text-xs text-gray-500">
                        Deadline: {new Date(c.deadline * 1000).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
