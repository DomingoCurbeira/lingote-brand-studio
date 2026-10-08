import React, { useState } from 'react';
import { BrandProfile, ContactData, QrConfig, CardSide } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { getFinalQrUrl } from '../utils/qrHelper';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';

interface BusinessCardViewProps {
  brand: BrandProfile;
  contact: ContactData;
  qr: QrConfig;
}

export const BusinessCardView: React.FC<BusinessCardViewProps> = ({ brand, contact, qr }) => {
  const [side, setSide] = useState<CardSide>('both');
  const qrUrl = getFinalQrUrl(qr);

  const getFontClass = () => {
    switch (brand.typography) {
      case 'luxury':
        return 'font-serif tracking-widest';
      case 'serif':
        return 'font-serif tracking-normal';
      case 'mono':
        return 'font-mono tracking-tight';
      default:
        return 'font-sans tracking-normal';
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Controles de vista de tarjeta */}
      <div className="no-print flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1 gap-1 shadow-md">
        <button
          onClick={() => setSide('front')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            side === 'front'
              ? 'bg-amber-500 text-slate-950 font-black shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Ver Frente
        </button>
        <button
          onClick={() => setSide('back')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            side === 'back'
              ? 'bg-amber-500 text-slate-950 font-black shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Ver Dorso
        </button>
        <button
          onClick={() => setSide('both')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            side === 'both'
              ? 'bg-amber-500 text-slate-950 font-black shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Ambas Caras
        </button>
      </div>

      {/* ÁREA DE TARJETAS (Dimensiones reales 90 × 50 mm) */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {/* CARA FRONTAL */}
        {(side === 'front' || side === 'both') && (
          <div className="flex flex-col items-center">
            <span className="no-print text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Frente (90 × 50 mm)
            </span>
            <div
              className={`relative overflow-hidden shadow-2xl transition-all duration-300 ${getFontClass()} select-none`}
              style={{
                width: '90mm',
                height: '50mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                border: `1.5px solid ${brand.borderColor}`,
                borderRadius: '4mm',
                boxSizing: 'border-box',
              }}
            >
              {/* Marco ornamental fino interno */}
              <div
                className="absolute inset-[2.5mm] rounded-[2.5mm] pointer-events-none"
                style={{ border: `1px solid ${brand.borderColor}33` }}
              />

              {/* Esquinas doradas decorativas */}
              <div
                className="absolute top-[3.5mm] left-[3.5mm] w-2 h-2 border-t-2 border-l-2 pointer-events-none"
                style={{ borderColor: brand.accentColor }}
              />
              <div
                className="absolute top-[3.5mm] right-[3.5mm] w-2 h-2 border-t-2 border-r-2 pointer-events-none"
                style={{ borderColor: brand.accentColor }}
              />
              <div
                className="absolute bottom-[3.5mm] left-[3.5mm] w-2 h-2 border-b-2 border-l-2 pointer-events-none"
                style={{ borderColor: brand.accentColor }}
              />
              <div
                className="absolute bottom-[3.5mm] right-[3.5mm] w-2 h-2 border-b-2 border-r-2 pointer-events-none"
                style={{ borderColor: brand.accentColor }}
              />

              {/* Contenido Frontal Centrado */}
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative z-10">
                {/* Logotipo con escala dinámica */}
                <div className="h-[18mm] flex items-center justify-center mb-1">
                  <img
                    src={brand.logoUrl}
                    alt={brand.brandName}
                    className="max-h-full max-w-[45mm] object-contain filter drop-shadow-md transition-transform"
                    style={{ transform: `scale(${brand.logoScale})` }}
                  />
                </div>

                {/* Nombre de Marca */}
                <h2
                  className="text-[13px] font-black uppercase tracking-[0.25em] leading-tight mt-1"
                  style={{ color: brand.textColor }}
                >
                  {brand.brandName}
                </h2>

                {/* Línea divisoria de acento */}
                <div
                  className="w-12 h-[1px] my-1.5 opacity-80"
                  style={{ backgroundColor: brand.accentColor }}
                />

                {/* Tagline */}
                <p
                  className="text-[7.5px] font-extrabold uppercase tracking-[0.2em] leading-none"
                  style={{ color: brand.accentColor }}
                >
                  {brand.tagline}
                </p>

                {/* Subtagline */}
                {brand.subtagline && (
                  <p className="text-[6px] font-semibold uppercase tracking-wider opacity-60 mt-1">
                    {brand.subtagline}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CARA DORSAL (Contacto & QR) */}
        {(side === 'back' || side === 'both') && (
          <div className="flex flex-col items-center">
            <span className="no-print text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Dorso (90 × 50 mm)
            </span>
            <div
              className={`relative overflow-hidden shadow-2xl transition-all duration-300 ${getFontClass()} select-none`}
              style={{
                width: '90mm',
                height: '50mm',
                backgroundColor: brand.cardBgColor,
                color: brand.textColor,
                border: `1.5px solid ${brand.borderColor}`,
                borderRadius: '4mm',
                boxSizing: 'border-box',
              }}
            >
              {/* Marco interno */}
              <div
                className="absolute inset-[2.5mm] rounded-[2.5mm] pointer-events-none"
                style={{ border: `1px solid ${brand.borderColor}33` }}
              />

              {/* Layout dividido: Izquierda (Datos personales) / Derecha (QR dinámico) */}
              <div className="w-full h-full p-4 flex items-center justify-between gap-3 relative z-10">
                {/* Lado Izquierdo: Información de Contacto */}
                <div className="flex-1 flex flex-col justify-between h-full py-0.5 text-left">
                  <div>
                    <h3
                      className="text-[11px] font-black tracking-wider leading-none"
                      style={{ color: brand.textColor }}
                    >
                      {contact.personName}
                    </h3>
                    <p
                      className="text-[7px] font-bold uppercase tracking-wider mt-0.5 leading-tight"
                      style={{ color: brand.accentColor }}
                    >
                      {contact.role}
                    </p>
                    <div
                      className="w-10 h-[1px] my-1.5 opacity-60"
                      style={{ backgroundColor: brand.accentColor }}
                    />
                  </div>

                  {/* Iconos de contacto */}
                  <div className="space-y-1 text-[6.5px] font-medium leading-tight">
                    {contact.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={8} style={{ color: brand.accentColor }} />
                        <span className="font-bold">{contact.phone}</span>
                      </div>
                    )}
                    {contact.instagram && (
                      <div className="flex items-center gap-1.5">
                        <Share2 size={7.5} style={{ color: brand.accentColor }} />
                        <span className="font-semibold">Redes: <strong>{contact.instagram}</strong></span>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-1.5 opacity-80">
                        <Mail size={8} style={{ color: brand.accentColor }} />
                        <span>{contact.email}</span>
                      </div>
                    )}
                    {contact.location && (
                      <div className="flex items-center gap-1.5 opacity-80">
                        <MapPin size={8} style={{ color: brand.accentColor }} />
                        <span>{contact.location}</span>
                      </div>
                    )}
                  </div>

                  {/* SINPE o Pago */}
                  {contact.sinpe && (
                    <div className="pt-0.5">
                      <span
                        className="text-[5.5px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${brand.accentColor}20`,
                          color: brand.accentColor,
                          border: `0.5px solid ${brand.accentColor}50`,
                        }}
                      >
                        {contact.sinpe}
                      </span>
                    </div>
                  )}
                </div>

                {/* Lado Derecho: Código QR en SVG Nítido */}
                <div className="flex flex-col items-center justify-center shrink-0 border-l pl-3" style={{ borderColor: `${brand.borderColor}30` }}>
                  <div className="bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
                    <QRCodeSVG
                      value={qrUrl}
                      size={80}
                      level="M"
                      fgColor="#090D16"
                      bgColor="#FFFFFF"
                    />
                  </div>
                  <span
                    className="text-[5.5px] font-extrabold uppercase tracking-wider text-center max-w-[28mm] mt-1 leading-tight"
                    style={{ color: brand.accentColor }}
                  >
                    {qr.callToAction || 'Escanea el Código'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
