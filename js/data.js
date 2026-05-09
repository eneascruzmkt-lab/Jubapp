/**
 * Recipe & Video data
 * TODO: Replace placeholder content with real recipes from Mama Juba
 */

const CATEGORIES = [
  { id: 'joints', label: 'Joint Pain', svgIcon: 'bone', color: '#8B6F4A' },
  { id: 'sleep', label: 'Sleep', svgIcon: 'moon', color: '#4A6B43' },
  { id: 'energy', label: 'Energy', svgIcon: 'bolt', color: '#B8956A' },
  { id: 'brain', label: 'Brain Fog', svgIcon: 'brain', color: '#6B8A5E' },
  { id: 'digestion', label: 'Digestion', svgIcon: 'flame', color: '#8B3A2E' },
  { id: 'pressure', label: 'Blood Pressure', svgIcon: 'heart', color: '#A85B4D' }
];

const SAFETY_FLAGS = {
  bloodThinners: {
    label: 'Blood Thinners',
    warning: 'This recipe contains ingredients that may affect blood clotting. Consult your physician before use.',
    ingredients: ['turmeric', 'ginger']
  },
  pregnancy: {
    label: 'Pregnancy',
    warning: 'Some ingredients in this recipe are not recommended during pregnancy. Consult your physician.',
    ingredients: ['turmeric', 'cinnamon']
  }
};

const RECIPES = [
  {
    id: 'golden-joint-tea',
    title: 'Golden Joint Tea',
    subtitle: 'Mama Juba\'s morning ritual for stiff knees',
    category: 'joints',
    prepTime: '5 min',
    ingredients: [
      { name: 'Turmeric (ground)', amount: '1 tsp' },
      { name: 'Ginger (fresh, grated)', amount: '1/2 inch' },
      { name: 'Black pepper', amount: '1 pinch' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Warm water', amount: '1 cup' }
    ],
    steps: [
      'Boil water and let it cool for 1 minute.',
      'Add turmeric and grated ginger to your cup.',
      'Pour the warm water and stir well.',
      'Add a pinch of black pepper — this helps your body absorb the turmeric.',
      'Sweeten with honey. Drink every morning before breakfast.'
    ],
    why: 'Turmeric contains curcumin, a compound studied at Johns Hopkins for its effect on joint inflammation. Black pepper increases absorption by up to 2,000%. Ginger adds warmth and supports circulation to stiff areas.',
    safetyFlags: ['bloodThinners', 'pregnancy'],
    videoId: null // TODO: add YouTube video ID
  },
  {
    id: 'sleep-cinnamon-milk',
    title: 'Cinnamon Sleep Milk',
    subtitle: 'The recipe that stopped 3am wake-ups',
    category: 'sleep',
    prepTime: '5 min',
    ingredients: [
      { name: 'Warm milk (or oat milk)', amount: '1 cup' },
      { name: 'Cinnamon (ground)', amount: '1/2 tsp' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Nutmeg', amount: '1 tiny pinch' }
    ],
    steps: [
      'Warm the milk gently — don\'t boil.',
      'Stir in cinnamon and nutmeg.',
      'Add honey once slightly cooled.',
      'Drink 30 minutes before bed. Sit quietly while you drink it.'
    ],
    why: 'Cinnamon helps stabilize blood sugar through the night — unstable sugar is a top cause of 3am wake-ups. Honey provides slow-release glucose so your brain doesn\'t trigger a cortisol spike. Nutmeg has been used for centuries as a gentle sedative.',
    safetyFlags: ['pregnancy'],
    videoId: null
  },
  {
    id: 'brain-fog-tonic',
    title: 'Morning Clarity Tonic',
    subtitle: 'Find your words again',
    category: 'brain',
    prepTime: '3 min',
    ingredients: [
      { name: 'Lemon juice (fresh)', amount: '1/2 lemon' },
      { name: 'Apple cider vinegar', amount: '1 tbsp' },
      { name: 'Ginger (grated)', amount: '1/4 inch' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Warm water', amount: '1 glass' }
    ],
    steps: [
      'Squeeze the lemon into warm water.',
      'Add apple cider vinegar and grated ginger.',
      'Stir in honey.',
      'Drink first thing in the morning, on an empty stomach.'
    ],
    why: 'Lemon and ACV support liver function — when your liver is sluggish, toxins circulate longer and cloud your thinking. Ginger increases blood flow to the brain. This combination was Mama Juba\'s grandmother\'s daily ritual until she was 94.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'garlic-honey-elixir',
    title: 'Garlic-Honey Heart Elixir',
    subtitle: 'Steady numbers, no more worry',
    category: 'pressure',
    prepTime: '10 min + 7 days ferment',
    ingredients: [
      { name: 'Garlic cloves (peeled)', amount: '1 full head' },
      { name: 'Raw honey', amount: 'enough to cover' },
      { name: 'Small glass jar with lid', amount: '1' }
    ],
    steps: [
      'Peel all cloves from one head of garlic.',
      'Place them in a small glass jar.',
      'Cover completely with raw honey. Close the lid loosely.',
      'Let it sit at room temperature for 7 days. Flip the jar once daily.',
      'After 7 days, eat 1 clove every morning. The honey becomes medicine too — take 1 tsp.'
    ],
    why: 'Garlic contains allicin, studied at Stanford for its effect on blood pressure. Fermented in honey, it becomes easier to digest and the antimicrobial properties are enhanced. This is one of the oldest remedies in Mama Juba\'s family library.',
    safetyFlags: ['bloodThinners'],
    videoId: null
  },
  {
    id: 'belly-ease-brew',
    title: 'Belly Ease Brew',
    subtitle: 'When bloating takes over your day',
    category: 'digestion',
    prepTime: '5 min',
    ingredients: [
      { name: 'Ginger (fresh, sliced)', amount: '1 inch' },
      { name: 'Lemon juice', amount: '1/2 lemon' },
      { name: 'Peppermint leaves (or tea bag)', amount: '4-5 leaves' },
      { name: 'Warm water', amount: '1 cup' }
    ],
    steps: [
      'Slice ginger thinly and place in your cup.',
      'Add peppermint leaves.',
      'Pour warm water and steep for 5 minutes.',
      'Squeeze lemon in. Drink after meals when bloating hits.'
    ],
    why: 'Ginger relaxes the intestinal muscles that cause gas and cramping. Peppermint is a natural antispasmodic — it calms the gut lining. Lemon stimulates bile production for better digestion. Together, they work within 20 minutes.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'energy-fire-shot',
    title: 'Fire Cider Energy Shot',
    subtitle: 'The kind of energy that lasts all day',
    category: 'energy',
    prepTime: '5 min',
    ingredients: [
      { name: 'Apple cider vinegar', amount: '1 tbsp' },
      { name: 'Lemon juice', amount: '1/2 lemon' },
      { name: 'Ginger (grated)', amount: '1/4 inch' },
      { name: 'Cayenne pepper', amount: '1 tiny pinch' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Warm water', amount: '1/2 cup' }
    ],
    steps: [
      'Mix all ingredients in half a cup of warm water.',
      'Stir well and drink in one go.',
      'Take after breakfast. Never on an empty stomach.',
      'Follow with a full glass of water.'
    ],
    why: 'This combination triggers thermogenesis — your body\'s natural heat production — which increases energy without the caffeine crash. ACV stabilizes blood sugar to prevent the afternoon slump. Cayenne boosts circulation within minutes.',
    safetyFlags: [],
    videoId: null
  }
];

const VIDEOS = [
  {
    id: 'intro',
    title: 'Welcome to Mama Juba\'s Kitchen',
    description: 'Meet Mama Juba and understand the healing philosophy behind every recipe.',
    category: 'general',
    youtubeId: null, // TODO: add real YouTube ID
    duration: '8 min'
  },
  {
    id: 'joints-module',
    title: 'Healing Your Joints — The Complete Module',
    description: 'Every recipe for joint pain, taught step by step.',
    category: 'joints',
    youtubeId: null,
    duration: '22 min'
  },
  {
    id: 'sleep-module',
    title: 'Sleeping Through the Night Again',
    description: 'Evening rituals and recipes for deep, uninterrupted rest.',
    category: 'sleep',
    youtubeId: null,
    duration: '18 min'
  },
  {
    id: 'brain-module',
    title: 'Clearing the Fog — Brain Health Recipes',
    description: 'Morning tonics and daily habits for sharp thinking.',
    category: 'brain',
    youtubeId: null,
    duration: '15 min'
  },
  {
    id: 'energy-module',
    title: 'Real Energy That Lasts All Day',
    description: 'Recipes that rebuild what modern life drains.',
    category: 'energy',
    youtubeId: null,
    duration: '16 min'
  },
  {
    id: 'digestion-module',
    title: 'Gut Healing — Bloating, Gas & Discomfort',
    description: 'Simple brews that calm your belly in minutes.',
    category: 'digestion',
    youtubeId: null,
    duration: '14 min'
  }
];
