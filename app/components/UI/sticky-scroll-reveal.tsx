"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { WalletIcon, Rocket, BarChart3 } from "lucide-react";

interface TimelineStep {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const steps: TimelineStep[] = [
    {
        title: "Connect Wallet",
        description:
            "Securely link your crypto wallet to get started. This wallet acts as your digital identity, giving you full control over your transactions and contributions within our decentralized crowdfunding platform.",
        icon: <WalletIcon size={36} />,
        color: "#3d4ceb",
    },
    {
        title: "Create & Pledge Campaigns",
        description:
            "Start your own crowdfunding campaign or support others. Easily pledge crypto and track your contributions transparently on the blockchain.",
        icon: <Rocket size={36} />,
        color: "#0f9972",
    },
    {
        title: "Follow & Track",
        description:
            "Monitor all campaigns you've created or contributed to. Stay updated with real-time progress and updates in a decentralized, secure environment.",
        icon: <BarChart3 size={36} />,
        color: "#6c24e0",
    },
];

export const Timeline: React.FC = () => {
    return (
        <div className="relative max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
            <div className="flex flex-col space-y-25"> {/* Increased space between items */}
                {steps.map((step, idx) => (
                    <TimelineItem key={idx} step={step} />
                ))}
            </div>
        </div>
    );
};

const TimelineItem: React.FC<{ step: TimelineStep }> = ({ step }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center lg:flex-row lg:items-start" // Center on small screens
        >
            {/* Icon with colored circle and glow on hover */}
            <div className="relative z-10 flex-shrink-0 mb-4 lg:mb-0 lg:mr-8">
                <div
                    className="flex items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300"
                    style={{
                        backgroundColor: step.color,
                        color: "#fff",
                    }}
                >
                    <div
                        className="w-full h-full flex items-center justify-center rounded-full"
                        style={{
                            transition: "box-shadow 0.3s ease",
                        }}
                    >
                        {step.icon}
                    </div>
                </div>
                <style jsx>{`
          div:hover > div {
            box-shadow: 0 0 20px ${step.color};
          }
        `}</style>
            </div>

            {/* Content */}
            <div className="max-w-xl text-center lg:text-left">
                <h3 className="text-xl font-bold mb-2" style={{ color: step.color }}>
                    {step.title}
                </h3>
                <p>{step.description}</p>
            </div>
        </motion.div>
    );
};
