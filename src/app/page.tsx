"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import HubView from '@/components/hub/HubView';

export default function Page() {
  const [showHub, setShowHub] = useState(false);

  if (showHub) return <HubView />;

  return (
    <main className="h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-between p-10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-white/5 blur-[120px] rounded-full" />
      
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full">
        <div className="relative w-64 h-64 mb-10">
          <Image 
            src="/Pics/FacePic.PNG" 
            alt="Welcome" 
            fill 
            priority 
            className="object-contain" 
          />
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-white mb-4 text-center">
          Welcome to PluginBox
        </h1>
        <p className="text-white/50 text-[16px] leading-relaxed max-w-[320px] text-center">
          Download, create and use plugins directly in Telegram chats and channels to enhance your messenger experience.
        </p>
      </div>

      <div className="w-full max-w-xs z-10 pb-8 flex flex-col items-center">
        <button 
          onClick={() => setShowHub(true)}
          className="white-glass-button w-full text-black font-bold py-4 rounded-full text-[16px] mb-6 shadow-xl"
        >
          Get Started
        </button>
        <p className="text-white/50 text-[11px] text-center leading-tight">
          By continuing, you accept the <span className="text-white font-medium cursor-pointer">User Agreement</span> and <span className="text-white font-medium cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </main>
  );
}
