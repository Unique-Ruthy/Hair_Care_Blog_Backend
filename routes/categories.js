const router = require("express").Router();
const Category = require("../models/Category");

// CREATE POST CATEGORY
router.post("/", async (req, res) => {
  const newcat = new Category(req.body);
  try {
    const savedCat = await newcat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST BY CATEGORY
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
