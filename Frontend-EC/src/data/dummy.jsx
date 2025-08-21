import demo from "/src/assets/demo.png";
import demo_1 from "/src/assets/demo_1.png";
import demo_2 from "/src/assets/demo_2.png";
import demo_3 from "/src/assets/demo_3.png";
import demo_4 from "/src/assets/demo_4.png";
import demo_5 from "/src/assets/demo_5.png";

const isDummy = 0

const productPlaceHolder =   {
    product_id: "Create",
    type: "flower",
    name: "Red Rose Bouquet",
    price: 1.99,
    stock: 10,
    available: true,
    description: "Assorted stems of seasonal roses.",
    image_url: [demo_1, demo, demo_2, demo_3],
    flower_details: {
      occasion: ["Wedding"],
      color: ["Pink Flowers"],
      flower_type: "Roses",
      options: [
        {name: "original", stock: 5, stems: 5},
        {name: "deluxe", stock: 5, stems: 10},
        {name: "grand", stock: 5, stems: 15}
      ],
    },
  }

/*
vr7nhymdm6sy1nef87xr7124
l23fcdml6c0cuf4mwcfas7aa
fsslor1xcmpvzmm6gr0a3xrq
r6pg13k3125krw6oma3wea3l

lbdqwwht5c453g0o8xbcresm
vfizsmk3jlcq4tpwln9bumxx
fd7uu75eoq2tx3829uhncx9b

mp3ir8rh52ys3wwmf5qxenki
rv0djgr8t342iyk5ilthxyka*/

// Bonus Gifts
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

// Carts

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

// D
const dummyUser = {
  user_id: 1,
  name: "demo1hihihi",
  phone: "0901234567",
  mail: "demo1@gmail.com",
  address: "Q5, TPHCM",
  role: 'user'
}

// P
const products = [
  {
    product_id: "B1",
    type: "flower",
    name: "Red Rose Bouquet",
    price: 1.99,
    stock: 12,
    available: true,
    description: `Assorted stems of seasonal roses. Assorted stems of seasonal roses. Assorted stems of seasonal roses. Assorted stems of seasonal roses. 
    Assorted stems of seasonal roses. Assorted stems of seasonal roses.`,
    image_url: [demo_1, demo, demo_2, demo_3],
    flower_details: {
      occasion: ["Wedding"],
      color: ["Pink Flowers"],
      flower_type: "Roses",
      options: [
        {name: "original", stock: 5, stems: 5},
        {name: "deluxe", stock: 5, stems: 10},
        {name: "grand", stock: 5, stems: 15}
      ],
    },
  },
  {
    product_id: "B2",
    type: "flower",
    name: "Farmer's Choice Peonies",
    price: 2.99,
    stock: 12,
    available: true,
    description: "Assorted stems of seasonal peonies.",
    image_url: [demo_1, demo, demo_2],
    flower_details: {
      occasion: ["New Baby", "Thank you"],
      color: ["White Flowers"],
      flower_type: "Peonies",
      options: [
        {name: "original", stock: 5, stems: 5},
        {name: "deluxe", stock: 5, stems: 10},
        {name: "grand",  stock: 2, stems: 15}
      ],
    },
  },
  {
    product_id: "B3",
    type: "flower",
    name: "Peony Bouquet",
    price: 2.59,
    stock: 18,
    available: false,
    description: "Beautiful peony flowers.",
    image_url: [demo_2],
    flower_details: {
      occasion: ["Wedding", "Happy Birthday"],
      color: ["Pink Flowers"],
      flower_type: "Peonies",
      options: [
        { name: "original", stock: 1, stems: 5 },
        { name: "deluxe", stock: 0, stems: 10 },
        { name: "grand", stock: 5, stems: 15 },
      ],
    },
  },
  {
    product_id: "V1",
    type: "vase",
    name: "Montecito Vase",
    price: 12.99,
    stock: 12,
    available: true,
    description: "A beautiful vase for your flowers.",
    image_url: [demo_3],
  },
  {
    product_id: "V2",
    type: "vase",
    name: "Montecitoss Vase",
    price: 29.99,
    stock: 0,
    available: true,
    description: "A beautiful vase for your flowers.",
    image_url: [demo_4],
  },
];


// Orders
const orders = [
  { order_id: 1, user_id: 1, order_date: "02/07/2025", shipping_address: "Q5, TPHCM", total_amount: 200, off_price: 10, status: "Required", message: 'Leave this here' },
  { order_id: 2, user_id: 3, order_date: "02/07/2025", shipping_address: "Q5, TPHCM", total_amount: 200, off_price: 0, status: "Done" , message: 'Leave this here' },
  { order_id: 3, user_id: 2, order_date: "08/07/2025", shipping_address: "Q1, TPHCM", total_amount: 120, off_price: 10, status: "Confirmed", message: 'Leave this here'  },
  { order_id: 4, user_id: 4, order_date: "15/07/2025", shipping_address: "Q10, TPHCM", total_amount: 180, off_price: 0, status: "Confirmed", message: 'Leave this here'  },
  { order_id: 5, user_id: 1, order_date: "21/06/2025", shipping_address: "Q5, TPHCM", total_amount: 99, off_price: 0, status: "Done", message: 'Leave this here' },
  { order_id: 6, user_id: 2, order_date: "28/06/2025", shipping_address: "Q1, TPHCM", total_amount: 75, off_price: 5, status: "Canceled", message: 'Leave this here' },
  { order_id: 7, user_id: 3, order_date: "01/07/2025", shipping_address: "Q3, TPHCM", total_amount: 210, off_price: 15, status: "Confirmed", message: 'Leave this here' },
  { order_id: 8, user_id: 4, order_date: "12/06/2025", shipping_address: "Q2, TPHCM", total_amount: 50, off_price: 10, status: "Required", message: 'Leave this here' },
  { order_id: 9, user_id: 1, order_date: "15/06/2025", shipping_address: "Q10, TPHCM", total_amount: 14, off_price: 5, status: "Confirmed", message: 'Leave this here' },
  { order_id: 10, user_id: 2, order_date: "22/06/2025", shipping_address: "Q6, TPHCM", total_amount: 80, off_price: 5, status: "Confirmed", message: 'Leave this here'  },
  { order_id: 11, user_id: 3, order_date: "03/07/2025", shipping_address: "Q9, TPHCM", total_amount: 108, off_price: 0, status: "Confirmed", message: 'Leave this here' },
  { order_id: 12, user_id: 2, order_date: "30/07/2025", shipping_address: "Q4, TPHCM", total_amount: 85, off_price: 5, status: "Done", message: 'Leave this here' },
  // New orders for today, this week, and this month
  { order_id: 13, user_id: 1, order_date: "01/08/2025", shipping_address: "Q5, TPHCM", total_amount: 100, off_price: 0, status: "Done", message: 'Leave this here' },
  { order_id: 14, user_id: 2, order_date: "15/08/2025", shipping_address: "Q1, TPHCM", total_amount: 150, off_price: 10, status: "Canceled", message: 'Leave this here' },
  { order_id: 15, user_id: 3, order_date: "29/07/2025", shipping_address: "Q3, TPHCM", total_amount: 90, off_price: 5, status: "Confirmed", message: 'Leave this here' },
  { order_id: 16, user_id: 4, order_date: "05/08/2025", shipping_address: "Q10, TPHCM", total_amount: 120, off_price: 0, status: "Delivering", message: 'Leave this here' },
  { order_id: 17, user_id: 2, order_date: "01/08/2025", shipping_address: "Q1, TPHCM", total_amount: 60, off_price: 0, status: "Delivering", message: 'Leave this here' },
];

// Order Items
const order_items = [
  {
    order_id: 1,
    products: [
      { product: products[0], option: products[0].flower_details.options[0], quantity: 1, off_price: 0 },
      { product: products[1], option: products[0].flower_details.options[0], quantity: 2, off_price: 10 },
    ],
  },
  {
    order_id: 1,
    products: [
      { product: products[0], option: products[0].flower_details.options[0], quantity: 4, off_price: 5 },
    ],
  },
];

// Users
const users = [
  {
    user_id: 0,
    name: "demo1hihihi",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q5, TPHCM",
    role: 'admin'
  },
    {
    user_id: 1,
    name: "demo1hehehe",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q1, TPHCM",
    role: 'user'
  },
  {
    user_id: 2,
    name: "demo1hehehe",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q1, TPHCM",
    role: 'user'
  },
    {
    user_id: 3,
    name: "demo1hihihi",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q3, TPHCM",
    role: 'user'
  },
  {
    user_id: 4,
    name: "demo1hehehe",
    phone: "0901234567",
    mail: "demo1@gmail.com",
    password: "bimat",
    address: "Q10, TPHCM",
    role: 'admin'
  }
]

const carts = [
  {
    user_id: 1,
    products: [
      { product: products[0], option: products[0].flower_details.options[0], quantity: 1, off_price: 0 },
      { product: products[1], option: products[0].flower_details.options[0], quantity: 2, off_price: 10 },
    ],
  },
];


export { products, carts, comments, bonus_gifts, users, orders, order_items, isDummy, dummyUser, productPlaceHolder, demo_1};
