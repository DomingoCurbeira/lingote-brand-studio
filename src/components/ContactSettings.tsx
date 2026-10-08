import React from 'react';
import { ContactData } from '../types';
import { User, Phone, Mail, MapPin, Landmark, Globe, Share2 } from 'lucide-react';

interface ContactSettingsProps {
  contact: ContactData;
  setContact: React.Dispatch<React.SetStateAction<ContactData>>;
}

export const ContactSettings: React.FC<ContactSettingsProps> = ({ contact, setContact }) => {
  return (
    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
      <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-1">
        <User size={14} className="text-amber-400" />
        Datos de Contacto & Redes
      </label>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Nombre / Encargado
          </label>
          <input
            type="text"
            value={contact.personName}
            onChange={(e) => setContact((prev) => ({ ...prev, personName: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="Ej: Chef & Maestro Tortillero"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
            Cargo / Especialidad
          </label>
          <input
            type="text"
            value={contact.role}
            onChange={(e) => setContact((prev) => ({ ...prev, role: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="Ej: Dirección Culinaria"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
            <Phone size={11} className="text-amber-400" />
            Teléfono / WhatsApp
          </label>
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="+506 7225-7606"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
            <Share2 size={11} className="text-amber-400" />
            Redes Sociales (FB, IG, TikTok)
          </label>
          <input
            type="text"
            value={contact.instagram}
            onChange={(e) => setContact((prev) => ({ ...prev, instagram: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="@ellingoteespanol"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
            <Mail size={11} className="text-amber-400" />
            Correo Electrónico
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="ellingoteespanol@gmail.com"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
            <MapPin size={11} className="text-amber-400" />
            Ubicación / Ciudad
          </label>
          <input
            type="text"
            value={contact.location}
            onChange={(e) => setContact((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="San José, Costa Rica"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
            <Landmark size={11} className="text-amber-400" />
            SINPE Móvil / Pago
          </label>
          <input
            type="text"
            value={contact.sinpe}
            onChange={(e) => setContact((prev) => ({ ...prev, sinpe: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="SINPE: 7225-7606"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
            <Globe size={11} className="text-amber-400" />
            Sitio Web / Enlace
          </label>
          <input
            type="text"
            value={contact.website}
            onChange={(e) => setContact((prev) => ({ ...prev, website: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-500 transition"
            placeholder="wa.me/50672257606"
          />
        </div>
      </div>
    </div>
  );
};
