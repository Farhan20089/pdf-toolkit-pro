export interface NicheData {
  id: string;
  name: string;
  popularHashtags: string[];
  broadTags: string[];
  powerWords: string[];
}

export const NICHES: Record<string, NicheData> = {
  tech: {
    id: 'tech',
    name: 'Tech & AI Software',
    popularHashtags: ['#TechTrends', '#ArtificialIntelligence', '#SoftwareEngineering', '#FutureTech', '#TechNews', '#CodingLife', '#WebDevelopment', '#ProductivityHacks'],
    broadTags: ['tech review', 'ai automation', 'future technology', 'software tools', 'coding tutorial', 'developer productivity', 'best apps 2026'],
    powerWords: ['Insane', 'Secret', 'Game-Changer', 'Revolutionary', 'Must-Have', 'Shocking', 'Unreal', 'Hidden'],
  },
  finance: {
    id: 'finance',
    name: 'Business & Finance',
    popularHashtags: ['#PersonalFinance', '#PassiveIncome', '#InvestingTips', '#SideHustle', '#FinancialFreedom', '#MoneyMindset', '#Entrepreneurship', '#WealthBuilding'],
    broadTags: ['make money online', 'investing for beginners', 'passive income ideas', 'freelancing tips', 'business strategy', 'financial independence'],
    powerWords: ['Profitable', 'Ultimate', 'Guaranteed', 'Zero-Risk', 'Step-by-Step', 'Explosive', 'Proven', 'Fast'],
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming & Entertainment',
    popularHashtags: ['#GamingCommunity', '#GamerMoments', '#EpicPlay', '#NextGenGaming', '#StreamerLife', '#GamingClips', '#Walkthrough', '#GameHighlights'],
    broadTags: ['gameplay highlights', 'epic moments', 'best settings', 'speedrun', 'walkthrough guide', 'secret ending', 'ranked gameplay'],
    powerWords: ['God-Tier', 'Unbelievable', 'Epic', 'Hilarious', 'Broken', 'Insane', 'Legendary', 'Clutch'],
  },
  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle & Productivity',
    popularHashtags: ['#DailyRoutine', '#ProductivityHacks', '#SelfImprovement', '#MorningRoutine', '#MindsetShift', '#AestheticVibes', '#WorkLifeBalance', '#GoalSetting'],
    broadTags: ['daily habits', 'morning routine', 'how to stay productive', 'life advice', 'aesthetic desk setup', 'minimalist lifestyle'],
    powerWords: ['Life-Changing', 'Effortless', 'Transformative', 'Essential', 'Mind-Blowing', 'Surprising', 'Simple'],
  },
  fitness: {
    id: 'fitness',
    name: 'Fitness & Health',
    popularHashtags: ['#FitnessMotivation', '#WorkoutRoutine', '#HealthyLifestyle', '#GymTok', '#NutritionTips', '#WeightLossJourney', '#StrengthTraining', '#CleanEating'],
    broadTags: ['workout routine', 'fat loss tips', 'muscle building', 'healthy recipes', 'gym workout', 'diet mistakes to avoid'],
    powerWords: ['Rapid', 'Scientific', 'Sculpted', 'Effective', 'Brutal', 'No-BS', 'Powerful', 'Peak'],
  },
};

export const PLATFORM_LIMITS = {
  youtube: {
    titleMax: 100,
    titleOptimal: 60,
    descMax: 5000,
    tagsMax: 500,
  },
  tiktok: {
    captionMax: 2200,
    tagsOptimal: 5,
  },
  instagram: {
    captionMax: 2200,
    hashtagsMax: 30,
    hashtagsOptimal: 15,
  },
  twitter: {
    postMax: 280,
  },
};
