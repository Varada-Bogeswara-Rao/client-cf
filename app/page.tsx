"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";
import GlowingCard from "./components/UI/glowing-card";
import ScrollingMarqueeSection from "./components/UI/marquee";
import { HyperText } from "./components/UI/hyper-text";
import Image from "next/image";
import Card from "./components/UI/card";
import SectionDivider from "./components/UI/section-divider";
import { WalletMinimalIcon, Rocket, HeartHandshakeIcon } from "lucide-react";
import { LucideRocket, LucideUsers, LucideShield } from "lucide-react";
import { Skiper19 } from "./components/UI/cfSteps";
export default function HomePage() {
  const sparkTexts = [
    "SPARK",        // English
    "स्पार्क",      // Hindi
    "スパーク",     // Japanese
    "스파크",        // Korean Hangul
    "سبارك",        // Arabic
    "火花",         // Mandarin
    "স্পার্ক",       // Bengali / Bangla
    "CHISPA",       // Spanish
    "ÉTINCELLE",    // French
    "FUNKE",        // German
  ];

  const router = useRouter();

  const connectBtnRef = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showWallet, setShowWallet] = useState(false);

  const features = [
    {
      icon: LucideRocket,
      title: "Fast Transactions",
      description: "Experience near-instant crypto transfers with low fees.",
    },
    {
      icon: LucideUsers,
      title: "Community Driven",
      description: "Join a vibrant Web3 community and collaborate on projects.",
    },
    {
      icon: LucideShield,
      title: "Secure & Private",
      description: "Your data and funds remain safe and fully under your control.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[70vh] relative">
        <Image
          src="https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fhero.0cfd42cc.png&w=1504&q=10"
          alt="An illustration of a futuristic city, representing the Ethereum ecosystem."
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* HyperText */}
      <div className="px-4 pt-4 pb-2 flex justify-center">
        <HyperText
          texts={sparkTexts}
          className="text-center text-lg md:text-xl"
          style={{ color: "hsla(263, 77%, 75%, 1)" }}
        />
      </div>

      {/* Headers & Tagline */}
      <div className="flex flex-col items-center gap-y-2 lg:max-w-2xl text-center px-4">
        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl">
          Welcome To Spark
        </h1>
        <h4 className="max-w-96 text-md md:text-lg lg:text-xl text-gray-400">
          Your home for decentralized innovation
        </h4>
      </div>

      {/* Feature Cards */}
      <div className="flex w-full max-w-6xl px-6 mt-10 gap-8">
        <Card
          icon={<WalletMinimalIcon className="w-10 h-10" />}
          title="Connect Wallet"
          description="Link your wallet to start using Spark"
          selected={selected === "eth"}
          onClick={() => {
            setSelected("eth");
            setShowWallet(true);
          }}
          color="#3d4ceb"
        />

        <Card
          icon={<Rocket className="w-10 h-10" />}
          title="Create Campaign"
          description="Launch a campaign and raise funds"
          selected={selected === "b"}
          onClick={() => {
            setSelected("b");
            router.push("/create");
          }}
          color="#0f9972"
        />

        <Card
          icon={<HeartHandshakeIcon className="w-10 h-10" />}
          title="Donate"
          description="Support campaigns with secure crypto"
          selected={selected === "c"}
          onClick={() => {
            setSelected("c");
            router.push("/campaigns");
          }}
          color="#6c24e0"
        />
      </div>

      <ScrollingMarqueeSection />
      <SectionDivider />

      <div className="w-full px-3 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose Spark
        </h2>
        <div className="flex flex-col items-center justify-center px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlowingCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.1}
              />
            ))}
          </div>
        </div>
        <Skiper19 />
      </div>
    </div>
  );
}
