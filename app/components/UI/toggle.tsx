// components/UI/toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggleButton3() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            {theme === "dark" ? <Sun /> : <Moon />}
        </button>
    );
}
