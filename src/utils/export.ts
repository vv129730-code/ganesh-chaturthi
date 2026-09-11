import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { InvitationData } from '../types';

export const triggerFestiveConfetti = () => {
  confetti({
    particleCount: 70,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF7A00', '#FFB300', '#C2185B', '#D4942A', '#BF360C'],
  });
};

export const exportToPng = async (
  element: HTMLElement,
  fileName: string = 'Ganesh-Utsav-2026-Invitation.png',
  scale: number = 2
) => {
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      quality: 0.98,
      pixelRatio: scale,
      cacheBust: true,
      skipFonts: false,
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    triggerFestiveConfetti();
    return true;
  } catch (error) {
    console.error('Failed to export PNG:', error);
    throw error;
  }
};

export const exportToJpg = async (
  element: HTMLElement,
  fileName: string = 'Ganesh-Utsav-2026-Invitation.jpg',
  scale: number = 2
) => {
  try {
    const dataUrl = await htmlToImage.toJpeg(element, {
      quality: 0.95,
      pixelRatio: scale,
      backgroundColor: '#FFF1D2',
      cacheBust: true,
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    triggerFestiveConfetti();
    return true;
  } catch (error) {
    console.error('Failed to export JPG:', error);
    throw error;
  }
};

export const exportToPdf = async (
  element: HTMLElement,
  fileName: string = 'Ganesh-Utsav-2026-Invitation.pdf'
) => {
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      quality: 1,
      pixelRatio: 2.5,
      cacheBust: true,
    });

    // 9:16 aspect ratio in mm (e.g. 108mm x 192mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [108, 192],
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, 108, 192);
    pdf.save(fileName);
    triggerFestiveConfetti();
    return true;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
};

export const generateShareText = (data: InvitationData): string => {
  return `🙏 *${data.smallHeading || 'Shree Ganeshaya Namah'}* 🙏\n\n✨ *${data.mainHeading.toUpperCase()} ${data.year}* ✨\n\n${data.description}\n\n📅 *Date:* ${data.date}\n⏰ *Time:* ${data.time}\n📍 *Venue:* ${data.venue}\n${data.additionalLocation ? `🏢 ${data.additionalLocation}\n` : ''}${data.locationDescription ? `🗺️ ${data.locationDescription}\n` : ''}${data.hostName ? `\n👤 *Host:* ${data.hostName}` : ''}${data.phoneNumber ? `\n📞 *RSVP:* ${data.phoneNumber}` : ''}\n\nPlease grace the occasion with your family! 🌸🌺`;
};

export const shareViaWhatsApp = (data: InvitationData) => {
  const text = encodeURIComponent(generateShareText(data));
  const url = `https://api.whatsapp.com/send?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const shareNativeOrCopy = async (
  element: HTMLElement | null,
  data: InvitationData
): Promise<{ method: 'native' | 'clipboard'; success: boolean }> => {
  const shareText = generateShareText(data);

  if (navigator.share && element) {
    try {
      const blob = await htmlToImage.toBlob(element, { pixelRatio: 2 });
      if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'invitation.png', { type: 'image/png' })] })) {
        const file = new File([blob], 'Festive-Invitation.png', { type: 'image/png' });
        await navigator.share({
          title: `${data.mainHeading} ${data.year}`,
          text: shareText,
          files: [file],
        });
        return { method: 'native', success: true };
      } else {
        await navigator.share({
          title: `${data.mainHeading} ${data.year}`,
          text: shareText,
        });
        return { method: 'native', success: true };
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return { method: 'native', success: false };
      }
      // Fall through to clipboard
    }
  }

  // Fallback to copying formatted text
  await navigator.clipboard.writeText(shareText);
  return { method: 'clipboard', success: true };
};
