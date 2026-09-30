import React from 'react';
import {
  Copy,
  Check,
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  Sparkles,
  Layers,
  Wand2,
} from 'lucide-react';
import { TwitterPost } from '../types';

interface TwitterPreviewProps {
  post: TwitterPost;
  authorName: string;
  authorTitle: string;
  onUpdatePost: (updated: Partial<TwitterPost>) => void;
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const TwitterPreview: React.FC<TwitterPreviewProps> = ({
  post,
  authorName,
  authorTitle,
  onUpdatePost,
  onRefine,
  isRefining,
}) => {
  const [activeMode, setActiveMode] = React.useState<'single' | 'thread'>('single');
  const [copiedType, setCopiedType] = React.useState<'single' | 'thread' | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editableSingle, setEditableSingle] = React.useState(post.singleTweet);
  const [editableThread, setEditableThread] = React.useState<string[]>(post.thread || []);

  React.useEffect(() => {
    setEditableSingle(post.singleTweet);
    setEditableThread(post.thread || []);
  }, [post.singleTweet, post.thread]);

  const handleCopySingle = () => {
    navigator.clipboard.writeText(post.singleTweet);
    setCopiedType('single');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyThread = () => {
    const formatted = post.thread
      .map((tweet, idx) => `[${idx + 1}/${post.thread.length}]\n${tweet}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(formatted);
    setCopiedType('thread');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSaveEdits = () => {
    onUpdatePost({
      singleTweet: editableSingle,
      thread: editableThread,
    });
    setIsEditing(false);
  };

  const handleThreadItemChange = (index: number, val: string) => {
    const updated = [...editableThread];
    updated[index] = val;
    setEditableThread(updated);
  };

  const handleAddThreadTweet = () => {
    setEditableThread([...editableThread, '']);
  };

  const handleRemoveThreadTweet = (index: number) => {
    if (editableThread.length <= 1) return;
    setEditableThread(editableThread.filter((_, i) => i !== index));
  };

  // Character limit calculations for single tweet
  const charLimit = 280;
  const currentChars = post.singleTweet.length;
  const remaining = charLimit - currentChars;
  const progressPercent = Math.min(100, (currentChars / charLimit) * 100);

  const username = authorName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'builder';

  return (
    <div className="space-y-4">
      {/* Top Toolbar: Switcher & Copy Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveMode('single')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeMode === 'single'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Single Tweet ({currentChars}/280)
          </button>
          <button
            onClick={() => setActiveMode('thread')}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1 transition ${
              activeMode === 'thread'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Story Thread ({post.thread?.length || 0})</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Tweets'}
          </button>

          {/* Quick AI Refine */}
          <button
            disabled={isRefining}
            onClick={() =>
              onRefine(
                activeMode === 'single'
                  ? 'Make this single tweet punchier, under 260 characters, with high viral resonance.'
                  : 'Optimize this Twitter thread with a stronger hook tweet, clear obstacle, and lesson.'
              )
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 font-medium transition disabled:opacity-50"
          >
            <Wand2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{isRefining ? 'Polishing...' : 'Punch Up'}</span>
          </button>

          {/* Copy Button */}
          {activeMode === 'single' ? (
            <button
              onClick={handleCopySingle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow-md shadow-sky-500/20 transition cursor-pointer"
            >
              {copiedType === 'single' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Tweet</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleCopyThread}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow-md shadow-sky-500/20 transition cursor-pointer"
            >
              {copiedType === 'thread' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Thread Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Entire Thread</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Editing View */}
      {isEditing && (
        <div className="p-4 bg-slate-900 border border-indigo-500/40 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Editing Tweets
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdits}
                className="px-3 py-1 rounded bg-sky-500 text-xs text-white font-bold"
              >
                Save
              </button>
            </div>
          </div>

          {activeMode === 'single' ? (
            <div>
              <label className="block text-xs text-slate-400 mb-1">Single Tweet</label>
              <textarea
                rows={4}
                value={editableSingle}
                onChange={(e) => setEditableSingle(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500"
              />
              <span className={`text-xs ${editableSingle.length > 280 ? 'text-red-400' : 'text-slate-400'}`}>
                {editableSingle.length} / 280
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {editableThread.map((tweet, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">Tweet {idx + 1} of {editableThread.length}</span>
                    <button
                      onClick={() => handleRemoveThreadTweet(idx)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={tweet}
                    onChange={(e) => handleThreadItemChange(idx, e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:ring-1 focus:ring-sky-500"
                  />
                  <div className="text-[11px] text-slate-500">{tweet.length} chars</div>
                </div>
              ))}
              <button
                onClick={handleAddThreadTweet}
                className="w-full py-2 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium"
              >
                + Add Another Tweet to Thread
              </button>
            </div>
          )}
        </div>
      )}

      {/* Realistic X/Twitter Feed Mockup */}
      <div className="bg-black border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {activeMode === 'single' ? (
          /* Single Tweet View */
          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {authorName[0] || 'A'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm hover:underline cursor-pointer">
                      {authorName}
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                    <span className="text-slate-500 text-xs">@{username}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">14m ago</p>
                </div>
              </div>
              <span className="text-slate-600 font-bold text-lg">𝕏</span>
            </div>

            {/* Tweet Text */}
            <div className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-line selection:bg-sky-500/30">
              {post.singleTweet}
            </div>

            {/* Character meter */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs">
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5 transform -rotate-90">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-800"
                      fill="transparent"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={50}
                      strokeDashoffset={50 - (50 * progressPercent) / 100}
                      className={remaining < 0 ? 'text-red-500' : remaining < 20 ? 'text-amber-500' : 'text-sky-400'}
                      fill="transparent"
                    />
                  </svg>
                </div>
                <span className={remaining < 0 ? 'text-red-400 font-bold' : 'text-slate-500'}>
                  {remaining} characters left
                </span>
              </div>

              <span className="text-slate-500">9.4K Views</span>
            </div>

            {/* Tweet Action Icons */}
            <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-900 text-xs">
              <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition">
                <MessageCircle className="w-4 h-4" />
                <span>34</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition">
                <Repeat2 className="w-4 h-4" />
                <span>12</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-pink-500 cursor-pointer transition">
                <Heart className="w-4 h-4" />
                <span>218</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition">
                <Bookmark className="w-4 h-4" />
                <span>45</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition">
                <Share className="w-4 h-4" />
              </div>
            </div>
          </div>
        ) : (
          /* Connected Thread View */
          <div className="divide-y divide-slate-900">
            {post.thread.map((tweet, index) => {
              const isFirst = index === 0;
              const isLast = index === post.thread.length - 1;

              return (
                <div key={index} className="p-4 sm:p-5 relative flex gap-3">
                  {/* Timeline connecting line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md z-10">
                      {index + 1}
                    </div>
                    {!isLast && (
                      <div className="w-0.5 flex-1 bg-slate-800 my-1 min-h-[30px]" />
                    )}
                  </div>

                  {/* Tweet Body */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs sm:text-sm">
                          {authorName}
                        </span>
                        <span className="text-slate-500 text-xs">@{username}</span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-sky-950/60 border border-sky-800/40 text-sky-400 font-mono">
                          {index + 1}/{post.thread.length}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(tweet);
                          setCopiedType('single');
                          setTimeout(() => setCopiedType(null), 1500);
                        }}
                        className="text-[11px] text-slate-500 hover:text-sky-400 transition"
                        title="Copy this single tweet"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {tweet}
                    </div>

                    {/* Tweet sub-actions */}
                    <div className="flex items-center gap-6 text-slate-500 pt-1 text-[11px]">
                      <span className="flex items-center gap-1 hover:text-sky-400">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {Math.max(3, 18 - index * 4)}
                      </span>
                      <span className="flex items-center gap-1 hover:text-emerald-400">
                        <Repeat2 className="w-3.5 h-3.5" />
                        {Math.max(1, 9 - index * 2)}
                      </span>
                      <span className="flex items-center gap-1 hover:text-pink-400">
                        <Heart className="w-3.5 h-3.5" />
                        {Math.max(10, 85 - index * 18)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
