"use client";

import React from "react";

type ProgressBarProps = {
    progress: number; // A number between 0 and 100
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
    const normalizedProgress = Math.max(0, Math.min(100, progress));

    return (
        <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-neutral-800 overflow-hidden">
            <div
                className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${normalizedProgress}%` }}
            />
        </div>
    );
};