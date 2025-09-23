"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Campaign } from "@/app/types";
import { resolveIpfs } from "@/lib/utils";
import { ProgressBar } from "./progress-bar";
import { toast } from "sonner";
import { createWalletClient, http } from "viem";

import { parseEther } from "viem/utils";
import { getWalletClient, crowdfundAbi, crowdfundContract, anvilChain } from "@/lib/contract";

type Props = {
  campaigns: Campaign[];
};

export default function ExpandableCardDemo({ campaigns }: Props) {
  const [active, setActive] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [localCampaigns, setLocalCampaigns] = useState(campaigns);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);


  const anvilChain = {
    id: 31337,
    name: "Anvil Local",
    network: "anvil",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
  };

  // Wallet client connected to Anvil local blockchain


  const walletClient = createWalletClient({
    chain: anvilChain,
    transport: http("http://127.0.0.1:8545"),
  });



  useEffect(() => {
    setLocalCampaigns(campaigns);
  }, [campaigns]);

  // ESC key + body scroll lock
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  async function handleDonateClick(active: { id: number }, donationAmount: string) {
    const walletClient = getWalletClient();
    if (!walletClient) {
      toast.error("Connect your wallet first!");
      return;
    }


    try {

      const txHash = await walletClient.writeContract({
        address: crowdfundContract.address,
        abi: crowdfundAbi,
        functionName: "donate",
        args: [BigInt(active.id)],
        value: BigInt(parseFloat(donationAmount) * 1e18),
        chain: anvilChain,
        account: (await walletClient.getAddresses())[0],

      });
      toast.success(`Donation sent! TxHash: ${txHash}`);

      // Update pledged locally
      setActive(prev =>
        prev ? { ...prev, pledged: (parseFloat(prev.pledged) + parseFloat(donationAmount)).toString() } : prev
      );
      setLocalCampaigns(prev =>
        prev.map(c =>
          c.id === active.id
            ? { ...c, pledged: (parseFloat(c.pledged) + parseFloat(donationAmount)).toString() }
            : c
        )
      );

      setDonationAmount("");
    } catch (err: any) {
      console.error(err);
      toast.error("Donation failed", { description: err?.message || "Unknown error" });
    }
  };


  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded card */}
      {/* Expanded card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] bg-white dark:bg-neutral-900 sm:rounded-3xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              {/* Image */}
              <img
                src={resolveIpfs(active.image || "")}
                alt={active.title || "Campaign"}
                className="w-full h-80 object-cover rounded-t-3xl"
              />

              {/* Scrollable content */}
              <div className="p-4 flex-1 overflow-y-auto">
                <h3 className="font-bold text-xl">{active.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">{active.description}</p>

                <div className="mt-4 flex justify-between text-sm">
                  <span>🎯 Goal: {active.goal} ETH</span>
                  <span>💰 Raised: {active.pledged} ETH</span>
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  ⏳ Deadline: {new Date(active.deadline * 1000).toLocaleString()}
                </p>

                {/* Optional: progress bar inside expanded card */}
                <div className="mt-4">
                  <ProgressBar progress={(parseFloat(active.pledged) / parseFloat(active.goal)) * 100} />
                </div>
              </div>

              {/* Bottom donation section always visible */}
              <div className="p-4 border-t flex-shrink-0">
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="ETH amount"
                    min="0"
                    step="0.01"
                    className="flex-1 border rounded px-3 py-2 dark:bg-neutral-800 dark:text-white"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handleDonateClick(active, donationAmount)}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Grid of cards */}
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {localCampaigns.map((c) => {
          const percentage = (parseFloat(c.pledged) / parseFloat(c.goal)) * 100;
          return (
            <motion.div
              layoutId={`card-${c.id}-${id}`}
              key={c.id}
              onClick={() => setActive(c)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl cursor-pointer"
            >
              <img
                src={resolveIpfs(c.image || "")}
                alt={c.title || "Campaign"}
                className="h-60 w-full rounded-lg object-cover"
              />
              <h3 className="mt-2 font-medium">{c.title}</h3>
              <p className="text-sm text-neutral-500 truncate">{c.description}</p>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs text-neutral-500 mb-1">
                  <span>Goal: {c.goal} ETH</span>
                  <span>Raised: {c.pledged} ETH</span>
                </div>
                <ProgressBar progress={percentage} />
              </div>
            </motion.div>
          );
        })}
      </ul>
    </>
  );
}
