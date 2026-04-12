"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Tab = 'hub' | 'store' | 'socket';

export default function HubView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const { user, setUser } = useStore();
  
  // Состояния для хранения данных анимаций
  const [icons, setIcons] = useState<Record<string, any>>({});

  useEffect(() => {
    // 1. Настройка Telegram
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
          photoUrl: tgUser.photo_url,
          plan: user?.plan || 'Free',
          activePlugins: user?.activePlugins || []
        });
      }
    }

    // 2. Загрузка иконок через fetch (безопасно для билда)
    const loadIcons = async () => {
      try {
        const [hub, store, socket] = await Promise.all([
          fetch('/Icons/Hub.json').then(res => res.json()),
          fetch('/Icons/Store.json').then(res => res.json()),
          fetch('/Icons/Socket.json').then(res => res.json())
        ]);
        setIcons({ hub, store, socket });
      } catch (e) {
        console.error("Ошибка загрузки иконок:", e);
      }
    };
    loadIcons();
  }, []);

  const hasPlugins = user?.activePlugins?.length > 0;
  const userPlan = user?.plan || 'Free';

  const getSliderStyle = () => {
    const step = 100 / 3;
    const shift = activeTab === 'hub' ? 0 : activeTab === 'store' ? step : step * 2;
    return { left: `calc(${shift}% + 4px)`, width: `calc(${step}% - 8px)` };
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black overflow-hidden h-screen">
      
      {/* HEADER */}
      <div style={{ paddingTop: 'calc(env(safe-area-inset-top) + 50px)' }} className="px-6 flex items-center justify-between w-full z-10">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl">
             <Image src="/Pics/BoxLogo.PNG" alt="Logo" fill className="object-cover" />
          </div>
          <div className="relative flex items-center">
            <h1 className="text-[22px] font-bold tracking-tight text-white">PluginBox</h1>
            <div className="plan-badge ml-2 uppercase">
              {userPlan}
            </div>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden relative glass-card">
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[13px] font-bold text-white">
              {(user?.firstName || user?.username || 'U').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="px-6 mt-6 flex gap-2 w-full z-10">
        <div className="flex-1 h-11 glass-card rounded-full flex items-center px-4 gap-3">
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for plugins..." 
            className="bg-transparent border-none outline-none text-[15px] text-white placeholder:text-white/30 w-full"
          />
        </div>
        <div className="h-11 px-5 glass-card rounded-full flex items-center gap-2 active:scale-95 transition-transform">
          <span className="text-[14px] font-medium text-white/80">All</span>
          <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col px-6 justify-center pb-20">
        {activeTab === 'hub' && (
          <div className="w-full">
            {!hasPlugins ? (
              <div className="glass-card w-full rounded-[48px] flex flex-col items-center justify-center p-10 text-center">
                <div className="relative w-40 h-40 mb-8">
                  <Image src="/Pics/EmptyHub.PNG" alt="Empty" fill className="object-contain" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Your Hub is Empty</h2>
                <p className="text-white/40 text-[15px] leading-relaxed max-w-[220px]">
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
              <div className="text-center text-white/30">Plugin list here...</div>
            )}
          </div>
        )}
        {activeTab === 'store' && <div className="text-white/30 text-center">Store coming soon</div>}
        {activeTab === 'socket' && <div className="text-white/30 text-center">Socket ready</div>}
      </div>

      {/* TABBAR */}
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
    <button onClick={onClick} className={`t-item ${isActive ? 'active' : ''}`}>
      <div className="w-6 h-6">
        {icon && <Lottie animationData={icon} loop={isActive} />}
      </div>
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </button>
  );
}
