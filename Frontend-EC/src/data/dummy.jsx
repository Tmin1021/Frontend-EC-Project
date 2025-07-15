import demo from "/src/assets/demo.png"
import demo_1 from "/src/assets/demo_1.png"
import demo_2 from "/src/assets/demo_2.png"
import demo_3 from "/src/assets/demo_3.png"
import demo_4 from "/src/assets/demo_4.png"
import demo_5 from "/src/assets/demo_5.png"

//add description_detail, tip, caution,  in products
//add comment(user_id, product_id, content) user only allow to add one comment for after each time buy the that product
//Admin: product whose type is bouquet will have option to add accessories...
//care will classify into: sun
//add accesories
//rebuild category

// A
const accessories = [
  {
    product_id: 'V1',
    name: "Montecito Vase",
    type: 'vase',
    image_url: demo_3,
    price: 19,
  },
  {
    product_id: 'V2',
    name: "Montecitosss Vase",
    type: 'vase',
    image_url: demo_4,
    price: 25,
  },
];

// B
const bonus_gifts = [
  { bouquet_id: "B1",
    accessories_id: "V1",
    off_price: 5,
  },
  { bouquet_id: "B1",
    accessories_id: "V2",
    off_price: 5,
  }
]

// C
const carts = [
  {
    user_id: 1,
    product_id: ['B1', 'V1', 'V2']
    // products: [{product_id, date}]
  }
]

const comments = [
  {  
    user_id: 1,
    product_id: "B3",
    date: "12/07/2025",
    title: "Excellent",
    content: "Pick Up A Lucky Peony!⠀ Peonies symbolize prosperity, good luck, and love. So, whether you know someone who’s getting married, graduating or just needs a pick-me-up sending them a pretty peony bouquet will be perfect!",
    image: [],
  },
  {  
    user_id: 1,
    product_id: "B3",
    date: "12/07/2025",
    content: "Pick Up A Lucky Peony!⠀ Peonies symbolize prosperity, good luck, and love. So, whether you know someone who’s getting married, graduating or just needs a pick-me-up sending them a pretty peony bouquet will be perfect!",
    image: [demo_5],
  },
];


// P
const products = [
  {
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
    image_url: [demo, demo_1, demo_2],
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

export {products, carts, comments, bonus_gifts, accessories};
