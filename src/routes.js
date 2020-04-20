const express = require("express");
const router = express.Router();

const auth = require("./app/routes/auth.route");
const account = require("./app/routes/account.route");
const product = require("./app/routes/product.route");
const sale = require("./app/routes/sale.route");
const shoppingCart = require("./app/routes/shoppingCart.route");

router.get("/", (req, res) => {
  return res.send("API :)");
});

router.use("/auth", auth);
router.use("/account", account);
router.use("/product", product);
router.use("/sale", sale);
router.use("/shoppingCart", shoppingCart);

module.exports = router;
