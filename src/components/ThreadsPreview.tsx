import React from 'react';
import { Copy, Check, MessageCircle, Heart, Repeat, Send, Edit3, Wand2 } from 'lucide-react';
import { ThreadsPost } from '../types';

interface ThreadsPreviewProps {
  post: ThreadsPost;
  authorName: string;
  onUpdatePost: (updated: Partial<ThreadsPost>) => void;
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const ThreadsPreview: React.FC<ThreadsPreviewProps> = ({
  post,
  authorName,
  onUpdatePost,
  onRefine,
  isRefining,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editableContent, setEditableContent] = React.useState(post.content);

  React.useEffect(() => {
    setEditableContent(post.content);
  }, [post.content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdatePost({ content: editableContent });
    setIsEditing(false);
  };

  const username = authorName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'builder';

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
            Threads & Bluesky
          </span>
          <span className="hidden sm:inline">• Conversational & Real Talk</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            disabled={isRefining}
            onClick={() =>
              onRefine('Make this Threads post more casual, self-effacing, and invite open discussion in the replies.')
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium disabled:opacity-50"
          >
            <Wand2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isRefining ? 'Polishing...' : 'Make Casual'}</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium"
          >
            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/30 transition cursor-pointer"
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

      {/* Realistic Threads Card Mockup */}
      <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-xl p-5 space-y-4 font-sans">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-sm">
              {authorName[0] || 'A'}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-sm">{username}</span>
                <span className="text-slate-500 text-xs">2h</span>
              </div>
              <p className="text-xs text-slate-400">threads.net</p>
            </div>
          </div>
          <span className="text-slate-600 font-bold text-base">@</span>
        </div>

        {/* Post Content */}
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              rows={6}
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm leading-relaxed focus:ring-1 focus:ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 rounded bg-emerald-600 text-xs text-white font-bold"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        )}

        {/* Discussion Question Prompt Callout */}
        {post.conversationalPrompt && (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <span className="font-bold shrink-0">💬 Reply Starter:</span>
            <span>{post.conversationalPrompt}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center gap-5 text-slate-400 pt-2 border-t border-slate-900 text-xs">
          <span className="flex items-center gap-1.5 hover:text-red-400 cursor-pointer transition">
            <Heart className="w-4 h-4" />
            <span>89</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition">
            <MessageCircle className="w-4 h-4" />
            <span>24</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer transition">
            <Repeat className="w-4 h-4" />
            <span>7</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-slate-200 cursor-pointer transition">
            <Send className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
