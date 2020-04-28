const express = require("express")
const { celebrate, Joi, Segments } = require('celebrate')

const { createTarefa, deleteTarefa, getTarefas, updateTarefa } = require("./controllers/TarefasController")

const statusEnum = {
    TODO: "TODO",
    DOING: "DOING",
    DONE: "DONE"
}

const routes = express.Router()

/** Listar tarefas */
routes.get('/tarefas', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
        qtd: Joi.number(),
        status: Joi.equal(statusEnum.DOING, statusEnum.DONE, statusEnum.TODO, "")
    })
}), getTarefas )

/** Criar tarefas */
routes.post('/tarefas', celebrate({
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        status: Joi.equal(statusEnum.DOING, statusEnum.DONE, statusEnum.TODO).required(),
    }),
}),  createTarefa )

/** Excluir tarefas */
routes.delete('/tarefas/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), deleteTarefa )
/** Atualizar tarefas */

routes.put('/tarefas/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        status: Joi.equal(statusEnum.DOING, statusEnum.DONE, statusEnum.TODO).required(),
    }),
}), updateTarefa )

module.exports = routes;
