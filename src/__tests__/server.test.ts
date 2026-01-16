import server from "../server";
import request from "supertest";

describe("GET /api", () => {
    it("shoould send back a json with a message", async () => {
        const res = await request(server).get("/api");

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe("From API")

        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe("from api");
    });
});