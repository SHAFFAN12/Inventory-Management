const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all products in the inventory.
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of products.
 *       500:
 *         description: Internal server error.
 */
router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('admin');
    res.json(inventories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new product in the inventory.
 *     requestBody:
 *       description: JSON object representing the new product.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request. Check the request payload.
 */
router.post('/', async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update a product in the inventory by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object representing the updated product.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       404:
 *         description: Product not found.
 *       400:
 *         description: Bad request. Check the request payload.
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.json(updatedInventory);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete a product in the inventory by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 *       400:
 *         description: Bad request.
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
