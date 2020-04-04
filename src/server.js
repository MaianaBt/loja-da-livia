require('dotenv').config();

const LogService = require('./app/middlewares/services/log.service');

const environment = require('./config/environment');
const { host, port } = environment.API;

const app = require('./app');

app.listen(port, host, () => {
    LogService.log(`API rodando em http://${host}:${port}/`);
});