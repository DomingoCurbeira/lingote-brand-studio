import React from 'react';
import { BrandProfile, TastingData, StickerFormat, QrConfig } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { getFinalQrUrl } from '../utils/qrHelper';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface CapsuleStickerViewProps {
  brand: BrandProfile;
  tasting: TastingData;
  format: StickerFormat;
  qr: QrConfig;
}

export const CapsuleStickerView: React.FC<CapsuleStickerViewProps> = ({
  brand,
  tasting,
  format,
  qr,
}) => {
  const qrUrl = getFinalQrUrl(qr);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* SECCIÓN 1: VISTA EXACTA EN TAMAÑO REAL PARA IMPRESIÓN */}
      <div className="flex flex-col items-center">
        <span className="no-print text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
          Diseño en Escala Milimétrica Exacta
        </span>

        {/* 1. STICKER CIRCULAR DE TAPA (35 mm o 45 mm) */}
        {(format === 'capsule-lid-35' || format === 'capsule-lid-45') && (
          (() => {
            const sizeMm = format === 'capsule-lid-35' ? 35 : 45;
            return (
              <div
                className="relative rounded-full shadow-2xl overflow-hidden flex flex-col items-center justify-between p-2 select-none transition-all"
                style={{
                  width: `${sizeMm}mm`,
                  height: `${sizeMm}mm`,
                  backgroundColor: brand.cardBgColor,
                  color: brand.textColor,
                  border: `1.5px solid ${brand.borderColor}`,
                  boxSizing: 'border-box',
                }}
              >
                {/* Borde concéntrico interior punteado */}
                <div
                  className="absolute inset-[1.5mm] rounded-full pointer-events-none"
                  style={{ border: `0.8px dashed ${brand.borderColor}66` }}
                />

                {/* Encabezado: Marca */}
                <div className="mt-1 flex flex-col items-center relative z-10">
                  <span
                    className="text-[5px] font-black uppercase tracking-[0.25em] leading-none"
                    style={{ color: brand.accentColor }}
                  >
                    {brand.brandName}
                  </span>
                </div>

                {/* Centro: Logo + Nombre del Producto */}
                <div className="my-auto flex flex-col items-center justify-center text-center relative z-10 px-1">
                  <img
                    src={brand.logoUrl}
                    alt="Logo"
                    className="w-5 h-5 object-contain mb-0.5 filter drop-shadow"
                    style={{ transform: `scale(${brand.logoScale})` }}
                  />
                  <h4
                    className="text-[7.5px] font-black uppercase tracking-tight leading-tight line-clamp-2 max-w-[28mm]"
                    style={{ color: brand.textColor }}
                  >
                    {tasting.sampleName}
                  </h4>
                  <span
                    className="text-[4.5px] font-bold uppercase tracking-wider opacity-80 mt-0.5"
                    style={{ color: brand.accentColor }}
                  >
                    {tasting.badge}
                  </span>
                </div>

                {/* Pie: Lote / Capacidad */}
                <div className="mb-1 text-center relative z-10 leading-none">
                  <span className="text-[4.5px] font-mono font-bold opacity-60">
                    {tasting.lot} • {tasting.volume}
                  </span>
                </div>
              </div>
            );
          })()
        )}

        {/* 2. FAJA PRECINTO DE SEGURIDAD (18 × 80 mm) */}
        {format === 'security-strap' && (
          <div
            className="relative shadow-2xl overflow-hidden flex items-center justify-between px-3 py-1 select-none transition-all"
            style={{
              width: '80mm',
              height: '18mm',
              backgroundColor: brand.cardBgColor,
              color: brand.textColor,
              border: `1.5px solid ${brand.borderColor}`,
              borderRadius: '2mm',
              boxSizing: 'border-box',
            }}
          >
            {/* Líneas de seguridad superior e inferior */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: brand.accentColor }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: brand.accentColor }}
            />

            {/* Extremo Izquierdo: Icono de seguridad y texto */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ShieldCheck size={14} style={{ color: brand.accentColor }} />
              <div className="text-left">
                <span className="text-[5.5px] font-black uppercase tracking-wider block leading-none">
                  SELLO DE SEGURIDAD
                </span>
                <span className="text-[4.5px] font-bold uppercase tracking-widest opacity-60 block mt-0.5 leading-none">
                  Garantía de Frescura
                </span>
              </div>
            </div>

            {/* Centro: Logo y Marca */}
            <div className="flex items-center gap-1.5 px-2 border-x" style={{ borderColor: `${brand.borderColor}30` }}>
              <img
                src={brand.logoUrl}
                alt="Logo"
                className="w-4 h-4 object-contain"
                style={{ transform: `scale(${brand.logoScale})` }}
              />
              <div className="text-center">
                <span
                  className="text-[6.5px] font-black uppercase tracking-widest block leading-none"
                  style={{ color: brand.textColor }}
                >
                  {brand.brandName}
                </span>
                <span
                  className="text-[4.5px] font-extrabold uppercase tracking-tight block leading-none mt-0.5"
                  style={{ color: brand.accentColor }}
                >
                  {tasting.sampleName}
                </span>
              </div>
            </div>

            {/* Extremo Derecho: Mini QR o claim */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="bg-white p-0.5 rounded">
                <QRCodeSVG value={qrUrl} size={13} level="L" fgColor="#000000" bgColor="#FFFFFF" />
              </div>
              <div className="text-right">
                <span className="text-[5px] font-black uppercase tracking-wider block leading-none">
                  Degustación
                </span>
                <span className="text-[4px] font-mono opacity-60 block mt-0.5 leading-none">
                  {tasting.lot}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. ETIQUETA CUADRADA PARA CAJA O BOLSA (50 × 50 mm) */}
        {format === 'tasting-badge-50' && (
          <div
            className="relative shadow-2xl overflow-hidden flex flex-col justify-between p-3 select-none transition-all text-left"
            style={{
              width: '50mm',
              height: '50mm',
              backgroundColor: brand.cardBgColor,
              color: brand.textColor,
              border: `1.5px solid ${brand.borderColor}`,
              borderRadius: '3mm',
              boxSizing: 'border-box',
            }}
          >
            {/* Encabezado */}
            <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: `${brand.borderColor}40` }}>
              <div className="flex items-center gap-1.5">
                <img
                  src={brand.logoUrl}
                  alt="Logo"
                  className="w-5 h-5 object-contain"
                  style={{ transform: `scale(${brand.logoScale})` }}
                />
                <div>
                  <h4 className="text-[6.5px] font-black uppercase tracking-wider leading-none">
                    {brand.brandName}
                  </h4>
                  <span className="text-[5px] font-bold uppercase tracking-tight opacity-70" style={{ color: brand.accentColor }}>
                    {tasting.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Cuerpo */}
            <div className="my-1 space-y-1">
              <h3 className="text-[9px] font-black uppercase tracking-tight leading-tight" style={{ color: brand.accentColor }}>
                {tasting.sampleName}
              </h3>
              <p className="text-[5.5px] font-medium leading-tight opacity-90">
                {tasting.instructions}
              </p>
              {tasting.allergens && (
                <p className="text-[5px] font-black text-red-400 uppercase tracking-tight">
                  {tasting.allergens}
                </p>
              )}
            </div>

            {/* Pie con Mini QR y Lote */}
            <div className="flex items-center justify-between border-t pt-1" style={{ borderColor: `${brand.borderColor}40` }}>
              <div className="space-y-0.5 text-[5px] font-mono opacity-70">
                <div>LOTE: {tasting.lot}</div>
                <div>FECHA: {tasting.date}</div>
              </div>
              <div className="bg-white p-0.5 rounded shadow">
                <QRCodeSVG value={qrUrl} size={20} level="M" fgColor="#000000" bgColor="#FFFFFF" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN 2: SIMULADOR REALISTA EN CÁPSULA / VASO SOUFFLÉ DE 28 ML */}
      <div className="no-print w-full max-w-xl bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-wider text-amber-400">
          <Sparkles size={14} />
          <span>Simulador Real en Cápsula Soufflé (28 ml / 1 oz)</span>
        </div>

        {/* Contenedor del Mockup */}
        <div className="relative w-72 h-56 flex items-center justify-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4">
          {/* Imagen real del envase soufflé */}
          <img
            src="/682-product-62d5e3720c05f-13460000010-envases-costarica-envase-de-plastico-suffle-28-ml-1-1.png"
            alt="Cápsula Souffle 28ml"
            className="w-48 h-48 object-contain filter drop-shadow-2xl"
          />

          {/* Superposición del Sticker Circular en la Tapa */}
          <div
            className="absolute top-10 w-20 h-20 rounded-full border border-amber-400 shadow-xl flex flex-col items-center justify-center p-1 text-center pointer-events-none transform -rotate-2"
            style={{
              backgroundColor: brand.cardBgColor,
              color: brand.textColor,
            }}
          >
            <img
              src={brand.logoUrl}
              alt="Logo"
              className="w-5 h-5 object-contain mb-0.5"
              style={{ transform: `scale(${brand.logoScale})` }}
            />
            <span className="text-[6.5px] font-black uppercase tracking-tight leading-none line-clamp-1 px-1" style={{ color: brand.textColor }}>
              {tasting.sampleName}
            </span>
            <span className="text-[4.5px] font-black uppercase tracking-widest mt-0.5" style={{ color: brand.accentColor }}>
              {tasting.badge}
            </span>
          </div>

          {/* Superposición de la Faja Precinto si está activa o de muestra */}
          {format === 'security-strap' && (
            <div
              className="absolute top-18 w-44 h-5 border border-emerald-400 shadow-lg flex items-center justify-between px-2 text-[5px] font-black uppercase pointer-events-none transform rotate-3 rounded"
              style={{
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
              }}
            >
              <span style={{ color: brand.accentColor }}>🔒 FRESCURA</span>
              <span>{brand.brandName}</span>
              <span className="text-emerald-400">100% ARTESANAL</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span>Dimensiones calibradas para envases comerciales estándar de Costa Rica (28 ml a 60 ml).</span>
        </div>
      </div>
    </div>
  );
};
