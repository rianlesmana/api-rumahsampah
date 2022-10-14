import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 255).notNullable().unique()
      table.string('nik').notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('full_name').notNullable()
      table.string('phone_number').notNullable()
      table.string('address').notNullable()
      table.string('village').notNullable()
      table.string('subdistrict').notNullable()
      table.string('city').notNullable()
      table.string('count').notNullable()
      table.string('about').nullable()
      table.string('authority').notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
