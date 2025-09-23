"use client"; // ensures this file runs on the client
import { createThirdwebClient, getContract } from "thirdweb";
import { createWalletClient, type Abi, custom, http } from "viem";
import { defineChain } from "viem";
import rawCrowdfundJson from "@/lib/crowdfundABI.json";

// 👇 Extend window type
declare global {
  interface Window {
    ethereum?: any;
  }
}

// ✅ Crowdfund ABI
export const crowdfundAbi: Abi = rawCrowdfundJson.abi as Abi;

// ✅ Thirdweb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// ✅ Define Anvil (local) chain
export const anvilChain = defineChain({
  id: 31337,
  name: "Anvil Local",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
});

// ✅ Export contract instance for read-only calls
export const crowdfundContract = getContract({
  client,
  chain: {id: 31337,
    name: "Anvil Local",
    rpc: "http://127.0.0.1:8545",}, // you can change to Sepolia/Goerli later
  address: "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35",
  abi: crowdfundAbi,
});

// ✅ Wallet client (browser only!)
export function getWalletClient() {
  if (typeof window === "undefined" || !window.ethereum) return null;
  return createWalletClient({
    chain: anvilChain, // or dynamically switch chains
    transport: http("http://127.0.0.1:8545"),
  });
}
