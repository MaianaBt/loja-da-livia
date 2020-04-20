const { Op } = require("sequelize");
const { ShoppingCart, ShoppingCartProduct } = require("../../models");

const create = async (data) => {
  try {
    const shoppingCart = await ShoppingCart.create(data);

    return shoppingCart;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    await calculateAmount(id);
    const shoppingCart = await ShoppingCart.findByPk(id, {
      include: ["products"],
    });
    if (!shoppingCart) return null;

    return shoppingCart;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const carts = await ShoppingCart.findAll({
      include: ["products"],
    });
    return carts;
  } catch (error) {
    throw error;
  }
};

const edit = async (data) => {
  try {
    await ShoppingCart.update(data, {
      where: { id: data.id },
    });

    return { msg: "Atualizado com sucesso" };
  } catch (error) {
    throw error;
  }
};

const addProduct = async (body) => {
  try {
    let products = body.products;
    await Promise.all(
      products.map(async (product) => {
        let data = {
          productId: product.productId,
          quantity: product.quantity,
          cartId: body.cartId,
        };

        return insertProduct(data);
      })
    );

    await calculateAmount(body.cartId);

    return await getById(body.cartId);
  } catch (error) {
    throw error;
  }
};

const insertProduct = async (data) => {
  let item = await ShoppingCartProduct.findOne({
    where: {
      [Op.and]: [
        {
          productId: {
            [Op.eq]: data.productId,
          },
        },
        {
          cartId: {
            [Op.eq]: data.cartId,
          },
        },
      ],
    },
    attributes: ["id", "quantity", "productId", "cartId"],
  });

  if (item) {
    let quantity = item.quantity + data.quantity;
    return ShoppingCartProduct.update(
      { quantity: quantity },
      { where: { id: item.id } }
    );
  } else {
    return ShoppingCartProduct.create(data);
  }
};

const calculateAmount = async (cartId) => {
  try {
    let shoppingCart = await ShoppingCart.findByPk(cartId, {
      include: ["products"],
    });
    let value = 0;
    shoppingCart.products.map((product) => {
      let actualValue = product.price;
      value += actualValue;
    });

    await ShoppingCart.update({ amount: value }, { where: { id: cartId } });
  } catch (error) {}
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  addProduct,
};
