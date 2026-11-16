import { MenuItem } from '../types/menu';

export const HERO_BURGER_IMAGE =
  '/src/assets/images/hero_craft_burger_1794865036992.jpg';
export const ABOUT_KITCHEN_IMAGE =
  '/src/assets/images/about_kitchen_craft_1794865038915.jpg';

export const MENU_CATEGORIES = [
  'All',
  'Burgers',
  'Shawarma',
  'Fries',
  'Roll Paratha',
  'Drinks',
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'double-clock-smash',
    name: "The O'Clock Double Smash",
    category: 'Burgers',
    price: 12.9,
    description:
      'Two seared beef patties with lacy crispy edges, double aged cheddar, house pickles, butter lettuce, and golden mustard-pepper glaze on toasted brioche.',
    image: '/src/assets/images/hero_craft_burger_1794865036992.jpg',
    alt: "The O'Clock Double Smash beef burger with melted cheddar and golden house sauce",
    prepTime: '12 min',
    featuredTag: 'House Favorite',
    addons: [
      { id: 'extra-patty', name: 'Extra Smashed Patty', price: 3.5 },
      { id: 'aged-cheddar', name: 'Double Aged Cheddar', price: 1.5 },
      { id: 'caramel-onions', name: 'Charred Sweet Onions', price: 1.0 },
    ],
  },
  {
    id: 'honey-chili-crunch',
    name: 'Midnight Crunch Chicken',
    category: 'Burgers',
    price: 11.5,
    description:
      'Buttermilk-brined chicken thigh fried crisp, lacquered in warm honey-chili glaze with sharp cheddar, herb slaw, and black sesame brioche.',
    image: '/src/assets/images/menu_spicy_chicken_burger_1794865036114.jpg',
    alt: 'Crispy buttermilk fried chicken burger with chili glaze and slaw on black sesame bun',
    prepTime: '14 min',
    featuredTag: 'Best Seller',
    addons: [
      { id: 'extra-glaze', name: 'Extra Chili-Honey Glaze', price: 0.75 },
      { id: 'aged-cheddar', name: 'Melted Cheddar Slice', price: 1.5 },
      { id: 'garlic-toum', name: 'Roasted Garlic Dip', price: 1.0 },
    ],
  },
  {
    id: 'charcoal-chicken-shawarma',
    name: 'Flame-Carved Chicken Shawarma',
    category: 'Shawarma',
    price: 10.5,
    description:
      'Warm fire-blistered flatbread packed with marinated rotisserie chicken, whipped garlic toum, crisp pickled turnips, red cabbage, and fresh parsley.',
    image: '/src/assets/images/menu_shawarma_wrap_1794865037024.jpg',
    alt: 'Flame-grilled chicken shawarma wraps sliced open showing garlic toum and pickles',
    prepTime: '10 min',
    featuredTag: 'Charcoal Roasted',
    addons: [
      { id: 'extra-meat', name: 'Double Carved Chicken', price: 3.0 },
      { id: 'garlic-toum', name: 'Extra Garlic Toum Cup', price: 1.0 },
      { id: 'crispy-fries-in', name: 'Stuffed Crispy Fries', price: 1.25 },
    ],
  },
  {
    id: 'garlic-herb-shawarma-platter',
    name: 'Saj-Pressed Double Shawarma',
    category: 'Shawarma',
    price: 13.5,
    description:
      'Two toasted saj wraps pressed crisp on the griddle, filled with smoky spiced chicken, sumac onions, pickles, and tahini-garlic emulsion.',
    image: '/src/assets/images/menu_shawarma_wrap_1794865037024.jpg',
    alt: 'Saj-pressed double chicken shawarma platter on dark slate',
    prepTime: '12 min',
    addons: [
      { id: 'garlic-toum', name: 'Extra Garlic Toum Cup', price: 1.0 },
      { id: 'jalapeno-relish', name: 'Pickled Jalapeno Relish', price: 0.75 },
    ],
  },
  {
    id: 'molten-cheddar-fries',
    name: 'Golden Cheddar Loaded Fries',
    category: 'Fries',
    price: 7.9,
    description:
      'Double-fried skin-on potatoes tossed in smoky paprika salt, finished with molten cheddar sauce, toasted garlic chips, and fresh sliced chilies.',
    image: '/src/assets/images/menu_loaded_fries_1794865037423.jpg',
    alt: 'Crispy seasoned hand-cut fries drizzled with melted cheddar and fresh chilies',
    prepTime: '8 min',
    featuredTag: 'Crispy Classic',
    addons: [
      { id: 'chopped-chicken', name: 'Grilled Shawarma Topping', price: 3.25 },
      { id: 'extra-cheese', name: 'Extra Molten Cheddar', price: 1.5 },
    ],
  },
  {
    id: 'black-pepper-sea-salt-fries',
    name: 'Cracked Pepper Cut Fries',
    category: 'Fries',
    price: 5.5,
    description:
      'Hand-cut crispy fries dusted with flaky sea salt, cracked Tellicherry black pepper, and fresh thyme, served with roasted garlic aioli.',
    image: '/src/assets/images/menu_loaded_fries_1794865037423.jpg',
    alt: 'Hand-cut black pepper and sea salt fries in matte black bowl',
    prepTime: '7 min',
    addons: [
      { id: 'garlic-toum', name: 'Garlic Aioli Dip', price: 1.0 },
      { id: 'cheese-dip', name: 'Warm Cheddar Dip', price: 1.5 },
    ],
  },
  {
    id: 'tikka-laccha-paratha',
    name: 'Smoky Tikka Roll Paratha',
    category: 'Roll Paratha',
    price: 9.9,
    description:
      'Hand-laminated flaky golden paratha rolled around charcoal-seared chicken tikka, crisp red onion rings, fresh cilantro, and mint-tamarind chutney.',
    image: '/src/assets/images/menu_roll_paratha_1794865038569.jpg',
    alt: 'Flaky golden roll paratha stuffed with grilled chicken tikka and herb chutney',
    prepTime: '11 min',
    featuredTag: 'Flaky & Crisp',
    addons: [
      { id: 'extra-tikka', name: 'Extra Tikka Chunks', price: 2.75 },
      { id: 'mint-chutney', name: 'Extra Mint Chutney', price: 0.75 },
      { id: 'egg-layer', name: 'Griddled Egg Layer', price: 1.25 },
    ],
  },
  {
    id: 'malai-garlic-paratha',
    name: 'Creamy Malai Garlic Roll',
    category: 'Roll Paratha',
    price: 10.25,
    description:
      'Crisp layered paratha filled with tender cream-marinated chicken, charred green chilies, lime-kissed onions, and cool yogurt-herb drizzle.',
    image: '/src/assets/images/menu_roll_paratha_1794865038569.jpg',
    alt: 'Crispy layered malai chicken roll paratha with lime and fresh herbs',
    prepTime: '12 min',
    addons: [
      { id: 'aged-cheddar', name: 'Melted Cheddar Pull', price: 1.5 },
      { id: 'mint-chutney', name: 'Extra Mint Chutney', price: 0.75 },
    ],
  },
  {
    id: 'golden-mango-fizz',
    name: 'Golden Mango Citrus Fizz',
    category: 'Drinks',
    price: 4.9,
    description:
      'Ripe Alphonso mango nectar shaken over cracked ice with fresh pressed lime, sparkling botanical water, and bruised garden mint.',
    image: '/src/assets/images/menu_craft_drinks_1794865038462.jpg',
    alt: 'Chilled golden mango citrus cooler with fresh lime and mint',
    prepTime: '4 min',
    featuredTag: 'House Cooler',
    addons: [
      { id: 'large-size', name: 'Upgrade to Tall 20oz', price: 1.25 },
      { id: 'extra-mint', name: 'Double Fresh Mint & Lime', price: 0.5 },
    ],
  },
  {
    id: 'dark-berry-lime-cooler',
    name: 'Midnight Berry Limeade',
    category: 'Drinks',
    price: 4.9,
    description:
      'Crushed blackberries and tart raspberries muddled with cold-pressed lime juice, cane syrup, and crisp soda over clear ice.',
    image: '/src/assets/images/menu_craft_drinks_1794865038462.jpg',
    alt: 'Cold dark berry limeade cooler garnished with lime and mint',
    prepTime: '4 min',
    addons: [{ id: 'large-size', name: 'Upgrade to Tall 20oz', price: 1.25 }],
  },
];
