export const tickerItems = [
  'Quality focused',
  'Stage-wise nutrition',
  'Farm-ready feed solutions',
  'Farmer first',
  'Dealer partnerships',
]

export const feedPathway = [
  {
    code: 'RM',
    step: '01',
    title: 'Raw materials',
    text: 'Ingredient suitability and sourcing information shape everything that follows.',
  },
  {
    code: 'NU',
    step: '02',
    title: 'Nutrition',
    text: 'Relevant product information and confirmed specifications for each category.',
  },
  {
    code: 'FS',
    step: '03',
    title: 'Feed selection',
    text: 'Identifying the appropriate available product category for the animal and stage.',
    highlight: true,
  },
  {
    code: 'FU',
    step: '04',
    title: 'Farm use',
    text: 'Handling and storage practices that help feed stay in good condition.',
  },
  {
    code: 'FB',
    step: '05',
    title: 'Feedback',
    text: 'Customer enquiries and conversations that keep decisions connected to the farm.',
  },
]

export const pathwayOutcomes = [
  { label: '01 / Ask', title: 'Clear information', text: 'Start with the product details that matter.' },
  { label: '02 / Choose', title: 'The right category', text: 'Match the feed to the animal and its stage.' },
  { label: '03 / Use', title: 'Practical handling', text: 'Store and use feed with care on the farm.' },
]

export const qualitySteps = [
  { step: '01', title: 'Raw material', text: 'Ingredient selection' },
  { step: '02', title: 'Nutrition', text: 'Product information' },
  { step: '03', title: 'Formulation', text: 'Blending, where applicable' },
  { step: '04', title: 'Processing', text: 'Feed form, where applicable' },
  { step: '05', title: 'Quality checks', text: 'Where verified' },
  { step: '06', title: 'Storage', text: 'Handling and storage' },
]

export const supportRoutes = [
  {
    label: 'Product / 01',
    code: 'PI',
    title: 'Product information',
    text: 'Ask for current details on any MR Industries feed category before you buy.',
    points: ['Product details', 'Available information', 'Pack enquiries'],
    href: '/contact?topic=product',
    cta: 'Ask about a product',
  },
  {
    label: 'Category / 02',
    code: 'FC',
    title: 'Feed-category enquiries',
    text: 'Start with cattle feed for cows, then explore poultry, layer, or goat and sheep feed for your farm.',
    points: ['Cattle feed', 'Poultry feed', 'Layer feed', 'Goat & sheep feed'],
    href: '/products',
    cta: 'Browse categories',
    featured: true,
  },
  {
    label: 'Selection / 03',
    code: 'PS',
    title: 'Product selection',
    text: 'Unsure which feed to use? Describe your animals and stage and we will respond.',
    points: ['Animal and stage', 'Current feeding', 'Your questions'],
    href: '/contact?topic=selection',
    cta: 'Ask a selection question',
  },
  {
    label: 'Supply / 04',
    code: 'AV',
    title: 'Availability',
    text: 'Check whether a product is available for your location and quantity.',
    points: ['Your location', 'Product needed', 'Expected quantity'],
    href: '/contact?topic=availability',
    cta: 'Check availability',
  },
]

export const faqs = [
  {
    q: 'What types of animal feed does MR Industries offer?',
    a: 'Cattle feed for cows is the main product, alongside poultry feed, layer feed, and goat and sheep feed. Contact MR Industries for current product details.',
  },
  {
    q: 'What is the difference between the available broiler feed categories?',
    a: 'The broiler range is offered in three steps — Pre-Starter, Starter and Finisher — each intended for a successive stage of the broiler cycle. Contact MR Industries to confirm which feed suits your flock today.',
  },
  {
    q: 'How can I obtain product information?',
    a: 'Open any product page and use the product enquiry button, or send an enquiry through the contact page. MR Industries will share the information available for that product.',
  },
  {
    q: 'How can I enquire about product availability?',
    a: 'Use the availability route on the Farmer Support page or the contact form, and include your location, the product you need and the expected quantity.',
  },
  {
    q: 'How can I enquire about dealer opportunities?',
    a: 'Visit the Dealer Partnership page and send a dealer enquiry with your business details and area. MR Industries will follow up to discuss potential opportunities.',
  },
  {
    q: 'How can I contact MR Industries?',
    a: 'Use the enquiry form on the Contact page. Where direct contact channels are listed on the page, you can also reach MR Industries through them.',
  },
]
