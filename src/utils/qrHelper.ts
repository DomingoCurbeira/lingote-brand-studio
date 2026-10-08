import { QrConfig } from '../types';

export function getFinalQrUrl(config: QrConfig): string {
  if (config.type === 'whatsapp') {
    const cleanCountry = config.whatsappCountry.replace(/\D/g, '') || '506';
    const cleanNumber = config.whatsappNumber.replace(/\D/g, '');
    const cleanMsg = encodeURIComponent(config.whatsappMessage.trim());
    return `https://wa.me/${cleanCountry}${cleanNumber}${cleanMsg ? `?text=${cleanMsg}` : ''}`;
  }

  if (config.type === 'instagram') {
    const handle = config.url.replace(/^@/, '').trim();
    if (handle.startsWith('http://') || handle.startsWith('https://')) return handle;
    return `https://instagram.com/${handle}`;
  }

  // Modo URL / Página Web
  let rawUrl = config.url.trim() || 'https://ellingoteespanol.netlify.app';
  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    rawUrl = `https://${rawUrl}`;
  }
  return rawUrl;
}
