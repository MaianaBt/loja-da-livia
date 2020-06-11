const { Op } = require("sequelize");
const {
  ShoppingCart,
  ShoppingCartProduct,
  Product,
  Sale,
} = require("../../models");

const getProducts = async (id) => {
  let products = await ShoppingCartProduct.findAll({
    where: { cartId: id },
    attributes: ["quantity"],
    include: [
      {
        model: Product,
        include: {
          model: Sale,
          as: "sale",
          attributes: { exclude: ["saleId"] },
        },
      },
    ],
  });

  return products.map((product) => {
    const data = product.dataValues.Product.dataValues;
    data.quantity = product.quantity;
    data.amount = calculateAmount(data);
    return data;
  });
};

const create = async (data) => {
  try {
    const shoppingCart = await ShoppingCart.create();
    const products = data.products;

    if (products)
      //Should informes productId and quantity
      await Promise.all(
        products.map(async (product) => {
          await ShoppingCartProduct.create({
            ...product,
            cartId: shoppingCart.id,
          });
        })
      );

    return getById(shoppingCart.id);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const shoppingCart = await ShoppingCart.findByPk(id);
    if (!shoppingCart) return null;
    shoppingCart.dataValues.products = await getProducts(shoppingCart.id);

    const value = await calculateTotal(shoppingCart.dataValues.products);
    shoppingCart.amount = value;
    await shoppingCart.update();

    return shoppingCart;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const carts = await ShoppingCart.findAll();
    await Promise.all(
      carts.map(async (cart) => {
        cart.dataValues.products = await getProducts(cart.id);
      })
    );
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

const addProduct = async ({ products, cartId }) => {
  try {
    await Promise.all(
      products.map(async (product) => {
        let data = {
          ...product,
          cartId,
        };

        return insertProduct(data);
      })
    );

    return getById(cartId);
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

const removeProduct = async ({ productId, cartId }) => {
  try {
    await ShoppingCartProduct.destroy({
      where: {
        productId,
        cartId,
      },
    });

    return getById(cartId);
  } catch (error) {
    throw error;
  }
};

const editProduct = async ({ quantity, cartId, productId }) => {
  try {
    await ShoppingCartProduct.update(
      { quantity: quantity },
      {
        where: {
          productId,
          cartId,
        },
      }
    );

    return getById(cartId);
  } catch (error) {
    throw error;
  }
};

function calculeteSale(product) {
  let value = 0;
  if (product.sale.dataValues.name === "TAKE_2_FOR_1") {
    const qtdCombos = parseInt(product.quantity / 2);
    const foraCombo = product.quantity % 2;
    value = qtdCombos * product.price + foraCombo * product.price;
  } else if (product.sale.dataValues.name === "3_BY_10") {
    const qtdCombos = parseInt(product.quantity / 3);
    const foraCombo = product.quantity % 3;
    value = qtdCombos * 10 + foraCombo * product.price;
  }
  product.amount = value;
  return value;
}

const calculateAmount = (product) => {
  try {
    if (product.sale) return calculeteSale(product);
    else return product.price * product.quantity;
  } catch (error) {}
};

const calculateTotal = async (products) => {
  try {
    return products.reduce(
      (accumulator, product) => accumulator + product.amount,
      0
    );
  } catch (error) {}
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  addProduct,
  removeProduct,
  editProduct,
};
