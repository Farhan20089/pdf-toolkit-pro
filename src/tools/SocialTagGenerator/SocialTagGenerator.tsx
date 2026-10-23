import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Hash, 
  Youtube, 
  Instagram, 
  Twitter, 
  Video, 
  Flame, 
  SlidersHorizontal,
  Bookmark,
  Share2
} from 'lucide-react';
import { NICHES, PLATFORM_LIMITS } from './tagDatabase';
import { useClipboard } from '../../hooks/useClipboard';

interface GeneratedMeta {
  titles: { title: string; score: number; style: string }[];
  description: string;
  hashtags: string[];
  commaTags: string;
  tiktokCaption: string;
  instagramCaption: string;
  twitterPost: string;
}

export function SocialTagGenerator() {
  const [topic, setTopic] = useState('Build a Full-Stack AI App in 2026');
  const [selectedNiche, setSelectedNiche] = useState('tech');
  const [selectedTone, setSelectedTone] = useState<'viral' | 'seo' | 'curiosity'>('viral');
  const [activePlatform, setActivePlatform] = useState<'all' | 'youtube' | 'tiktok' | 'instagram'>('all');

  const { copy, copiedKey } = useClipboard();

  // Programmatic generation of viral titles, descriptions, and hashtags
  const generated: GeneratedMeta = useMemo(() => {
    const cleanTopic = topic.trim() || 'My Next Project';
    const niche = NICHES[selectedNiche] || NICHES.tech;
    const powerWord1 = niche.powerWords[0];
    const powerWord2 = niche.powerWords[1];
    const powerWord3 = niche.powerWords[2];

    // Titles
    const titles = [
      {
        title: `How I Built ${cleanTopic} (The ${powerWord1} Truth)`,
        score: 96,
        style: 'High-CTR Curiosity'
      },
      {
        title: `${cleanTopic}: Stop Making These 3 Costly Mistakes in 2026`,
        score: 92,
        style: 'Problem / Solution'
      },
      {
        title: `The ${powerWord2} Guide to ${cleanTopic} (Step-by-Step Tutorial)`,
        score: 89,
        style: 'SEO Ranking Search'
      },
      {
        title: `Why Nobody Is Talking About ${cleanTopic} Yet (${powerWord3})`,
        score: 95,
        style: 'Viral Trend Hook'
      },
      {
        title: `I Tested ${cleanTopic} for 30 Days — Here's What Happened`,
        score: 94,
        style: 'Personal Case Study'
      }
    ];

    // Topical Hashtags
    const words = cleanTopic.split(/\s+/).filter(w => w.length > 2);
    const customHashtags = words.map(w => `#${w.replace(/[^a-zA-Z0-9]/g, '')}`);
    const hashtags = Array.from(new Set([...customHashtags, ...niche.popularHashtags])).slice(0, 18);

    // YouTube Comma Tags
    const baseTags = [
      cleanTopic.toLowerCase(),
      `${cleanTopic.toLowerCase()} tutorial`,
      `${cleanTopic.toLowerCase()} guide`,
      `${cleanTopic.toLowerCase()} 2026`,
      ...niche.broadTags,
    ];
    let tagString = '';
    for (const t of baseTags) {
      if ((tagString + t + ', ').length <= 480) {
        tagString += (tagString ? ', ' : '') + t;
      }
    }

    // Descriptions
    const description = `In this video, we break down everything you need to know about ${cleanTopic} from scratch. Whether you're looking for an actionable step-by-step strategy or the biggest lessons learned, this guide has you covered!

🔥 KEY TIMESTAMPS:
00:00 - Introduction & The Big Problem
02:15 - Core Framework & Strategy
05:40 - Real-World Walkthrough of ${cleanTopic}
08:20 - Top 3 Mistakes to Avoid
11:00 - Next Steps & Pro Tips

💡 RESOURCES & LINKS:
• Get the free toolkit & source files: https://omnitoolkit.dev
• Connect with our community: Follow on social

Don't forget to LIKE, SUBSCRIBE, and ring the bell for more in-depth tutorials on ${niche.name}!

${hashtags.slice(0, 5).join(' ')}`;

    // TikTok Caption
    const tiktokCaption = `You won't believe what happens when you try ${cleanTopic} 🤯 Watch until the end for the secret step! Comment below if you want the full breakdown. ${hashtags.slice(0, 6).join(' ')}`;

    // Instagram Caption
    const instagramCaption = `Everything you need to master ${cleanTopic} in 2026 👇

Save this reel for later so you don't lose the blueprint!

1️⃣ Step 1: Establish your foundation
2️⃣ Step 2: Implement the proven workflow
3️⃣ Step 3: Iterate and scale

Drop a "🚀" in the comments if you want the link to the free templates!
.
.
${hashtags.join(' ')}`;

    // Twitter Post
    const twitterPost = `Most people are approaching ${cleanTopic} completely wrong in 2026.

Here is the 3-step breakdown you need to succeed:

1/ Focus on zero-latency execution
2/ Protect your data & privacy
3/ Scale client-side tools

Full breakdown 👇 ${hashtags.slice(0, 3).join(' ')}`;

    return {
      titles,
      description,
      hashtags,
      commaTags: tagString,
      tiktokCaption,
      instagramCaption,
      twitterPost,
    };
  }, [topic, selectedNiche, selectedTone]);

  return (
    <div className="space-y-8">
      {/* Input & Parameters Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Generate Viral Social & Video Metadata
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Keyword Input */}
          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Video Title / Subject / Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How to Start Freelancing in 2026"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {topic && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Niche Selector */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Content Category / Niche
            </label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.values(NICHES).map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tone Selector */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Optimization Style
            </label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as any)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="viral">🔥 Viral Curiosity Hook</option>
              <option value="seo">🔍 High-Volume Search SEO</option>
              <option value="curiosity">🎯 Problem & Solution</option>
            </select>
          </div>
        </div>

        {/* Quick Topic Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Quick Ideas:</span>
          {[
            'Best Productivity Apps 2026',
            'Full-Stack Next.js vs Vite Guide',
            'How to Get First Upwork Client',
            'AI Side Hustles That Actually Pay',
          ].map((idea) => (
            <button
              key={idea}
              type="button"
              onClick={() => setTopic(idea)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
            >
              {idea}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Filter Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActivePlatform('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activePlatform === 'all'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Formats
        </button>
        <button
          type="button"
          onClick={() => setActivePlatform('youtube')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 ${
            activePlatform === 'youtube'
              ? 'bg-red-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Youtube className="w-3.5 h-3.5" />
          YouTube
        </button>
        <button
          type="button"
          onClick={() => setActivePlatform('tiktok')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 ${
            activePlatform === 'tiktok'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          TikTok
        </button>
        <button
          type="button"
          onClick={() => setActivePlatform('instagram')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 ${
            activePlatform === 'instagram'
              ? 'bg-pink-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Instagram className="w-3.5 h-3.5" />
          Instagram
        </button>
      </div>

      {/* 1. High-CTR Video & Post Titles */}
      {(activePlatform === 'all' || activePlatform === 'youtube') && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                5 High-CTR Video & Post Titles
              </h4>
            </div>
            <span className="text-xs text-slate-400">Optimized for &lt; 60 chars before mobile truncation</span>
          </div>

          <div className="space-y-2.5">
            {generated.titles.map((item, idx) => {
              const charCount = item.title.length;
              const isCopied = copiedKey === `title-${idx}`;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4 group hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                        {item.style}
                      </span>
                      <span className={charCount > 60 ? 'text-amber-500 font-medium' : 'text-emerald-500'}>
                        {charCount} / 100 chars
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        CTR Score: {item.score}%
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copy(item.title, `title-${idx}`)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600 transition-colors"
                    title="Copy title"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Algorithmic Hashtags Cluster */}
      {(activePlatform === 'all' || activePlatform === 'tiktok' || activePlatform === 'instagram') && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-500" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Trending Viral Hashtag Cloud
              </h4>
            </div>

            <button
              type="button"
              onClick={() => copy(generated.hashtags.join(' '), 'all-hashtags')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800"
            >
              {copiedKey === 'all-hashtags' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Copied All!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy All ({generated.hashtags.length})
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {generated.hashtags.map((tag, idx) => {
              const isCopied = copiedKey === `tag-${idx}`;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => copy(tag, `tag-${idx}`)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>{tag}</span>
                  {isCopied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400">
            Tip: TikTok performs best with 3-5 hyper-targeted tags, while Instagram maximizes reach with 10-15 mixed volume tags.
          </p>
        </div>
      )}

      {/* 3. YouTube Tags Block (Comma Separated) */}
      {(activePlatform === 'all' || activePlatform === 'youtube') && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  YouTube Tags (Comma-Separated Block)
                </h4>
                <p className="text-xs text-slate-400">Paste directly into YouTube Studio Tag field</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold ${
                generated.commaTags.length > 500 ? 'text-red-500' : 'text-emerald-500'
              }`}>
                {generated.commaTags.length} / 500 chars
              </span>
              <button
                type="button"
                onClick={() => copy(generated.commaTags, 'comma-tags')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors inline-flex items-center gap-1.5 border border-red-200 dark:border-red-900"
              >
                {copiedKey === 'comma-tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Tag Block
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={generated.commaTags}
            rows={3}
            className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
          />
        </div>
      )}

      {/* 4. Complete SEO Video / Post Description */}
      {(activePlatform === 'all' || activePlatform === 'youtube') && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-500" />
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  Optimized YouTube Description & Timestamps
                </h4>
                <p className="text-xs text-slate-400">Includes chapters, search hooks, links, and hashtags</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                {generated.description.length} / 5,000 chars
              </span>
              <button
                type="button"
                onClick={() => copy(generated.description, 'description')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                {copiedKey === 'description' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Full Description
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={generated.description}
            rows={8}
            className="w-full p-4 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
          />
        </div>
      )}

      {/* 5. TikTok & Instagram Ready-to-Post Captions */}
      {(activePlatform === 'all' || activePlatform === 'tiktok' || activePlatform === 'instagram') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TikTok */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                TikTok Viral Caption
              </span>
              <button
                type="button"
                onClick={() => copy(generated.tiktokCaption, 'tiktok-caption')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                {copiedKey === 'tiktok-caption' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <textarea
              readOnly
              value={generated.tiktokCaption}
              rows={4}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>{generated.tiktokCaption.length} / 2,200 chars</span>
              <span>Hooks high watch duration</span>
            </div>
          </div>

          {/* Instagram */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-500" />
                Instagram Carousel / Reel Caption
              </span>
              <button
                type="button"
                onClick={() => copy(generated.instagramCaption, 'ig-caption')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                {copiedKey === 'ig-caption' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <textarea
              readOnly
              value={generated.instagramCaption}
              rows={4}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            />
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>{generated.instagramCaption.length} / 2,200 chars</span>
              <span>18 hashtags included</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
