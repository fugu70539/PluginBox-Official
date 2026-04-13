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
          photoUrl: tgUser.photo_url,
          plan: user?.plan || 'Free',
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
        console.error("Lottie icons not found");
      }
    };
    loadIcons();
  }, []);

  const userPlan = user?.plan || 'Free';

  const getSliderStyle = () => {
    const step = 100 / 3;
    const shift = activeTab === 'hub' ? 0 : activeTab === 'store' ? step : step * 2;
    return { left: `calc(${shift}% + 4px)`, width: `calc(${step}% - 8px)` };
  };

  return (
    <div className="flex-1 flex flex-col relative bg-black overflow-hidden h-screen">
      
      {/* НЕЙТРАЛЬНАЯ ПЛАШКА: От самого верха до середины */}
      <div className="absolute top-0 left-0 right-0 h-[52%] bg-[#121212] rounded-b-[48px] border-b border-white/[0.03] z-0" />

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* HEADER: Центрированный логотип и название */}
        <div style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }} className="px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
             <div className="relative w-6 h-6 opacity-90">
                <Image src="/Pics/BoxLogo.PNG" alt="Logo" fill className="object-cover" />
             </div>
             <h1 className="text-lg font-medium tracking-tight text-white/90">PluginBox</h1>
          </div>
          <div className="plan-badge !text-[9px] !py-0.5 opacity-60">
            {userPlan}
          </div>
        </div>

        {/* АВАТАРКА: Теперь она скромно в углу, не мешая композиции */}
        <div className="absolute top-[calc(env(safe-area-inset-top)+20px)] right-6">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/5 bg-[#1a1a1a]">
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[11px] font-bold text-white/30">
                {(user?.firstName || user?.username || 'U').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* ФИЛЬТР: Слева и ниже заголовка */}
        <div className="px-6 mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-full active:scale-95 transition-transform">
            <span className="text-[13px] font-medium text-white/60">All Plugins</span>
            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ЦЕНТРАЛЬНАЯ ЗОНА (на плашке) */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {activeTab === 'hub' && (
            <div className="relative w-32 h-32 opacity-20 grayscale">
              <Image src="/Pics/EmptyHub.PNG" alt="Empty" fill className="object-contain" />
            </div>
          )}
        </div>

        {/* ПУСТАЯ ЗОНА НИЖЕ ПЛАШКИ (нижняя половина экрана) */}
        <div className="h-[40%] w-full flex items-start justify-center pt-10">
           {/* Здесь пока пусто по твоему запросу */}
        </div>

      </div>

      {/* TABBAR (Стеклянный для акцента на управлении) */}
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
