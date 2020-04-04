'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Sale', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
    });
    queryInterface.createTable('Product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true

            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            saleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {    
                  model: 'Sale',
                  key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
    });
    queryInterface.createTable('ShoppingCart', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    return queryInterface.createTable('ShoppingCartProduct', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {         // User belongsTo Company 1:1
                  model: 'Product',
                  key: 'id'
                }
            },
            cartId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {         // User belongsTo Company 1:1
                  model: 'ShoppingCart',
                  key: 'id'
                }
            },
            quantity: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Product');
    queryInterface.dropTable('Sale');
    queryInterface.dropTable('ShoppingCart');
    return queryInterface.dropTable('ShoppingCartProduct');
  }
};
