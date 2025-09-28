"use client";

import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
    icon: ReactNode;
    title: string;
    description: string;
    selected?: boolean;
    color?: string; // plain HEX or CSS color
    onClick?: () => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    icon,
    title,
    description,
    selected,
    color,
    onClick,
    className,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // border color only when selected
    const borderStyle = selected && color ? { borderColor: color } : {};
    const textStyle = color ? { color } : {};

    // glowing background on hover
    const glowStyle =
        isHovered && color
            ? {
                boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`, // subtle glow
                backgroundColor: `${color}15`, // faint tinted bg
            }
            : {};

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...borderStyle, ...glowStyle }}
            className={cn(
                "flex items-center gap-4 cursor-pointer rounded-2xl border p-4 transition-all duration-300",
                "hover:scale-[1.03]", // scale on hover
                selected ? "border-4" : "border-gray-300",
                className
            )}
        >
            {/* Icon */}
            <div
                className="flex-shrink-0 grid aspect-square w-12 place-items-center transition-colors duration-200"
                style={textStyle}
            >
                {icon}
            </div>

            {/* Title + Description */}
            <div className="flex flex-col text-left">
                <p
                    className="text-xl font-bold transition-colors duration-200"
                    style={textStyle}
                >
                    {title}
                </p>
                <p className="text-body text-gray-500">{description}</p>
            </div>
        </div>
    );
};

export default Card;
