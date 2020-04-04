const { Product, ShoppingCart } = require('../../models');

const create = async (data) => {
    try {
        const shoppingCart = await ShoppingCart.create(data);

        return shoppingCart;
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        const shoppingCart = await ShoppingCart.findByPk(id, {
            include: ['product']
        });
        if (!shoppingCart)
            return null;

        return shoppingCart;
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {
        const carts = await ShoppingCart.findAll({
            include: ['product']
        });
        return carts;
    } catch (error) {
        throw error;
    }
}

const edit = async (data) => {
    try {
        await ShoppingCart.update(data, {
            where: { id: data.id }
        });

        return { msg: "Atualizado com sucesso" };
    } catch (error) {
        throw error;
    }
}

const remove = async (id) => {
    try {
        await ShoppingCart.destroy({
            where: { id: id }
        });

        return { msg: "Removido com sucesso" };
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