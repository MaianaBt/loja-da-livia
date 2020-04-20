const express = require("express");
const router = express.Router();

const controller = require("../controllers/sale.controller");

router.post("/", controller.create);
router.get("/:id", controller.getById);
router.get("/", controller.getAll);

module.exports = router;
