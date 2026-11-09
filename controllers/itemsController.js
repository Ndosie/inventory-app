const { body, validationResult, matchedData } = require("express-validator");
const {
  getAllItems,
  getItem,
  insertItem,
  deleteItem,
} = require("../db/itemqueries");

const validateItem = [
  body("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Item name must have at least 5 characters"),
  body("photo_url")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Photo url must be a valid url"),
  body("category")
    .trim()
    .isEmpty()
    .withMessage("Please select the item category"),
  ,
  body("unit").trim().isEmpty().withMessage("Please select the item unit"),
  body("quantity")
    .trim()
    .isEmpty()
    .withMessage("Quantity must have value")
    .isNumeric()
    .withMessage("Quantity must be numeric"),
];

exports.itemsListGet = async (req, res) => {
  res.render("items", {
    title: "Items List",
    users: await getAllItems(),
  });
};

exports.itemsItemGet = async (req, res) => {
  try {
    const item = await getItem(id);
    res.render("itemsDetails", { title: `${item.name} Details`, item: item });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error during fetching an item" });
  }
};

exports.itemsCreateGet = (req, res) => {
  res.render("createItem", { title: "Create Item" });
};

exports.itemsCreatePost = [
  validateItem,
  async (req, res) => {
    const errors = validateItem(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("createItem", { title: "Create Item", errors: errors.array() });
    }

    try {
      const { name, photo_url, category, unit, quantity } = matchedData(req);
      await insertItem({ name, photo_url, category, unit, quantity });

      res.redirect("/items");
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error during inserting an item." });
    }
  },
];

exports.itemsUpdateGet = async (req, res) => {
  try {
    const item = await getItem(req.params.id);
    res.render("updateItem", { title: "Update item", item });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error during fetching an item." });
  }
};

exports.itemsUpdatePost = [
  validateItem,
  async (req, res) => {
    const item = await getItem(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateItem", {
        title: "Update item",
        item,
        errors: errors.array(),
      });
    }

    try {
      const { name, photo_url, category, unit, quantity } = matchedData(req);
      await insertItem({ name, photo_url, category, unit, quantity });
      res.redirect("/items");
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error during updating an item" });
    }
  },
];

exports.itemsDeletePost = async (req, res) => {
  try {
    await deleteItem(req.params.id);
    res.redirect("/items");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error during delete an item" });
  }
};
