import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.person, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('fullName').index().notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Table used to archive persons from system.');
    })
    .then(() => {
      console.log(`#Created table ${ETableNames.person}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.person).then(() => {
    console.log(`#Dropped table ${ETableNames.person}`);
  });
}
