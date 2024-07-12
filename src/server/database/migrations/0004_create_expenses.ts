import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.expenses, (table) => {
      table.bigIncrements('expenseId').primary().index();
      table.date('createdAt').defaultTo(knex.fn.now());
      table.date('updatedAt').defaultTo(knex.fn.now());
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
      table.decimal('amount', 10, 2).notNullable();
      table.text('description');

      table.comment('Table used to archive expenses from groups.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.expenses}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.expenses).then(() => {
    console.log(`#Dropped table ${ETableNames.expenses}`);
  });
}
