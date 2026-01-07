import { Router } from "express";

const router = Router();

// Routing
router.get("/", (req, res) => {
    res.json("Hello, World!");
})

router.post("/", (req, res) => {
    res.json({"Hello, World!": "POST"});
})

router.put("/", (req, res) => {
    res.json({"Hello, World!": "PUT"});
})

router.patch("/", (req, res) => {
    res.json({"Hello, World!": "PATCH"});
})

router.delete("/", (req, res) => {
    res.json({"Hello, World!": "DELETE"});
});

export default router;