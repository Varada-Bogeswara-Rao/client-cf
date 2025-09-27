"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createWalletClient, type Abi, http } from "viem";
import { anvilChain, crowdfundContract } from "@/lib/contract";
import { resolveIpfs } from "@/lib/utils";
import PledgeCard from "@/app/components/UI/pledge-card";
import { createPublicClient } from "viem";
import { toast } from "sonner";
import { WithdrawButton } from "@/app/components/withdraw";

interface Campaign {
    owner: string;
    metadataURI: string;
    title: string;
    description: string;
    goal: string;
    pledged: string;
    deadline: number;
    withdrawn: boolean;
    image?: string;
}

const publicClient = createPublicClient({
    chain: anvilChain,
    transport: http("http://127.0.0.1:8545"),
});

export default function CampaignPage() {
    const params = useParams();
    const ID = Array.isArray(params.ID) ? params.ID[0] : params.ID;

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [ethPrice, setEthPrice] = useState<number | null>(null);

    const fetchEthPrice = async () => {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
            );
            const data = await res.json();
            setEthPrice(data.ethereum.usd);
        } catch (err) {
            console.error(err);
            setEthPrice(null);
        }
    };

    const fetchCampaign = async () => {
        if (!ID) return;
        try {
            const c = await publicClient.readContract({
                address: crowdfundContract.address as `0x${string}`,
                abi: crowdfundContract.abi as Abi,
                functionName: "getCampaign",
                args: [BigInt(ID)],
            }) as Campaign;

            const metadataUrl = resolveIpfs(c.metadataURI);
            const metadataRes = await fetch(metadataUrl);
            const metadata = await metadataRes.json();

            setCampaign({
                owner: c.owner,
                metadataURI: c.metadataURI,
                title: metadata.title || "",
                description: metadata.description || "",
                image: metadata.image || "",
                goal: c.goal.toString(),
                pledged: c.pledged.toString(),
                deadline: Number(c.deadline),
                withdrawn: c.withdrawn,
            });
        } catch (err) {
            console.error(err);
            setCampaign(null);
        } finally {
            setLoading(false);
        }
    };

    const handlePledge = async (amountEth: string) => {
        try {
            const walletClient = createWalletClient({
                chain: anvilChain,
                transport: http("http://127.0.0.1:8545"),
            });

            if (!window.ethereum) {
                toast("Install MetaMask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const userAddress = accounts[0] as `0x${string}`;
            if (!ID) return;

            await walletClient.writeContract({
                account: userAddress,
                address: crowdfundContract.address as `0x${string}`,
                abi: crowdfundContract.abi as Abi,
                functionName: "donate",
                args: [BigInt(ID)],
                value: BigInt(parseFloat(amountEth) * 1e18),
            });

            toast.success(`Successfully pledged ${amountEth} ETH`);
            fetchCampaign(); // refresh campaign data
        } catch (err: any) {
            console.error(err);
            toast.error(`Pledge failed: ${err?.message || err}`);
        }
    };

    useEffect(() => {
        fetchCampaign();
        fetchEthPrice();
        const priceInterval = setInterval(fetchEthPrice, 60000);
        return () => clearInterval(priceInterval);
    }, [ID]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (!campaign) return <div className="p-4">Campaign not found.</div>;

    const currentAddress = window.ethereum?.selectedAddress?.toLowerCase();

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
                {/* Hero Image */}
                <div className="flex-1 order-2 md:order-1">
                    <h1 className="md:hidden text-3xl font-bold mb-4">{campaign.title}</h1>
                    {campaign.image && (
                        <div className="relative w-full rounded-lg overflow-hidden">
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-auto object-contain rounded-lg"


                            />
                            <h1 className="hidden md:block absolute bottom-4 left-4 text-4xl font-bold text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                                {campaign.title}
                            </h1>
                        </div>
                    )}
                </div>

                {/* Pledge Card */}
                <div className="w-full md:w-96 flex-shrink-0 order-1 md:order-2">
                    {campaign && (
                        <PledgeCard
                            goal={BigInt(campaign.goal)}
                            pledged={BigInt(campaign.pledged)}
                            deadline={campaign.deadline}
                            ethPrice={ethPrice}
                            onPledge={handlePledge}
                        />
                    )}
                    {currentAddress === campaign.owner.toLowerCase() && !campaign.withdrawn && (
                        <WithdrawButton campaignId={BigInt(ID ?? "0")} />
                    )}
                </div>
            </div>

            {/* Campaign Details */}
            <div className="mt-8 space-y-2 text-gray-700">
                <h2 className="text-2xl font-bold mb-4">Campaign Story & Details</h2>
                <p><strong>Owner:</strong> {campaign.owner}</p>
                <p><strong>Withdrawn:</strong> {campaign.withdrawn ? "Yes" : "No"}</p>
                <p><strong>Deadline:</strong> {new Date(campaign.deadline * 1000).toLocaleString()}</p>
                <p>{campaign.description}</p>
            </div>
        </div>
    );
}
