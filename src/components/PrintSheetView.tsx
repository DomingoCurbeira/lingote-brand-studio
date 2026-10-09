import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BrandProfile, ContactData, QrConfig, TastingData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { getFinalQrUrl } from '../utils/qrHelper';
import { ShieldCheck, Printer, Scissors, Layers, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface PrintSheetViewProps {
  brand: BrandProfile;
  contact: ContactData;
  qr: QrConfig;
  tasting: TastingData;
  onPrint: () => void;
}

export type SheetType =
  | 'cards-front'
  | 'cards-back'
  | 'stickers-capsule'
  | 'stickers-capsule-45'
  | 'security-straps'
  | 'tasting-badges';

// Componente reusable con el diseño exacto del pliego
export const SheetContent: React.FC<{
  sheetType: SheetType;
  brand: BrandProfile;
  contact: ContactData;
  qr: QrConfig;
  tasting: TastingData;
  qrUrl: string;
}> = ({ sheetType, brand, contact, qr, tasting, qrUrl }) => {
  return (
    <div
      className="bg-white text-slate-900 mx-auto select-none"
      style={{
        width: '215.9mm',
        minHeight: '269mm',
        boxSizing: 'border-box',
        padding: '3mm 4mm',
      }}
    >
      {/* ENCABEZADO TÉCNICO DISCRETO */}
      <div className="flex justify-between items-center text-[7px] font-mono text-slate-400 pb-1.5 mb-2 border-b border-slate-200 leading-none">
        <span>PRODUCCIÓN: {brand.brandName} • LOTE: {tasting.lot}</span>
        <span>ESCALA 100% • HOJA CARTA (215.9 × 279.4 mm)</span>
      </div>

      {/* 1. PLIEGO DE TARJETAS DE PRESENTACIÓN (10 unidades: 2 cols x 5 filas) */}
      {(sheetType === 'cards-front' || sheetType === 'cards-back') && (
        <div className="grid grid-cols-2 gap-x-[4mm] gap-y-[2mm] justify-center items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="print-card-item relative overflow-hidden border border-dashed border-slate-300"
              style={{
                width: '90mm',
                height: '50mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                boxSizing: 'border-box',
              }}
            >
              {sheetType === 'cards-front' ? (
                /* FRENTE */
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center relative">
                  <div
                    className="absolute inset-[2mm] pointer-events-none"
                    style={{ border: `1px solid ${brand.borderColor}40` }}
                  />
                  <div className="h-[15mm] flex items-center justify-center mb-1">
                    <img
                      src={brand.logoUrl}
                      alt="Logo"
                      className="max-h-full max-w-[40mm] object-contain"
                      style={{ transform: `scale(${brand.logoScale})` }}
                    />
                  </div>
                  <h2
                    className="text-[11px] font-black uppercase tracking-[0.2em] leading-tight"
                    style={{ color: brand.textColor }}
                  >
                    {brand.brandName}
                  </h2>
                  <p
                    className="text-[7px] font-black uppercase tracking-widest mt-1"
                    style={{ color: brand.accentColor }}
                  >
                    {brand.tagline}
                  </p>
                </div>
              ) : (
                /* DORSO */
                <div className="w-full h-full p-3 flex items-center justify-between gap-2 relative">
                  <div
                    className="absolute inset-[2mm] pointer-events-none"
                    style={{ border: `1px solid ${brand.borderColor}40` }}
                  />
                  <div className="flex-1 text-left space-y-1">
                    <h3 className="text-[10px] font-black tracking-wider leading-none" style={{ color: brand.textColor }}>
                      {contact.personName}
                    </h3>
                    <p className="text-[6.5px] font-bold uppercase tracking-wider leading-none" style={{ color: brand.accentColor }}>
                      {contact.role}
                    </p>
                    <div className="space-y-0.5 text-[6px] font-medium pt-1 opacity-90">
                      {contact.phone && <div>📞 {contact.phone}</div>}
                      {contact.instagram && <div>📱 Redes: {contact.instagram}</div>}
                      {contact.sinpe && (
                        <div className="text-[5.5px] font-black uppercase mt-1" style={{ color: brand.accentColor }}>
                          {contact.sinpe}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center justify-center pl-2">
                    <div className="bg-white p-0.5 rounded shadow">
                      <QRCodeSVG value={qrUrl} size={65} level="M" fgColor="#000000" bgColor="#FFFFFF" />
                    </div>
                    <span className="text-[5px] font-black uppercase mt-0.5" style={{ color: brand.accentColor }}>
                      {qr.callToAction}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2. PLIEGO DE STICKERS CIRCULARES DE CÁPSULA (24 unidades: 4 cols x 6 filas) */}
      {sheetType === 'stickers-capsule' && (
        <div className="grid grid-cols-4 gap-x-[4mm] gap-y-[3mm] justify-items-center items-center py-1">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="print-card-item relative rounded-full shadow-sm overflow-hidden flex flex-col items-center justify-between p-1.5 select-none"
              style={{
                width: '35mm',
                height: '35mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                border: `1.2px solid ${brand.borderColor}`,
                boxSizing: 'border-box',
              }}
            >
              <div
                className="absolute inset-[1.5mm] rounded-full pointer-events-none"
                style={{ border: `0.7px dashed ${brand.borderColor}66` }}
              />
              <span className="text-[4.5px] font-black uppercase tracking-widest mt-0.5" style={{ color: brand.accentColor }}>
                {brand.brandName}
              </span>
              <div className="my-auto text-center px-1">
                <img
                  src={brand.logoUrl}
                  alt="Logo"
                  className="w-4 h-4 object-contain mx-auto mb-0.5"
                  style={{ transform: `scale(${brand.logoScale})` }}
                />
                <h5 className="text-[6.5px] font-black uppercase leading-tight line-clamp-1" style={{ color: brand.textColor }}>
                  {tasting.sampleName}
                </h5>
                <span className="text-[4px] font-bold uppercase tracking-wider" style={{ color: brand.accentColor }}>
                  {tasting.badge}
                </span>
              </div>
              <span className="text-[4px] font-mono opacity-60 mb-0.5">
                {tasting.lot} • {tasting.volume}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 3. PLIEGO DE FAJAS PRECINTO (24 unidades: 2 cols x 12 filas) */}
      {sheetType === 'security-straps' && (
        <div className="grid grid-cols-2 gap-x-[4mm] gap-y-[2mm] justify-items-center items-center py-1">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="print-card-item relative shadow-sm overflow-hidden flex items-center justify-between px-2.5 py-1 select-none"
              style={{
                width: '80mm',
                height: '18mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                border: `1.2px solid ${brand.borderColor}`,
                borderRadius: '1.5mm',
                boxSizing: 'border-box',
              }}
            >
              <div className="flex items-center gap-1 shrink-0">
                <ShieldCheck size={12} style={{ color: brand.accentColor }} />
                <div className="text-left">
                  <span className="text-[5px] font-black uppercase tracking-wider block leading-none">
                    PRECINTO
                  </span>
                  <span className="text-[4px] opacity-70 block mt-0.5 leading-none">
                    Frescura
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-1.5 border-x" style={{ borderColor: `${brand.borderColor}30` }}>
                <img
                  src={brand.logoUrl}
                  alt="Logo"
                  className="w-3.5 h-3.5 object-contain"
                  style={{ transform: `scale(${brand.logoScale})` }}
                />
                <div className="text-center">
                  <span className="text-[5.5px] font-black uppercase block leading-none" style={{ color: brand.textColor }}>
                    {brand.brandName}
                  </span>
                  <span className="text-[4px] font-bold uppercase block leading-none mt-0.5" style={{ color: brand.accentColor }}>
                    {tasting.sampleName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <div className="bg-white p-0.5 rounded">
                  <QRCodeSVG value={qrUrl} size={11} level="L" fgColor="#000000" bgColor="#FFFFFF" />
                </div>
                <div className="text-right">
                  <span className="text-[4px] font-mono opacity-70 block">
                    {tasting.lot}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. PLIEGO DE STICKERS CIRCULARES MEDIANOS Ø 45 mm (20 unidades: 4 cols x 5 filas) */}
      {sheetType === 'stickers-capsule-45' && (
        <div className="grid grid-cols-4 gap-x-[5mm] gap-y-[3mm] justify-items-center items-center py-1">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="print-card-item relative rounded-full shadow-sm overflow-hidden flex flex-col items-center justify-between p-2 select-none"
              style={{
                width: '45mm',
                height: '45mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                border: `1.2px solid ${brand.borderColor}`,
                boxSizing: 'border-box',
              }}
            >
              <div
                className="absolute inset-[1.5mm] rounded-full pointer-events-none"
                style={{ border: `0.7px dashed ${brand.borderColor}66` }}
              />
              <span className="text-[5.5px] font-black uppercase tracking-widest mt-0.5" style={{ color: brand.accentColor }}>
                {brand.brandName}
              </span>
              <div className="my-auto text-center px-1">
                <img
                  src={brand.logoUrl}
                  alt="Logo"
                  className="w-5 h-5 object-contain mx-auto mb-0.5"
                  style={{ transform: `scale(${brand.logoScale})` }}
                />
                <h5 className="text-[7.5px] font-black uppercase leading-tight line-clamp-1" style={{ color: brand.textColor }}>
                  {tasting.sampleName}
                </h5>
                <span className="text-[4.5px] font-bold uppercase tracking-wider" style={{ color: brand.accentColor }}>
                  {tasting.badge}
                </span>
              </div>
              <span className="text-[4.5px] font-mono opacity-60 mb-0.5">
                {tasting.lot} • {tasting.volume}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 5. PLIEGO DE ETIQUETAS CUADRADAS 50 × 50 mm (15 unidades: 3 cols x 5 filas) */}
      {sheetType === 'tasting-badges' && (
        <div className="grid grid-cols-3 gap-x-[5mm] gap-y-[2.5mm] justify-items-center items-center py-1">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="print-card-item relative shadow-sm overflow-hidden flex flex-col justify-between p-2.5 select-none text-left border border-dashed border-slate-300"
              style={{
                width: '50mm',
                height: '50mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                borderRadius: '2mm',
                boxSizing: 'border-box',
              }}
            >
              {/* Encabezado */}
              <div className="flex items-center justify-between border-b pb-1" style={{ borderColor: `${brand.borderColor}40` }}>
                <div className="flex items-center gap-1.5">
                  <img
                    src={brand.logoUrl}
                    alt="Logo"
                    className="w-4 h-4 object-contain"
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
              <div className="my-0.5 space-y-0.5">
                <h3 className="text-[8px] font-black uppercase tracking-tight leading-tight line-clamp-1" style={{ color: brand.accentColor }}>
                  {tasting.sampleName}
                </h3>
                <p className="text-[5px] font-medium leading-tight opacity-90 line-clamp-2">
                  {tasting.instructions}
                </p>
                {tasting.allergens && (
                  <p className="text-[4.5px] font-black text-red-500 uppercase tracking-tight line-clamp-1">
                    {tasting.allergens}
                  </p>
                )}
              </div>

              {/* Pie con Mini QR y Lote */}
              <div className="flex items-center justify-between border-t pt-1" style={{ borderColor: `${brand.borderColor}40` }}>
                <div className="space-y-0.5 text-[4.5px] font-mono opacity-70">
                  <div>LOTE: {tasting.lot}</div>
                  <div>FECHA: {tasting.date}</div>
                </div>
                <div className="bg-white p-0.5 rounded shadow">
                  <QRCodeSVG value={qrUrl} size={17} level="M" fgColor="#000000" bgColor="#FFFFFF" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const PrintSheetView: React.FC<PrintSheetViewProps> = ({
  brand,
  contact,
  qr,
  tasting,
  onPrint,
}) => {
  const [sheetType, setSheetType] = useState<SheetType>('cards-front');
  const [zoomLevel, setZoomLevel] = useState<number>(0.75); // 75% para que quepa en pantalla completa
  const qrUrl = getFinalQrUrl(qr);

  // Portal directo a #print-root para asegurar que la impresión NUNCA sufra cortes de CSS de la app
  const printRoot = document.getElementById('print-root');

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* BARRA DE CONFIGURACIÓN DEL PLIEGO (no imprimible) */}
      <div className="no-print w-full bg-slate-900/90 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-amber-400" />
          <div className="text-left">
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              Pliego de Impresión (Hoja Carta)
            </h3>
            <p className="text-[10px] text-slate-400">
              {sheetType === 'cards-front' && '10 tarjetas frente (90 × 50 mm) con marcas de corte'}
              {sheetType === 'cards-back' && '10 tarjetas dorso (90 × 50 mm) con QR dinámico'}
              {sheetType === 'stickers-capsule' && '24 tapas Ø 35 mm (vasos 1 oz / 28 ml)'}
              {sheetType === 'stickers-capsule-45' && '20 tapas medianas Ø 45 mm (vasos 2 oz / 50 ml)'}
              {sheetType === 'security-straps' && '24 fajas precinto de seguridad (18 × 80 mm)'}
              {sheetType === 'tasting-badges' && '15 etiquetas cuadradas (50 × 50 mm) para bolsas/cajas'}
            </p>
          </div>
        </div>

        {/* Selector de Pliego */}
        <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs gap-1">
          <button
            onClick={() => setSheetType('cards-front')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sheetType === 'cards-front' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tarjetas Frente x10
          </button>
          <button
            onClick={() => setSheetType('cards-back')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sheetType === 'cards-back' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tarjetas Dorso x10
          </button>
          <button
            onClick={() => setSheetType('stickers-capsule')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sheetType === 'stickers-capsule' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tapa 35mm x24
          </button>
          <button
            onClick={() => setSheetType('stickers-capsule-45')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sheetType === 'stickers-capsule-45' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tapa 45mm x20
          </button>
          <button
            onClick={() => setSheetType('security-straps')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sheetType === 'security-straps' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fajas Precinto x24
          </button>
          <button
            onClick={() => setSheetType('tasting-badges')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              sheetType === 'tasting-badges' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Etiquetas 50mm x15
          </button>
        </div>

        {/* Controles de Zoom en pantalla + Botón Imprimir */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs text-slate-300 gap-1.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.1))}
              className="p-1 hover:text-white cursor-pointer"
              title="Reducir zoom"
            >
              <ZoomOut size={14} />
            </button>
            <span className="font-mono text-[11px] font-bold w-10 text-center text-amber-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.1))}
              className="p-1 hover:text-white cursor-pointer"
              title="Aumentar zoom"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(0.72)}
              className="p-1 hover:text-amber-400 cursor-pointer text-slate-400"
              title="Ajustar a pantalla"
            >
              <Maximize2 size={13} />
            </button>
          </div>

          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
          >
            <Printer size={15} />
            <span>IMPRIMIR PLIEGO</span>
          </button>
        </div>
      </div>

      <div className="no-print flex items-center gap-2 text-xs text-slate-400">
        <Scissors size={14} className="text-amber-400" />
        <span>Las líneas punteadas indican las marcas de corte para guillotina. Escala real al imprimir: 100%.</span>
      </div>

      {/* PREVISUALIZADOR EN PANTALLA CON ZOOM ESCALADO */}
      <div className="no-print w-full flex justify-center py-2 overflow-auto max-h-[750px] rounded-2xl bg-slate-950/40 p-4 border border-slate-800/60 shadow-inner">
        <div
          className="shadow-2xl transition-transform origin-top border border-slate-300 rounded-lg bg-white"
          style={{
            transform: `scale(${zoomLevel})`,
            marginBottom: `${(1 - zoomLevel) * -240}px`,
          }}
        >
          <SheetContent
            sheetType={sheetType}
            brand={brand}
            contact={contact}
            qr={qr}
            tasting={tasting}
            qrUrl={qrUrl}
          />
        </div>
      </div>

      {/* PORTAL REAL PARA @media print: Se adjunta a #print-root (independiente de #root) */}
      {printRoot &&
        createPortal(
          <SheetContent
            sheetType={sheetType}
            brand={brand}
            contact={contact}
            qr={qr}
            tasting={tasting}
            qrUrl={qrUrl}
          />,
          printRoot
        )}
    </div>
  );
};
