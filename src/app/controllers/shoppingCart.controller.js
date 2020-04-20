const log = require("../middlewares/services/log.service");
const service = require("../middlewares/services/shoppingCart.service");

const create = async (req, res) => {
  try {
    const result = await service.create(req.body);

    return res.json(result);
  } catch (e) {
    console.log(e);

    log.error("Erro ao registrar", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao registrar. " + (e.message || e.msg) });
  }
};

const getById = async (req, res) => {
  try {
    const result = await service.getById(req.params.id);
    if (!result)
      return res.status(404).json({ error: "Produto não está cadastrado" });

    return res.json(result);
  } catch (e) {
    log.error("Erro ao obter carrinho. ", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao obter carrinho. " + (e.message || e.msg) });
  }
};
const getAll = async (req, res) => {
  try {
    const result = await service.getAll();

    return res.json(result);
  } catch (e) {
    log.error("Erro ao obter produtos. ", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao obter produtos. " + (e.message || e.msg) });
  }
};

const edit = async (req, res) => {
  try {
    const result = await service.edit(req.body);

    return res.json(result);
  } catch (e) {
    log.error("Erro ao editar. ", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao editar. " + (e.message || e.msg) });
  }
};

const addProduct = async (req, res) => {
  try {
    let body = req.body;
    body["cartId"] = req.params.id;
    const result = await service.addProduct(body);

    return res.json(result);
  } catch (e) {
    log.error("Erro ao adicionar produto. ", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao adicionar produto. " + (e.message || e.msg) });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  addProduct,
};
