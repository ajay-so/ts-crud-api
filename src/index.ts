import express from 'express';
import productsRoutes from './routes/productsRoute';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello TypeScript CRUD!');
});

app.use("/products", productsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});