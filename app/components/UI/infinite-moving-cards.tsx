"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        title: string;
        pledged: string;
        donation: string;
        date: string;
        image?: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    const [start, setStart] = useState(false);

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                scrollerRef.current?.appendChild(duplicatedItem);
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }, []);

    const getDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            const duration =
                speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
            containerRef.current.style.setProperty("--animation-duration", duration);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden", // removed mask
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
                    start && "animate-scroll"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 
              bg-transparent from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 
              dark:border-zinc-700 overflow-hidden shadow-md 
              hover:shadow-[0_0_25px_rgba(0,200,255,0.6)] transition-shadow duration-300"
                    >
                        {/* Big image at top */}
                        {item.image && (
                            <div className="h-40 w-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Campaign details */}
                        <div className="p-5 space-y-3">
                            <h3 className="  text -lg font-semibold">
                                {item.title}
                            </h3>
                            <p className="text-sm">
                                <span className="font-medium">Pledged:</span> {item.pledged}
                            </p>
                            <p className="text-sm ">
                                <span className="font-medium">Donation Received:</span>{" "}
                                {item.donation}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Date:</span> {item.date}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pause scroll on hover */}
            {pauseOnHover && (
                <style jsx>{`
          .scroller:hover .animate-scroll {
            animation-play-state: paused !important;
          }
        `}</style>
            )}
        </div>
    );
};
