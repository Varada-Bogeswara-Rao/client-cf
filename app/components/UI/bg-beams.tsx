"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = [
      "M0 0 L1920 1080",
      "M0 1080 L1920 0",
      "M960 0 L960 1080",
      "M0 540 L1920 540",
    ]; // simple diagonal & vertical beams for demonstration

    return (
      <div
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none",
          className
        )}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke={`url(#gradient-${index})`}
              strokeWidth="2"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            />
          ))}

          <defs>
            {paths.map((_, index) => (
              <linearGradient
                key={index}
                id={`gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#18CCFC" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#6344F5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#AE48FF" stopOpacity="0.2" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
