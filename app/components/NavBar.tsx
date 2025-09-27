"use client";
import { Crown } from 'lucide-react';
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { ThemeToggleButton3 } from "./UI/toggle";

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-6">
                <Link href="/" className="text-xl font-bold">
                    <div className="flex items-center gap-3"><Crown /> CROF</div>
                </Link>
                <Link href="/create" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Create Campaign
                </Link>
                <Link href="/campaigns" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Campaigns
                </Link>
                {/* <ThemeToggleButton3 /> */}
            </div>
            <div className="flex items-center gap-3">
                <ConnectButton client={client} />
            </div>
        </nav>
    );
}
