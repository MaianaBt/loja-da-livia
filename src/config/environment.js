require("dotenv").config();

module.exports = {
  API: {
    host: "localhost",
    port: 8060,
  },
  JWT: {
    secret: "2f3bbe6e4640aa73767be13b11ef4cae",
    expiration_days: 7,
  },
};
