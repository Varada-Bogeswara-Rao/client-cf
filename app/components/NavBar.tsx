"use client";
import { Crown } from 'lucide-react';
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
// In some other file
import { ThemeProvider } from "next-themes";
import { ThemeToggleButton3 } from "./UI/toggle";

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            {/* Left side: Logo / Links */}
            <div className="flex items-center gap-6">
                <Link href="/" className="text-xl font-bold">
                    <div className='flex items-center gap-3 '><Crown />  CROF </div>
                </Link>
                <Link href="/create" className="hover:text-blue-600">
                    Create Campaign
                </Link>

            </div>

            {/* Right side: Wallet Button */}
            <div className="flex items-center gap-3">
                <ThemeToggleButton3 className="size-9" />
                <ConnectButton client={client} />
            </div>
        </nav>
    );
}
