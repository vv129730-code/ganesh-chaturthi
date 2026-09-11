import React, { useState } from 'react';
import {
  Download,
  Share2,
  Copy,
  MessageCircle,
  FileDown,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';
import {
  exportToPng,
  exportToJpg,
  exportToPdf,
  shareViaWhatsApp,
  shareNativeOrCopy,
} from '../utils/export';
import { InvitationData } from '../types';

interface ExportControlsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  data: InvitationData;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ cardRef, data }) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [resolution, setResolution] = useState<'standard' | 'ultra'>('ultra');

  const showFeedback = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setIsExporting('png');
    try {
      const scale = resolution === 'ultra' ? 3 : 1.5; // ~2160x3072 or 1080x1536
      const fileName = `${data.mainHeading.replace(/\s+/g, '-')}-${data.year || '2026'}-Invitation.png`;
      await exportToPng(cardRef.current, fileName, scale);
      showFeedback('High-res PNG downloaded successfully!');
    } catch (err) {
      console.error(err);
      showFeedback('Failed to generate PNG export.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportJpg = async () => {
    if (!cardRef.current) return;
    setIsExporting('jpg');
    try {
      const scale = resolution === 'ultra' ? 3 : 1.5;
      const fileName = `${data.mainHeading.replace(/\s+/g, '-')}-${data.year || '2026'}-Invitation.jpg`;
      await exportToJpg(cardRef.current, fileName, scale);
      showFeedback('High-res JPG downloaded successfully!');
    } catch (err) {
      console.error(err);
      showFeedback('Failed to generate JPG export.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportPdf = async () => {
    if (!cardRef.current) return;
    setIsExporting('pdf');
    try {
      const fileName = `${data.mainHeading.replace(/\s+/g, '-')}-${data.year || '2026'}-Invitation.pdf`;
      await exportToPdf(cardRef.current, fileName);
      showFeedback('Print-ready PDF downloaded successfully!');
    } catch (err) {
      console.error(err);
      showFeedback('Failed to generate PDF export.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleShare = async () => {
    setIsExporting('share');
    try {
      const result = await shareNativeOrCopy(cardRef.current, data);
      if (result.method === 'clipboard' && result.success) {
        showFeedback('Invitation text copied to clipboard!');
      } else if (result.success) {
        showFeedback('Shared successfully!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(null);
    }
  };

  const handleWhatsApp = () => {
    shareViaWhatsApp(data);
    showFeedback('Opened WhatsApp to share invitation!');
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Toast Notification Banner */}
      {copiedNotification && (
        <div className="p-3 bg-amber-500/15 border border-amber-500/50 rounded-xl text-amber-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Resolution Selector */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
        <span className="font-medium">Export Quality:</span>
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          <button
            onClick={() => setResolution('standard')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              resolution === 'standard'
                ? 'bg-neutral-800 text-amber-300'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            HD (1080×1536)
          </button>
          <button
            onClick={() => setResolution('ultra')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              resolution === 'ultra'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Ultra 4K (2160×3072)
          </button>
        </div>
      </div>

      {/* Primary Export Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Download PNG */}
        <button
          onClick={handleExportPng}
          disabled={isExporting !== null}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting === 'png' ? (
            <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>Download PNG</span>
        </button>

        {/* Download JPG */}
        <button
          onClick={handleExportJpg}
          disabled={isExporting !== null}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs sm:text-sm border border-neutral-700 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting === 'jpg' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileDown className="w-4 h-4 text-amber-400" />
          )}
          <span>Download JPG</span>
        </button>

        {/* Download PDF */}
        <button
          onClick={handleExportPdf}
          disabled={isExporting !== null}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs sm:text-sm border border-neutral-700 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExporting === 'pdf' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileDown className="w-4 h-4 text-rose-400" />
          )}
          <span>Download PDF</span>
        </button>
      </div>

      {/* Share Actions (WhatsApp & Web Share) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600/15 border border-emerald-500/40 hover:bg-emerald-600/25 text-emerald-300 font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Share via WhatsApp</span>
        </button>

        <button
          onClick={handleShare}
          disabled={isExporting !== null}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs border border-neutral-700 active:scale-[0.98] transition-all cursor-pointer"
        >
          {isExporting === 'share' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Share2 className="w-4 h-4 text-amber-400" />
          )}
          <span>Share / Copy Details</span>
        </button>
      </div>
    </div>
  );
};
