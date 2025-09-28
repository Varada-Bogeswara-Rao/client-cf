"use client";
import React from "react";
import { LucideCheck } from "lucide-react";

const marqueeItemsTop = [
    "Direct ownership",
    "Equal Access",
    "Privacy Focused",
    "Integrated",
    "Decentralized",
    "Resistance to Censorship",
    "Open to everyone"
];

const marqueeItemsBottom = [
    "Lower Fees",
    "Global Reach",
    "Instant Transfers",
    "Immutable Records",
    "Community Driven",
    "Smart Contracts",
    "Crypto Powered"
];

export default function ScrollingMarqueeSection() {
    return (
        <div className="w-full mt-10 flex flex-col gap-4 px-6">

            {/* Top scrolling line */}
            <div className="overflow-hidden">
                <div className="flex min-w-fit items-center animate-scroll-left">
                    {marqueeItemsTop.concat(marqueeItemsTop).map((item, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex items-center space-x-1 px-2">
                                <div className="flex items-center text-nowrap rounded-full px-4 py-1 font-bold uppercase bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer">
                                    <LucideCheck className="w-4 h-4 text-green-700 mr-1" strokeWidth={4} style={{ verticalAlign: 'middle' }} />
                                    <span>{item}</span>
                                </div>
                            </div>
                            {/* Blue dot separator */}
                            <span className="text-blue-500 mx-4 text-lg">●</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Central tagline */}
            <div className="flex justify-center text-center text-2xl md:text-3xl font-bold text-white my-2">
                Crowdfunding, <span className="text-blue-500">Secured by Code.</span> Owned by You.
            </div>

            {/* Bottom scrolling line */}
            <div className="overflow-hidden">
                <div className="flex min-w-fit items-center animate-scroll-right">
                    {marqueeItemsBottom.concat(marqueeItemsBottom).map((item, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex items-center space-x-1 px-2">
                                <div className="flex items-center text-nowrap rounded-full px-4 py-1 font-bold uppercase bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer">
                                    <LucideCheck className="w-4 h-4 text-green-700 mr-1" strokeWidth={4} style={{ verticalAlign: 'middle' }} />
                                    <span>{item}</span>
                                </div>
                            </div>
                            {/* Blue dot separator */}
                            <span className="text-blue-500 mx-4 text-lg">●</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          display: flex;
          white-space: nowrap;
          animation: scroll-left 20s linear infinite;
        }
        .animate-scroll-right {
          display: flex;
          white-space: nowrap;
          animation: scroll-right 20s linear infinite;
        }
      `}</style>
        </div>
    );
}
