import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
    // Logic to create a product
    const product = new Product(req.body);
    product.save();

    res.json('Create Product');
}