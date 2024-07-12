import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user_groups, (table) => {
      table.bigIncrements('userGroupId').primary().index();
      table.date('createdAt').defaultTo(knex.fn.now());
      table
        .integer('userId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.user)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .integer('groupId')
        .index()
        .notNullable()
        .references('groupId')
        .inTable(ETableNames.groups)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Table used to archive user_groups.');
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
