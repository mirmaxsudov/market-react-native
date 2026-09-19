import type { ImageSourcePropType } from 'react-native';

export type Category = 'All' | 'Combos' | 'Sliders' | 'Classic';
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  rating: number;
  price: number;
  category: Exclude<Category, 'All'>;
  vegetarian: boolean;
  description: string;
  image: ImageSourcePropType;
};

export const categories: Category[] = ['All', 'Combos', 'Sliders', 'Classic'];
export const products: Product[] = [
  {
    id: 'cheeseburger',
    name: 'Cheeseburger',
    subtitle: 'Wendy’s Burger',
    rating: 4.9,
    price: 8.99,
    category: 'Classic',
    vegetarian: false,
    description:
      'A juicy grilled beef patty, melted cheddar, crisp lettuce, and our signature sauce. A feel-good classic, tucked into a soft toasted bun.',
    image: require('../../../assets/images/foodgo/cheeseburger.png')
  },
  {
    id: 'veggie',
    name: 'Hamburger',
    subtitle: 'Veggie Burger',
    rating: 4.8,
    price: 7.99,
    category: 'Classic',
    vegetarian: true,
    description:
      'Big flavour, all plants. A delicious veggie patty with fresh lettuce, ripe tomato, pickles, and a creamy house dressing.',
    image: require('../../../assets/images/foodgo/veggie-burger.png')
  },
  {
    id: 'chicken',
    name: 'Hamburger',
    subtitle: 'Chicken Burger',
    rating: 4.6,
    price: 9.49,
    category: 'Sliders',
    vegetarian: false,
    description:
      'Tender grilled chicken layered with crunchy greens, tomato, and smoky sauce. Served in a golden, freshly toasted bun.',
    image: require('../../../assets/images/foodgo/chicken-burger.png')
  },
  {
    id: 'fried-chicken',
    name: 'Hamburger',
    subtitle: 'Fried Chicken Burger',
    rating: 4.5,
    price: 10.99,
    category: 'Combos',
    vegetarian: false,
    description:
      'Golden crispy chicken, cool lettuce, and our special burger sauce. This satisfying combo comes with a side of seasoned fries.',
    image: require('../../../assets/images/foodgo/fried-chicken-burger.png')
  },
  {
    id: 'cheeseburger2',
    name: 'Cheeseburger',
    subtitle: 'Wendy’s Burger',
    rating: 4.9,
    price: 8.99,
    category: 'Classic',
    vegetarian: false,
    description:
      'A juicy grilled beef patty, melted cheddar, crisp lettuce, and our signature sauce. A feel-good classic, tucked into a soft toasted bun.',
    image: require('../../../assets/images/foodgo/cheeseburger.png')
  },
  {
    id: 'veggie2',
    name: 'Hamburger',
    subtitle: 'Veggie Burger',
    rating: 4.8,
    price: 7.99,
    category: 'Classic',
    vegetarian: true,
    description:
      'Big flavour, all plants. A delicious veggie patty with fresh lettuce, ripe tomato, pickles, and a creamy house dressing.',
    image: require('../../../assets/images/foodgo/veggie-burger.png')
  },
  {
    id: 'chicken2',
    name: 'Hamburger',
    subtitle: 'Chicken Burger',
    rating: 4.6,
    price: 9.49,
    category: 'Sliders',
    vegetarian: false,
    description:
      'Tender grilled chicken layered with crunchy greens, tomato, and smoky sauce. Served in a golden, freshly toasted bun.',
    image: require('../../../assets/images/foodgo/chicken-burger.png')
  },
  {
    id: 'fried-chicken2',
    name: 'Hamburger',
    subtitle: 'Fried Chicken Burger',
    rating: 4.5,
    price: 10.99,
    category: 'Combos',
    vegetarian: false,
    description:
      'Golden crispy chicken, cool lettuce, and our special burger sauce. This satisfying combo comes with a side of seasoned fries.',
    image: require('../../../assets/images/foodgo/fried-chicken-burger.png')
  }
];

export const money = (value: number) => `$${value.toFixed(2)}`;
