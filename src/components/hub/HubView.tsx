"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

type Tab = 'hub' | 'store' | 'socket';

export default function HubView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const { user } = useStore();
  
  const hasPlugins = user?.activePlugins ? user.activePlugins.length > 0 : false;
  const userPlan = user?.plan || 'Free';

  const getSliderStyle = () => {
    const step = 100 / 3;
    let shift = activeTab === 'hub' ? 0 : activeTab === 'store' ? step : step * 2;
    return {
      left: `calc(${shift}% + 4px)`,
      width: `calc(${step}% - 8px)`
    };
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black overflow-hidden h-screen">
      {/* HEADER с учетом Fullscreen (pt-12) */}
      <div className="pt-12 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl">
             <Image src="/Pics/BoxLogo.PNG" alt="Logo" fill className="object-cover" />
          </div>
          <div className="relative flex items-start">
            <h1 className="text-[22px] font-bold tracking-tight text-white">PluginBox</h1>
            <div className="plan-badge ml-1.5 mt-1">
              {userPlan}
            </div>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden relative">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white">
            {(user?.firstName || user?.username || 'U').charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="px-6 mt-6 flex gap-2 w-full">
        <div className="flex-1 h-10 glass-card rounded-full flex items-center px-4 gap-2">
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for plugins..." 
            className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-white/30 w-full"
          />
        </div>
        <div className="h-10 px-4 glass-card rounded-full flex items-center gap-2 active:scale-95 transition-transform cursor-pointer">
          <span className="text-[13px] font-medium text-white/80 whitespace-nowrap">All Plugs</span>
          <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* CONTENT - По центру (justify-center) */}
      <div className="flex-1 flex flex-col px-6 justify-center overflow-y-auto pb-40">
        {activeTab === 'hub' && (
          <div className="w-full">
            {!hasPlugins ? (
              <div className="glass-card w-full rounded-[40px] flex flex-col items-center justify-center p-10 text-center">
                <div className="relative w-44 h-44 mb-8">
                  <Image 
                    src="/Pics/EmptyHub.PNG" 
                    alt="Empty State" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <h2 className="text-2xl font-bold mb-3">Your Hub is Empty</h2>
                <p className="text-white/40 text-[15px] leading-relaxed max-w-[240px]">
                  Explore the Store to find and install your first plugins.
                </p>
                <button 
                  onClick={() => setActiveTab('store')}
                  className="white-glass-button mt-8 w-full py-4 font-bold text-[16px]"
                >
                  Browse Plugins
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {/* Список плагинов */}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'store' && <div className="text-white/30 text-center">Store is empty</div>}
        {activeTab === 'socket' && <div className="text-white/30 text-center">Waiting for connection...</div>}
      </div>

      {/* TABBAR */}
      <div className="t-wrap">
        <div className="tbar">
          <div className="slid" style={getSliderStyle()} />
          
          <button onClick={() => setActiveTab('hub')} className={`t-item ${activeTab === 'hub' ? 'active' : ''}`}>
            <span className="text-[20px]">📦</span>
            <span className="t-txt text-[10px] font-medium mt-1">Hub</span>
          </button>

          <button onClick={() => setActiveTab('store')} className={`t-item ${activeTab === 'store' ? 'active' : ''}`}>
            <span className="text-[20px]">🏪</span>
            <span className="t-txt text-[10px] font-medium mt-1">Store</span>
          </button>

          <button onClick={() => setActiveTab('socket')} className={`t-item ${activeTab === 'socket' ? 'active' : ''}`}>
            <span className="text-[20px]">🛠️</span>
            <span className="t-txt text-[10px] font-medium mt-1">Socket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
