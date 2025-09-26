"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";
import Countdown from "react-countdown";
import { getWalletClient, crowdfundContract } from "@/lib/contract";
import { parseEther, formatEther, Abi } from "viem";
import { createPublicClient, http } from "viem";
import { defineChain } from "viem";
interface CampaignData {
  goal: bigint;
  pledged: bigint;
  deadline: number;
}
export const anvilChain = defineChain({
  id: 31337,
  name: "Anvil Local",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
});
export const publicClient = createPublicClient({
  chain: anvilChain,
  transport: http("http://127.0.0.1:8545"),
});
const PledgeCard: React.FC = () => {
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [ethAmount, setEthAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const params = useParams();
  const ID = Array.isArray(params.ID) ? params.ID[0] : params.ID;

  // Fetch campaign data from the contract
  useEffect(() => {
    const fetchCampaign = async () => {
      if (!ID) return;

      const walletClient = getWalletClient();
      if (!walletClient) return;

      try {
        const data: any = await publicClient.readContract({
          address: crowdfundContract.address as `0x${string}`,
          abi: crowdfundContract.abi as Abi,
          functionName: "getCampaign",
          args: [BigInt(ID)],
        })
        setCampaign({
          goal: data.goal,
          pledged: data.pledged,
          deadline: Number(data.deadline),
        });
      } catch (err) {
        console.error("Failed to fetch campaign:", err);
      }
    };

    fetchCampaign();
  }, [ID]);

  // Optional: fetch ETH price in USD dynamically
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const json = await res.json();
        setEthPrice(json.ethereum.usd);
      } catch (err) {
        console.error("Failed to fetch ETH price:", err);
      }
    };
    fetchEthPrice();
  }, []);

  const handlePledge = async () => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) return;
    if (!ID) return;

    try {
      setLoading(true);

      const walletClient = getWalletClient();
      if (!walletClient) {
        alert("Wallet not connected");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0] as `0x${string}`;

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x7a69" }], // 31337
      });

      await walletClient.writeContract({
        account: userAddress,
        address: crowdfundContract.address as `0x${string}`,
        abi: crowdfundContract.abi as Abi,
        functionName: "donate",
        args: [BigInt(ID)],
        value: parseEther(ethAmount),
      });

      alert(`Pledge of ${ethAmount} ETH submitted!`);
      setEthAmount("");
    } catch (err: any) {
      console.error("Pledge failed:", err);
      alert(`Pledge failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) return <div>Loading campaign...</div>;

  const usdValue =
    ethAmount && ethPrice
      ? (parseFloat(ethAmount) * ethPrice).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : "0.00";

  const goalEth = formatEther(campaign.goal);
  const pledgedEth = formatEther(campaign.pledged);
  const progressPercent = Math.min(
    (parseFloat(pledgedEth) / parseFloat(goalEth)) * 100,
    100
  );

  const isInputValid = parseFloat(ethAmount) > 0;
  const isCampaignActive = campaign.deadline * 1000 > Date.now();
  const isButtonDisabled = !isInputValid || !isCampaignActive || loading;

  const countdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) =>
    completed ? (
      <div className="countdown ended">CAMPAIGN ENDED</div>
    ) : (
      <div className="countdown">
        {String(days).padStart(2, "0")}D : {String(hours).padStart(2, "0")}H :{" "}
        {String(minutes).padStart(2, "0")}M : {String(seconds).padStart(2, "0")}S
      </div>
    );

  return (
    <CardWrapper>
      <div className="container-card">
        <h3 className="card-header">Pledge Your Support</h3>

        <div className="input-group">
          <input
            type="number"
            min="0"
            placeholder="Enter ETH amount"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
          />
        </div>

        <p className="usd-ref">{`≈ $${usdValue} USD`}</p>

        <button
          className="pledge-btn"
          onClick={handlePledge}
          disabled={isButtonDisabled}
        >
          {loading ? "Processing..." : "PLEDGE NOW"}
        </button>

        <div className="metrics">
          <div className="metric-card">
            <strong>Goal</strong>
            <p>{goalEth} ETH</p>
          </div>
          <div className="metric-card">
            <strong>Pledged</strong>
            <p>{pledgedEth} ETH</p>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="progress-text">{progressPercent.toFixed(1)}% Funded</p>
        </div>

        <Countdown date={campaign.deadline * 1000} renderer={countdownRenderer} />
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`


  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .container-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 24px;
    border-radius: 24px;
    background: linear-gradient(71deg, #080509, #1a171c, #080509);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      inset: -2px;
      z-index: -1;
      border-radius: 24px;
      background: conic-gradient(
        from 0deg,
        #ffff66 0deg 40deg,
        #000000 40deg 120deg,
        #ffff66 120deg 160deg,
        #000000 160deg 360deg
      );
      box-shadow: 0 0 8px #ffff66;
      animation: borderRotate 6s linear infinite;
    }
  }

  @keyframes borderRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .card-header {
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    color: #fff;
    margin-bottom: 16px;
  }

  .input-group input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #444;
    background: #1a171c;
    color: white;
    margin-bottom: 8px;
  }

  .usd-ref {
    color: #999;
    font-size: 14px;
    text-align: right;
    margin-bottom: 16px;
  }

  .pledge-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #d33, #ff7733);
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 16px;
  }

  .pledge-btn:disabled {
    background: #444;
    cursor: not-allowed;
  }

  .metrics {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric-card {
    background: #1a171c;
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    flex: 1;
    border: 1px solid #333;
  }

  .metric-card strong {
    font-size: 14px;
    color: #999;
    display: block;
    margin-bottom: 4px;
  }

  .metric-card p {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }

  .progress-bar {
    height: 10px;
    background: #333;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #ffaa00, #ff7733);
    transition: width 0.5s ease-in-out;
  }

  .progress-text {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-bottom: 12px;
  }

  .countdown {
    font-weight: bold;
    font-size: 18px;
    background: linear-gradient(90deg, #d33, #ff7733);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-family: monospace;
  }

  .countdown.ended {
    color: #d33;
  }
`;

export default PledgeCard;
