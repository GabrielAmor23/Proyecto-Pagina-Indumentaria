const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/tienda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const secretKey = 'secretkey';

// Ruta para registrar usuarios
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).send({ success: true });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ success: false, message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    res.send({ success: true, token });
});

// Middleware para autenticar usuarios
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ success: false, message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).send({ success: false, message: 'Token inválido' });
    }
};

// Ruta para obtener productos
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Ruta para agregar un producto (solo accesible para usuarios autenticados)
app.post('/api/products', authenticate, async (req, res) => {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });

    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
