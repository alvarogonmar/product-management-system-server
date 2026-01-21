import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API endpoints for managing products"
            }
        ],
        info: {
            title: "Products API REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API RESTful for managing products using Node.js, Express, and TypeScript."
        },
    },
        apis: []

};