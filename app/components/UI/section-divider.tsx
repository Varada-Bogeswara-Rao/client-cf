"use client";

import React from "react";

const SectionDivider: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div
            className={`h-0.5 w-20 my-6 rounded-full 
        bg-gradient-to-r from-[#6c24e0] via-[#3d4ceb] to-[#d26cff] ${className}`}
        />
    );
};

export default SectionDivider;
