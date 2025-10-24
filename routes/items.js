const express = require("express");
const router = new express.Router();
let items = require("../fakeDb");

/** GET /items - return list of items */
router.get("/", (req, res) => {
    return res.json({ items });
});

/** POST /items - add new item */
router.post("/", (req, res) => {
    const { name, price } = req.body;
    if (name === undefined || price === undefined) {
        return res.status(400).json({ error: "Name and price are required" });
    }
    
    const newItem = { name, price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
});

/** GET /items/:name - get single item */
router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
        return res.status(404).json({ error: "Item not found" });
    }
    return res.json({ item: foundItem });
})

/** PATCH /items/:name -  modify a single item's name and/or price */
router.patch("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    const { name, price } = req.body;
    if (name !== undefined) foundItem.name = name;
    if (price !== undefined) foundItem.price = price;

    const updated = { name: foundItem.name, price: foundItem.price };

    return res.json({ updated });
})

/** DELETE /items/:name -  delete a single item */
router.delete("/:name", (req, res) => {
    const idx = items.findIndex(item => item.name === req.params.name);
    const itemIndex = idx;
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }
    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
})

module.exports = router;