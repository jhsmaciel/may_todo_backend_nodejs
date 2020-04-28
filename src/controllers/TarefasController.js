const connection = require("../database");
const table = "tarefas";

module.exports = {
    async createTarefa({ body: { titulo, descricao, status }}, response) {
        try {
            const [id] = await connection(table).insert({
                titulo,
                descricao,
                status
            });
            return response.json({ id });
        } catch (e) {
            return response.status(400).json({
                message: "Not created",
            })
        }
    },
    
    async getTarefas(request, response) {
        const { page = 1, qtd = 10, status = "TODO" } = request.query;

        const [count] = await connection(table)
            .count();

        const tarefas = await connection(table)
            .where("status", status)
            .limit(qtd)
            .offset(( page - 1 ) * qtd)
            .select("*");

        response.header("X-Total-Count", count["count(*)"])
        return response.json(tarefas);     
    },

    async deleteTarefa(request, response){
        const { id } = request.params;
        try {
            await connection(table).where("id", id).delete();
        } catch (error) {
            return response.status(500).json({
                error: "500 - Internal server error"
            })   
        }
        return response.status(204).send();
    },

    async updateTarefa(request, response){
        const { id } = request.params;
        const { titulo, descricao, status } = request.body;
        await connection(table)
            .where("id", id)
            .update({
                titulo,
                descricao, 
                status
            })
        return response.status(204).send();
    }
}