import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.balances, (table) => {
      table.bigIncrements('balance_id').primary().index();
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(ETableNames.user)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .integer('group_id')
        .references('group_id')
        .inTable(ETableNames.groups)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.decimal('amount', 10, 2).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Table used to store user balances.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.balances}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.balances).then(() => {
    console.log(`#Dropped table ${ETableNames.balances}`);
  });
}
