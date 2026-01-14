import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProductById, getProducts, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts) // Get all products
router.get("/:id", // Get product by ID
    param('id').isInt().withMessage('ID must be an integer'), 
    handleInputErrors, 
    getProductById
);

router.post("/", 
    body('name').notEmpty().withMessage('Name product is required'),
    body('price')
        .isNumeric().withMessage('Price product must be a number')
        .notEmpty().withMessage('Price product is required')
        .custom((value) => value > 0).withMessage('Price product must be greater than zero'),
        handleInputErrors,  
    
    createProduct
);

router.put("/:id",
    body('name').notEmpty().withMessage('Name product is required'),
    body('price')
        .isNumeric().withMessage('Price product must be a number')
        .notEmpty().withMessage('Price product is required')
        .custom((value) => value > 0).withMessage('Price product must be greater than zero'),
    body('availability')
    .isBoolean().withMessage('Availability must be true or false'),
    handleInputErrors,
    updateProduct
)

router.patch("/", (req, res) => { 
    res.json({"Hello, World!": "PATCH"});
})

router.delete("/", (req, res) => {
    res.json({"Hello, World!": "DELETE"});
});

export default router;