import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.payments, (table) => {
      table.bigIncrements('payment_id').primary().index();
      table
        .integer('payer_id')
        .notNullable()
        .references('id')
        .inTable(ETableNames.user)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table
        .integer('payee_id')
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
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.comment('Table used to store payments.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.payments}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.payments).then(() => {
    console.log(`#Dropped table ${ETableNames.payments}`);
  });
}
