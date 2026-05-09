/**
 * Recipe & Video data
 * TODO: Replace placeholder content with real recipes from Mama Juba
 */

const CATEGORIES = [
  { id: 'joints', label: 'Joint Pain', svgIcon: 'bone', color: '#C75B39' },
  { id: 'sleep', label: 'Sleep', svgIcon: 'moon', color: '#5B6BB5' },
  { id: 'energy', label: 'Energy', svgIcon: 'bolt', color: '#D4930D' },
  { id: 'brain', label: 'Brain Fog', svgIcon: 'brain', color: '#7B5EA7' },
  { id: 'digestion', label: 'Digestion', svgIcon: 'flame', color: '#C24B4B' },
  { id: 'pressure', label: 'Blood Pressure', svgIcon: 'heart', color: '#D44D6E' }
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
    image: 'img/golden-joint-tea.webp',
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
      'Add a pinch of black pepper,this helps your body absorb the turmeric.',
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
    image: 'img/sleep-cinnamon-milk.webp',
    ingredients: [
      { name: 'Warm milk (or oat milk)', amount: '1 cup' },
      { name: 'Cinnamon (ground)', amount: '1/2 tsp' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Nutmeg', amount: '1 tiny pinch' }
    ],
    steps: [
      'Warm the milk gently,don\'t boil.',
      'Stir in cinnamon and nutmeg.',
      'Add honey once slightly cooled.',
      'Drink 30 minutes before bed. Sit quietly while you drink it.'
    ],
    why: 'Cinnamon helps stabilize blood sugar through the night,unstable sugar is a top cause of 3am wake-ups. Honey provides slow-release glucose so your brain doesn\'t trigger a cortisol spike. Nutmeg has been used for centuries as a gentle sedative.',
    safetyFlags: ['pregnancy'],
    videoId: null
  },
  {
    id: 'brain-fog-tonic',
    title: 'Morning Clarity Tonic',
    subtitle: 'Find your words again',
    category: 'brain',
    prepTime: '3 min',
    image: 'img/brain-fog-tonic.webp',
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
    why: 'Lemon and ACV support liver function,when your liver is sluggish, toxins circulate longer and cloud your thinking. Ginger increases blood flow to the brain. This combination was Mama Juba\'s grandmother\'s daily ritual until she was 94.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'garlic-honey-elixir',
    title: 'Garlic-Honey Heart Elixir',
    subtitle: 'Steady numbers, no more worry',
    category: 'pressure',
    prepTime: '10 min + 7 days ferment',
    image: 'img/img5.png',
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
      'After 7 days, eat 1 clove every morning. The honey becomes medicine too,take 1 tsp.'
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
    image: 'img/img6.png',
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
    why: 'Ginger relaxes the intestinal muscles that cause gas and cramping. Peppermint is a natural antispasmodic,it calms the gut lining. Lemon stimulates bile production for better digestion. Together, they work within 20 minutes.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'energy-fire-shot',
    title: 'Fire Cider Energy Shot',
    subtitle: 'The kind of energy that lasts all day',
    category: 'energy',
    prepTime: '5 min',
    image: 'img/img7.png',
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
    why: 'This combination triggers thermogenesis,your body\'s natural heat production,which increases energy without the caffeine crash. ACV stabilizes blood sugar to prevent the afternoon slump. Cayenne boosts circulation within minutes.',
    safetyFlags: [],
    videoId: null
  },
  // ── JOINTS (3 more) ──
  {
    id: 'rosemary-knee-rub',
    title: 'Rosemary Knee Oil',
    subtitle: 'When your knees beg you not to take the stairs',
    category: 'joints',
    prepTime: '5 min',
    ingredients: [
      { name: 'Olive oil', amount: '2 tbsp' },
      { name: 'Rosemary (dried)', amount: '1 tsp' },
      { name: 'Cayenne pepper', amount: '1 small pinch' }
    ],
    steps: [
      'Warm the olive oil gently in a small pan for 30 seconds.',
      'Mix in rosemary and cayenne.',
      'Let it cool until warm to touch.',
      'Massage into knees and stiff joints in circular motions for 2 minutes.'
    ],
    why: 'Rosemary contains rosmarinic acid, a natural anti-inflammatory. Cayenne brings capsaicin,it tricks pain receptors into calming down. Olive oil carries both deep into the skin.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'ginger-compress',
    title: 'Ginger Heat Compress',
    subtitle: 'The old remedy for hands that won\'t open in the morning',
    category: 'joints',
    prepTime: '10 min',
    ingredients: [
      { name: 'Fresh ginger (grated)', amount: '2 inches' },
      { name: 'Hot water', amount: '2 cups' },
      { name: 'Clean cloth or towel', amount: '1' }
    ],
    steps: [
      'Grate the ginger into a bowl.',
      'Pour hot (not boiling) water over it. Let steep 5 minutes.',
      'Soak the cloth in the ginger water, wring out excess.',
      'Apply the warm cloth to stiff hands or joints for 10 minutes. Repeat if needed.'
    ],
    why: 'Ginger contains gingerols that penetrate through the skin when applied warm. The heat opens blood vessels, bringing fresh circulation to stiff tissue. Used in Asian medicine for over 2,000 years.',
    safetyFlags: ['bloodThinners'],
    videoId: null
  },
  {
    id: 'cherry-anti-inflam',
    title: 'Tart Cherry Tonic',
    subtitle: 'Nature\'s ibuprofen,without the side effects',
    category: 'joints',
    prepTime: '3 min',
    ingredients: [
      { name: 'Tart cherry juice (unsweetened)', amount: '1/2 cup' },
      { name: 'Warm water', amount: '1/2 cup' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Cinnamon', amount: '1 pinch' }
    ],
    steps: [
      'Mix cherry juice with warm water.',
      'Stir in honey and cinnamon.',
      'Drink twice daily,morning and evening.'
    ],
    why: 'Tart cherries contain anthocyanins, the same compounds studied at Baylor for reducing joint inflammation. They lower uric acid levels naturally. Two glasses a day showed results comparable to NSAIDs in clinical trials.',
    safetyFlags: ['pregnancy'],
    videoId: null
  },
  // ── SLEEP (3 more) ──
  {
    id: 'chamomile-lavender-tea',
    title: 'Chamomile & Lavender Dream',
    subtitle: 'The cup that turns off your racing mind',
    category: 'sleep',
    prepTime: '5 min',
    ingredients: [
      { name: 'Chamomile tea bag', amount: '1' },
      { name: 'Dried lavender buds', amount: '1/2 tsp' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Hot water', amount: '1 cup' }
    ],
    steps: [
      'Place chamomile tea bag and lavender buds in your cup.',
      'Pour hot water. Steep for 5 minutes.',
      'Remove the tea bag, strain the lavender if you prefer.',
      'Add honey. Drink 30 minutes before bed.'
    ],
    why: 'Chamomile contains apigenin, which binds to brain receptors that reduce anxiety and initiate sleep. Lavender\'s linalool lowers cortisol. Together they work like a gentle off switch for your nervous system.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'banana-sleep-smoothie',
    title: 'Banana Sleep Smoothie',
    subtitle: 'Tastes like dessert,works like a sleeping pill',
    category: 'sleep',
    prepTime: '3 min',
    ingredients: [
      { name: 'Ripe banana', amount: '1' },
      { name: 'Warm milk (or oat milk)', amount: '1 cup' },
      { name: 'Almond butter', amount: '1 tbsp' },
      { name: 'Cinnamon', amount: '1/4 tsp' }
    ],
    steps: [
      'Blend banana, warm milk, and almond butter until smooth.',
      'Sprinkle cinnamon on top.',
      'Drink 1 hour before bed.'
    ],
    why: 'Bananas are loaded with magnesium and potassium,both relax muscles and nerves. They also contain tryptophan, which your brain converts to melatonin. Almond butter adds sustained magnesium through the night.',
    safetyFlags: ['pregnancy'],
    videoId: null
  },
  {
    id: 'valerian-honey-tea',
    title: 'Valerian Root Nightcap',
    subtitle: 'The herb grandmothers used before sleeping pills existed',
    category: 'sleep',
    prepTime: '8 min',
    ingredients: [
      { name: 'Valerian root tea bag', amount: '1' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Lemon juice', amount: 'a few drops' },
      { name: 'Hot water', amount: '1 cup' }
    ],
    steps: [
      'Steep valerian tea bag in hot water for 7 minutes (longer = stronger).',
      'Add honey and a squeeze of lemon to soften the taste.',
      'Drink 45 minutes before bed. It\'s not the best tasting,that\'s how you know it works.'
    ],
    why: 'Valerian root increases GABA levels in the brain,the same neurotransmitter that anti-anxiety medications target. Studies show it reduces the time it takes to fall asleep by an average of 15-20 minutes.',
    safetyFlags: [],
    videoId: null
  },
  // ── ENERGY (3 more) ──
  {
    id: 'green-tea-ginger',
    title: 'Green Tea Ginger Boost',
    subtitle: 'Steady energy without the coffee jitters',
    category: 'energy',
    prepTime: '4 min',
    ingredients: [
      { name: 'Green tea bag', amount: '1' },
      { name: 'Fresh ginger (sliced)', amount: '2 thin slices' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Lemon juice', amount: '1/2 lemon' }
    ],
    steps: [
      'Steep green tea with ginger slices in hot water for 3 minutes.',
      'Remove tea bag. Leave ginger in.',
      'Add lemon and honey.',
      'Drink mid-morning when energy starts dipping.'
    ],
    why: 'Green tea has L-theanine, which pairs with caffeine to give calm, focused energy instead of spikes and crashes. Ginger boosts circulation so nutrients reach your cells faster. Lemon adds vitamin C for iron absorption.',
    safetyFlags: ['bloodThinners'],
    videoId: null
  },
  {
    id: 'oat-honey-bowl',
    title: 'Mama Juba\'s Power Oats',
    subtitle: 'The breakfast that carries you through the whole day',
    category: 'energy',
    prepTime: '8 min',
    ingredients: [
      { name: 'Rolled oats', amount: '1/2 cup' },
      { name: 'Cinnamon', amount: '1/2 tsp' },
      { name: 'Honey', amount: '1 tbsp' },
      { name: 'Walnuts (chopped)', amount: '1 tbsp' },
      { name: 'Banana (sliced)', amount: '1/2' }
    ],
    steps: [
      'Cook oats with water or milk as usual.',
      'Stir in cinnamon while still warm.',
      'Top with walnuts, banana slices, and drizzle honey.',
      'Eat slowly. This is your fuel for the day.'
    ],
    why: 'Oats release glucose slowly over hours,no spikes, no crashes. Walnuts add omega-3s for brain-to-body communication. Cinnamon keeps blood sugar stable. This single bowl replaces what most supplements promise.',
    safetyFlags: ['pregnancy'],
    videoId: null
  },
  {
    id: 'coconut-chia-pudding',
    title: 'Chia Energy Pudding',
    subtitle: 'Make it at night, wake up with fuel already waiting',
    category: 'energy',
    prepTime: '5 min + overnight',
    ingredients: [
      { name: 'Chia seeds', amount: '2 tbsp' },
      { name: 'Coconut milk', amount: '1/2 cup' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Vanilla extract', amount: '1/4 tsp' }
    ],
    steps: [
      'Mix chia seeds, coconut milk, honey, and vanilla in a jar.',
      'Stir well. Cover and refrigerate overnight.',
      'In the morning, stir again. Add fruit if you like.',
      'Eat cold or at room temperature.'
    ],
    why: 'Chia seeds absorb 10x their weight in water, keeping you hydrated longer. They deliver sustained energy through fiber, protein, and omega-3s. Coconut milk adds healthy fats your brain needs to function.',
    safetyFlags: [],
    videoId: null
  },
  // ── BRAIN (4 more) ──
  {
    id: 'rosemary-memory-tea',
    title: 'Rosemary Memory Tea',
    subtitle: 'The herb Shakespeare wrote about for remembrance',
    category: 'brain',
    prepTime: '5 min',
    ingredients: [
      { name: 'Fresh rosemary sprigs', amount: '2 small' },
      { name: 'Hot water', amount: '1 cup' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Lemon juice', amount: 'a squeeze' }
    ],
    steps: [
      'Place rosemary sprigs in a cup.',
      'Pour hot water over them. Steep 5 minutes.',
      'Remove the sprigs. Add honey and lemon.',
      'Drink in the morning when you need focus.'
    ],
    why: 'Rosemary contains carnosic acid, which protects brain cells from free radical damage. Studies at Northumbria University showed just smelling rosemary improved memory by 75%. Drinking it delivers the compounds directly.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'walnut-brain-snack',
    title: 'Walnut & Honey Brain Bites',
    subtitle: 'The snack that looks like a brain,and feeds one',
    category: 'brain',
    prepTime: '5 min',
    ingredients: [
      { name: 'Walnuts', amount: '1/4 cup' },
      { name: 'Honey', amount: '1 tbsp' },
      { name: 'Dark cocoa powder', amount: '1/2 tsp' },
      { name: 'Cinnamon', amount: '1 pinch' }
    ],
    steps: [
      'Roughly chop walnuts.',
      'Drizzle honey over them in a small bowl.',
      'Dust with cocoa and cinnamon. Mix gently.',
      'Eat as an afternoon snack. Keep a small jar at your desk.'
    ],
    why: 'Walnuts are the only nut with significant omega-3 (ALA),your brain is 60% fat and needs this to repair itself. Dark cocoa increases blood flow to the brain. Cinnamon regulates glucose so your brain gets steady fuel.',
    safetyFlags: ['pregnancy'],
    videoId: null
  },
  {
    id: 'turmeric-pepper-latte',
    title: 'Golden Focus Latte',
    subtitle: 'The drink that clears the haze before it sets in',
    category: 'brain',
    prepTime: '5 min',
    ingredients: [
      { name: 'Turmeric (ground)', amount: '1 tsp' },
      { name: 'Black pepper', amount: '1 pinch' },
      { name: 'Coconut milk', amount: '1 cup' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Cinnamon', amount: '1/4 tsp' }
    ],
    steps: [
      'Warm coconut milk in a small pan (don\'t boil).',
      'Whisk in turmeric, pepper, and cinnamon.',
      'Pour into a mug. Add honey.',
      'Drink mid-morning for best focus effect.'
    ],
    why: 'Curcumin in turmeric crosses the blood-brain barrier,one of the few food compounds that can. It reduces brain inflammation linked to memory loss. Black pepper makes it 2,000% more absorbable.',
    safetyFlags: ['bloodThinners', 'pregnancy'],
    videoId: null
  },
  {
    id: 'sage-clarity-tea',
    title: 'Sage Clarity Infusion',
    subtitle: 'When you walk into a room and forget why',
    category: 'brain',
    prepTime: '5 min',
    ingredients: [
      { name: 'Dried sage leaves', amount: '1 tsp' },
      { name: 'Hot water', amount: '1 cup' },
      { name: 'Honey', amount: '1 tsp' }
    ],
    steps: [
      'Place sage in a tea strainer or directly in your cup.',
      'Pour hot water. Steep 4-5 minutes.',
      'Strain, add honey.',
      'Drink once daily. Morning is best.'
    ],
    why: 'Sage inhibits the enzyme that breaks down acetylcholine,the neurotransmitter your brain uses for memory. Oxford research showed sage improved word recall in adults within hours of a single dose.',
    safetyFlags: [],
    videoId: null
  },
  // ── DIGESTION (3 more) ──
  {
    id: 'fennel-bloat-tea',
    title: 'Fennel Seed Belly Tea',
    subtitle: 'The remedy every Italian grandmother keeps in her pocket',
    category: 'digestion',
    prepTime: '5 min',
    ingredients: [
      { name: 'Fennel seeds', amount: '1 tsp' },
      { name: 'Hot water', amount: '1 cup' },
      { name: 'Honey', amount: '1 tsp (optional)' }
    ],
    steps: [
      'Lightly crush fennel seeds with the back of a spoon.',
      'Place in cup, pour hot water.',
      'Steep 5 minutes. Strain.',
      'Drink after meals when bloating hits.'
    ],
    why: 'Fennel contains anethole, which relaxes the smooth muscles of your digestive tract, releasing trapped gas. It\'s been used in traditional medicine across every continent for centuries,because it simply works.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'acv-gut-reset',
    title: 'ACV Morning Reset',
    subtitle: 'Three tablespoons that change how your whole day digests',
    category: 'digestion',
    prepTime: '2 min',
    ingredients: [
      { name: 'Apple cider vinegar (with mother)', amount: '1 tbsp' },
      { name: 'Warm water', amount: '1 cup' },
      { name: 'Honey', amount: '1 tsp' },
      { name: 'Lemon juice', amount: '1/2 lemon' }
    ],
    steps: [
      'Add ACV to warm water.',
      'Squeeze in lemon, stir in honey.',
      'Drink first thing in the morning, 15 minutes before breakfast.',
      'Use a straw if you\'re concerned about tooth enamel.'
    ],
    why: 'ACV increases stomach acid production,counterintuitively, most bloating comes from too little acid, not too much. The acetic acid also feeds beneficial gut bacteria. Lemon supports bile flow for fat digestion.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'ginger-cumin-digest',
    title: 'Ginger-Cumin Digestive',
    subtitle: 'When your stomach feels like a knot after every meal',
    category: 'digestion',
    prepTime: '5 min',
    ingredients: [
      { name: 'Fresh ginger (grated)', amount: '1/2 inch' },
      { name: 'Cumin seeds', amount: '1/2 tsp' },
      { name: 'Hot water', amount: '1 cup' },
      { name: 'Lemon juice', amount: '1/4 lemon' },
      { name: 'Honey', amount: '1 tsp' }
    ],
    steps: [
      'Add grated ginger and cumin seeds to hot water.',
      'Let steep 5 minutes.',
      'Strain, add lemon and honey.',
      'Drink warm after your heaviest meal of the day.'
    ],
    why: 'Cumin stimulates the pancreas to release digestive enzymes, speeding up the breakdown of food. Ginger moves food through your system faster, preventing the "sitting like a rock" feeling. Together they work within 20 minutes.',
    safetyFlags: ['bloodThinners'],
    videoId: null
  },
  // ── BLOOD PRESSURE (4 more) ──
  {
    id: 'hibiscus-bp-tea',
    title: 'Hibiscus Heart Tea',
    subtitle: 'The ruby-red tea that relaxes your arteries',
    category: 'pressure',
    prepTime: '5 min',
    ingredients: [
      { name: 'Dried hibiscus flowers (or tea bag)', amount: '1 tbsp or 1 bag' },
      { name: 'Hot water', amount: '1 cup' },
      { name: 'Honey', amount: '1 tsp' }
    ],
    steps: [
      'Steep hibiscus in hot water for 5 minutes.',
      'Strain if using loose flowers.',
      'Add honey. Can be served hot or cold.',
      'Drink 2-3 cups daily for best effect.'
    ],
    why: 'Hibiscus acts as a natural ACE inhibitor,the same mechanism as blood pressure medication, but gentler. Tufts University found 3 cups daily lowered systolic pressure by 7 points in 6 weeks.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'celery-bp-juice',
    title: 'Celery Pressure Juice',
    subtitle: 'The simplest recipe that does the most',
    category: 'pressure',
    prepTime: '5 min',
    ingredients: [
      { name: 'Celery stalks', amount: '4 large' },
      { name: 'Water', amount: '1/2 cup' },
      { name: 'Lemon juice', amount: '1/2 lemon' }
    ],
    steps: [
      'Wash and chop celery.',
      'Blend with water until smooth.',
      'Strain through a fine mesh if you prefer smooth.',
      'Add lemon juice. Drink on an empty stomach in the morning.'
    ],
    why: 'Celery contains phthalides, compounds that relax artery walls and allow blood to flow with less pressure. The University of Chicago found celery extract lowered blood pressure by 12-14% in animal studies.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'lemon-water-morning',
    title: 'Warm Lemon Morning Ritual',
    subtitle: 'The first thing your blood vessels need every day',
    category: 'pressure',
    prepTime: '2 min',
    ingredients: [
      { name: 'Warm water', amount: '1 glass' },
      { name: 'Lemon juice (fresh)', amount: '1 whole lemon' },
      { name: 'Honey', amount: '1/2 tsp (optional)' }
    ],
    steps: [
      'Warm a glass of water (not hot, just warm).',
      'Squeeze a full lemon into it.',
      'Add honey if desired.',
      'Drink first thing every morning, before anything else.'
    ],
    why: 'Lemon is rich in potassium, which counterbalances sodium and helps your kidneys flush excess fluid. Less fluid = less pressure on vessel walls. The vitamin C also strengthens arterial walls over time.',
    safetyFlags: [],
    videoId: null
  },
  {
    id: 'flaxseed-heart-mix',
    title: 'Flaxseed Heart Sprinkle',
    subtitle: 'Add it to anything,it works quietly in the background',
    category: 'pressure',
    prepTime: '1 min',
    ingredients: [
      { name: 'Ground flaxseed', amount: '2 tbsp' },
      { name: 'Any food (oatmeal, yogurt, salad)', amount: 'your choice' }
    ],
    steps: [
      'Grind flaxseeds fresh if possible (or buy pre-ground).',
      'Sprinkle 2 tablespoons on any meal,oatmeal, soup, salad, yogurt.',
      'Do this every day. That\'s it.'
    ],
    why: 'A landmark study in Hypertension journal found 30g of ground flaxseed daily lowered systolic BP by 10 points over 6 months,one of the strongest dietary effects ever recorded. The alpha-linolenic acid and lignans are the active compounds.',
    safetyFlags: ['bloodThinners'],
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
    title: 'Healing Your Joints,The Complete Module',
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
    title: 'Clearing the Fog,Brain Health Recipes',
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
    title: 'Gut Healing,Bloating, Gas & Discomfort',
    description: 'Simple brews that calm your belly in minutes.',
    category: 'digestion',
    youtubeId: null,
    duration: '14 min'
  }
];

/**
 * 30-Day Healing Protocol
 * Each day: a recipe ID + a short Mama Juba message
 * Rest days have no recipe, just wisdom
 */
const PROGRAM_30 = [
  { day: 1,  recipeId: 'golden-joint-tea', message: 'Today we begin. One cup. One step. That\'s all it takes.' },
  { day: 2,  recipeId: 'brain-fog-tonic', message: 'Your mind deserves clarity. This tonic wakes up what\'s been sleeping.' },
  { day: 3,  recipeId: 'sleep-cinnamon-milk', message: 'Tonight, give your body the rest it\'s been asking for.' },
  { day: 4,  recipeId: null, message: 'Rest day. Drink water. Let yesterday\'s recipes do their work.' },
  { day: 5,  recipeId: 'belly-ease-brew', message: 'Your gut is your second brain. Let\'s calm it down.' },
  { day: 6,  recipeId: 'energy-fire-shot', message: 'Real energy doesn\'t come from coffee. It comes from the earth.' },
  { day: 7,  recipeId: 'garlic-honey-elixir', message: 'Start your ferment today. In 7 days, you\'ll have liquid gold.' },
  { day: 8,  recipeId: 'rosemary-memory-tea', message: 'Shakespeare called rosemary the herb of remembrance. He was right.' },
  { day: 9,  recipeId: 'chamomile-lavender-tea', message: 'Two flowers. One cup. A quieter mind tonight.' },
  { day: 10, recipeId: 'hibiscus-bp-tea', message: 'This ruby tea does what some pills do,but gently.' },
  { day: 11, recipeId: null, message: 'Rest day. How are you feeling compared to Day 1? Notice the change.' },
  { day: 12, recipeId: 'ginger-compress', message: 'This isn\'t just a drink,it\'s medicine you place on your skin.' },
  { day: 13, recipeId: 'green-tea-ginger', message: 'Calm focus. No crash. No jitters. Just steady.' },
  { day: 14, recipeId: 'fennel-bloat-tea', message: 'Fennel has been in every grandmother\'s pocket for a reason.' },
  { day: 15, recipeId: 'walnut-brain-snack', message: 'Halfway there. Feed your brain what it\'s been starving for.' },
  { day: 16, recipeId: 'cherry-anti-inflam', message: 'Nature\'s ibuprofen. No side effects. Just cherries.' },
  { day: 17, recipeId: 'valerian-honey-tea', message: 'This one doesn\'t taste great. That\'s how you know it works.' },
  { day: 18, recipeId: null, message: 'Rest day. Your body is rebuilding. Trust the process.' },
  { day: 19, recipeId: 'acv-gut-reset', message: 'Three tablespoons that change how your whole day digests.' },
  { day: 20, recipeId: 'turmeric-pepper-latte', message: 'Gold in your cup. Gold in your brain. Gold in your joints.' },
  { day: 21, recipeId: 'celery-bp-juice', message: 'The simplest recipe in the whole Almanac. And one of the strongest.' },
  { day: 22, recipeId: 'oat-honey-bowl', message: 'This bowl carries women through entire mornings. It\'ll carry you too.' },
  { day: 23, recipeId: 'rosemary-knee-rub', message: 'Rub this into your knees tonight. Walk easier tomorrow.' },
  { day: 24, recipeId: 'sage-clarity-tea', message: 'When you walk into a room and forget why,this is for that.' },
  { day: 25, recipeId: null, message: 'Rest day. You\'ve tried more than most people try in a year. Be proud.' },
  { day: 26, recipeId: 'banana-sleep-smoothie', message: 'Dessert that heals. Drink it. Sleep like you haven\'t in years.' },
  { day: 27, recipeId: 'ginger-cumin-digest', message: 'The knot in your stomach after meals? This unties it.' },
  { day: 28, recipeId: 'coconut-chia-pudding', message: 'Make it tonight. Wake up with energy already waiting for you.' },
  { day: 29, recipeId: 'lemon-water-morning', message: 'The simplest ritual. The one that started six generations ago.' },
  { day: 30, recipeId: 'flaxseed-heart-mix', message: 'Day 30. You did it. Your body is not the same body that started. You\'ve changed it,with what grows.' }
];
