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
// choose MetaMask provider if multiple wallets are injected
const provider = (window.ethereum as any)?.providers?.find(
  (p: any) => p.isMetaMask
) || window.ethereum;

const accounts = await provider.request({ method: "eth_requestAccounts" });
const userAddress = accounts[0] as `0x${string}`;

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
  chain: {
    id: 31337,
    name: "Anvil Local",
    rpc: "http://127.0.0.1:8545",
  }, // you can change to Sepolia/Goerli later
  address: "0x95bD8D42f30351685e96C62EDdc0d0613bf9a87A",
  abi: crowdfundAbi,
});

// ✅ Wallet client (browser only!)
export function getWalletClient() {
  if (typeof window === "undefined" || !window.ethereum) return null;

  return createWalletClient({
    chain: anvilChain,
    transport: custom(provider), // ✅ connect to user's wallet
  });
}
