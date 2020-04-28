
exports.up = function(knex) {
    return knex.schema.createTable("tarefas", function (table) {
        table.increments()
        table.string("titulo").notNullable();
        table.string("descricao").notNullable();
        table.string("status").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("tarefas");
};
