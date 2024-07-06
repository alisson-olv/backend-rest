import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.expenses, (table) => {
      table.bigIncrements('expense_id').primary().index();
      table.date('created_at').defaultTo(knex.fn.now());
      table.date('updated_at').defaultTo(knex.fn.now());
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
        .references('group_id')
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
