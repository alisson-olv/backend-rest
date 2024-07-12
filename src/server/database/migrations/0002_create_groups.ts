import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.groups, (table) => {
      table.bigIncrements('groupId').primary().index();
      table.string('name').notNullable().checkLength('>', 3);
      table.date('createdAt').defaultTo(knex.fn.now());
      table.date('updatedAt').defaultTo(knex.fn.now());

      table.comment('Table used to store group information.');
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
