import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Lightbulb, Copy, Check } from 'lucide-react';
import { GeneratedAnalysis } from '../types';

interface AnalysisBannerProps {
  analysis: GeneratedAnalysis;
}

export const AnalysisBanner: React.FC<AnalysisBannerProps> = ({ analysis }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyTakeaways = () => {
    const text = analysis.keyLessons.map((l, i) => `${i + 1}. ${l}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/20 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Top Banner: Core Theme + Anti-Cringe Shield */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Core Story Arc & Theme
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {analysis.coreTheme}
            </h3>
          </div>
        </div>

        {/* Anti-Cringe Guarantee */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">Anti-Cringe Verified:</span>
          <span className="text-emerald-200/90 text-[11px]">Bypassed humblebrag traps</span>
        </div>
      </div>

      {/* Grid: Key Takeaways & Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Key Lessons */}
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Extracted Key Lessons</span>
            </div>
            <button
              onClick={copyTakeaways}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
              title="Copy all takeaways"
            >
              {copiedIndex === -1 ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy list</span>
                </>
              )}
            </button>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {analysis.keyLessons.map((lesson, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quantified Impact & AI Critique */}
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Validated Impact & Metrics</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {analysis.detectedImpact.map((imp, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium"
                >
                  {imp}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
            💡 {analysis.antiCringeFeedback}
          </div>
        </div>
      </div>
    </div>
  );
};
