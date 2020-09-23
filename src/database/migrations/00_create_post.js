exports.up = async (knex)=>{
    return knex.schema.createTable('posts', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('size').notNullable();
        table.string('key').notNullable();
        table.string('url')
            .notNullable()
            .defaultTo(null);
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}
exports.down = async (knex)=>{
    return knex.schema.dropTable('posts');
}