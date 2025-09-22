"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Campaign } from "@/app/types";
import { resolveIpfs } from "@/lib/utils";
import { ProgressBar } from "./progress-bar"; // 🟢 Import the new component

type Props = {
  campaigns: Campaign[];
};

export default function ExpandableCardDemo({ campaigns }: Props) {
  const [active, setActive] = useState<Campaign | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  // ESC key + body scroll lock
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
              className="w-full max-w-[500px] bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <img
                src={resolveIpfs(active.image || "")}
                alt={active.title || "Campaign"}
                className="w-full h-80 object-cover rounded-t-3xl"
              />

              <div className="p-4">
                <h3 className="font-bold text-xl">{active.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {active.description}
                </p>
                <div className="mt-4 flex justify-between text-sm">
                  <span>🎯 Goal: {active.goal} ETH</span>
                  <span>💰 Raised: {active.pledged} ETH</span>
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  ⏳ Deadline: {new Date(active.deadline * 1000).toLocaleString()}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of cards */}
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {campaigns.map((c) => {
          // 🟢 Calculate the progress percentage
          const percentage = (parseFloat(c.pledged) / parseFloat(c.goal)) * 100;

          return (
            <motion.div
              layoutId={`card-${c.id}-${id}`}
              key={c.id}
              onClick={() => setActive(c)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <img
                src={resolveIpfs(c.image || "")}
                alt={c.title || "Campaign"}
                className="h-60 w-full rounded-lg object-cover"
              />

              <h3 className="mt-2 font-medium">{c.title}</h3>
              <p className="text-sm text-neutral-500 truncate">{c.description}</p>

              {/* 🟢 Add the progress bar and a text indicator */}
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
