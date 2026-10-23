export type ProductCategory = 'cattle' | 'broiler' | 'layer' | 'goat-sheep'

export type Product = {
  slug: string
  name: string
  category: ProductCategory
  animal: string
  stage: string
  summary: string
  overview: string[]
  considerations: string[]
  image: string
  imageAlt: string
  featured?: boolean
  searchTerms?: string[]
}

export const categories: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All feeds' },
  { id: 'cattle', label: 'Cattle Feed / Cow Feed' },
  { id: 'broiler', label: 'Poultry Feed' },
  { id: 'layer', label: 'Layer Feed' },
  { id: 'goat-sheep', label: 'Goat & Sheep Feed' },
]

export const products: Product[] = [
  {
    slug: 'cattle-feed',
    name: 'Cattle Feed',
    category: 'cattle',
    animal: 'Cattle · Cow',
    stage: 'Cattle feed',
    summary: 'Nutritious feed solutions for cattle, including cows, designed around their feeding and nutritional needs.',
    overview: [
      'MR Industries offers a cattle-feed category for farms looking for feed solutions for cattle, including cows.',
      'Contact MR Industries for current product information and availability. Specific feeding guidance should be confirmed directly with the company.',
    ],
    considerations: [
      'For cattle, including cows',
      'Product information available on enquiry',
      'Ask MR Industries about current availability',
    ],
    image: '/images/products/cattle-feed.jpg',
    imageAlt: 'Healthy dairy cattle in a farm pasture',
    featured: true,
    searchTerms: ['cattle', 'cow', 'cows', 'cattle feed', 'cow feed', 'ಜಾನುವಾರುಗಳ ಆಹಾರ', 'ಹಸುಗಳ ಆಹಾರ'],
  },
  {
    slug: 'broiler-pre-starter',
    name: 'Broiler Pre-Starter',
    category: 'broiler',
    animal: 'Poultry · Broiler',
    stage: 'Broiler range · Step 01',
    summary: 'The first feed in the MR Industries broiler range, intended for the earliest stage of the flock.',
    overview: [
      'Broiler Pre-Starter opens the three-step MR Industries broiler range and is intended for the very beginning of a broiler flock.',
      'Contact MR Industries for current product information, pack options and guidance on when to move birds to the next feed in the range.',
    ],
    considerations: [
      'First category in the broiler feed range',
      'Followed by Broiler Starter and Broiler Finisher',
      'Product information available on enquiry',
    ],
    image: '/images/products/broiler-pre-starter.png',
    imageAlt: 'Day-old chicks beside a bowl of fine feed crumble',
  },
  {
    slug: 'broiler-starter',
    name: 'Broiler Starter',
    category: 'broiler',
    animal: 'Poultry · Broiler',
    stage: 'Broiler range · Step 02',
    summary: 'The second feed in the broiler range, following Broiler Pre-Starter as the flock develops.',
    overview: [
      'Broiler Starter is the middle step in the MR Industries broiler range, used after the pre-starter stage.',
      'Speak with MR Industries to confirm product details and the most suitable feed for your flock at its current stage.',
    ],
    considerations: [
      'Second category in the broiler feed range',
      'Follows Broiler Pre-Starter',
      'Product information available on enquiry',
    ],
    image: '/images/products/broiler-starter.png',
    imageAlt: 'Young broiler chicks beside a bowl of feed crumbles',
  },
  {
    slug: 'broiler-finisher',
    name: 'Broiler Finisher',
    category: 'broiler',
    animal: 'Poultry · Broiler',
    stage: 'Broiler range · Step 03',
    summary: 'The final feed in the broiler range, used in the later stage of the broiler cycle.',
    overview: [
      'Broiler Finisher completes the MR Industries broiler range and is intended for the later stage of the broiler cycle.',
      'Enquire with MR Industries for current product information and availability in your area.',
    ],
    considerations: [
      'Final category in the broiler feed range',
      'Follows Broiler Starter',
      'Product information available on enquiry',
    ],
    image: '/images/products/broiler-finisher.png',
    imageAlt: 'Grown broiler chicken beside a bowl of feed pellets',
  },
  {
    slug: 'layer-feed',
    name: 'Layer Feed',
    category: 'layer',
    animal: 'Poultry · Layer',
    stage: 'Layer range · Complete feed',
    summary: 'A feed category for layer-farm operators looking after laying birds.',
    overview: [
      'Layer Feed is part of the MR Industries layer range, offered for farms keeping laying birds.',
      'Contact MR Industries for product information and to discuss whether a complete feed or a concentrate better suits your farm.',
    ],
    considerations: [
      'Intended for laying birds',
      'Alternative to on-farm mixing with a concentrate',
      'Product information available on enquiry',
    ],
    image: '/images/products/layer-feed.png',
    imageAlt: 'Brown laying hen beside a bowl of layer mash and eggs',
  },
  {
    slug: 'layer-concentrate',
    name: 'Layer Concentrate',
    category: 'layer',
    animal: 'Poultry · Layer',
    stage: 'Layer range · Concentrate',
    summary: 'A concentrate option for layer farms that prepare their own feed with other ingredients.',
    overview: [
      'Layer Concentrate is offered for layer farms that combine a concentrate with other ingredients on the farm.',
      'Ask MR Industries for product information and mixing guidance before use.',
    ],
    considerations: [
      'Intended for on-farm feed preparation',
      'Part of the layer range alongside Layer Feed',
      'Product information and guidance on enquiry',
    ],
    image: '/images/products/layer-concentrate.png',
    imageAlt: 'Bowls of maize, feed concentrate and soybean meal beside eggs',
  },
  {
    slug: 'goat-sheep-feed',
    name: 'Goat & Sheep Feed',
    category: 'goat-sheep',
    animal: 'Livestock · Goat & Sheep',
    stage: 'Small ruminant range',
    summary: 'A feed category for goat and sheep farmers, supporting practical day-to-day feeding.',
    overview: [
      'Goat & Sheep Feed is the MR Industries feed category for small ruminant farming.',
      'Contact MR Industries for product information, availability and guidance on use alongside your existing feeding practice.',
    ],
    considerations: [
      'Intended for goats and sheep',
      'Used alongside existing farm feeding practice',
      'Product information available on enquiry',
    ],
    image: '/images/products/goat-sheep-feed.png',
    imageAlt: 'White goat and young sheep beside a trough of feed pellets',
  },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}
