import express from 'express';
import productsRoutes from './routes/productsRoute';
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello TypeScript CRUD!');
});

// Built-in formats: dev, tiny, short, common, combined
app.use(morgan('dev'));
app.get
app.use("/products", productsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
