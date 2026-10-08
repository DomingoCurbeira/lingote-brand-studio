import React from 'react';
import { ActiveTab, BrandProfile } from '../types';
import { PRESET_PROFILES } from '../data/presets';
import { CreditCard, Tag, Printer, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  brand: BrandProfile;
  setBrand: React.Dispatch<React.SetStateAction<BrandProfile>>;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  setBrand,
  onPrint,
}) => {
  return (
    <header className="no-print bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 p-1.5">
            <img 
              src="/logo_lingote_oficial_ligero.png" 
              alt="Logo Studio" 
              className="w-full h-full object-contain filter drop-shadow"
              onError={(e) => {
                // Fallback icon if image fails
                (e.target as HTMLElement).style.display = 'none';
              }} 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                LINGOTE BRAND STUDIO
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Universal
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Tarjetas de Presentación & Sellos de Degustación para Cápsulas
            </p>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-2xl border border-slate-800/80 shadow-inner">
          <button
            onClick={() => setActiveTab('business-card')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'business-card'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <CreditCard size={15} />
            <span>Tarjetas de Presentación</span>
          </button>

          <button
            onClick={() => setActiveTab('tasting-stickers')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tasting-stickers'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Tag size={15} />
            <span>Stickers de Degustación</span>
          </button>

          <button
            onClick={() => setActiveTab('print-sheet')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'print-sheet'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Printer size={15} />
            <span>Pliego de Impresión</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Preset Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/60 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Sparkles size={13} className="text-amber-400" />
            <select
              className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
              onChange={(e) => {
                const found = PRESET_PROFILES.find((p) => p.id === e.target.value);
                if (found) setBrand(found);
              }}
              defaultValue="lingote-oficial"
            >
              {PRESET_PROFILES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Printer size={15} />
            <span>IMPRIMIR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
