import request from "supertest";
import server from "../../server";

describe("POST /api/productos", () => {
    it("should create a new product", async () => {
        const response = await request(server).post("/api/productos").send({
            name: "Test Product",
            price: 19.99,
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");
    });
}); 