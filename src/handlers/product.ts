import { Request, Response } from "express";
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res: Response) => {
    res.json("Hello, World!");
}

export const createProduct = async (req: Request, res: Response) => {
    // Logic to create a product
    try {       
        const product = await Product.create(req.body);
        res.json({data: product});
    } catch (error) {
        console.log(error);
    }
}