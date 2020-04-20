const express = require("express");
const router = express.Router();

const controller = require("../controllers/shoppingCart.controller");

router.post("/", controller.create);
router.post("/:id/product", controller.addProduct);
router.put("/", controller.edit);
router.get("/:id", controller.getById);
router.get("/", controller.getAll);

module.exports = router;
