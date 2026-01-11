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
        .notEmpty().withMessage('Price product is required') // Check if not empty
        .custom((value) => value > 0).withMessage('Price product must be greater than zero'), // Custom validation to ensure price > 0

    
    createProduct // Handler to create product
);

router.put("/", (req, res) => { // Placeholder for PUT request
    res.json({"Hello, World!": "PUT"}); // Placeholder response
})

router.patch("/", (req, res) => { 
    res.json({"Hello, World!": "PATCH"}); 
})

router.delete("/", (req, res) => { 
    res.json({"Hello, World!": "DELETE"});
});

export default router;