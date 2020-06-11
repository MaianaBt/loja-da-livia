const express = require("express");
const router = express.Router();

const controller = require("../controllers/shoppingCart.controller");

router.post("/", controller.create);
router.put("/", controller.edit);
router.get("/:id", controller.getById);
router.get("/", controller.getAll);
router.post("/:id/product", controller.addProduct);
router.delete("/:id/product/:productId", controller.removeProduct);
router.put("/:id/product/:productId", controller.editProduct);

module.exports = router;
