const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products/search
router.get('/search', async (req, res) => {
    const { from, to, category } = req.query;
    const filter = {};

    if (from) {
        filter.from = new RegExp(from, 'i');
    }

    if (to) {
        filter.to = new RegExp(to, 'i');
    }

    if (category) {
        filter.category = category;
    }

    try {
        const products = await Product.find(filter).lean();
        res.json(products);
    } catch (error) {
        console.error('Product search error:', error);
        res.status(500).json({ error: 'Server error searching products' });
    }
});

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.json(products);
    } catch (error) {
        console.error('Product list error:', error);
        res.status(500).json({ error: 'Server error fetching products' });
    }
});

// POST /api/products
// Create a new ticket document using the TicketSchema fields.
router.post('/', async (req, res) => {
    const { from, to, category, price, user } = req.body;
    if (!from || !to || !category || price === undefined) {
        return res.status(400).json({
            error: 'Missing required fields: from, to, category, price'
        });
    }

    try {
        const product = new Product({ from, to, category, price, user });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Product create error:', error);
        res.status(500).json({ error: 'Server error creating product' });
    }
});

// POST /api/products/bulk
// Create multiple ticket documents in one request body array.
router.post('/bulk', async (req, res) => {
    const tickets = req.body;
    if (!Array.isArray(tickets) || tickets.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array of tickets' });
    }

    try {
        const savedTickets = await Product.insertMany(tickets);
        res.status(201).json(savedTickets);
    } catch (error) {
        console.error('Bulk create error:', error);
        res.status(500).json({ error: 'Server error creating bulk tickets' });
    }
});

module.exports = router;
