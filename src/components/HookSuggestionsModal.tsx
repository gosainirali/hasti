import React from 'react';
import { X, Sparkles, Check, Copy, ArrowRight, RefreshCw } from 'lucide-react';
import { HookSuggestion } from '../types';

interface HookSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hooks: HookSuggestion[];
  onSelectHook: (hookText: string) => void;
  onRegenerate: () => Promise<void>;
  isLoading: boolean;
}

const HOOK_LABELS: Record<string, { label: string; badge: string; color: string }> = {
  story: { label: 'In Media Res Story', badge: 'Story Arc', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  contrarian: { label: 'The Contrarian / Counter-Intuitive', badge: 'Pattern Interrupt', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  metric_first: { label: 'Metric & Hard Numbers First', badge: 'High Credibility', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  vulnerable: { label: 'Vulnerable & Honest Real Talk', badge: 'Deep Authenticity', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  question: { label: 'Thought-Provoking Question', badge: 'High Engagement', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
};

export const HookSuggestionsModal: React.FC<HookSuggestionsModalProps> = ({
  isOpen,
  onClose,
  hooks,
  onSelectHook,
  onRegenerate,
  isLoading,
}) => {
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Hook Crafting Studio (Opening Lines)
              </h3>
              <p className="text-xs text-slate-400">
                The first 1-2 lines determine 80% of whether someone clicks "...see more"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-50"
              title="Generate 5 new hook variations"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hooks List */}
        <div className="p-5 overflow-y-auto space-y-3">
          {hooks.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No hooks generated yet. Click regenerate to craft fresh variations.
            </div>
          ) : (
            hooks.map((hook, idx) => {
              const meta = HOOK_LABELS[hook.type] || {
                label: hook.type,
                badge: 'Custom',
                color: 'bg-slate-800 text-slate-300 border-slate-700',
              };

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/50 transition group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.color}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(hook.text, idx)}
                        className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition flex items-center gap-1"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onSelectHook(hook.text);
                          onClose();
                        }}
                        className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans font-medium">
                    "{hook.text}"
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
