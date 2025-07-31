<<<<<<< Updated upstream
import demo from "/src/assets/demo.png"
import demo_1 from "/src/assets/demo_1.png"
import demo_2 from "/src/assets/demo_2.png"
import demo_3 from "/src/assets/demo_3.png"
import demo_4 from "/src/assets/demo_4.png"
import demo_5 from "/src/assets/demo_5.png"
=======
import { address } from "framer-motion/client";
import demo from "/src/assets/demo.png";
import demo_1 from "/src/assets/demo_1.png";
import demo_2 from "/src/assets/demo_2.png";
import demo_3 from "/src/assets/demo_3.png";
import demo_4 from "/src/assets/demo_4.png";
import demo_5 from "/src/assets/demo_5.png";
>>>>>>> Stashed changes

// Categories
const categories = [
  { id: "flower", name: "Bouquets" },
  { id: "vase", name: "Vases" },
];

// Accessories
const accessories = [
  {
    product_id: "V1",
    name: "Montecito Vase",
<<<<<<< Updated upstream
    type: 'vase',
    image_url: demo_3,
=======
    type: "vase",
    image_url: [demo_3],
>>>>>>> Stashed changes
    price: 19,
  },
  {
    product_id: "V2",
    name: "Montecitosss Vase",
<<<<<<< Updated upstream
    type: 'vase',
    image_url: demo_4,
=======
    type: "vase",
    image_url: [demo_4],
>>>>>>> Stashed changes
    price: 25,
  },
];

// Bonus Gifts
const bonus_gifts = [
<<<<<<< Updated upstream
  { bouquet_id: "B1",
    accessories_id: "V1",
    off_price: 5,
  },
  { bouquet_id: "B1",
    accessories_id: "V2",
    off_price: 5,
  }
]
=======
  { flower_id: "B1", accessory_id: "V1", off_price: 5 },
  { flower_id: "B1", accessory_id: "V2", off_price: 5 },
];
>>>>>>> Stashed changes

// Carts
const carts = [
  {
    user_id: 1,
<<<<<<< Updated upstream
    product_id: ['B1', 'V1', 'V2']
    // products: [{product_id, date}]
  }
]
=======
    products: [
      { product_id: "B1", quantity: 2 },
      { product_id: "B3", quantity: 3 },
    ],
  },
];
>>>>>>> Stashed changes

// Comments
const comments = [
  {  
    user_id: 1,
    product_id: "B3",
    date: "12/07/2025",
    title: "Excellent",
    content: "Pick Up A Lucky Peony!⠀ Peonies symbolize prosperity, good luck, and love. So, whether you know someone who’s getting married, graduating or just needs a pick-me-up sending them a pretty peony bouquet will be perfect!",
    star: 4,
    image: [],
  },
  {  
    user_id: 2,
    product_id: "B3",
    date: "12/07/2025",
    content: "Pick Up A Lucky Peony!⠀ Peonies symbolize prosperity, good luck, and love. So, whether you know someone who’s getting married, graduating or just needs a pick-me-up sending them a pretty peony bouquet will be perfect!",
    star: 3,
    image: [demo_5],
  },
  {  
    user_id: 3,
    product_id: "B3",
    date: "12/07/2025",
    title: "Excellent",
    content: "Pick Up A Lucky Peony!⠀ Peonies symbolize prosperity, good luck, and love. So, whether you know someone who’s getting married, graduating or just needs a pick-me-up sending them a pretty peony bouquet will be perfect!",
    star: 4,
    image: [],
  },
  {  
    user_id: 4,
    product_id: "B3",
    date: "12/07/2025",
    content: "Pick Up A Lucky Peony!⠀ Peonies symbolize prosperity, good luck, and love. So, whether you know someone who’s getting married, graduating or just needs a pick-me-up sending them a pretty peony bouquet will be perfect!",
    star: 3,
    image: [demo_5],
  },
];

// Products
const products = [
  {
<<<<<<< Updated upstream
    product_id: 'B1',
    name: "Red Rose Bouquet",
    flower_type: "Roses",
    occasion: "Wedding",
    color: 'Pink Flowers',
    description: "Assorted stems of seasonal peonies.",
    description_detail: "Turning heads wherever they go, our picture-perfect premium peonies are a must. Our farmers select the freshest blooms for you, and these stems of lush, petal-soft ruffles are some of the prettiest we’ve seen.",
    caution: "Colors may vary.",
    tip:"our flowers will arrive fresh in our recyclable Bouqs box and may still be in bud form. This maximizes their shelf life, so they’ll last as long as possible! Please allow 2–3 days for your new buds to open and reach full bloom.",
    image_url: [demo, demo_1, demo_2],
    options: {
      "original": { price: 19.99, stems: 5},
      "deluxe": { price: 29.99, stems: 10 },
      "grand": { price: 39.99, stems: 15 },
    },
    wrapping_available: true,
  },
  {
    product_id: 'B2',
    name: "Farmer's Choice Peonies",
    flower_type: 'Lilies',
    occasion: "Housewarming",
    color: 'Yellow Flowers',
    description: "Assorted stems of seasonal peonies.",
    description_detail: "Turning heads wherever they go, our picture-perfect premium peonies are a must. Our farmers select the freshest blooms for you, and these stems of lush, petal-soft ruffles are some of the prettiest we’ve seen.",
    caution: "Colors may vary.",
    tip:"our flowers will arrive fresh in our recyclable Bouqs box and may still be in bud form. This maximizes their shelf life, so they’ll last as long as possible! Please allow 2–3 days for your new buds to open and reach full bloom.",
    image_url: [demo, demo_1, demo_2, demo_3, demo_4],
    options: {
      "original": { price: 19.99, stems: 5},
      "deluxe": { price: 29.99, stems: 10 },
      "grand": { price: 39.99, stems: 15 },
    },
    wrapping_available: true,
  },
    {
    product_id: 'B3',
    name: "Red Rose Bouquet",
    flower_type: 'Roses',
    occasion: "Get Well",
    color: "Pink Flowers",
    description: "Assorted stems of seasonal peonies.",
    description_detail: "Turning heads wherever they go, our picture-perfect premium peonies are a must. Our farmers select the freshest blooms for you, and these stems of lush, petal-soft ruffles are some of the prettiest we’ve seen.",
    caution: "Colors may vary.",
    tip:"our flowers will arrive fresh in our recyclable Bouqs box and may still be in bud form. This maximizes their shelf life, so they’ll last as long as possible! Please allow 2–3 days for your new buds to open and reach full bloom.",
    image_url: [demo, demo_1, demo_2],
    options: {
      "original": { price: 19.99, stems: 5},
      "deluxe": { price: 29.99, stems: 10 },
      "grand": { price: 39.99, stems: 15 },
    },
    wrapping_available: true,
  },
  {
    product_id: 'B4',
    name: "Farmer's Choice Peonies",
    flower_type: 'Roses',
    occasion: "Wedding",
    color: "Red Flowers",
    description: "Assorted stems of seasonal peonies.",
    description_detail: "Turning heads wherever they go, our picture-perfect premium peonies are a must. Our farmers select the freshest blooms for you, and these stems of lush, petal-soft ruffles are some of the prettiest we’ve seen.",
    caution: "Colors may vary.",
    tip:"our flowers will arrive fresh in our recyclable Bouqs box and may still be in bud form. This maximizes their shelf life, so they’ll last as long as possible! Please allow 2–3 days for your new buds to open and reach full bloom.",
    image_url: [demo, demo_1, demo_2],
    options: {
      "original": { price: 19.99, stems: 5},
      "deluxe": { price: 29.99, stems: 10 },
      "grand": { price: 39.99, stems: 15 },
    },
    wrapping_available: true,
  },
];

// U
const users = [
  {
    user_id: 1,
    name: "demo1hihihi"
  },
  {
    user_id: 2,
    name: "demo1hehehe"
  },
    {
    user_id: 3,
    name: "demo1hihihi"
  },
  {
    user_id: 4,
    name: "demo1hehehe"
  }
]

export {products, carts, comments, bonus_gifts, accessories, users};
=======
    product_id: "B1",
    type: "flower",
    name: "Red Rose Bouquet",
    price: 40,
    stock: 15,
    available: true,
    description: "Assorted stems of seasonal roses.",
    description_detail: "A classic bouquet of vibrant red roses, perfect for romantic occasions.",
    tip: "Keep stems trimmed and water fresh daily.",
    caution: "Avoid direct sunlight for prolonged periods.",
    image_url: [demo_1, demo, demo_2, demo_3],
    care: { sun: "Partial" },
    flower_details: {
      occasion: ["Wedding"],
      color: ["Pink Flowers"],
      flower_type: "Roses",
      options: [
        { name: "original", price: 19.99, stems: 5 },
        { name: "deluxe", price: 29.99, stems: 10 },
        { name: "grand", price: 39.99, stems: 15 },
      ],
      accessories: ["V1", "V2"],
    },
  },
  {
    product_id: "B2",
    type: "flower",
    name: "Farmer's Choice Peonies",
    price: 40,
    stock: 12,
    available: true,
    description: "Assorted stems of seasonal peonies.",
    description_detail: "A rustic mix of peonies, hand-picked for freshness.",
    tip: "Place in a cool area away from heat sources.",
    caution: "Petals are delicate; handle with care.",
    image_url: [demo_1, demo, demo_2],
    care: { sun: "Full" },
    flower_details: {
      occasion: ["New Baby", "Thank you"],
      color: ["White Flowers"],
      flower_type: "Peonies",
      options: [
        { name: "original", price: 19.99, stems: 5 },
        { name: "deluxe", price: 29.99, stems: 10 },
        { name: "grand", price: 39.99, stems: 15 },
      ],
      accessories: ["V1", "V2"],
    },
  },
  {
    product_id: "B3",
    type: "flower",
    name: "Peony Bouquet",
    price: 40,
    stock: 18,
    available: true,
    description: "Beautiful peony flowers.",
    description_detail: "Lush peonies symbolizing prosperity and love.",
    tip: "Change water every two days for longevity.",
    caution: "Keep away from fruit to avoid ethylene gas exposure.",
    image_url: [demo_5],
    care: { sun: "Partial" },
    flower_details: {
      occasion: ["Wedding", "Graduation"],
      color: ["Pink Flowers"],
      flower_type: "Peonies",
      options: [
        { name: "original", price: 19.99, stems: 5 },
        { name: "deluxe", price: 29.99, stems: 10 },
        { name: "grand", price: 39.99, stems: 15 },
      ],
      accessories: ["V1", "V2"],
    },
  },
  {
    product_id: "B4",
    type: "flower",
    name: "Sunflower Arrangement",
    price: 35,
    stock: 15,
    available: true,
    description: "Bright and cheerful sunflowers.",
    description_detail: "A sunny arrangement to brighten any day.",
    tip: "Support stems with a tall vase.",
    caution: "Avoid overwatering.",
    image_url: [demo_2],
    care: { sun: "Full" },
    flower_details: {
      occasion: ["Thank you", "Get Well"],
      color: ["Yellow Flowers"],
      flower_type: "Sunflowers",
      options: [
        { name: "original", price: 15.99, stems: 3 },
        { name: "deluxe", price: 25.99, stems: 6 },
        { name: "grand", price: 35.99, stems: 9 },
      ],
      accessories: ["V1", "V2"],
    },
  },
  {
    product_id: "V1",
    type: "vase",
    name: "Montecito Vase",
    price: 19,
    stock: 12,
    available: true,
    description: "A beautiful vase for your flowers.",
    description_detail: "Elegant glass vase with a sleek design.",
    tip: "Clean with mild soap to maintain clarity.",
    caution: "Fragile; handle with care.",
    image_url: [demo_3],
    care: { sun: "N/A" },
  },
  {
    product_id: "V2",
    type: "vase",
    name: "Montecitoss Vase",
    price: 25,
    stock: 12,
    available: true,
    description: "A beautiful vase for your flowers.",
    description_detail: "Stylish vase with a unique finish.",
    tip: "Fill with decorative stones for added stability.",
    caution: "Avoid abrasive cleaners.",
    image_url: [demo_4],
    care: { sun: "N/A" },
  },
];

// Inventory
const inventory = [
  { product_id: "B1", stock: 15, available: 1 },
  { product_id: "B2", stock: 12, available: 1 },
  { product_id: "B3", stock: 18, available: 1 },
  { product_id: "B4", stock: 15, available: 1 },
];

// Orders
const orders = [
  { order_id: 1, user_id: 1, order_date: "02/07/2025", shipping_address: "Q5, TPHCM", total_amount: 200, off_price: 0, status: "Required" },
  { order_id: 2, user_id: 3, order_date: "02/07/2025", shipping_address: "Q5, TPHCM", total_amount: 200, off_price: 0, status: "Done" },
  { order_id: 3, user_id: 2, order_date: "08/07/2025", shipping_address: "Q1, TPHCM", total_amount: 120, off_price: 10, status: "Prepared" },
  { order_id: 4, user_id: 4, order_date: "15/07/2025", shipping_address: "Q10, TPHCM", total_amount: 180, off_price: 0, status: "Confirmed" },
  { order_id: 5, user_id: 1, order_date: "21/06/2025", shipping_address: "Q5, TPHCM", total_amount: 99, off_price: 0, status: "Done" },
  { order_id: 6, user_id: 2, order_date: "28/06/2025", shipping_address: "Q1, TPHCM", total_amount: 75, off_price: 5, status: "Canceled" },
  { order_id: 7, user_id: 3, order_date: "01/07/2025", shipping_address: "Q3, TPHCM", total_amount: 210, off_price: 15, status: "Suspended" },
  { order_id: 8, user_id: 4, order_date: "12/06/2025", shipping_address: "Q2, TPHCM", total_amount: 50, off_price: 10, status: "Suspended" },
  { order_id: 9, user_id: 1, order_date: "15/06/2025", shipping_address: "Q10, TPHCM", total_amount: 14, off_price: 5, status: "Suspended" },
  { order_id: 10, user_id: 2, order_date: "22/06/2025", shipping_address: "Q6, TPHCM", total_amount: 80, off_price: 5, status: "Confirmed" },
  { order_id: 11, user_id: 3, order_date: "03/07/2025", shipping_address: "Q9, TPHCM", total_amount: 108, off_price: 0, status: "Prepared" },
  { order_id: 12, user_id: 2, order_date: "30/07/2025", shipping_address: "Q4, TPHCM", total_amount: 85, off_price: 5, status: "Done" },
  // New orders for today, this week, and this month
  { order_id: 13, user_id: 1, order_date: "01/08/2025", shipping_address: "Q5, TPHCM", total_amount: 100, off_price: 0, status: "Done" },
  { order_id: 14, user_id: 2, order_date: "15/08/2025", shipping_address: "Q1, TPHCM", total_amount: 150, off_price: 10, status: "Prepared" },
  { order_id: 15, user_id: 3, order_date: "29/07/2025", shipping_address: "Q3, TPHCM", total_amount: 90, off_price: 5, status: "Confirmed" },
  { order_id: 16, user_id: 4, order_date: "05/08/2025", shipping_address: "Q10, TPHCM", total_amount: 120, off_price: 0, status: "On the way" },
  { order_id: 17, user_id: 2, order_date: "01/08/2025", shipping_address: "Q1, TPHCM", total_amount: 60, off_price: 0, status: "Prepared" },
];

// Order Items
const order_items = [
  {
    order_id: 1,
    products: [
      { product_id: "B1", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 1, off_price: 0 },
      { product_id: "B2", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 2, off_price: 0 },
    ],
  },
  {
    order_id: 2,
    products: [
      { product_id: "B2", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 2, off_price: 0 },
    ],
  },
  {
    order_id: 3,
    products: [
      { product_id: "B1", option: { name: "deluxe", price: 29.99, stems: 10 }, price: 0, quantity: 2, off_price: 5 },
      { product_id: "V1", option: null, price: 19, quantity: 1, off_price: 0 },
    ],
  },
  {
    order_id: 4,
    products: [
      { product_id: "B2", option: { name: "grand", price: 39.99, stems: 15 }, price: 0, quantity: 1, off_price: 0 },
      { product_id: "V2", option: null, price: 25, quantity: 1, off_price: 0 },
    ],
  },
  {
    order_id: 5,
    products: [
      { product_id: "B1", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 3, off_price: 0 },
    ],
  },
  {
    order_id: 6,
    products: [
      { product_id: "V1", option: null, price: 19, quantity: 2, off_price: 5 },
    ],
  },
  {
    order_id: 7,
    products: [
      { product_id: "B2", option: { name: "grand", price: 39.99, stems: 15 }, price: 0, quantity: 2, off_price: 10 },
      { product_id: "B1", option: { name: "deluxe", price: 29.99, stems: 10 }, price: 0, quantity: 1, off_price: 5 },
    ],
  },
  {
    order_id: 8,
    products: [
      { product_id: "B2", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 3, off_price: 10 },
    ],
  },
  {
    order_id: 9,
    products: [
      { product_id: "V1", option: null, price: 19, quantity: 1, off_price: 5 },
    ],
  },
  {
    order_id: 10,
    products: [
      { product_id: "B1", option: { name: "deluxe", price: 29.99, stems: 10 }, price: 0, quantity: 2, off_price: 5 },
    ],
  },
  {
    order_id: 11,
    products: [
      { product_id: "B2", option: { name: "grand", price: 39.99, stems: 15 }, price: 0, quantity: 1, off_price: 0 },
      { product_id: "V2", option: null, price: 25, quantity: 1, off_price: 0 },
    ],
  },
  {
    order_id: 12,
    products: [
      { product_id: "B1", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 2, off_price: 5 },
      { product_id: "V1", option: null, price: 19, quantity: 1, off_price: 0 },
    ],
  },
  // New order items for today, this week, and this month
  {
    order_id: 13,
    products: [
      { product_id: "B3", option: { name: "deluxe", price: 29.99, stems: 10 }, price: 0, quantity: 1, off_price: 0 },
      { product_id: "V1", option: null, price: 19, quantity: 1, off_price: 0 },
    ],
  },
  {
    order_id: 14,
    products: [
      { product_id: "B4", option: { name: "grand", price: 35.99, stems: 9 }, price: 0, quantity: 2, off_price: 10 },
      { product_id: "V2", option: null, price: 25, quantity: 1, off_price: 0 },
    ],
  },
  {
    order_id: 15,
    products: [
      { product_id: "B1", option: { name: "original", price: 19.99, stems: 5 }, price: 0, quantity: 2, off_price: 5 },
    ],
  },
  {
    order_id: 16,
    products: [
      { product_id: "B2", option: { name: "deluxe", price: 29.99, stems: 10 }, price: 0, quantity: 1, off_price: 0 },
      { product_id: "V1", option: null, price: 19, quantity: 1, off_price: 0 },
    ],
  },
  {
    order_id: 17,
    products: [
      { product_id: "B4", option: { name: "original", price: 15.99, stems: 3 }, price: 0, quantity: 1, off_price: 0 },
    ],
  },
];

// Users
const users = [
  { user_id: 1, name: "demo1hihihi", phone: "0901234567", mail: "demo1@gmail.com", password: "bimat", address: "Q5, TPHCM" },
  { user_id: 2, name: "demo1hehehe", phone: "0901234567", mail: "demo1@gmail.com", password: "bimat", address: "Q1, TPHCM" },
  { user_id: 3, name: "demo1hihihi", phone: "0901234567", mail: "demo1@gmail.com", password: "bimat", address: "Q3, TPHCM" },
  { user_id: 4, name: "demo1hehehe", phone: "0901234567", mail: "demo1@gmail.com", password: "bimat", address: "Q10, TPHCM" },
];

export { products, carts, comments, bonus_gifts, accessories, users, inventory, orders, order_items, categories };
>>>>>>> Stashed changes
