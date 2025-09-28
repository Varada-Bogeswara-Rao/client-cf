// components/UI/GlowingCard.tsx
"use client";

import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface GlowingCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay?: number; // stagger delay
}

const GlowingCard: React.FC<GlowingCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
    return (
        <motion.div
            initial={{ y: 0, boxShadow: "0 0 0 rgba(108,36,224,0)" }}
            whileHover={{
                y: -6,
                boxShadow: "0 0 20px rgba(108,36,224,0.8)",
            }}
            animate={{
                y: 0,
                boxShadow: "0 0 0 rgba(108,36,224,0)",
                transition: { duration: 0.1 } // instant reset on hover out
            }}
            className="group relative rounded-2xl p-6 border border-[rgba(108,36,224,0.3)]
        bg-transparent cursor-pointer"
        >
            {/* Icon */}
            <div className="mb-4 text-[#6c24e0]">
                <Icon size={40} />
            </div>

            {/* Title */}
            <h3
                className="text-xl font-bold  mb-2 bg-clip-text text-transparent
        bg-gradient-to-r from-blue-400 to-[#6c24e0]"
            >
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-300">{description}</p>
        </motion.div>
    );
};

export default GlowingCard;
