import express, { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface Product {
    id: string,
    name: string,
    price: number
}

const Products: Product[] = [];

// GET all products
router.get("/", (req: Request, res: Response) => {
    let total: number = Products.length;
    res.status(200).json({ totalProducts: total, products: Products });
});


// POST add a new product
router.post("/addProduct", (req: Request, res: Response) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Missing product data' });
    }

    // Type validation
    if (typeof name !== 'string' || typeof price !== 'number') {
        return res.status(400).json({ error: 'Invalid product data' });
    }

    const newProduct: Product = {
        id: uuidv4(),
        name,
        price
    };

    Products.push(newProduct);
    res.status(201).json({ message: "Product created successfully", product: newProduct });
});


// GET product by ID
router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is missing' });
    }

    const product = Products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: "Product found", product });
});


// PATCH update product by ID
router.patch('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is missing' });
    }

    // Used falsy check. 0 is falsy, so it fails when price = 0
    if (name === undefined && price === undefined) {
        return res.status(400).json({ error: 'No fields provided to update' });
    }

    if (name !== undefined && typeof name !== 'string') {
        return res.status(400).json({ error: 'Name should be a string' });
    }

    if (price !== undefined && typeof price !== 'number') {
        return res.status(400).json({ error: 'Price should be a number' });
    }

    const product = Products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    return res.status(200).json({ message: 'Product updated successfully', product });
});


// DELETE product by ID
router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Product ID is missing" });
    }

    const index = Products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Product not found for delete" });
    }

    // Remove product using splice
    const deletedProduct = Products[index];
    Products.splice(index, 1);

    res.status(200).json({ message: "Product deleted successfully", deletedProduct, remainingProducts: Products });
});

export default router;
