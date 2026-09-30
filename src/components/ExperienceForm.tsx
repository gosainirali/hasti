import React from 'react';
import {
  Trophy,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
  Code2,
  Medal,
  HeartHandshake,
  Compass,
  FileCheck2,
  Mic,
  Zap,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ExperienceFormState, ExperienceType, ToneType, ConceptAngle } from '../types';

interface ExperienceFormProps {
  formData: ExperienceFormState;
  onChange: (updated: Partial<ExperienceFormState>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CATEGORIES: { id: ExperienceType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'hackathon', label: 'Hackathon', icon: Trophy },
  { id: 'internship', label: 'Internship', icon: Briefcase },
  { id: 'workshop', label: 'Workshop', icon: Code2 },
  { id: 'seminar', label: 'Seminar', icon: Compass },
  { id: 'college_event', label: 'College Event', icon: GraduationCap },
  { id: 'project', label: 'Project Launch', icon: Zap },
  { id: 'competition', label: 'Competition', icon: Medal },
  { id: 'volunteering', label: 'Volunteering', icon: HeartHandshake },
  { id: 'certification', label: 'Certification', icon: FileCheck2 },
  { id: 'conference', label: 'Conference', icon: Mic },
  { id: 'achievement', label: 'Achievement', icon: Sparkles },
];

const TONES: { id: ToneType; label: string; desc: string; emoji: string }[] = [
  {
    id: 'authentic_storyteller',
    label: 'Storyteller',
    desc: 'Narrative arc, honest struggle, emotional hook',
    emoji: '📖',
  },
  {
    id: 'high_energy_achiever',
    label: 'High Energy',
    desc: 'Celebratory, motivating, milestone-driven',
    emoji: '⚡',
  },
  {
    id: 'educational_takeaways',
    label: 'Educational',
    desc: 'Actionable tips, "3 things I learned", mentor vibe',
    emoji: '🎓',
  },
  {
    id: 'humble_reflective',
    label: 'Reflective',
    desc: 'Grounded, genuine gratitude, quiet confidence',
    emoji: '🌿',
  },
  {
    id: 'crisp_minimalist',
    label: 'Minimalist',
    desc: 'High signal, bulleted metrics, no fluff',
    emoji: '🎯',
  },
  {
    id: 'casual_relatable',
    label: 'Casual Talk',
    desc: 'Peer-to-peer, behind-the-scenes, unpretentious',
    emoji: '☕',
  },
];

const CONCEPT_ANGLES: { id: ConceptAngle; label: string; hint: string }[] = [
  { id: 'balanced', label: 'Balanced Story', hint: 'Cover the journey from problem to result' },
  { id: 'failure_to_breakthrough', label: 'Failure & Pivot', hint: 'Spotlight a roadblock and how you overcame it' },
  { id: 'technical_deep_dive', label: 'Technical Depth', hint: 'Focus on architecture, stack, and debugging' },
  { id: 'leadership_collaboration', label: 'Team & Leadership', hint: 'Highlight delegation, culture, and mentor support' },
  { id: 'peer_learnings', label: 'Peer Advice Guide', hint: 'Actionable guidance for someone doing this next' },
  { id: 'career_milestone', label: 'Career Growth', hint: 'Personal transformation and next steps' },
  { id: 'custom', label: 'Custom Angle...', hint: 'Specify your own custom prompt or focal point' },
];

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden" onKeyDown={handleKeyDown}>
      {/* Form Title & Category Bar */}
      <div className="p-6 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              1. Choose Experience Category
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select the type of event or milestone you want to transform
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = formData.experienceType === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange({ experienceType: cat.id })}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/30'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Title / Headline */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Experience Title / Headline <span className="text-pink-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Won 2nd Place at HackHealth 2024, or Finished Summer SWE Internship"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Organization & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Host / Organization / Company
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => onChange({ organization: e.target.value })}
              placeholder="e.g. Stanford University, Microsoft, AWS, ACM Student Chapter"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Your Role / Capacity
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => onChange({ role: e.target.value })}
              placeholder="e.g. Team Lead, Attendee, Intern, Speaker, Volunteer"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Raw Experience Details */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              The Story, Raw Notes & Details <span className="text-pink-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Paste rough notes, bullet points, or stream-of-consciousness
            </span>
          </div>
          <textarea
            rows={5}
            value={formData.rawExperience}
            onChange={(e) => onChange({ rawExperience: e.target.value })}
            placeholder="Tell us what happened:
• What was the goal or project about?
• What went wrong or challenged you? (e.g. bug at 2 AM, nervous before the talk)
• How did you or your team solve it?
• What was the final outcome or feeling?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition leading-relaxed"
          />
        </div>

        {/* Key Metrics & Learnings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Key Metrics & Numbers</span>
              <span className="text-[10px] text-indigo-400 font-normal">Adds instant credibility</span>
            </label>
            <input
              type="text"
              value={formData.keyMetrics}
              onChange={(e) => onChange({ keyMetrics: e.target.value })}
              placeholder="e.g. 36 hours, 120 teams, 40% latency drop, $2k prize"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Top Lessons or Takeaways</span>
              <span className="text-[10px] text-emerald-400 font-normal">Authentic insight</span>
            </label>
            <input
              type="text"
              value={formData.keyLearnings}
              onChange={(e) => onChange({ keyLearnings: e.target.value })}
              placeholder="e.g. Testing under pressure, rapid pivoting, empathy in ops"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Post Tone of Voice
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {TONES.map((t) => {
              const isSelected = formData.tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChange({ tone: t.id })}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{t.emoji}</span>
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-indigo-300' : 'text-slate-200'
                      }`}
                    >
                      {t.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                    {t.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Concept Angle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Concept Angle / Focus Lens
            </label>
            <span className="text-[11px] text-slate-400">
              Steer how the AI frames the narrative
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {CONCEPT_ANGLES.map((angle) => {
              const isSelected = formData.conceptAngle === angle.id;
              return (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => onChange({ conceptAngle: angle.id })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 text-purple-200 ring-2 ring-purple-500/20'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="font-semibold">{angle.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{angle.hint}</div>
                </button>
              );
            })}
          </div>

          {formData.conceptAngle === 'custom' && (
            <div className="mt-2 animate-in fade-in duration-200">
              <input
                type="text"
                value={formData.customPrompt}
                onChange={(e) => onChange({ customPrompt: e.target.value })}
                placeholder="e.g. Focus specifically on how we debugged the Redis race condition at 4 AM"
                className="w-full px-3.5 py-2 rounded-xl bg-purple-950/30 border border-purple-800/80 text-purple-100 placeholder-purple-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* Collapsible Advanced Section (Author Profile & Shoutouts) */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
          >
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>Author Profile & Shoutouts ({showAdvanced ? 'Hide' : 'Customize'})</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800 animate-in fade-in duration-200">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Author Name (For Previews)
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => onChange({ authorName: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Author Professional Headline
                </label>
                <input
                  type="text"
                  value={formData.authorTitle}
                  onChange={(e) => onChange({ authorTitle: e.target.value })}
                  placeholder="e.g. Software Engineer | Open Source Builder"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Mentors, Teammates & Credits
                </label>
                <input
                  type="text"
                  value={formData.mentorsOrTeam}
                  onChange={(e) => onChange({ mentorsOrTeam: e.target.value })}
                  placeholder="e.g. Sarah (ML), Dave (Design), Prof. Vance"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Generates tailored posts for LinkedIn, Twitter, Instagram, Threads & Portfolio</span>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || (!formData.title.trim() && !formData.rawExperience.trim())}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Crafting Authentic Stories...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Generate Multi-Platform Posts</span>
                <span className="hidden sm:inline text-[11px] opacity-75 font-normal ml-1 border border-white/20 px-1.5 py-0.5 rounded">
                  ⌘↵
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
