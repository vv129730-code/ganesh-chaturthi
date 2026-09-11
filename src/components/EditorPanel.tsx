import React, { useState } from 'react';
import {
  InvitationData,
  StyleSettings,
  EventType,
  BackgroundStyle,
  GaneshArtStyle,
  FloralPalette,
} from '../types';
import {
  BACKGROUND_STYLES,
  TEXT_COLOR_PRESETS,
  FLORAL_PALETTES,
  DEFAULT_INVITATION_DATA,
} from '../data/defaults';
import {
  FileText,
  Palette,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sliders,
  Check,
} from 'lucide-react';

interface EditorPanelProps {
  data: InvitationData;
  setData: React.Dispatch<React.SetStateAction<InvitationData>>;
  style: StyleSettings;
  setStyle: React.Dispatch<React.SetStateAction<StyleSettings>>;
}

const EVENT_TYPES: EventType[] = [
  'Ganesh Utsav',
  'Ganesh Chaturthi',
  'Puja',
  'Birthday',
  'Wedding',
  'Anniversary',
  'Housewarming',
  'Festival',
  'Custom',
];

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  setData,
  style,
  setStyle,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'decorations'>('content');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const handleInputChange = (field: keyof InvitationData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDecorationToggle = (key: keyof StyleSettings['decorations']) => {
    setStyle((prev) => ({
      ...prev,
      decorations: {
        ...prev.decorations,
        [key]: !prev.decorations[key],
      },
    }));
  };

  const resetToDefaults = () => {
    setData(DEFAULT_INVITATION_DATA);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      {/* Editor Tabs */}
      <div className="flex border-b border-neutral-800 bg-neutral-950/60 p-2 gap-1.5">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'content'
              ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Details & Text</span>
        </button>

        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'style'
              ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Colors & Art</span>
        </button>

        <button
          onClick={() => setActiveTab('decorations')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'decorations'
              ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Decorations</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-5">
        {/* ==================== TAB 1: CONTENT ==================== */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Event Type & Reset Button */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Event Category
                </label>
                <select
                  value={data.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value as EventType)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={resetToDefaults}
                title="Reset to default reference text"
                className="mt-6 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Small Heading & Main Title */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Small Script Heading (Cursive)
                </label>
                <input
                  type="text"
                  value={data.smallHeading}
                  onChange={(e) => handleInputChange('smallHeading', e.target.value)}
                  placeholder="Can’t cha Raja"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  value={data.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="2026"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* VERY LARGE MAIN TITLE */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Main Festive Title (Prominent)
              </label>
              <input
                type="text"
                value={data.mainHeading}
                onChange={(e) => handleInputChange('mainHeading', e.target.value)}
                placeholder="Ganesh Utsav"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Description Text */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Invitation Description / Message
              </label>
              <textarea
                rows={2}
                value={data.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="We are celebrating Ganesh Utsav at our place please grace the occasion..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-neutral-800/80">
              <div>
                <label className="text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  Date
                </label>
                <input
                  type="text"
                  value={data.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  placeholder="14 SEPTEMBER 2026"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Time
                </label>
                <input
                  type="text"
                  value={data.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  placeholder="AT 7:00 PM"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Venue & Location */}
            <div className="space-y-3 pt-1 border-t border-neutral-800/80">
              <div>
                <label className="text-xs font-medium text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  Venue (Bold & Primary)
                </label>
                <input
                  type="text"
                  value={data.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                  placeholder="33 Cantt Kanpur Club"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Additional Location / Gate
                </label>
                <input
                  type="text"
                  value={data.additionalLocation}
                  onChange={(e) => handleInputChange('additionalLocation', e.target.value)}
                  placeholder="Campus Gate No.3"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Location Landmark Description
                </label>
                <textarea
                  rows={2}
                  value={data.locationDescription}
                  onChange={(e) => handleInputChange('locationDescription', e.target.value)}
                  placeholder="Ganesh Utsav celebrated near Shidd Peeth Durga Dham Mandir"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Optional Fields Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
              >
                <span>Optional Fields (Host, Family, Phone, RSVP)</span>
                {showOptionalFields ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              {showOptionalFields && (
                <div className="mt-3 p-3 bg-neutral-950/40 rounded-xl border border-neutral-800/60 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        Host Name
                      </label>
                      <input
                        type="text"
                        value={data.hostName || ''}
                        onChange={(e) => handleInputChange('hostName', e.target.value)}
                        placeholder="e.g. Sharma Family"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        Family / Organization
                      </label>
                      <input
                        type="text"
                        value={data.familyName || ''}
                        onChange={(e) => handleInputChange('familyName', e.target.value)}
                        placeholder="e.g. Kanpur Mitra Mandal"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        Phone / Contact
                      </label>
                      <input
                        type="text"
                        value={data.phoneNumber || ''}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1">
                        RSVP Note
                      </label>
                      <input
                        type="text"
                        value={data.rsvpText || ''}
                        onChange={(e) => handleInputChange('rsvpText', e.target.value)}
                        placeholder="R.S.V.P with family"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">
                      Custom Blessing / Note
                    </label>
                    <input
                      type="text"
                      value={data.customMessage || ''}
                      onChange={(e) => handleInputChange('customMessage', e.target.value)}
                      placeholder="Prasad & Aarti at 8:00 PM"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: STYLE & ARTWORK ==================== */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            {/* Ganesh Artwork 4 Styles */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">
                Lord Ganesha Artwork Style (4 Handcrafted Styles)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'traditional-line-art',
                    name: 'Traditional Line Art',
                    desc: 'Closest to reference, authentic luxury wedding linework',
                  },
                  {
                    id: 'minimal-elegant',
                    name: 'Minimal Elegant',
                    desc: 'Graceful single-stroke modern calligraphy',
                  },
                  {
                    id: 'ornamental-royal',
                    name: 'Ornamental Royal',
                    desc: 'Intricate crown, jewelry & radiant sun halo',
                  },
                  {
                    id: 'mandala-ganesh',
                    name: 'Mandala Sacred',
                    desc: 'Auspicious geometric lotus mandala ring',
                  },
                ].map((art) => {
                  const isSelected = style.ganeshStyle === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() =>
                        setStyle((prev) => ({
                          ...prev,
                          ganeshStyle: art.id as GaneshArtStyle,
                        }))
                      }
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-semibold text-xs flex items-center justify-between">
                        <span>{art.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                        {art.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Style */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">
                Background Paper Tone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BACKGROUND_STYLES.map((bg) => {
                  const isSelected = style.bgStyle === bg.id;
                  return (
                    <button
                      key={bg.id}
                      onClick={() =>
                        setStyle((prev) => ({
                          ...prev,
                          bgStyle: bg.id as BackgroundStyle,
                          customBgColor: undefined,
                        }))
                      }
                      className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-600 shrink-0"
                        style={{ backgroundColor: bg.color }}
                      />
                      <span className="truncate">{bg.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Text Color */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">
                Primary Typography Color (Maroon / Crimson)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TEXT_COLOR_PRESETS.map((preset) => {
                  const isSelected = style.primaryTextColor === preset.hex;
                  return (
                    <button
                      key={preset.id}
                      onClick={() =>
                        setStyle((prev) => ({
                          ...prev,
                          primaryTextColor: preset.hex,
                          secondaryTextColor: preset.hex,
                        }))
                      }
                      className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-600 shrink-0"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span className="truncate">{preset.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floral Color Palette */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">
                Floral Garlands & Canopy Palette
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FLORAL_PALETTES.map((pal) => {
                  const isSelected = style.floralPalette === pal.id;
                  return (
                    <button
                      key={pal.id}
                      onClick={() =>
                        setStyle((prev) => ({
                          ...prev,
                          floralPalette: pal.id as FloralPalette,
                        }))
                      }
                      className={`p-2.5 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                            style={{ backgroundColor: pal.primary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                            style={{ backgroundColor: pal.secondary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                            style={{ backgroundColor: pal.accent }}
                          />
                        </div>
                        <span className="truncate">{pal.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Title Font Selector */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">
                Main Heading Typography Font
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'yatra', name: 'Yatra One (Traditional Brush)' },
                  { id: 'rozha', name: 'Rozha One (Festive Display)' },
                  { id: 'cinzel', name: 'Cinzel (Royal Grandeur)' },
                  { id: 'playfair', name: 'Playfair (Classic Serif)' },
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() =>
                      setStyle((prev) => ({
                        ...prev,
                        mainFontFamily: font.id as StyleSettings['mainFontFamily'],
                      }))
                    }
                    className={`p-2 rounded-xl text-xs font-medium border text-left transition-all ${
                      style.mainFontFamily === font.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: DECORATIONS ==================== */}
        {activeTab === 'decorations' && (
          <div className="space-y-3">
            <p className="text-xs text-neutral-400 mb-3">
              Customize the individual traditional ornamental elements of the invitation.
            </p>

            {[
              {
                key: 'showTopFlowers' as const,
                label: 'Top Floral Canopy',
                desc: 'Lush layered marigold blossoms and mango leaf toran',
              },
              {
                key: 'showSideGarlands' as const,
                label: 'Vertical Side Garlands',
                desc: 'Balanced yellow & orange genda garlands with leaves & ghungroo',
              },
              {
                key: 'showHangingLanterns' as const,
                label: 'Hanging Golden Lanterns',
                desc: 'Traditional ornamental brass lanterns with warm diya glow',
              },
              {
                key: 'showGaneshArt' as const,
                label: 'Lord Ganesha Artwork',
                desc: 'Upper-middle sacred line art illustration',
              },
              {
                key: 'showMandalaBg' as const,
                label: 'Mandala / Rangoli Watermark',
                desc: 'Subtle golden beige watermark pattern behind the text',
              },
              {
                key: 'showBottomBorder' as const,
                label: 'Bottom Floral Rangoli Border',
                desc: 'Repeating hand-drawn golden lotus and marigold border',
              },
              {
                key: 'showCornerOrnaments' as const,
                label: 'Corner Frame Accents',
                desc: 'Delicate gold corner brackets along the inner border',
              },
            ].map((dec) => {
              const isEnabled = style.decorations[dec.key];
              return (
                <div
                  key={dec.key}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="pr-3">
                    <div className="text-xs font-semibold text-neutral-200">
                      {dec.label}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {dec.desc}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDecorationToggle(dec.key)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      isEnabled ? 'bg-amber-500' : 'bg-neutral-800'
                    }`}
                  >
                    <div
                      className={`bg-neutral-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
