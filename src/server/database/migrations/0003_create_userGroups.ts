import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user_groups, (table) => {
      table.bigIncrements('id').primary().index();
      table.date('created_at').defaultTo(knex.fn.now());
      table
        .integer('user_id')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.user)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .integer('group_id')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.groups)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Table used to archive user_groups from system.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.user_groups}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.user_groups).then(() => {
    console.log(`#Dropped table ${ETableNames.user_groups}`);
  });
}
