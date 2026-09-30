import React from 'react';
import { Copy, Check, FileText, CheckCircle2, Bookmark, Code2 } from 'lucide-react';
import { PortfolioPost } from '../types';

interface PortfolioPreviewProps {
  post: PortfolioPost;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ post }) => {
  const [copiedType, setCopiedType] = React.useState<'markdown' | 'bullets' | 'summary' | null>(null);

  const handleCopyMarkdown = () => {
    const md = `### ${post.title}

#### STAR Framework
- **Situation:** ${post.starMethod.situation}
- **Task:** ${post.starMethod.task}
- **Action:** ${post.starMethod.action}
- **Result:** ${post.starMethod.result}

#### Resume Bullets
${post.bulletPoints.map((b) => `- ${b}`).join('\n')}

#### Overview
${post.oneParagraphSummary}

**Tags:** ${post.tags.join(', ')}
`;
    navigator.clipboard.writeText(md);
    setCopiedType('markdown');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyBullets = () => {
    navigator.clipboard.writeText(post.bulletPoints.map((b) => `• ${b}`).join('\n'));
    setCopiedType('bullets');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(post.oneParagraphSummary);
    setCopiedType('summary');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
            Portfolio & Resume (STAR Method)
          </span>
          <span className="hidden sm:inline">• High-impact structured documentation</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyBullets}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition"
          >
            {copiedType === 'bullets' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Bullets for Resume</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-md shadow-amber-600/30 transition cursor-pointer"
          >
            {copiedType === 'markdown' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Markdown!</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5" />
                <span>Export Full Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* STAR Cards Grid */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          <span>STAR Method Breakdown (Situation • Task • Action • Result)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
              S — Situation
            </span>
            <p className="text-xs sm:text-sm text-slate-200 pt-1 leading-relaxed">
              {post.starMethod.situation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">
              T — Task
            </span>
            <p className="text-xs sm:text-sm text-slate-200 pt-1 leading-relaxed">
              {post.starMethod.task}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded bg-purple-500/10">
              A — Action
            </span>
            <p className="text-xs sm:text-sm text-slate-200 pt-1 leading-relaxed">
              {post.starMethod.action}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
              R — Result
            </span>
            <p className="text-xs sm:text-sm text-slate-200 pt-1 leading-relaxed">
              {post.starMethod.result}
            </p>
          </div>
        </div>
      </div>

      {/* Resume Bullets Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Resume / LinkedIn Experience Bullet Points
          </span>
          <button
            onClick={handleCopyBullets}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
          >
            {copiedType === 'bullets' ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
          {post.bulletPoints.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 1-Paragraph Bio Summary */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Executive Summary (For About section or Portfolio Case Study)
          </span>
          <button
            onClick={handleCopySummary}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
          >
            {copiedType === 'summary' ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {post.oneParagraphSummary}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
