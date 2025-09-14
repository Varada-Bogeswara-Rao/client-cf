"use client";

import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
// In some other file
import { ThemeToggleButton } from "./UI/ThemeSwitch";


export default function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            {/* Left side: Logo / Links */}
            <div className="flex items-center gap-6">
                <Link href="/" className="text-xl font-bold">
                    CrowdFunding
                </Link>
                {/* <Link href="/about" className="hover:text-blue-600">
                    About
                </Link>
                <Link href="/dashboard" className="hover:text-blue-600">
                    Dashboard
                </Link> */}
            </div>
            <ThemeToggleButton />
            {/* Right side: Wallet Button */}
            <div>
                <ConnectButton client={client} />
            </div>
        </nav>
    );
}
