const log = require("../middlewares/services/log.service");
const service = require("../middlewares/services/sale.service");

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
      return res.status(404).json({ error: "Promoção não está cadastrado" });

    return res.json(result);
  } catch (e) {
    log.error("Erro ao obter promoção. ", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao obter promoção. " + (e.message || e.msg) });
  }
};
const getAll = async (req, res) => {
  try {
    const result = await service.getAll();

    return res.json(result);
  } catch (e) {
    log.error("Erro ao obter promoções. ", "", e.message || e.msg);
    res.status(500);
    res.json({ msg: "Erro ao obter promoções. " + (e.message || e.msg) });
  }
};

module.exports = {
  create,
  getById,
  getAll,
};
