import { Request, Response } from "express";
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res: Response) => {
    try{
        const products =  await Product.findAll();
        res.json({data: products});
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const product =  await Product.findByPk(id);
        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }
        res.json({data: product});

    } catch (error) {
        console.log(error);
    }
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

export const updateProduct = async (req: Request, res: Response) => {
    res.json({"Hello, World!": "PUT"});
}