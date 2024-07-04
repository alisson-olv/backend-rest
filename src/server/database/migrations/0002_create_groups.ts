import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.groups, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('name').notNullable().checkLength('>', 3);
      table.string('description').checkLength('>=', 5);
      table.date('created_at').defaultTo(knex.fn.now());
      table.date('updated_at').defaultTo(knex.fn.now());

      table.comment('Table used to archive groups from system.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.groups}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.groups).then(() => {
    console.log(`#Dropped table ${ETableNames.groups}`);
  });
}
