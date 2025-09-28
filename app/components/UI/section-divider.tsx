// components/UI/SectionDivider.tsx
"use client";

import React from "react";

const SectionDivider: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div
            className={`w-full h-0.5 my-12 rounded-full
        bg-gradient-to-r from-[#6c24e0] via-[#3d4ceb] to-[#d26cff] ${className}`}
        />
    );
};

export default SectionDivider;
