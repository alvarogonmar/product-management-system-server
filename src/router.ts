import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";

const router = Router();

// Routing
router.get("/", (req, res) => {
    res.json("Hello, World!");
})

router.post("/", 
        // Validate request body 
    body('name').notEmpty().withMessage('Name product is required'), // Validate 'name' field

    body('price') // Validate 'price' field
        .isNumeric().withMessage('Price product must be a number') // Check if numeric
        .notEmpty().withMessage('Price product is required') 
        .custom((value) => value > 0).withMessage('Price product must be greater than zero'), 

    
    createProduct
);

router.put("/", (req, res) => {
    res.json({"Hello, World!": "PUT"});
})

router.patch("/", (req, res) => { 
    res.json({"Hello, World!": "PATCH"}); 
})

router.delete("/", (req, res) => { 
    res.json({"Hello, World!": "DELETE"});
});

export default router;