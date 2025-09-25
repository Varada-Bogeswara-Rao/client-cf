"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ethers, Contract, ContractInterface } from "ethers";
import crowdfundAbiJson from "@/lib/crowdfundABI.json";
import { resolveIpfs } from "@/lib/utils";

// 1. Define an interface for the full artifact if you want safety
interface ContractArtifact {
    abi: ContractInterface; // The ABI is the ContractInterface
    [key: string]: any; // Allows for other fields like bytecode, etc.
}
// 2. Cast the import to the full artifact type
const artifact = crowdfundAbiJson as ContractArtifact;

// 3. Extract ONLY the 'abi' property
const crowdfundAbi: ContractInterface = artifact.abi;

// Replace with your deployed contract address & RPC URL
const CONTRACT_ADDRESS = "0xC6bA8C3233eCF65B761049ef63466945c362EdD2";
const RPC_URL = "http://127.0.0.1:8545";

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

export default function CampaignPage() {
    const params = useParams();
    const ID = Array.isArray(params.ID) ? params.ID[0] : params.ID;

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaign = async () => {
            if (!ID) return;

            try {
                const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

                // Connect to contract with provider
                const contract = new Contract(CONTRACT_ADDRESS, crowdfundAbi, provider);

                // Call the getCampaign function from your updated contract
                const c = await contract.getCampaign(BigInt(ID));

                // Fetch metadata from URI
                const metadataUrl = resolveIpfs(c.metadataURI);
                console.log(c.metadataURI);
                console.log(metadataUrl);
                const metadataRes = await fetch(metadataUrl);
                console.log(metadataRes);
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
                console.error("Error fetching campaign:", err);
                setCampaign(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [ID]);

    if (loading) return <div>Loading campaign...</div>;
    if (!campaign) return <div>Campaign not found.</div>;

    return (
        <div className="p-4 max-w-xl mx-auto border rounded shadow">
            <h1 className="text-2xl font-bold">{campaign.title}</h1>
            {campaign.image && (
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="my-2 rounded"
                />
            )}
            <p>{campaign.description}</p>
            <p>
                <strong>Goal:</strong> {ethers.utils.formatEther(campaign.goal)} ETH
            </p>
            <p>
                <strong>Pledged:</strong> {ethers.utils.formatEther(campaign.pledged)} ETH
            </p>
            <p>
                <strong>Deadline:</strong>{" "}
                {new Date(campaign.deadline * 1000).toLocaleString()}
            </p>
            <p>
                <strong>Owner:</strong> {campaign.owner}
            </p>
            <p>
                <strong>Withdrawn:</strong> {campaign.withdrawn ? "Yes" : "No"}
            </p>
        </div>
    );
}
