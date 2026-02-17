import request from "supertest";
import server from "../../server";

describe("POST /api/productos", () => {
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/productos").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2)

    });


    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/productos").send({
            name: "Test Product",
            price: 0,
        });        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
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
        expect(response.status).toBe(404);
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
        expect(response.body).not.toHaveProperty("data");
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
        expect(response.body).not.toHaveProperty("data");
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

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Product not found");
        
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

describe("PATCH /api/productos/:id", () => { // PATCH para actualizar solo la disponibilidad
    it("should return a 404 response for a non existent product", async () => { // PATCH para actualizar solo la disponibilidad
        const productID = 2000 // const for a non-existent product ID
        const response = await request(server) // Make the PATCH request to update availability
            .patch(`/api/productos/${productID}`); // No body needed since we're only toggling availability

        expect(response.status).toBe(404); // Expect a 404 Not Found status
        expect(response.body.error).toBe("Product not found"); // Expect the error message to indicate the product was not found
        expect(response.body).not.toHaveProperty("data"); // Ensure that the response does not contain a data property
    });

    it("should update the product availability", async () => { // Test case to check if the PATCH endpoint correctly updates the product's availability
        const response = await request(server)
            .patch(`/api/productos/1`);

        expect(response.status).toBe(200);
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