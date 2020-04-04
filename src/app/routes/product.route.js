const express = require("express");
const router = express.Router();

const controller = require('../controllers/product.controller');

router.post('/', controller.create);
router.put('/', controller.edit);
router.delete('/:id', controller.remove);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);

module.exports = router;