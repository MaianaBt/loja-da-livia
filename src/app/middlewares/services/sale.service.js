const { Sale } = require("../../models");

const create = async (data) => {
  try {
    const sale = await Sale.create(data);
    return sale;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const sale = await Sale.findByPk(id);
    if (!sale) return null;

    return sale;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const sales = await Sale.findAll();
    return sales;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getById,
  getAll,
};
