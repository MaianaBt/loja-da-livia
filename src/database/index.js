const { sequelize } = require('../app/models');
const config = require('../config/database');
const LogService = require('../app/middlewares/services/log.service');

sequelize
    .authenticate()
    .then(function () {
        LogService.info(`MySql conectado no ambiente *${config.env}*`);
    })
    .catch(function (err) {
        LogService.error(`Mysql com problema de conexão em *${config.env}*. \n Erro: ${err}`);
    })
    .done();