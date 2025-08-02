import { address } from "framer-motion/client"
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
    image_url: [demo_3],
    price: 19,
  },
  {
    product_id: 'V2',
    name: "Montecitosss Vase",
    type: 'vase',
    image_url: [demo_4],
    price: 25,
  },
];

// B
const bonus_gifts = [
  { flower_id: "B1",
    accessory_id: "V1",
    off_price: 5,
  },
  { flower_id: "B1",
    accessory_id: "V2",
    off_price: 5,
  },   
  { flower_id: "B2",
    accessory_id: "V1",
    off_price: 8,
  }
]

// C
const carts = [
  {
    user_id: 1,
    products: [{product_id: 'B1', quantity: 2}, {product_id: 'B3', quantity: 3}]
  }
]

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


// P
const products = [
  {
    product_id: 'B1',
    type: 'flower',
    name: "Red Rose Bouquet",
    price: 19.99,
    stock: 12,
    available: true,
    description: "Assorted stems of seasonal peonies.",
    image_url: [demo_1, demo, demo_2, demo_3],
    flower_details: {
      occasion: ["Wedding"],
      color: ['Pink Flowers'],
      flower_type: "Roses",
      options: [
        {name: "original", price: 19.99, stems: 5},
        {name: "deluxe", price: 29.99, stems: 10 },
        {name: "grand", price: 39.99, stems: 15 }
      ],
    }
  },

  {
    product_id: 'B2',
    type: 'flower',
    name: "Farmer's Choice Peonies",
    price: 21.99,
    stock: 1,
    available: true,
    description: "Assorted stems of seasonal peonies.",
    image_url: [demo_1, demo, demo_2],
    flower_details: {
      occasion: ["New Baby", "Thank you"],
      color: ['White Flowers'],
      flower_type: "Roses",
      options: [
        {name: "original", price: 21.99, stems: 5},
        {name: "deluxe", price: 29.99, stems: 10 },
        {name: "grand", price: 39.99, stems: 15 }
      ],
    }
  },

  {
    product_id: 'V1',
    type: 'vase',
    name: "Montecito Vase",
    price: 40,
    stock: 12,
    available: true,
    description: "Assorted stems of seasonal peonies.",
    image_url: [demo_3],
  },

  {
    product_id: 'V2',
    type: 'vase',
    name: "Montecitoss Vase",
    price: 40,
    stock: 12,
    available: true,
    description: "Assorted stems of seasonal peonies.",
    image_url: [demo_4],
  },

];

// I
const inventory = [
  {
    product_id: 'B1',
    stock: 15, 
    available: 1
  },
    {
    product_id: 'B2',
    stock: 12,
    available: 1
  },
    {
    product_id: 'B3',
    stock: 18,
    available: 1
  },
    {
    product_id: 'B4',
    stock: 15,
    available: 1
  },
];

// O
// status: Required, Confirmed, Canceled, Prepared, On the way, Suspended, Done
const orders = [
  {
    order_id: 1,
    user_id: 1,
    order_date: "02/07/2025",
    shipping_address: "Q5, TPHCM",
    total_amount: 200,
    off_price: 0,
    status: "Required",
  },
  {
    order_id: 2,
    user_id: 3,
    order_date: "02/07/2025",
    shipping_address: "Q5, TPHCM",
    total_amount: 200,
    off_price: 0,
    status: "Done",
  },
];

const order_items = [
  { 
    order_id: 1,
    products: [{product_id: "B1", option: {name: "original", price: 19.99, stems: 5}, price: 0, quantity: 1, off_price: 0}, 
               {product_id: "B2", option: {name: "original", price: 19.99, stems: 5}, price: 0, quantity: 2, off_price: 0}
    ],
  },
  {
    order_id: 2,
    products: [{product_id: "B2", option: {name: "original", price: 19.99, stems: 5}, price: 0, quantity: 2, off_price: 0}],
  }
];

// U
const users = [
  {
    user_id: 1,
    name: "demo1hihihi",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q5, TPHCM"
  },
  {
    user_id: 2,
    name: "demo1hehehe",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q1, TPHCM"
  },
    {
    user_id: 3,
    name: "demo1hihihi",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q3, TPHCM"
  },
  {
    user_id: 4,
    name: "demo1hehehe",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q10, TPHCM"
  }
]

export {products, carts, comments, bonus_gifts, accessories, users, inventory, orders, order_items};
