import React from 'react';
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Sparkles,
  Download,
  Layers,
  Edit3,
  Wand2,
} from 'lucide-react';
import { InstagramPost, CarouselSlide } from '../types';

interface InstagramPreviewProps {
  post: InstagramPost;
  authorName: string;
  onUpdatePost: (updated: Partial<InstagramPost>) => void;
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({
  post,
  authorName,
  onUpdatePost,
  onRefine,
  isRefining,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [isCopied, setIsCopied] = React.useState(false);
  const [copiedSlideOutline, setCopiedSlideOutline] = React.useState(false);
  const [isEditingCaption, setIsEditingCaption] = React.useState(false);
  const [editableCaption, setEditableCaption] = React.useState(post.caption);

  React.useEffect(() => {
    setEditableCaption(post.caption);
  }, [post.caption]);

  const slides = post.carouselSlides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleCopyCaption = () => {
    const fullText = `${post.caption}\n\n.\n.\n.\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyCarouselOutline = () => {
    const text = slides
      .map(
        (s) =>
          `SLIDE ${s.slideNumber}: ${s.title}\n` +
          `Bullets:\n${s.bulletPoints.map((b) => `• ${b}`).join('\n')}\n` +
          `Visual Concept: ${s.visualNote}\n`
      )
      .join('\n-----------------------\n\n');

    navigator.clipboard.writeText(text);
    setCopiedSlideOutline(true);
    setTimeout(() => setCopiedSlideOutline(false), 2000);
  };

  const handleSaveCaption = () => {
    onUpdatePost({ caption: editableCaption });
    setIsEditingCaption(false);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const username = authorName.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'creator';

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 font-bold border border-pink-500/20">
            Instagram Feed & Carousel
          </span>
          <span className="hidden sm:inline">• 5-Slide Visual Concept Plan</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Copy Carousel Deck Plan */}
          <button
            onClick={handleCopyCarouselOutline}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 font-medium transition"
            title="Copy text outline of all 5 slides to paste into Canva, Figma or PPT"
          >
            {copiedSlideOutline ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Layers className="w-3.5 h-3.5" />}
            <span>{copiedSlideOutline ? 'Deck Copied!' : 'Copy Slide Plan'}</span>
          </button>

          {/* Quick AI Refine */}
          <button
            disabled={isRefining}
            onClick={() =>
              onRefine('Refine this Instagram caption with higher aesthetic hooks, engaging emoji bullet separators, and a saveable CTA.')
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium disabled:opacity-50"
          >
            <Wand2 className="w-3.5 h-3.5 text-pink-400" />
            <span>{isRefining ? 'Polishing...' : 'Refine'}</span>
          </button>

          {/* Edit Caption */}
          <button
            onClick={() => setIsEditingCaption(!isEditingCaption)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium"
          >
            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
            {isEditingCaption ? 'Cancel' : 'Edit Caption'}
          </button>

          {/* Copy Caption */}
          <button
            onClick={handleCopyCaption}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold shadow-md shadow-pink-600/30 transition cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Caption Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Caption</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left is Carousel Mockup Card, Right is Feed Caption */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Carousel Card Mockup (5 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">
              Interactive Carousel Simulator
            </span>
            <span>
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
          </div>

          {/* Simulated Square Post Card */}
          <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-purple-950/90 border border-slate-700 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Slide Meta */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/10 text-white/90 backdrop-blur-sm">
                Slide 0{currentSlide?.slideNumber || currentSlideIndex + 1}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                @{username}
              </span>
            </div>

            {/* Center Slide Content */}
            <div className="my-auto relative z-10 space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight tracking-tight">
                {currentSlide?.title}
              </h4>

              <div className="space-y-2">
                {currentSlide?.bulletPoints?.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0 mt-2" />
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Visual Concept Note */}
            <div className="relative z-10 pt-3 border-t border-white/10">
              <p className="text-[10px] text-slate-400 font-mono">
                🎨 <span className="text-pink-300 font-semibold">Visual Direction:</span> {currentSlide?.visualNote}
              </p>
            </div>

            {/* Left/Right Stepper Overlay Buttons */}
            {currentSlideIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {currentSlideIndex < slides.length - 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Slide Navigation Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'w-6 bg-pink-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {post.visualStyleSuggestion && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-pink-400 block mb-0.5">
                Recommended Visual Palette:
              </span>
              {post.visualStyleSuggestion}
            </div>
          )}
        </div>

        {/* Right: Instagram Caption & Mock Feed (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-semibold text-slate-200">
            Instagram Feed Post Preview
          </span>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden font-sans">
            {/* Post Header */}
            <div className="p-3.5 flex items-center justify-between border-b border-slate-900">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                    {authorName[0] || 'A'}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white text-xs">{username}</span>
                  <p className="text-[10px] text-slate-400">Original audio</p>
                </div>
              </div>
              <span className="text-slate-500 text-xs">•••</span>
            </div>

            {/* Engagement Action Bar */}
            <div className="px-4 pt-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Heart className="w-5 h-5 hover:text-pink-500 cursor-pointer transition" />
                <MessageCircle className="w-5 h-5 hover:text-slate-300 cursor-pointer transition" />
                <Send className="w-5 h-5 hover:text-slate-300 cursor-pointer transition" />
              </div>
              <Bookmark className="w-5 h-5 hover:text-slate-300 cursor-pointer transition" />
            </div>

            <div className="px-4 pt-2 text-xs font-bold text-white">
              342 likes
            </div>

            {/* Caption Text Area */}
            <div className="p-4 space-y-3">
              {isEditingCaption ? (
                <div className="space-y-2">
                  <textarea
                    rows={8}
                    value={editableCaption}
                    onChange={(e) => setEditableCaption(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs leading-relaxed focus:ring-1 focus:ring-pink-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingCaption(false)}
                      className="px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCaption}
                      className="px-2.5 py-1 rounded bg-pink-600 text-xs text-white font-bold"
                    >
                      Save Caption
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
                  <span className="font-bold text-white mr-1.5">{username}</span>
                  {post.caption}
                </div>
              )}

              {/* Categorized Hashtags */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="pt-2 border-t border-slate-900">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                    Curated Hashtags ({post.hashtags.length})
                  </p>
                  <p className="text-[11px] text-pink-400 leading-relaxed">
                    {post.hashtags.map((t) => (t.startsWith('#') ? t : `#${t}`)).join(' ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
