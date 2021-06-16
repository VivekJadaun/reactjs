import gold from '../assets/images/gold.png';
import green from '../assets/images/green.png';
import grey from '../assets/images/grey.png';
import silver from '../assets/images/silver.png';

const APP_DEFAULTS = {
	products: [
    {
      id: "1",
      name: "Iphone 11 Pro (Silver)",
      price: 999,
      preview: silver,
      variant: "(64GB)",
      inStock: true,
    },
    {
      id: "2",
      name: "Iphone 11 Pro (Grey)",
      price: 1199,
      preview: grey,
      variant: "(128GB)",
      inStock: true,
    },
    {
      id: "3",
      name: "Iphone 11 Pro (Gold)",
      price: 1399,
      preview: gold,
      variant: "(256GB)",
      inStock: true,
    },
    {
      id: "4",
      name: "Iphone 11 Pro (Midnight Green)",
      price: 1599,
      preview: green,
      variant: "(512GB)",
      inStock: true,
    },
  ],
}

export const { products } = APP_DEFAULTS;
export default APP_DEFAULTS;