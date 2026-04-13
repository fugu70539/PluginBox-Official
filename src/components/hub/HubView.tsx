"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { PlanType } from '@/types';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Tab = 'hub' | 'store' | 'socket';

export default function HubView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const { user, setUser } = useStore();
  const [icons, setIcons] = useState<Record<string, any>>({});

  useEffect(() => {
    const tg = typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : null;
    if (tg) {
      tg.ready();
      tg.expand();
      const tgUser = tg.initDataUnsafe?.user;
      if (tgUser) {
        setUser({
          ...user,
          id: tgUser.id.toString(),
          username: tgUser.username || 'user',
          firstName: tgUser.first_name,
          plan: (user?.plan || 'Free') as PlanType,
          activePlugins: user?.activePlugins || []
        });
      }
    }

    const loadIcons = async () => {
      try {
        const [hub, store, socket] = await Promise.all([
          fetch('/Icons/Hub.json').then(res => res.json()),
          fetch('/Icons/Store.json').then(res => res.json()),
          fetch('/Icons/Socket.json').then(res => res.json())
        ]);
        setIcons({ hub, store, socket });
      } catch (e) {
        console.error("Icons failed");
      }
    };
    loadIcons();
  }, []);

  const getSliderStyle = () => {
    const step = 100 / 3;
    const shift = activeTab === 'hub' ? 0 : activeTab === 'store' ? step : step * 2;
    return { left: `calc(${shift}% + 4px)`, width: `calc(${step}% - 8px)` };
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black overflow-hidden h-screen font-[family-name:var(--font-manrope)]">
      
      <div className="absolute top-0 left-0 right-0 h-[52%] bg-[#121212] rounded-b-[40px] border-b border-white/[0.02] z-0" />

      <div className="relative z-10 flex flex-col h-full">
        
        <div 
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 40px)' }} 
          className="px-6 flex flex-col items-center w-full"
        >
          <div className="flex flex-col items-center gap-4">
             <div className="relative w-9 h-9">
                <Image src="/Pics/BoxLogo.PNG" alt="Logo" fill className="object-cover" />
             </div>
             <h1 className="text-[17px] font-semibold tracking-tight text-white/90">
               PluginBox
             </h1>
          </div>
        </div>

        <div className="px-10 mt-14">
          <button className="flex items-center gap-2 group">
            <span className="text-[14px] font-medium text-white/40 group-active:text-white/80 transition-colors">
              All Plugins
            </span>
            <svg className="w-3 h-3 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {activeTab === 'hub' && (
            <div className="relative w-24 h-24 opacity-[0.02] grayscale invert">
              <Image src="/Pics/EmptyHub.PNG" alt="Empty" fill className="object-contain" />
            </div>
          )}
        </div>

        <div className="h-[40%]" />

      </div>

      <div className="t-wrap">
        <div className="tbar">
          <div className="slid" style={getSliderStyle()} />
          <TabItem icon={icons.hub} label="Hub" isActive={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
          <TabItem icon={icons.store} label="Store" isActive={activeTab === 'store'} onClick={() => setActiveTab('store')} />
          <TabItem icon={icons.socket} label="Socket" isActive={activeTab === 'socket'} onClick={() => setActiveTab('socket')} />
        </div>
      </div>
    </div>
  );
}

function TabItem({ icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`t-item transition-all duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
      <div className="w-[22px] h-[22px]">
        {icon && <Lottie animationData={icon} loop={isActive} />}
      </div>
      <span className="text-[9px] font-bold mt-1.5 uppercase tracking-[0.05em]">{label}</span>
    </button>
  );
}
