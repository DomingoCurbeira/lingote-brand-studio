import React from 'react';
import { TastingData, StickerFormat } from '../types';
import { Utensils, ShieldCheck, Tag, CircleDot, Layers, Calendar } from 'lucide-react';

interface TastingSettingsProps {
  tasting: TastingData;
  setTasting: React.Dispatch<React.SetStateAction<TastingData>>;
  stickerFormat: StickerFormat;
  setStickerFormat: (format: StickerFormat) => void;
}

export const TastingSettings: React.FC<TastingSettingsProps> = ({
  tasting,
  setTasting,
  stickerFormat,
  setStickerFormat,
}) => {
  return (
    <div className="space-y-4 text-left">
      {/* SECCIÓN 1: SELECTOR DE FORMATO FÍSICO */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Layers size={14} className="text-amber-400" />
          Tipo de Empaque / Sello de Degustación
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setStickerFormat('capsule-lid-35')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-2.5 ${
              stickerFormat === 'capsule-lid-35'
                ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            <CircleDot size={18} className="shrink-0 mt-0.5 text-amber-400" />
            <div>
              <div className="text-xs font-extrabold text-white">Tapa Cápsula Ø 35 mm</div>
              <div className="text-[10px] text-slate-400">Para vaso soufflé 28 ml (1 oz)</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStickerFormat('security-strap')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-2.5 ${
              stickerFormat === 'security-strap'
                ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            <ShieldCheck size={18} className="shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <div className="text-xs font-extrabold text-white">Faja Precinto (18×80 mm)</div>
              <div className="text-[10px] text-slate-400">Sello de seguridad que cruza la tapa</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStickerFormat('capsule-lid-45')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-2.5 ${
              stickerFormat === 'capsule-lid-45'
                ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            <CircleDot size={18} className="shrink-0 mt-0.5 text-amber-400" />
            <div>
              <div className="text-xs font-extrabold text-white">Tapa Mediana Ø 45 mm</div>
              <div className="text-[10px] text-slate-400">Para tarros o soufflé de 2 oz</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStickerFormat('tasting-badge-50')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-2.5 ${
              stickerFormat === 'tasting-badge-50'
                ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Tag size={18} className="shrink-0 mt-0.5 text-amber-400" />
            <div>
              <div className="text-xs font-extrabold text-white">Caja / Bolsa (50×50 mm)</div>
              <div className="text-[10px] text-slate-400">Con notas de cata e instrucciones</div>
            </div>
          </button>
        </div>
      </div>

      {/* SECCIÓN 2: INFORMACIÓN DE LA MUESTRA / PRODUCTO */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-1">
          <Utensils size={14} className="text-amber-400" />
          Detalles de la Muestra Gastronómica
        </label>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Nombre del Producto en Muestra
          </label>
          <input
            type="text"
            value={tasting.sampleName}
            onChange={(e) => setTasting((prev) => ({ ...prev, sampleName: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-black text-amber-300 focus:outline-none focus:border-amber-500"
            placeholder="Ej: Lingote Clásico con Cebolla Pochada"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Subtítulo de la Muestra
            </label>
            <input
              type="text"
              value={tasting.sampleSubtitle}
              onChange={(e) => setTasting((prev) => ({ ...prev, sampleSubtitle: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              placeholder="Ej: Tortilla Española Jugosa"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Sello / Distintivo
            </label>
            <input
              type="text"
              value={tasting.badge}
              onChange={(e) => setTasting((prev) => ({ ...prev, badge: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              placeholder="MUESTRA DE DEGUSTACIÓN"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Modo de Consumo / Sugerencia del Chef
          </label>
          <input
            type="text"
            value={tasting.instructions}
            onChange={(e) => setTasting((prev) => ({ ...prev, instructions: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            placeholder="Ej: Servir tibio. Calentar 20 segundos para textura óptima."
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Calendar size={10} />
              Lote
            </label>
            <input
              type="text"
              value={tasting.lot}
              onChange={(e) => setTasting((prev) => ({ ...prev, lot: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-center text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={tasting.date}
              onChange={(e) => setTasting((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Capacidad
            </label>
            <input
              type="text"
              value={tasting.volume}
              onChange={(e) => setTasting((prev) => ({ ...prev, volume: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-bold text-center text-amber-300 focus:outline-none"
              placeholder="28 ml"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Alérgenos Destacados
          </label>
          <input
            type="text"
            value={tasting.allergens}
            onChange={(e) => setTasting((prev) => ({ ...prev, allergens: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-red-400 focus:outline-none focus:border-amber-500"
            placeholder="CONTIENE: HUEVO."
          />
        </div>
      </div>
    </div>
  );
};
