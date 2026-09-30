import React from 'react';
import { X, Trash2, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import { SavedHistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: SavedHistoryItem[];
  onSelectHistoryItem: (item: SavedHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onDeleteItem,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!isOpen) return null;

  const filtered = history.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.input.title.toLowerCase().includes(q) ||
      item.input.experienceType.toLowerCase().includes(q) ||
      (item.input.organization && item.input.organization.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Saved Generations ({history.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar & Clear all */}
          <div className="p-4 border-b border-slate-800/80 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history by title, category, company..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {history.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={onClearAll}
                  className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear History</span>
                </button>
              </div>
            )}
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                {searchTerm ? 'No matches found.' : 'No saved generations yet. Generate your first post!'}
              </div>
            ) : (
              filtered.map((item) => {
                const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/50 transition group space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-indigo-400 uppercase tracking-wider">
                        {item.input.experienceType.replace('_', ' ')}
                      </span>
                      <span className="text-slate-500">{dateStr}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-white transition">
                      {item.input.title || 'Untitled Experience'}
                    </h4>

                    {item.input.organization && (
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        🏢 {item.input.organization}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          onSelectHistoryItem(item);
                          onClose();
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition"
                      >
                        <span>Restore to View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
