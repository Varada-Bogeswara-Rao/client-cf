"use client";

import React from "react";
import { TextHoverEffect } from "./components/UI/text-hover-effect";
import { HyperText } from "./components/UI/hyper-text";
import { BackgroundBeams } from "./components/UI/bg-beams";
export default function HomePage() {
  return (

    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 overflow-hidden">
      {/* Background beams */}
      <BackgroundBeams className="absolute inset-0 -z-10" />

      {/* Hero SPARK text */}
      <div className="w-full flex justify-center mt-[-3rem] z-10">
        <TextHoverEffect text="SPARK" duration={0.5} />
      </div>

      {/* Tagline / supporting text */}
      <div className="mt-2 text-xl md:text-1xl text-gray-300 text-center max-w-2xl z-10">
        <HyperText>Ignite Ideas. Fund the Future.</HyperText> <br />
        Back the projects you believe in and join a community of creators.
      </div>

      {/* Call-to-action button */}
      <button className="mt-8 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg text-lg transition-all duration-300 z-10">
        Get Started
      </button>
    </div>
  );
}
