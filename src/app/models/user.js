"use strict";
const config = require("../../config/environment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      passwordHash: Sequelize.STRING,
    },
    {}
  );

  User.addHook("beforeSave", async (user) => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 5);
    }
  });

  User.associate = function (models) {
    // associations can be defined here
  };

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.generateAuthToken = function () {
    const { secret, expiration_days } = config.JWT;

    return jwt.sign({ id: this.id }, secret, {
      expiresIn: `${expiration_days}d`,
    });
  };

  return User;
};
