const log = require('../middlewares/services/log.service');
const service = require('../middlewares/services/account.service');

const register = async (req, res) => {
    try {
        const result = await service.register(req.body);

        if (!result)
            return res.status(400).json({ error: 'User already exists' });

        return res.json(result);
    } catch (e) {
        log.error('Erro ao registrar', '', e.message);
    }
}

module.exports = { register };