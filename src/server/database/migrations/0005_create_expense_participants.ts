import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.expense_participants, (table) => {
      table.bigIncrements('expense_participant_id').primary().index();
      table
        .integer('user_id')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.user)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .integer('expense_id')
        .index()
        .notNullable()
        .references('expense_id')
        .inTable(ETableNames.expenses)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.decimal('amount_owed', 10, 2).notNullable();

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
