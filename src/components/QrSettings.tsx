import React from 'react';
import { QrConfig } from '../types';
import { QrCode, MessageSquare, Link, Smartphone } from 'lucide-react';

interface QrSettingsProps {
  qr: QrConfig;
  setQr: React.Dispatch<React.SetStateAction<QrConfig>>;
}

export const QrSettings: React.FC<QrSettingsProps> = ({ qr, setQr }) => {
  return (
    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <QrCode size={14} className="text-amber-400" />
          Generador de Código QR Dinámico
        </label>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
          Vector SVG 300 DPI
        </span>
      </div>

      {/* Tipo de enlace QR */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setQr((prev) => ({ ...prev, type: 'whatsapp' }))}
          className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            qr.type === 'whatsapp'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <MessageSquare size={13} />
          WhatsApp con Mensaje
        </button>

        <button
          type="button"
          onClick={() => setQr((prev) => ({ ...prev, type: 'url' }))}
          className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            qr.type === 'url'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Link size={13} />
          URL / Web / Redes
        </button>
      </div>

      {/* Campos dinámicos según el modo */}
      {qr.type === 'whatsapp' ? (
        <div className="space-y-2.5 pt-1">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                País (+506)
              </label>
              <input
                type="text"
                value={qr.whatsappCountry}
                onChange={(e) => setQr((prev) => ({ ...prev, whatsappCountry: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white text-center focus:outline-none focus:border-amber-500"
                placeholder="506"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                Número de WhatsApp
              </label>
              <input
                type="text"
                value={qr.whatsappNumber}
                onChange={(e) => setQr((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                placeholder="72257606"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Mensaje Preconfigurado de Apertura
            </label>
            <textarea
              rows={2}
              value={qr.whatsappMessage}
              onChange={(e) => setQr((prev) => ({ ...prev, whatsappMessage: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
              placeholder="Escribe el mensaje que enviará el cliente al escanear..."
            />
          </div>
        </div>
      ) : (
        <div className="pt-1">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Enlace de Destino (Instagram, Catálogo, Web)
          </label>
          <input
            type="text"
            value={qr.url}
            onChange={(e) => setQr((prev) => ({ ...prev, url: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500"
            placeholder="https://..."
          />
        </div>
      )}

      {/* Llamado a la acción del QR */}
      <div>
        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
          Texto bajo el QR (Call to Action)
        </label>
        <input
          type="text"
          value={qr.callToAction}
          onChange={(e) => setQr((prev) => ({ ...prev, callToAction: e.target.value }))}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-500"
          placeholder="Escanea para pedidos y eventos"
        />
      </div>
    </div>
  );
};
