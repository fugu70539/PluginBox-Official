"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

type Tab = 'hub' | 'store' | 'socket';

export default function HubView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const { user } = useStore();
  const hasPlugins = user?.activePlugins?.length ? user.activePlugins.length > 0 : false;

  // Исправленная логика слайдера для 3-х элементов
  const getSliderStyle = () => {
    const step = 100 / 3;
    let shift = 0;
    if (activeTab === 'store') shift = step;
    if (activeTab === 'socket') shift = step * 2;
    
    return {
      left: `calc(${shift}% + 4px)`,
      width: `calc(${step}% - 8px)`
    };
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black overflow-hidden h-screen">
      {/* HEADER AREA */}
      <div className="pt-4 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden rounded-lg">
             <Image src="/Pics/Main.PNG" alt="Logo" fill className="object-cover" />
          </div>
          <h1 className="text-[20px] font-bold tracking-tight text-white">PluginBox</h1>
          <div className="bg-blue-500/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">Free</span>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden relative">
          {/* Здесь будет аватарка юзера из Telegram */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER AREA */}
      <div className="px-6 mt-6 flex gap-2 w-full">
        <div className="flex-1 h-10 glass-card rounded-full flex items-center px-4 gap-2">
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for plugins..." 
            className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-white/40 w-full"
          />
        </div>
        <div className="h-10 px-4 glass-card rounded-xl flex items-center gap-2 active:scale-95 transition-transform">
          <span className="text-[13px] font-medium text-white/80 whitespace-nowrap">All Plugs</span>
          <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* MAIN CONTENT (HUB) */}
      <div className="flex-1 flex flex-col px-6 mt-4 overflow-y-auto pb-40">
        {activeTab === 'hub' && (
          <div className="w-full">
            {!hasPlugins ? (
              <div className="glass-card w-full rounded-[40px] flex flex-col items-center justify-center p-8 text-center mt-2">
                <div className="relative w-48 h-48 mb-6">
                  <Image 
                    src="/Pics/EmptyHub.PNG" 
                    alt="Empty State" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">Your Hub is Empty</h2>
                <p className="text-white/40 text-[14px] leading-relaxed max-w-[200px]">
                  Explore the Store to find and install your first plugins.
                </p>
                <button 
                  onClick={() => setActiveTab('store')}
                  className="white-glass-button mt-6 w-full py-3.5 rounded-2xl font-bold text-[15px] text-black"
                >
                  Browse Plugins
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {/* Список плагинов появится здесь */}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'store' && <div className="text-white/40 text-center mt-10">Store is empty</div>}
        {activeTab === 'socket' && <div className="text-white/40 text-center mt-10">Waiting for connection...</div>}
      </div>

      {/* NAVIGATION BAR */}
      <div className="t-wrap">
        <div className="tbar">
          <div className="slid" style={getSliderStyle()} />
          
          <button onClick={() => setActiveTab('hub')} className={`t-item ${activeTab === 'hub' ? 'active' : ''}`}>
            <span className="text-[20px]">📦</span>
            <span className="t-txt">Hub</span>
          </button>

          <button onClick={() => setActiveTab('store')} className={`t-item ${activeTab === 'store' ? 'active' : ''}`}>
            <span className="text-[20px]">🏪</span>
            <span className="t-txt">Store</span>
          </button>

          <button onClick={() => setActiveTab('socket')} className={`t-item ${activeTab === 'socket' ? 'active' : ''}`}>
            <span className="text-[20px]">🛠️</span>
            <span className="t-txt">Socket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
