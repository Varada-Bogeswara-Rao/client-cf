"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Campaign } from "@/app/types";
import { resolveIpfs } from "@/lib/utils";
import { ProgressBar } from "./progress-bar";
import Link from "next/link";

// Simple tooltip component
function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap z-50">
          {content}
        </span>
      )}
    </span>
  );
}

type Props = {
  campaigns: Campaign[];
};

export default function ExpandableCardDemo({ campaigns }: Props) {
  const [active, setActive] = useState<Campaign | null>(null);
  const [localCampaigns, setLocalCampaigns] = useState(campaigns);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalCampaigns(campaigns);
  }, [campaigns]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] bg-white dark:bg-neutral-900 sm:rounded-3xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              <img
                src={resolveIpfs(active.image || "")}
                alt={active.title || "Campaign"}
                className="w-full h-80 object-cover rounded-t-3xl"
              />

              <div className="p-4 flex-1 overflow-y-auto">
                <h3 className="font-bold text-xl">{active.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {(active.description ?? "").slice(0, 100)}
                  <Tooltip content="Click to view full campaign and donate">
                    <Link
                      href={`/campaigninfo/${active.id}`}
                      className="text-blue-600 ml-1 hover:underline"
                    >
                      Read more
                    </Link>
                  </Tooltip>
                </p>


                <div className="mt-4 flex justify-between text-sm">
                  <span>🎯 Goal: {active.goal} ETH</span>
                  <span>💰 Raised: {active.pledged} ETH</span>
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  ⏳ Deadline: {new Date(active.deadline * 1000).toLocaleString()}
                </p>

                <div className="mt-4">
                  <ProgressBar progress={(parseFloat(active.pledged) / parseFloat(active.goal)) * 100} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of cards */}
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {localCampaigns.map((c) => {
          const percentage = (parseFloat(c.pledged) / parseFloat(c.goal)) * 100;
          return (
            <motion.div
              layoutId={`card-${c.id}-${id}`}
              key={c.id}
              onClick={() => setActive(c)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl cursor-pointer"
            >
              <img
                src={resolveIpfs(c.image || "")}
                alt={c.title || "Campaign"}
                className="h-60 w-full rounded-lg object-cover"
              />
              <h3 className="mt-2 font-medium">{c.title}</h3>
              <p className="text-sm text-neutral-500 truncate">
                {(c.description ?? "").slice(0, 100)}
                <Tooltip content="Click to view full campaign and donate">
                  <Link
                    href={`/campaigninfo/${c.id}`}
                    className="text-blue-600 ml-1 hover:underline"
                  >
                    Read more
                  </Link>
                </Tooltip>
              </p>


              <div className="mt-4">
                <div className="flex justify-between items-center text-xs text-neutral-500 mb-1">
                  <span>Goal: {c.goal} ETH</span>
                  <span>Raised: {c.pledged} ETH</span>
                </div>
                <ProgressBar progress={percentage} />
              </div>
            </motion.div>
          );
        })}
      </ul>
    </>
  );
}
