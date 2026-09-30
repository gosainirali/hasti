import React from 'react';
import { Sparkles, History, Palette, BookOpen } from 'lucide-react';
import { SAMPLE_EXPERIENCES, SampleExperience } from '../data/sampleExperiences';
import { ExperienceFormState } from '../types';

interface HeaderProps {
  onSelectSample: (sample: ExperienceFormState) => void;
  onOpenHistory: () => void;
  onOpenCardStudio: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectSample,
  onOpenHistory,
  onOpenCardStudio,
  historyCount,
}) => {
  const [showSamplesDropdown, setShowSamplesDropdown] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                BeaconPost
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI Storyteller
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Turn any experience into authentic, high-impact social media posts
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sample Experiences Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSamplesDropdown(!showSamplesDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Load realistic sample experience"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Try Sample:</span>
              <span className="font-semibold text-indigo-300">Templates</span>
            </button>

            {showSamplesDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSamplesDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Quick-Start Real Experiences
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Click any template to auto-populate the form
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-1">
                    {SAMPLE_EXPERIENCES.map((sample: SampleExperience) => (
                      <button
                        key={sample.id}
                        onClick={() => {
                          onSelectSample(sample.data);
                          setShowSamplesDropdown(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-slate-700/70 transition flex flex-col gap-0.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition">
                            {sample.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                            {sample.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {sample.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Social Card Graphic Maker */}
          <button
            onClick={onOpenCardStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Design a social banner or card image"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Visual</span> Card Studio
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition relative"
            title="View saved generations"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
