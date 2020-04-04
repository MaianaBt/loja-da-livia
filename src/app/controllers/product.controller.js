const log = require('../middlewares/services/log.service');
const service = require('../middlewares/services/product.service');

const create = async (req, res) => {
    try {
        const result = await service.create(req.body);

        return res.json(result);
    } catch (e) {
    	console.log(e)

        log.error('Erro ao registrar', '', e.message || e.msg);
        res.status(500);
        res.json({msg: "Erro ao registrar. " + (e.message || e.msg)})
    }
}

const getById = async (req, res) => {
    try {
        const result = await service.getById(req.params.id);
        if (!result)
            return res.status(404).json({ error: 'Produto não está cadastrado' });

        return res.json(result);
    } catch (e) {
        log.error('Erro ao obter produto. ', '',  e.message || e.msg);
        res.status(500);
        res.json({msg: "Erro ao obter produto. " + (e.message || e.msg)});
    }
}
const getAll = async (req, res) => {
    try {
        const result = await service.getAll();

        return res.json(result);
    } catch (e) {
        log.error('Erro ao obter produtos. ', '',  e.message || e.msg);
        res.status(500);
        res.json({msg: "Erro ao obter produtos. " + (e.message || e.msg)});
    }
}

const edit = async (req, res) => {
    try {
        const result = await service.edit(req.body);

        return res.json(result);
    } catch (e) {
        log.error('Erro ao editar. ', '',  e.message || e.msg);
        res.status(500);
        res.json({msg: "Erro ao editar. " + (e.message || e.msg)});
    }
}

const remove = async (req, res) => {
    try {
        const result = await service.delete(req.params.id);

        return res.json(result);
    } catch (e) {
        log.error('Erro ao remover. ', '',  e.message || e.msg);
        res.status(500);
        res.json({msg: "Erro ao remover. " + (e.message || e.msg)});
    }
}

module.exports = { 
	create,
	getById,
	getAll,
	edit,
	remove
};