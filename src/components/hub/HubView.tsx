"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

type Tab = 'hub' | 'store' | 'socket';

export default function HubView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const { user } = useStore();
  const hasPlugins = user?.activePlugins?.length ? user.activePlugins.length > 0 : false;

  // Исправленная функция: возвращаем объект стилей
  const getSliderStyle = () => {
    if (activeTab === 'hub') return { left: '4px', width: '32%' };
    if (activeTab === 'store') return { left: '34%', width: '32%' };
    return { left: '64%', width: '32%' };
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black overflow-hidden">
      <div className="flex-1 flex flex-col p-6 overflow-y-auto pb-32 text-white font-sans">
        {activeTab === 'hub' && (
          <div className="w-full flex flex-col items-center">
            {!hasPlugins ? (
              <div className="glass-card w-full min-h-[450px] rounded-[48px] flex flex-col items-center justify-center p-10 text-center mt-4">
                <div className="relative w-56 h-56 mb-8">
                  <Image 
                    src="/Pics/EmptyHub.PNG" 
                    alt="Empty State" 
                    fill 
                    priority
                    className="object-contain" 
                  />
                </div>
                <h2 className="text-2xl font-bold mb-3">Your Hub is Empty</h2>
                <p className="text-white/40 text-[15px] leading-relaxed max-w-[240px]">
                  Explore the Store to find and install your first plugins.
                </p>
                <button 
                  onClick={() => setActiveTab('store')}
                  className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold text-sm active:scale-95 transition-transform"
                >
                  Go to Store
                </button>
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 gap-4 mt-4 text-white">
                Plugins list coming soon...
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'store' && <div className="text-white text-center mt-20">Store Coming Soon</div>}
        {activeTab === 'socket' && <div className="text-white text-center mt-20">Developer Socket</div>}
      </div>

      <div className="t-wrap">
        <div className="tbar">
          {/* Исправленный вызов стилей */}
          <div className="slid" style={getSliderStyle()} />
          
          <button 
            onClick={() => setActiveTab('hub')}
            className={`t-item ${activeTab === 'hub' ? 'active' : ''}`}
          >
            <span className="text-[20px]">📦</span>
            <span className="t-txt">Hub</span>
          </button>

          <button 
            onClick={() => setActiveTab('store')}
            className={`t-item ${activeTab === 'store' ? 'active' : ''}`}
          >
            <span className="text-[20px]">🏪</span>
            <span className="t-txt">Store</span>
          </button>

          <button 
            onClick={() => setActiveTab('socket')}
            className={`t-item ${activeTab === 'socket' ? 'active' : ''}`}
          >
            <span className="text-[20px]">🛠️</span>
            <span className="t-txt">Socket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
