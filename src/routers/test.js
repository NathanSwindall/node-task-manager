const express = require("express");
const router = new express.Router();

router.get("/test", (req, res) => {
    res.send("Hello from the router")
})

module.exports = router;