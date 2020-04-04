const { Product, Sale } = require('../../models');

const create = async (data) => {
    try {
        let sale = data.saleId && await Sale.findByPk(data.saleId, {
            include: ['sale']
        });
        if (!sale)
            throw({msg: "Essa promoção não existe"});

        const product = await Product.create(data);

        return product;
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        const product = await Product.findByPk(id, {
            include: ['sale']
        });
        if (!product)
            return null;

        return product;
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {
        const products = await Product.findAll({
            include: ['sale']
        });
        return products;
    } catch (error) {
        throw error;
    }
}

const edit = async (data) => {
    try {
        await Product.update(data, {
            where: { id: data.id }
        });

        return { msg: "Produto atualizado" };
    } catch (error) {
        throw error;
    }
}

const remove = async (id) => {
    try {
        await Product.destroy({
            where: { id: id }
        });

        return { msg: "Produto removido com sucesso" };
    } catch (error) {
        throw error;
    }
}

module.exports = { 
	create,
	getById,
	getAll,
	edit,
	remove
};