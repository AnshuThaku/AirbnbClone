const express = require("express");
const router = express.Router();
const Wrapasync = require("../utils/Wrapasync");
const { generateAIContent } = require("../controllers/ai");

router.post("/generate", Wrapasync(generateAIContent));

module.exports = router;
