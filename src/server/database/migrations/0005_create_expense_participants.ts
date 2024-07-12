import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.expense_participants, (table) => {
      table.bigIncrements('expenseParticipantId').primary().index();
      table
        .integer('userId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.user)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .integer('expenseId')
        .index()
        .notNullable()
        .references('expenseId')
        .inTable(ETableNames.expenses)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.decimal('amountOwed', 10, 2).notNullable();

      table.comment('Table used to store expense participants.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.expense_participants}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.expense_participants).then(() => {
    console.log(`#Dropped table ${ETableNames.expense_participants}`);
  });
}
