const log = require('../middlewares/services/log.service');
const service = require('../middlewares/services/auth.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // TODO: tratar dados de entrada

        log.info('Iniciando login', { email });

        const result = await service.login(email, password);

        if (!result)
            return res.status(404).json({ error: 'Invalid email or password' });

        log.info('Login finalizado', { email });

        const { user, token } = result;

        return res.json({ user, token });
    } catch (e) {
        log.error('Erro ao realizar login', '', e.message);
    }
}

module.exports = { login }