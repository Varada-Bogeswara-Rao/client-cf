// components/ui/Tooltip.tsx
"use client";

import { ReactNode, useState } from "react";

type TooltipProps = {
    content: string;
    children: ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
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
