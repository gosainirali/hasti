import React, { useRef, useEffect } from 'react';
import { Download, X, Palette, RefreshCw, Sparkles, Check } from 'lucide-react';

interface SocialCardGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialSubtitle: string;
  initialBadge: string;
  initialMetric: string;
  authorName: string;
  authorRole: string;
}

type AspectRatio = '16:9' | '1:1' | '4:5';
type ThemeId = 'violet' | 'cyber' | 'sunset' | 'emerald' | 'minimal';

interface ThemeConfig {
  id: ThemeId;
  name: string;
  bgGradStart: string;
  bgGradMid: string;
  bgGradEnd: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  pillBg: string;
  pillText: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: 'violet',
    name: 'Royal Violet',
    bgGradStart: '#1e1b4b',
    bgGradMid: '#311042',
    bgGradEnd: '#09090b',
    accentColor: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.25)',
    badgeText: '#e9d5ff',
    pillBg: 'rgba(99, 102, 241, 0.25)',
    pillText: '#c7d2fe',
  },
  {
    id: 'cyber',
    name: 'Cyber Cyan',
    bgGradStart: '#082f49',
    bgGradMid: '#0f172a',
    bgGradEnd: '#020617',
    accentColor: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.25)',
    badgeText: '#cffafe',
    pillBg: 'rgba(14, 165, 233, 0.25)',
    pillText: '#bae6fd',
  },
  {
    id: 'sunset',
    name: 'Sunset Ember',
    bgGradStart: '#4c0519',
    bgGradMid: '#2e1065',
    bgGradEnd: '#09090b',
    accentColor: '#f43f5e',
    badgeBg: 'rgba(244, 63, 94, 0.25)',
    badgeText: '#ffe4e6',
    pillBg: 'rgba(249, 115, 22, 0.25)',
    pillText: '#ffedd5',
  },
  {
    id: 'emerald',
    name: 'Emerald Pride',
    bgGradStart: '#064e3b',
    bgGradMid: '#022c22',
    bgGradEnd: '#020617',
    accentColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.25)',
    badgeText: '#d1fae5',
    pillBg: 'rgba(20, 184, 166, 0.25)',
    pillText: '#ccfbf1',
  },
  {
    id: 'minimal',
    name: 'Midnight Dark',
    bgGradStart: '#18181b',
    bgGradMid: '#09090b',
    bgGradEnd: '#000000',
    accentColor: '#6366f1',
    badgeBg: 'rgba(255, 255, 255, 0.15)',
    badgeText: '#ffffff',
    pillBg: 'rgba(255, 255, 255, 0.1)',
    pillText: '#e4e4e7',
  },
];

export const SocialCardGenerator: React.FC<SocialCardGeneratorProps> = ({
  isOpen,
  onClose,
  initialTitle,
  initialSubtitle,
  initialBadge,
  initialMetric,
  authorName,
  authorRole,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>('16:9');
  const [activeTheme, setActiveTheme] = React.useState<ThemeId>('violet');
  const [badge, setBadge] = React.useState(initialBadge || '🏆 ACHIEVEMENT MILESTONE');
  const [title, setTitle] = React.useState(initialTitle || 'My Experience Headline');
  const [subtitle, setSubtitle] = React.useState(
    initialSubtitle || 'Key takeaways, hurdles overcome & impact generated.'
  );
  const [metricPill, setMetricPill] = React.useState(initialMetric || 'Highlights & Outcomes');
  const [author, setAuthor] = React.useState(authorName || 'Alex Morgan');
  const [role, setRole] = React.useState(authorRole || 'Engineer & Builder');
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  // Sync initial props when opened
  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialSubtitle) setSubtitle(initialSubtitle);
    if (initialBadge) setBadge(initialBadge);
    if (initialMetric) setMetricPill(initialMetric);
    if (authorName) setAuthor(authorName);
    if (authorRole) setRole(authorRole);
  }, [initialTitle, initialSubtitle, initialBadge, initialMetric, authorName, authorRole]);

  // Canvas drawing function
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions based on aspect ratio
    let width = 1200;
    let height = 675; // 16:9
    if (aspectRatio === '1:1') {
      width = 1080;
      height = 1080;
    } else if (aspectRatio === '4:5') {
      width = 1080;
      height = 1350;
    }

    canvas.width = width;
    canvas.height = height;

    const theme = THEMES.find((t) => t.id === activeTheme) || THEMES[0];

    // 1. Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, theme.bgGradStart);
    bgGradient.addColorStop(0.5, theme.bgGradMid);
    bgGradient.addColorStop(1, theme.bgGradEnd);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Glowing Accents
    const radial = ctx.createRadialGradient(width * 0.85, height * 0.2, 50, width * 0.85, height * 0.2, width * 0.5);
    radial.addColorStop(0, theme.accentColor + '33');
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    const radial2 = ctx.createRadialGradient(width * 0.15, height * 0.85, 30, width * 0.15, height * 0.85, width * 0.4);
    radial2.addColorStop(0, theme.accentColor + '22');
    radial2.addColorStop(1, 'transparent');
    ctx.fillStyle = radial2;
    ctx.fillRect(0, 0, width, height);

    // 3. Decorative subtle grid dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    const dotSpacing = 48;
    for (let x = 30; x < width; x += dotSpacing) {
      for (let y = 30; y < height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. Subtle Inner Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Positioning offsets
    const paddingX = width * 0.08;
    let currentY = height * 0.15;

    // 5. Badge Pill
    if (badge) {
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      const badgeWidth = ctx.measureText(badge).width + 36;
      const badgeHeight = 44;

      ctx.fillStyle = theme.badgeBg;
      ctx.beginPath();
      ctx.roundRect(paddingX, currentY, badgeWidth, badgeHeight, 10);
      ctx.fill();

      ctx.strokeStyle = theme.accentColor + '66';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = theme.badgeText;
      ctx.fillText(badge, paddingX + 18, currentY + 29);

      currentY += badgeHeight + 36;
    }

    // 6. Main Title (multiline wrap)
    ctx.fillStyle = '#ffffff';
    ctx.font = `800 ${aspectRatio === '16:9' ? '54px' : '62px'} "Plus Jakarta Sans", sans-serif`;

    const maxTitleWidth = width - paddingX * 2;
    const words = title.split(' ');
    let line = '';
    const titleLines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && n > 0) {
        titleLines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    titleLines.push(line);

    const titleLineHeight = aspectRatio === '16:9' ? 66 : 74;
    for (let i = 0; i < Math.min(3, titleLines.length); i++) {
      ctx.fillText(titleLines[i].trim(), paddingX, currentY + 45);
      currentY += titleLineHeight;
    }

    currentY += 16;

    // 7. Subtitle
    if (subtitle) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = `500 ${aspectRatio === '16:9' ? '26px' : '30px'} "Plus Jakarta Sans", sans-serif`;

      const subWords = subtitle.split(' ');
      let subLine = '';
      const subLines: string[] = [];

      for (let n = 0; n < subWords.length; n++) {
        const testLine = subLine + subWords[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTitleWidth && n > 0) {
          subLines.push(subLine);
          subLine = subWords[n] + ' ';
        } else {
          subLine = testLine;
        }
      }
      subLines.push(subLine);

      const subLineHeight = 38;
      for (let i = 0; i < Math.min(2, subLines.length); i++) {
        ctx.fillText(subLines[i].trim(), paddingX, currentY + 30);
        currentY += subLineHeight;
      }
    }

    // 8. Metric / Key Highlight Pill
    if (metricPill) {
      currentY += 24;
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      const pillWidth = ctx.measureText(metricPill).width + 36;
      const pillHeight = 44;

      ctx.fillStyle = theme.pillBg;
      ctx.beginPath();
      ctx.roundRect(paddingX, currentY, pillWidth, pillHeight, 22);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = theme.pillText;
      ctx.fillText(metricPill, paddingX + 18, currentY + 29);
    }

    // 9. Bottom Footer: Author Profile & Watermark
    const footerY = height - 90;

    // Author Avatar circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(paddingX + 24, footerY + 24, 24, 0, Math.PI * 2);
    ctx.fillStyle = theme.accentColor;
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((author[0] || 'A').toUpperCase(), paddingX + 24, footerY + 31);
    ctx.restore();

    // Author Name & Role
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(author, paddingX + 64, footerY + 18);

    ctx.fillStyle = '#64748b';
    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(role, paddingX + 64, footerY + 42);

    // App Branding Logo on bottom right
    ctx.textAlign = 'right';
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('BeaconPost', width - paddingX, footerY + 30);
  };

  useEffect(() => {
    if (isOpen) {
      renderCanvas();
    }
  }, [isOpen, aspectRatio, activeTheme, badge, title, subtitle, metricPill, author, role]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `beaconpost-${title.toLowerCase().slice(0, 20).replace(/[^a-z0-9]/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Social Visual Card Studio
              </h3>
              <p className="text-xs text-slate-400">
                Design and export a crystal-clear banner graphic to attach with your post
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body: Controls on Left, Live Canvas on Right */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            {/* Aspect Ratio */}
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '16:9', label: '16:9', hint: 'LinkedIn / X' },
                  { id: '1:1', label: '1:1', hint: 'Instagram' },
                  { id: '4:5', label: '4:5', hint: 'IG Portrait' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAspectRatio(item.id as AspectRatio)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition ${
                      aspectRatio === item.id
                        ? 'bg-pink-950/60 border-pink-500 text-pink-300 font-bold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] opacity-75">{item.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Color Palette Theme
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setActiveTheme(th.id)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                      activeTheme === th.id
                        ? 'border-indigo-400 bg-indigo-950/40 text-white'
                        : 'border-slate-800 bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: th.accentColor }}
                    />
                    <span className="truncate text-[11px] font-medium">{th.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Headline Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Subtitle / Key Takeaway</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Key Metrics / Outcome Pill</label>
                <input
                  type="text"
                  value={metricPill}
                  onChange={(e) => setMetricPill(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Role / Headline</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Canvas Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-full max-h-[500px] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[460px] object-contain rounded-xl border border-slate-800"
              />
            </div>

            <div className="w-full mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Resolution: {aspectRatio === '16:9' ? '1200 × 675' : aspectRatio === '1:1' ? '1080 × 1080' : '1080 × 1350'}px
              </span>

              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-pink-500/25 flex items-center gap-2 transition cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download High-Res PNG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
