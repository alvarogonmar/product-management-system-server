import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts) // Get all products
router.get("/:id", // Get product by ID
    param('id').isInt().withMessage('ID must be an integer'), // Validate that id is an integer
    handleInputErrors,  // Middleware to handle validation errors
    getProductById // Handler function
);

router.post("/", // Create a new product
    body('name').notEmpty().withMessage('Name product is required'), // Validate name is not empty
    body('price') // Validate price
        .isNumeric().withMessage('Price product must be a number') // Check if numeric
        .notEmpty().withMessage('Price product is required') // Check if not empty
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

router.patch("/", updateAvailability);

router.delete("/", (req, res) => {
    res.json({"Hello, World!": "DELETE"});
});

export default router;