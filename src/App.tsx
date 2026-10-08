import React, { useState } from 'react';
import {
  BrandProfile,
  ContactData,
  QrConfig,
  TastingData,
  ActiveTab,
  StickerFormat,
} from './types';
import {
  PRESET_PROFILES,
  DEFAULT_CONTACT_DATA,
  DEFAULT_QR_CONFIG,
  DEFAULT_TASTING_DATA,
} from './data/presets';
import { Navbar } from './components/Navbar';
import { BrandSettings } from './components/BrandSettings';
import { ContactSettings } from './components/ContactSettings';
import { QrSettings } from './components/QrSettings';
import { TastingSettings } from './components/TastingSettings';
import { BusinessCardView } from './components/BusinessCardView';
import { CapsuleStickerView } from './components/CapsuleStickerView';
import { PrintSheetView } from './components/PrintSheetView';
import {
  Palette,
  User,
  QrCode,
  Tag,
  Save,
  Check,
  SlidersHorizontal,
} from 'lucide-react';

export default function App() {
  // Estado de Marca Principal
  const [brand, setBrand] = useState<BrandProfile>(() => {
    const saved = localStorage.getItem('lingote_active_brand');
    return saved ? JSON.parse(saved) : PRESET_PROFILES[0];
  });

  // Estado de Contacto
  const [contact, setContact] = useState<ContactData>(() => {
    const saved = localStorage.getItem('lingote_active_contact');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT_DATA;
  });

  // Estado de Código QR
  const [qr, setQr] = useState<QrConfig>(() => {
    const saved = localStorage.getItem('lingote_active_qr');
    return saved ? JSON.parse(saved) : DEFAULT_QR_CONFIG;
  });

  // Estado de Degustación
  const [tasting, setTasting] = useState<TastingData>(() => {
    const saved = localStorage.getItem('lingote_active_tasting');
    return saved ? JSON.parse(saved) : DEFAULT_TASTING_DATA;
  });

  // Pestaña Activa y Formato
  const [activeTab, setActiveTab] = useState<ActiveTab>('business-card');
  const [stickerFormat, setStickerFormat] = useState<StickerFormat>('capsule-lid-35');
  const [editorSection, setEditorSection] = useState<'brand' | 'contact' | 'qr' | 'tasting'>('brand');
  const [showSidebarInPrint, setShowSidebarInPrint] = useState(false);

  // Estado de guardado local
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Guardar en localStorage al presionar botón o cambios
  const handleSaveToLocalStorage = () => {
    localStorage.setItem('lingote_active_brand', JSON.stringify(brand));
    localStorage.setItem('lingote_active_contact', JSON.stringify(contact));
    localStorage.setItem('lingote_active_qr', JSON.stringify(qr));
    localStorage.setItem('lingote_active_tasting', JSON.stringify(tasting));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Acción de imprimir nativa
  const handlePrint = () => {
    window.print();
  };

  const isPrintTab = activeTab === 'print-sheet';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500 selection:text-black">
      {/* NAVBAR SUPERIOR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brand={brand}
        setBrand={setBrand}
        onPrint={handlePrint}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PANEL LATERAL DE EDICIÓN */}
        {(!isPrintTab || showSidebarInPrint) && (
          <aside className={`no-print ${isPrintTab ? 'lg:col-span-4' : 'lg:col-span-5'} space-y-4`}>
            {/* Navegación interna de paneles de edición */}
            <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => setEditorSection('brand')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  editorSection === 'brand'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette size={14} />
                <span>Marca</span>
              </button>

              <button
                onClick={() => setEditorSection('contact')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  editorSection === 'contact'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User size={14} />
                <span>Contacto</span>
              </button>

              <button
                onClick={() => setEditorSection('qr')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  editorSection === 'qr'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <QrCode size={14} />
                <span>QR Dinámico</span>
              </button>

              <button
                onClick={() => setEditorSection('tasting')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  editorSection === 'tasting'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tag size={14} />
                <span>Degustación</span>
              </button>
            </div>

            {/* Formulario activo */}
            <div className="space-y-4">
              {editorSection === 'brand' && (
                <BrandSettings brand={brand} setBrand={setBrand} />
              )}

              {editorSection === 'contact' && (
                <ContactSettings contact={contact} setContact={setContact} />
              )}

              {editorSection === 'qr' && (
                <QrSettings qr={qr} setQr={setQr} />
              )}

              {editorSection === 'tasting' && (
                <TastingSettings
                  tasting={tasting}
                  setTasting={setTasting}
                  stickerFormat={stickerFormat}
                  setStickerFormat={setStickerFormat}
                />
              )}
            </div>

            {/* Botón de Guardado Local */}
            <div className="pt-2">
              <button
                onClick={handleSaveToLocalStorage}
                className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer border ${
                  savedSuccess
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span>¡Cambios Guardados en este Navegador!</span>
                  </>
                ) : (
                  <>
                    <Save size={15} className="text-amber-400" />
                    <span>Guardar Configuración de Marca Local</span>
                  </>
                )}
              </button>
            </div>
          </aside>
        )}

        {/* LIENZO DE PREVISUALIZACIÓN */}
        <main
          className={`${
            isPrintTab
              ? showSidebarInPrint
                ? 'lg:col-span-8'
                : 'lg:col-span-12'
              : 'lg:col-span-7'
          } bg-slate-900/40 border border-slate-800/80 rounded-3xl p-4 lg:p-6 flex flex-col items-center justify-start min-h-[600px] shadow-2xl relative`}
        >
          {/* Barra superior de herramientas en el modo de pliego */}
          {isPrintTab && (
            <div className="no-print w-full flex justify-end pb-3">
              <button
                onClick={() => setShowSidebarInPrint(!showSidebarInPrint)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer"
              >
                <SlidersHorizontal size={13} className="text-amber-400" />
                <span>{showSidebarInPrint ? 'Ocultar Panel Lateral' : 'Editar Datos / Marca'}</span>
              </button>
            </div>
          )}

          {/* CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}
          <div className="w-full relative z-10 flex flex-col items-center">
            {activeTab === 'business-card' && (
              <BusinessCardView brand={brand} contact={contact} qr={qr} />
            )}

            {activeTab === 'tasting-stickers' && (
              <CapsuleStickerView
                brand={brand}
                tasting={tasting}
                format={stickerFormat}
                qr={qr}
              />
            )}

            {activeTab === 'print-sheet' && (
              <PrintSheetView
                brand={brand}
                contact={contact}
                qr={qr}
                tasting={tasting}
                onPrint={handlePrint}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
