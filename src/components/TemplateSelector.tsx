import React from 'react';
import { TEMPLATE_PRESETS } from '../data/defaults';
import { TemplatePreset, InvitationData, StyleSettings } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplateId: string;
  onSelectTemplate: (template: TemplatePreset) => void;
  setData: React.Dispatch<React.SetStateAction<InvitationData>>;
  setStyle: React.Dispatch<React.SetStateAction<StyleSettings>>;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplateId,
  onSelectTemplate,
}) => {
  return (
    <div className="w-full bg-neutral-900/60 border-b border-neutral-800/80 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Templates:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {TEMPLATE_PRESETS.map((template) => {
            const isSelected = currentTemplateId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                <span>{template.name}</span>
                {template.category === 'Extensible' && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-neutral-800 text-neutral-400">
                    Plus
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
