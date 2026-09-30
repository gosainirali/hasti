import React from 'react';
import {
  Copy,
  Check,
  Edit3,
  Sparkles,
  Palette,
  ThumbsUp,
  MessageSquare,
  Repeat,
  Send,
  MoreHorizontal,
  Globe,
  Clock,
  Wand2,
} from 'lucide-react';
import { LinkedInPost } from '../types';

interface LinkedInPreviewProps {
  post: LinkedInPost;
  authorName: string;
  authorTitle: string;
  onUpdatePost: (updated: Partial<LinkedInPost>) => void;
  onRefine: (instruction: string) => Promise<void>;
  onOpenHooksModal: () => void;
  onOpenCardStudio: () => void;
  isRefining: boolean;
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  post,
  authorName,
  authorTitle,
  onUpdatePost,
  onRefine,
  onOpenHooksModal,
  onOpenCardStudio,
  isRefining,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [editableContent, setEditableContent] = React.useState(post.content);
  const [customRefinePrompt, setCustomRefinePrompt] = React.useState('');
  const [showRefineMenu, setShowRefineMenu] = React.useState(false);

  React.useEffect(() => {
    setEditableContent(post.content);
  }, [post.content]);

  const handleCopy = () => {
    // Append hashtags if not already in content
    const fullText = post.content.includes('#')
      ? post.content
      : `${post.content}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({ content: editableContent });
    setIsEditing(false);
  };

  const wordCount = post.content.trim().split(/\s+/).length;
  const charCount = post.content.length;

  // Simulate "...see more" cutoff line for realistic preview
  const foldLength = 220;
  const isLongerThanFold = post.content.length > foldLength;
  const previewText = !isExpanded && isLongerThanFold
    ? post.content.slice(0, foldLength)
    : post.content;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ME';
  };

  return (
    <div className="space-y-4">
      {/* Control Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            {post.estimatedReadTime || '1 min read'}
          </span>
          <span>•</span>
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Suggest Hooks button */}
          <button
            onClick={onOpenHooksModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition font-medium"
            title="Generate 5 alternative hooks for the opening lines"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Alternate Hooks</span>
          </button>

          {/* Quick Refine Menu */}
          <div className="relative">
            <button
              onClick={() => setShowRefineMenu(!showRefineMenu)}
              disabled={isRefining}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 transition font-medium disabled:opacity-50"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
              <span>{isRefining ? 'Polishing...' : 'Refine with AI'}</span>
            </button>

            {showRefineMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowRefineMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl p-2.5 z-40 space-y-2 animate-in fade-in duration-150">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                    Quick AI Transformations
                  </p>
                  <div className="space-y-1 text-xs">
                    {[
                      { label: 'Shorter & punchier (Cut 25%)', prompt: 'Shorten the post by 25% while keeping the core takeaways and impact metrics.' },
                      { label: 'More technical depth', prompt: 'Add more concrete technical details, tools, and architecture nuances.' },
                      { label: 'More conversational & humble', prompt: 'Make the tone more conversational, humble, and peer-to-peer.' },
                      { label: 'Stronger Call to Action', prompt: 'Add a thought-provoking, discussion-starting question at the end.' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={async () => {
                          setShowRefineMenu(false);
                          await onRefine(item.prompt);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-700 text-slate-200 hover:text-white transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-700/80">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (customRefinePrompt.trim()) {
                          setShowRefineMenu(false);
                          await onRefine(customRefinePrompt);
                          setCustomRefinePrompt('');
                        }
                      }}
                      className="flex gap-1"
                    >
                      <input
                        type="text"
                        value={customRefinePrompt}
                        onChange={(e) => setCustomRefinePrompt(e.target.value)}
                        placeholder="Custom tweak (e.g. emphasize mentor)..."
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500"
                      />
                      <button
                        type="submit"
                        className="px-2 py-1 rounded bg-purple-600 text-white font-bold text-xs hover:bg-purple-500"
                      >
                        Go
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Edit in place */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition font-medium"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit'}</span>
          </button>

          {/* Social Graphic Banner maker */}
          <button
            onClick={onOpenCardStudio}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 transition font-medium"
            title="Design a banner image for this post"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span>Card Studio</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30 transition cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Realistic LinkedIn Feed Card Mockup */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Top Post Author Header */}
        <div className="p-4 flex items-start justify-between border-b border-slate-900 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-blue-500/20 shrink-0">
              {getInitials(authorName)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-100 text-sm hover:text-blue-400 hover:underline cursor-pointer">
                  {authorName || 'Alex Morgan'}
                </span>
                <span className="text-[11px] text-slate-500">• 1st</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">
                {authorTitle || 'Software Engineer | Builder'}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <span>1h</span>
                <span>•</span>
                <span>Edited</span>
                <span>•</span>
                <Globe className="w-3 h-3 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1 text-xs font-semibold text-blue-400 hover:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-500/30 transition">
              + Follow
            </button>
            <button className="text-slate-400 hover:text-slate-200 p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Post Content Area */}
        <div className="p-4 sm:p-5">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                rows={12}
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-indigo-500 text-slate-100 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line space-y-2 selection:bg-indigo-500/30">
              {previewText}
              {!isExpanded && isLongerThanFold && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-slate-400 hover:text-blue-400 font-semibold text-xs ml-1 hover:underline cursor-pointer"
                >
                  ...see more
                </button>
              )}
            </div>
          )}

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-900 flex flex-wrap gap-1.5">
              {post.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}

          {/* Visual Media Suggestion Box */}
          {post.suggestedMediaPrompt && (
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  Recommended Visual to Attach
                </span>
                <p className="text-xs text-slate-300">
                  {post.suggestedMediaPrompt}
                </p>
              </div>
              <button
                onClick={onOpenCardStudio}
                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
              >
                Create Graphic
              </button>
            </div>
          )}
        </div>

        {/* Engagement Counter Bar */}
        <div className="px-5 py-2.5 border-t border-slate-900 bg-slate-900/20 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
                ❤️
              </span>
              <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-white">
                💡
              </span>
            </span>
            <span className="ml-1 text-slate-400">142 reactions</span>
          </div>
          <div className="flex items-center gap-3">
            <span>28 comments</span>
            <span>•</span>
            <span>9 reposts</span>
          </div>
        </div>

        {/* Social Action Buttons */}
        <div className="px-3 py-2 border-t border-slate-900 grid grid-cols-4 gap-1 text-slate-400">
          <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium hover:text-slate-200 transition">
            <ThumbsUp className="w-4 h-4" />
            <span className="hidden sm:inline">Like</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium hover:text-slate-200 transition">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Comment</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium hover:text-slate-200 transition">
            <Repeat className="w-4 h-4" />
            <span className="hidden sm:inline">Repost</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium hover:text-slate-200 transition">
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
