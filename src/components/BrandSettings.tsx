import React, { useRef } from 'react';
import { BrandProfile, TypographyStyle } from '../types';
import { Upload, RotateCcw, Palette, Type, Image as ImageIcon } from 'lucide-react';

interface BrandSettingsProps {
  brand: BrandProfile;
  setBrand: React.Dispatch<React.SetStateAction<BrandProfile>>;
}

export const BrandSettings: React.FC<BrandSettingsProps> = ({ brand, setBrand }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejador de subida de imagen local (Data URL base64)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBrand((prev) => ({
            ...prev,
            logoUrl: event.target!.result as string,
            isCustomUploadedLogo: true,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Restaurar logo oficial de El Lingote Español
  const handleResetLogo = () => {
    setBrand((prev) => ({
      ...prev,
      logoUrl: '/logo_lingote_oficial_ligero.png',
      logoScale: 1.0,
      isCustomUploadedLogo: false,
    }));
  };

  return (
    <div className="space-y-5 text-left">
      {/* SECCIÓN 1: SUBIR LOGOTIPO DINÁMICO */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <ImageIcon size={14} className="text-amber-400" />
            Logotipo de la Marca
          </label>
          {brand.isCustomUploadedLogo && (
            <button
              onClick={handleResetLogo}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              title="Restaurar logo de El Lingote Español"
            >
              <RotateCcw size={12} />
              Restablecer Oficial
            </button>
          )}
        </div>

        {/* Zona de previsualización y botón de carga */}
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-xl border border-slate-700 flex items-center justify-center p-2 relative overflow-hidden shrink-0 shadow-inner"
            style={{ backgroundColor: brand.cardBgColor }}
          >
            <img
              src={brand.logoUrl}
              alt="Logo Preview"
              className="max-h-full max-w-full object-contain transition-transform"
              style={{ transform: `scale(${brand.logoScale})` }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo_lingote_oficial_ligero.png';
              }}
            />
          </div>

          <div className="flex-1 space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Upload size={14} className="text-amber-400" />
              Subir Logotipo (PNG / SVG / JPG)
            </button>
            <p className="text-[10px] text-slate-400">
              Usa PNG con transparencia para acabados óptimos.
            </p>
          </div>
        </div>

        {/* Control deslizante de escala del logotipo */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-[11px] font-medium text-slate-400 mb-1.5">
            <span>Escala del Logotipo</span>
            <span className="font-mono text-amber-400 font-bold">
              {Math.round(brand.logoScale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={brand.logoScale}
            onChange={(e) =>
              setBrand((prev) => ({ ...prev, logoScale: parseFloat(e.target.value) }))
            }
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      {/* SECCIÓN 2: TEXTOS DE MARCA */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-1">
          <Type size={14} className="text-amber-400" />
          Nombres y Slogans
        </label>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Nombre Comercial
          </label>
          <input
            type="text"
            value={brand.brandName}
            onChange={(e) => setBrand((prev) => ({ ...prev, brandName: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="Ej: EL LINGOTE ESPAÑOL"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Slogan / Especialidad Principal
          </label>
          <input
            type="text"
            value={brand.tagline}
            onChange={(e) => setBrand((prev) => ({ ...prev, tagline: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="Ej: TORTILLAS & PAELLAS ARTESANALES"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Subtítulo / Claim Secundario
          </label>
          <input
            type="text"
            value={brand.subtagline}
            onChange={(e) => setBrand((prev) => ({ ...prev, subtagline: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-normal text-slate-300 focus:outline-none focus:border-amber-500 transition"
            placeholder="Ej: Raíces españolas corazón tico"
          />
        </div>
      </div>

      {/* SECCIÓN 3: PALETA DE COLORES DINÁMICA */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-1">
          <Palette size={14} className="text-amber-400" />
          Colores de Marca
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* Fondo de Tarjeta */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Fondo de Tarjeta
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
              <input
                type="color"
                value={brand.cardBgColor}
                onChange={(e) => setBrand((prev) => ({ ...prev, cardBgColor: e.target.value }))}
                className="w-7 h-7 rounded-lg border-0 bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                {brand.cardBgColor}
              </span>
            </div>
          </div>

          {/* Color de Acento / Oro */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Color de Acento (Oro/Detalle)
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
              <input
                type="color"
                value={brand.accentColor}
                onChange={(e) =>
                  setBrand((prev) => ({
                    ...prev,
                    accentColor: e.target.value,
                    borderColor: e.target.value,
                  }))
                }
                className="w-7 h-7 rounded-lg border-0 bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                {brand.accentColor}
              </span>
            </div>
          </div>

          {/* Texto Principal */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Texto Principal
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
              <input
                type="color"
                value={brand.textColor}
                onChange={(e) => setBrand((prev) => ({ ...prev, textColor: e.target.value }))}
                className="w-7 h-7 rounded-lg border-0 bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                {brand.textColor}
              </span>
            </div>
          </div>

          {/* Borde / Líneas */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Borde Decorativo
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
              <input
                type="color"
                value={brand.borderColor}
                onChange={(e) => setBrand((prev) => ({ ...prev, borderColor: e.target.value }))}
                className="w-7 h-7 rounded-lg border-0 bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                {brand.borderColor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: TIPOGRAFÍA */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-2">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
          Estilo Tipográfico
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { id: 'luxury', label: 'Luxury Serif', font: 'font-serif tracking-widest' },
              { id: 'sans', label: 'Moderna Sans', font: 'font-sans' },
              { id: 'serif', label: 'Rústica Tradicional', font: 'font-serif' },
              { id: 'mono', label: 'Técnica Minimal', font: 'font-mono' },
            ] as { id: TypographyStyle; label: string; font: string }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setBrand((prev) => ({ ...prev, typography: t.id }))}
              className={`p-2.5 rounded-xl text-left border text-xs font-bold transition cursor-pointer ${
                brand.typography === t.id
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className={`block text-xs mb-0.5 ${t.font}`}>EL LINGOTE</span>
              <span className="text-[10px] font-normal opacity-70">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
