"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

type Tab = 'hub' | 'store' | 'socket';

export default function HubView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const { user } = useStore();
  const hasPlugins = user?.activePlugins.length! > 0;

  const getSliderPos = () => {
    if (activeTab === 'hub') return 'left: 4px; width: 32%;';
    if (activeTab === 'store') return 'left: 34%; width: 32%;';
    return 'left: 64%; width: 32%;';
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black">
      {/* Контент в зависимости от вкладки */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {activeTab === 'hub' && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {!hasPlugins ? (
              <div className="glass-card w-full aspect-square rounded-[40px] flex flex-col items-center justify-center p-8 text-center">
                <div className="relative w-48 h-48 mb-6">
                  <Image src="/Pics/Duck.PNG" alt="Empty" fill className="object-contain" />
                </div>
                <h2 className="text-xl font-bold mb-2">Пустовато...</h2>
                <p className="text-white/50 text-sm">Добавь свой первый плагин в магазине</p>
              </div>
            ) : (
              <div className="text-white text-center">Список плагинов (В разработке)</div>
            )}
          </div>
        )}
        
        {activeTab === 'store' && <div className="text-white">Store View</div>}
        {activeTab === 'socket' && <div className="text-white">Dev Socket</div>}
      </div>

      {/* Твой Таббар */}
      <div className="t-wrap">
        <div className="tbar">
          <div className="slid" style={{ cssText: getSliderPos() }} />
          
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
