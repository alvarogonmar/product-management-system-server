/// <reference types="jest" />

// Import Supertest to send HTTP requests to the application.
import request from "supertest";
// Import the Express application used by the endpoint tests.
import server from "../../server";

// Group the tests for creating products.
describe("POST /api/productos", () => {
    // Verify validation errors when the request body is empty.
    it("should display validation errors", async () => {
        // Submit an empty product payload to exercise required field validation.
        const response = await request(server).post("/api/productos").send({});
        // Expect the empty payload to return a bad request status.
        expect(response.status).toBe(400);
        // Check that validation failures include an errors property.
        expect(response.body).toHaveProperty("errors");
        // Expect four validation errors for the missing product fields.
        expect(response.body.errors).toHaveLength(4)

        // Ensure the product creation route is found.
        expect(response.status).not.toBe(404);
        // Confirm that the empty payload produces more than two errors.
        expect(response.body.errors).not.toHaveLength(2)

    });


    // Verify that a product price must be greater than zero.
    it("should validate that the price is greater than 0", async () => {
        // Send a product creation request with an invalid zero price.
        const response = await request(server).post("/api/productos").send({
            // Provide a valid product name to isolate price validation.
            name: "Test Product",
            // Use zero as the invalid price boundary.
            price: 0,
        });
        // Expect the zero price to produce a bad request status.
        expect(response.status).toBe(400);
        // Check that the zero price response exposes validation errors.
        expect(response.body).toHaveProperty("errors");
        // Expect exactly one validation error for a zero price.
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2)

    });
    it("should validate that the price is a number and greater than 0", async () => {
        const response = await request(server).post("/api/productos").send({
            name: "Test Product",
            price: "hola",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(3)

    });


    it("should create a new product", async () => {
        const response = await request(server).post("/api/productos").send({
            name: "Test Product",
            price: 19.99,
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("GET /api/productos/:id", () => {
    it("should check if api/products url exists", async () => {
        const response = await request(server).get("/api/productos");
        expect(response.status).not.toBe(404);
    });

    it("GET a JSON response with products", async () => {
        const response = await request(server).get("/api/productos");
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("GET /api/productos/:id", () => {
    it("should return a 404 response for a non-existing product", async () => {
        const productID = 2000
        const response = await request(server).get(`/api/productos/${productID}`);
        expect(response.status).toBe(404); // Expects not found status
        expect(response.body).toHaveProperty("error");

        expect(response.body.error).toBe("Product not found")
    })

    it("should check a valid ID in the URL", async () => {
        const response = await request(server).get("/api/productos/not-valid-url");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID must be an integer");
    });

    it("get a JSON response for a single product", async () => {
        const response = await request(server).get("/api/productos/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
});

describe("PUT /api/productos/:id", () => {

    it("should check a valid ID in the URL", async () => {
        const response = await request(server)
            .put("/api/productos/not-valid-url")
            .send({
                name: "Updated Product",
                price: 300,
                availability: true
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID must be an integer");
    });

    it("should display validation error messages when updating a product", async () => {
        const response = await request(server)
            .put("/api/productos/1")
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data"); // Ensures no data payload is returned
    });


    it("should validate that the price is greater than 0 when updating a product", async () => {
        const response = await request(server) // Make the PUT request
            .put("/api/productos/1")
            .send({
                name: "Updated Product",
                price: 0,
                availability: true
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Price product must be greater than zero");


        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data"); // Ensures no data object is returned
    });

    it("should return a 404 response for a non existent product", async () => {
        const productID = 2000
        const response = await request(server)
            .put(`/api/productos/${productID}`)
            .send({
                name: "Updated Product",
                price: 29.99,
                availability: true
            });

        expect(response.status).toBe(404); // Verifies the 404 status code
        expect(response.body.error).toBe("Product not found"); // Confirms the not found message

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("should update an existing product with valid data", async () => {
        const response = await request(server)
            .put(`/api/productos/1`)
            .send({
                name: "Updated Product",
                price: 29.99,
                availability: true
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("PATCH /api/productos/:id", () => {
    it("should return a 404 response for a non existent product", async () => { // Test case for a non-existent product
        const productID = 2000 // Assuming this ID does not exist in the database
        const response = await request(server) // Make a PATCH request to the endpoint with the non-existent product ID
            .patch(`/api/productos/${productID}`); // Send the request without a body since we're just toggling availability

        expect(response.status).toBe(404); // Expecting a 404 Not Found status code
        expect(response.body.error).toBe("Product not found"); // Expecting the error message to indicate that the product was not found
        expect(response.body).not.toHaveProperty("data"); // Ensures that no data object is returned in the response
    });

    it("should update the product availability", async () => { // Test case for updating the availability of an existing product
        const response = await request(server) // Make a PATCH request to the endpoint for an existing product ID
            .patch(`/api/productos/1`);

        expect(response.status).toBe(200); // Expecting a 200 OK status code indicating the update was successful
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.availability).toBe(false);

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("error");
    });
});

describe("DELETE /api/productos/:id", () => {
    it("should check a valid ID in the URL", async () => {
        const response = await request(server)
            .delete("/api/productos/not-valid-url");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID must be an integer");
    });


    it("should return a 404 response for a non existent product", async () => {
        const productID = 2000
        const response = await request(server)
            .delete(`/api/productos/${productID}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Product not found");

        expect(response.status).not.toBe(200);
    });

    it("should delete an existing product", async () => {
        const response = await request(server)
            .delete(`/api/productos/1`);

        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Product deleted successfully");
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    });
});