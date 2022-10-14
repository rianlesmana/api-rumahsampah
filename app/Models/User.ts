import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Activity from './Activity'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public nik: string


  @column({ serializeAs: null })
  public password: string

  @column()
  public fullName: string

  @column()
  public phoneNumber: string

  @column()
  public address: string

  @column()
  public village: string

  @column()
  public subdistrict: string

  @column()
  public city: string

  @column()
  public count: string

  @column()
  public about: string

  @column()
  public authority: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @hasMany(() => Activity)
  public activity: HasMany<typeof Activity>
}
