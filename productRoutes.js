const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const product = new Product({ name, description, price, stock });

    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

// Actualizar el stock de un producto
router.put('/:id', async (req, res) => {
    const { stock } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { stock },
            { new: true }
        );
        res.send(product);
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ success: true });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

module.exports = router;
