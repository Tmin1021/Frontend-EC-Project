const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const { getDynamicPrice, getCondition } = require("../dynamicPricing")

// GET all products combined Search + Filter + Sort + Pagination
// GET /api/products?search=rose&type=flower&flowerType=Roses,Lilies&occasions=Birthday,Anniversary&colors=Red Flowers,White Flowers&sort=price&page=1&limit=12
router.get("/", async (req, res) => {
    try {
        const { search, flowerTypes, occasions, colors, sort, page = 1, limit = 12} = req.query;
        const skip = (page - 1) * limit;

        // 1. Build Filter
        let filter = {};

        if (search) {
            const regex = new RegExp(search.trim(), "i"); // turn into regexp form; "i" = case-insensitive search
            filter.$or = [
              { name: { $regex: regex } },
              { description: { $regex: regex } },
            ];  // select * from products where (name has form of regex 'regex' or ...)
        }

        if (colors) {
            const colorArray = colors.split(","); // "Red,White" -> ["Red","White"]
            filter["colors"] = { $in: colorArray };    // select * from products where "flower_detais.colors" in colorArray
        }

        if (flowerTypes) {
            const typeArray = flowerTypes.split(",");
            filter["flower_type"] = { $in: typeArray };
        }

        if (occasions) {
            const occArray = occasions.split(",");
            filter["occasions"] = { $in: occArray };
        }

        // 2. Sorting
        let sortOption = {};
        if (sort) {
            switch(sort) {
                case "Price: Low to High":
                    sortOption.price = 1;
                    break;
                case "Price: High to Low":
                    sortOption.price = -1;
                    break;
                case "A to Z":
                    sortOption.name = 1;
                    break;
                case "Z to A":
                    sortOption.name = -1;
                    break;
                case "Condition: New to Old":
                    sortOption.fill_stock_date = -1;
                    break;
                case "Condition: Old to New":
                    sortOption.fill_stock_date = 1;
                    break;
                case "Best Sellers":
                    sortOption.sales_count = -1;
                    break;
            }
        }

        // 3. Query DB
        const total = await Product.countDocuments(filter);

        let products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);

        // 4. Apply dynamic pricing + condition
        products = products.map(p => {
          const dynamicPrice = getDynamicPrice(p.price, p.fill_stock_date)
          const condition = getCondition(p.fill_stock_date)
          return { ...p.toObject(), dynamicPrice, condition }
        })

        res.json({
            page: Number(page),
            totalPages,
            totalProducts: total,
            products,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET autocomplete (/api/products/predict?search=ros)
router.get("/predict", async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) return res.json([]); // nothing typed yet

    const regex = new RegExp(search.trim(), "i"); // case-insensitive

    // only return product names, limit for performance
    const predictions = await Product.find({ name: { $regex: regex } })
      .select("name")
      .limit(5)

    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// GET product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const dynamicPrice = getDynamicPrice(product.price, product.fill_stock_date)
    const condition = getCondition(product.fill_stock_date)
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json({ ...product.toObject(), dynamicPrice, condition })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// CREATE product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
