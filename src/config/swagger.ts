import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0", // Version of OpenAPI
        tags: [
            {
                name: "Products", // Tag name
                description: "API endpoints for managing products" // Tag description
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API RESTful for managing products using Node.js, Express, and TypeScript."
        },
    },
        apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;