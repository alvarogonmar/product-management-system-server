import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
    // Logic to create a product



    const product = await Product.create(req.body);
    res.json({data: product});
}