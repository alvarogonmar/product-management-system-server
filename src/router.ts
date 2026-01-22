import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *          type: integer
 *          description: The auto-generated id of the product
 *          example: 1
 *      name:
 *          type: string
 *          description: The name of the product
 *          example: "Sample Product"
 *      price:
 *          type: number
 *          description: The price of the product
 *          example: 300
 *      availability:
 *          type: boolean
 *          description: The availability of the product
 *          example: true
 * 
 */

/**
 * @swagger
 * /api/productos:
 *  get:
 *      summary: Retrieve a list of products
 *      tags:
 *          - Products
 *      description: Retrieve a list of products from the database
 *      responses:
 *          200:
 *             description: Successful response
 *             content:
 *              application/json:
 *                schema:
 *                 type: array
 *                 items:
 *                      $ref: '#/components/schemas/Product'
 */

// Routing
router.get("/", getProducts) // Get all products

/**
 * @swagger
 * /api/productos/{id}:
 *  get:
 *     summary: Get a single product by ID
 *     tags:
 *          - Products
 *     description: Retrieve a single product by its ID
 *     parameters:
 *         - in: path
 *           name: id
 *           description: ID of the product to retrieve
 *           required: true
 *           schema:
 *                type: integer
 *           
 */
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
    param('id').isInt().withMessage('ID must be an integer'),
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

router.patch("/:id",
    param('id').isInt().withMessage('ID must be an integer'),
    handleInputErrors,
    updateAvailability
);

router.delete("/:id",
    param('id').isInt().withMessage('ID must be an integer'),
    handleInputErrors,
    deleteProduct
);

export default router;