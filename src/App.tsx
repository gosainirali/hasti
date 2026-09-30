/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Linkedin,
  Twitter,
  Instagram,
  FileText,
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
  Bookmark,
  Send,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { Header } from './components/Header';
import { ExperienceForm } from './components/ExperienceForm';
import { AnalysisBanner } from './components/AnalysisBanner';
import { LinkedInPreview } from './components/LinkedInPreview';
import { TwitterPreview } from './components/TwitterPreview';
import { InstagramPreview } from './components/InstagramPreview';
import { ThreadsPreview } from './components/ThreadsPreview';
import { PortfolioPreview } from './components/PortfolioPreview';
import { SocialCardGenerator } from './components/SocialCardGenerator';
import { HookSuggestionsModal } from './components/HookSuggestionsModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { SAMPLE_EXPERIENCES } from './data/sampleExperiences';
import {
  ExperienceFormState,
  GeneratedPostsData,
  SavedHistoryItem,
  HookSuggestion,
} from './types';

type PlatformTab = 'linkedin' | 'twitter' | 'instagram' | 'threads' | 'portfolio';

export default function App() {
  // Initial form data prefilled with a rich sample to demonstrate high fidelity immediately
  const [formData, setFormData] = useState<ExperienceFormState>(() => {
    return SAMPLE_EXPERIENCES[0].data;
  });

  const [generatedData, setGeneratedData] = useState<GeneratedPostsData | null>(null);
  const [activeTab, setActiveTab] = useState<PlatformTab>('linkedin');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isCardStudioOpen, setIsCardStudioOpen] = useState(false);
  const [isHooksModalOpen, setIsHooksModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Hooks & History state
  const [hookSuggestions, setHookSuggestions] = useState<HookSuggestion[]>([]);
  const [isLoadingHooks, setIsLoadingHooks] = useState(false);
  const [history, setHistory] = useState<SavedHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('beaconpost_history_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('beaconpost_history_v1', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Handle Form changes
  const handleFormChange = (updated: Partial<ExperienceFormState>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  // Generate All Posts
  const handleGenerate = async () => {
    if (!formData.title.trim() && !formData.rawExperience.trim()) {
      setErrorMessage('Please provide a title or experience description first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data: GeneratedPostsData = await response.json();
      setGeneratedData(data);

      // Save to History
      const newHistoryItem: SavedHistoryItem = {
        id: 'hist_' + Date.now(),
        timestamp: Date.now(),
        input: { ...formData },
        output: data,
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 24)]);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err.message || 'Failed to generate posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger generation on first mount so user instantly sees live results
  useEffect(() => {
    if (!generatedData) {
      handleGenerate();
    }
  }, []);

  // Refine single platform post with instruction
  const handleRefinePost = async (instruction: string) => {
    if (!generatedData) return;
    setIsRefining(true);
    setErrorMessage(null);

    try {
      let currentContent = '';
      if (activeTab === 'linkedin') currentContent = generatedData.posts.linkedin.content;
      else if (activeTab === 'twitter') currentContent = generatedData.posts.twitter.singleTweet;
      else if (activeTab === 'instagram') currentContent = generatedData.posts.instagram.caption;
      else if (activeTab === 'threads') currentContent = generatedData.posts.threads.content;
      else if (activeTab === 'portfolio') currentContent = generatedData.posts.portfolio.oneParagraphSummary;

      const response = await fetch('/api/refine-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: activeTab,
          currentContent,
          instruction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refine post');
      }

      const res = await response.json();
      const updatedText = res.refinedContent;

      setGeneratedData((prev) => {
        if (!prev) return prev;
        const copy = { ...prev };
        if (activeTab === 'linkedin') {
          copy.posts.linkedin = { ...copy.posts.linkedin, content: updatedText };
        } else if (activeTab === 'twitter') {
          copy.posts.twitter = { ...copy.posts.twitter, singleTweet: updatedText };
        } else if (activeTab === 'instagram') {
          copy.posts.instagram = { ...copy.posts.instagram, caption: updatedText };
        } else if (activeTab === 'threads') {
          copy.posts.threads = { ...copy.posts.threads, content: updatedText };
        } else if (activeTab === 'portfolio') {
          copy.posts.portfolio = { ...copy.posts.portfolio, oneParagraphSummary: updatedText };
        }
        return copy;
      });
    } catch (err: any) {
      console.error('Refine failed:', err);
      setErrorMessage(err.message || 'Failed to refine post.');
    } finally {
      setIsRefining(false);
    }
  };

  // Fetch or regenerate 5 alternative hooks
  const handleFetchHooks = async () => {
    setIsLoadingHooks(true);
    setIsHooksModalOpen(true);
    try {
      const response = await fetch('/api/suggest-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          rawExperience: formData.rawExperience,
          platform: activeTab,
        }),
      });
      const data = await response.json();
      if (data.hooks) {
        setHookSuggestions(data.hooks);
      }
    } catch (err) {
      console.error('Failed to get hook suggestions:', err);
    } finally {
      setIsLoadingHooks(false);
    }
  };

  // Replace hook in current active post
  const handleApplyHook = (hookText: string) => {
    if (!generatedData) return;

    if (activeTab === 'linkedin') {
      const current = generatedData.posts.linkedin.content;
      // Replace first sentence or prepend
      const lines = current.split('\n\n');
      lines[0] = hookText;
      const newContent = lines.join('\n\n');
      setGeneratedData({
        ...generatedData,
        posts: {
          ...generatedData.posts,
          linkedin: {
            ...generatedData.posts.linkedin,
            hook: hookText,
            content: newContent,
          },
        },
      });
    } else if (activeTab === 'twitter') {
      setGeneratedData({
        ...generatedData,
        posts: {
          ...generatedData.posts,
          twitter: {
            ...generatedData.posts.twitter,
            singleTweet: `${hookText}\n\n${generatedData.posts.twitter.singleTweet.split('\n\n').slice(1).join('\n\n')}`,
          },
        },
      });
    }
  };

  // Select a sample experience
  const handleSelectSample = (sample: ExperienceFormState) => {
    setFormData(sample);
  };

  // Select an item from saved history
  const handleSelectHistoryItem = (item: SavedHistoryItem) => {
    setFormData(item.input);
    setGeneratedData(item.output);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Top App Header */}
      <Header
        onSelectSample={handleSelectSample}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenCardStudio={() => setIsCardStudioOpen(true)}
        historyCount={history.length}
      />

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-200 font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Section 1: Experience Capture Form */}
        <section>
          <ExperienceForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
        </section>

        {/* Section 2: Analysis & Generated Results */}
        {generatedData && (
          <section className="space-y-6 pt-4 animate-in fade-in duration-300">
            {/* Analysis & Authenticity Shield */}
            <AnalysisBanner analysis={generatedData.analysis} />

            {/* Platform Selector Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {[
                  {
                    id: 'linkedin',
                    label: 'LinkedIn',
                    icon: Linkedin,
                    color: 'text-blue-400',
                    bgActive: 'bg-blue-600 text-white shadow-blue-600/30',
                  },
                  {
                    id: 'twitter',
                    label: 'Twitter / X',
                    icon: Twitter,
                    color: 'text-sky-400',
                    bgActive: 'bg-sky-500 text-white shadow-sky-500/30',
                  },
                  {
                    id: 'instagram',
                    label: 'Instagram',
                    icon: Instagram,
                    color: 'text-pink-400',
                    bgActive: 'bg-pink-600 text-white shadow-pink-600/30',
                  },
                  {
                    id: 'threads',
                    label: 'Threads',
                    icon: MessageSquare,
                    color: 'text-emerald-400',
                    bgActive: 'bg-emerald-600 text-white shadow-emerald-600/30',
                  },
                  {
                    id: 'portfolio',
                    label: 'STAR Portfolio',
                    icon: FileText,
                    color: 'text-amber-400',
                    bgActive: 'bg-amber-600 text-white shadow-amber-600/30',
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as PlatformTab)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-md ${
                        isActive
                          ? tab.bgActive
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action shortcut to visual card generator */}
              <button
                onClick={() => setIsCardStudioOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Create Image Banner</span>
              </button>
            </div>

            {/* Platform Previews */}
            <div className="transition-all duration-200">
              {activeTab === 'linkedin' && (
                <LinkedInPreview
                  post={generatedData.posts.linkedin}
                  authorName={formData.authorName}
                  authorTitle={formData.authorTitle}
                  onUpdatePost={(updated) =>
                    setGeneratedData({
                      ...generatedData,
                      posts: {
                        ...generatedData.posts,
                        linkedin: { ...generatedData.posts.linkedin, ...updated },
                      },
                    })
                  }
                  onRefine={handleRefinePost}
                  onOpenHooksModal={handleFetchHooks}
                  onOpenCardStudio={() => setIsCardStudioOpen(true)}
                  isRefining={isRefining}
                />
              )}

              {activeTab === 'twitter' && (
                <TwitterPreview
                  post={generatedData.posts.twitter}
                  authorName={formData.authorName}
                  authorTitle={formData.authorTitle}
                  onUpdatePost={(updated) =>
                    setGeneratedData({
                      ...generatedData,
                      posts: {
                        ...generatedData.posts,
                        twitter: { ...generatedData.posts.twitter, ...updated },
                      },
                    })
                  }
                  onRefine={handleRefinePost}
                  isRefining={isRefining}
                />
              )}

              {activeTab === 'instagram' && (
                <InstagramPreview
                  post={generatedData.posts.instagram}
                  authorName={formData.authorName}
                  onUpdatePost={(updated) =>
                    setGeneratedData({
                      ...generatedData,
                      posts: {
                        ...generatedData.posts,
                        instagram: { ...generatedData.posts.instagram, ...updated },
                      },
                    })
                  }
                  onRefine={handleRefinePost}
                  isRefining={isRefining}
                />
              )}

              {activeTab === 'threads' && (
                <ThreadsPreview
                  post={generatedData.posts.threads}
                  authorName={formData.authorName}
                  onUpdatePost={(updated) =>
                    setGeneratedData({
                      ...generatedData,
                      posts: {
                        ...generatedData.posts,
                        threads: { ...generatedData.posts.threads, ...updated },
                      },
                    })
                  }
                  onRefine={handleRefinePost}
                  isRefining={isRefining}
                />
              )}

              {activeTab === 'portfolio' && (
                <PortfolioPreview post={generatedData.posts.portfolio} />
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            BeaconPost — Transform real career & learning milestones into authentic social impact.
          </p>
          <p className="text-[11px] text-slate-600">
            Zero cringe humblebrag • Tailored platform native formatting • STAR Framework
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <SocialCardGenerator
        isOpen={isCardStudioOpen}
        onClose={() => setIsCardStudioOpen(false)}
        initialTitle={formData.title}
        initialSubtitle={formData.keyLearnings || formData.rawExperience?.slice(0, 100)}
        initialBadge={formData.experienceType.replace('_', ' ').toUpperCase()}
        initialMetric={formData.keyMetrics}
        authorName={formData.authorName}
        authorRole={formData.authorTitle}
      />

      <HookSuggestionsModal
        isOpen={isHooksModalOpen}
        onClose={() => setIsHooksModalOpen(false)}
        hooks={hookSuggestions}
        onSelectHook={handleApplyHook}
        onRegenerate={handleFetchHooks}
        isLoading={isLoadingHooks}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
      />
    </div>
  );
}
